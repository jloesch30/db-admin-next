/* 
1. get information from request, sms sent over and verify token
2. check if the token is still valid
3. if the token is still valid, check that the sms code is the same
4. if all of the above pass, give the user an access token and a refresh token
*/

// TODO: duplicate logic with verify?
export default async function handler(req, res) {
  const smsInput = req.headers["sms"];
  const verifyToken = req.headers["authorization"];

  if (!(smsInput || verifyToken)) {
    res.send({ ok: false, accessToken: "" });
  }

  const token = verifyToken.replace("Bearer ", "");
  token.split(" ")[1];

  // check sms verification code validity
  let decoded = null;
}
