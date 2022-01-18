// send verification code and store in DB

/*
1. Verify token will be sent in request
2. validate the token
3. If valid, send a message with verification code
4. if not valid, redirect respond with verification error
5. await the verification code on the server side and if valid, create an access token and refresh token
*/
import { verify } from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "../../graphql/utils";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const header = req.headers["authorization"];

  if (!header) {
    res.send({ ok: false, accessToken: "" });
  }

  const token = header.replace("Bearer ", "");
  token.split(" ")[1];

  let decoded = null;

  try {
    decoded = verify(token, process.env.VERIFY_TOKEN_SECRET);
    console.log(decoded);

    // check verification code from database
    const userId = decoded["userId"];

    const currUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    decoded = verify(currUser.tempVerifyCode, process.env.SMS_TOKEN_SECRET);

    // check if the sms code matches
    console.log("The query code is:", req.query.code);
    console.log("The decoded code is:", decoded.smsCode);

    if (parseInt(req.query.code) === decoded.smsCode) {
      const tokenExpireDate = new Date();

      tokenExpireDate.setDate(
        tokenExpireDate.getDate() + 60 * 60 * 24 * 7 // 7 days
      );

      res.setHeader(
        "Set-Cookie",
        `jid=${createRefreshToken(
          currUser
        )}; Expires=${tokenExpireDate}; HttpOnly`
      );

      res.send({ ok: true, accessToken: createAccessToken(currUser) });
    } else {
      res.send({ ok: false, accessToken: "" });
    }
  } catch (err) {
    res.send({ ok: false, accessToken: "" });
    console.log(err);
  }
}
