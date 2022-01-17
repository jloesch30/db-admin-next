// send verification code and store in DB

/*
1. Verify token will be sent in request
2. validate the token
3. If valid, send a message with verification code
4. if not valid, redirect respond with verification error
5. await the verification code on the server side and if valid, create an access token and refresh token
*/

export default async function handler(req, res) {}
