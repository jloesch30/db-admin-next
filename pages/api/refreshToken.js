// set up handler to take in req
/*
User cookie parser to put cookie in an object
1. Get cookie being sent to path
2. If we dont get a token, res.send({ok: false, accessToken: ''})
3. Validate the cookie jid with REFRESH_TOKEN_SECRET
4. if the token is valid, we will send back a new access token
5. use the id in the payload to find the user
6. send back a new access token to the user
*/
import { verify } from "jsonwebtoken";
import "dotenv/config";
import prisma from "../../lib/prisma";
import { createAccessToken, createRefreshToken } from "../../graphql/utils";

export default async function handler(req, res) {
  const token = req.cookies.jid;
  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload = null;

  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: "" });
  }

  // token was verified
  const user = await prisma.user.findUnique({
    where: {
      id: payload.userId,
    },
  });

  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  // the token is now invalid and will not work
  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: "" });
  }

  const tokenExpireDate = new Date();

  tokenExpireDate.setDate(
    tokenExpireDate.getDate() + 60 * 60 * 24 * 7 // 7 days
  );

  res.setHeader(
    "Set-Cookie",
    `jid=${createRefreshToken(user)}; HttpOnly; Expires=${tokenExpireDate}`
  );

  return res.send({ ok: true, accessToken: createAccessToken(user) });
}
