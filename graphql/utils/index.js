import { AuthenticationError } from "apollo-server-micro";
import "dotenv/config";
import { sign } from "jsonwebtoken";
import { verify } from "jsonwebtoken";

export const createAccessToken = (user) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const createRefreshToken = (user) => {
  return sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const getUserId = (req) => {
  console.log("inside of get user");
  const header = req.headers.authorization;

  if (!header) {
    throw new AuthenticationError("Authentication required");
  }

  // parse token
  const token = header.replace("Bearer ", "");
  token.split(" ")[1];

  try {
    const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);

    return decoded.userId;
  } catch (err) {
    console.log(err);
  }
};
