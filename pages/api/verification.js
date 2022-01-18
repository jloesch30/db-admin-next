// send verification code and store in DB

/*
1. Verify token will be sent in request
2. validate the token
3. If valid, send a message with verification code
4. if not valid, redirect respond with verification error
5. await the verification code on the server side and if valid, create an access token and refresh token
*/

export default async function handler(req, res) {
  // check if the verification token is valid in the request

  const header = req.headers["Authorization"];

  if (!header) {
    res.send({ ok: false, accessToken: "" });
  }
  console.log(req.headers);

  const token = header.replace("Bearer ", "");
  token.split(" ")[1];

  // verify token and respond with a refresh token and access token if valid
  try {
    const decoded = verify(token, process.env.VERIFY_TOKEN_SECRET);

    // the token is valid, send a code via mobile and await response
  } catch (err) {
    res.send({ ok: false, accessToken: "" });
    console.log(err);
  }
}
