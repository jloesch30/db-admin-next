import { prisma } from "@prisma/client";
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
    return sign(
        { userId: user.id, tokenVersion: user.tokenVersion },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

// this verification token will allow them to get to the verify screen
// where they will be messaged a 1 time code
export const createTempVerifyToken = (user) => {
    return sign(
        {
            userId: user.id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "10d",
        }
    );
};

// TODO: change expiration to a shorter value
export const createTempSMSToken = (user) => {
    const smsCode = Math.floor(1000 + Math.random() * 9000);
    return {
        smsToken: sign(
            {
                userId: user.id,
            },
            process.env.SMS_TOKEN_SECRET,
            { expiresIn: "10d" }
        ),
        smsCode: smsCode,
    };
};

export const getCurrUserId = (req) => {
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

export const verifiedAdmin = (req) => {
    const userId = getCurrUserId(req);

    if (!userId) {
        return false;
    }

    const currUser = prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!(currUser.role === "ADMIN")) {
        return false;
    }

    return true;
};

export const verifiedUser = (req) => {
    const userId = getCurrUserId(req);

    if (!userId) {
        return false;
    }

    return true;
};

function _sendSMSToken(code) {}
