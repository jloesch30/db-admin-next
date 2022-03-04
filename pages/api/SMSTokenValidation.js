// verify that the token is still valid for the SMS portion of the application
import { verify } from "jsonwebtoken";
export default async function handler(req, res) {
    const header = req.headers["authorization"];

    if (!header) {
        res.send({ ok: false, accessToken: "" });
    }

    const token = header.replace("Bearer ", "");
    token.split(" ")[1];
}
