import { graphqlUploadExpress, GraphQLUpload } from "graphql-upload";
import { hash, compare } from "bcryptjs";
import prisma from "../../lib/prisma";
import {
  createRefreshToken,
  createAccessToken,
  getUserId,
  createTempVerifyToken,
  createTempSMSToken,
} from "../utils";
import { AuthenticationError } from "apollo-server-micro";
import vonage from "../../lib/vonage";

const Mutation = {
  login: async (_, { data }, { res }, info) => {
    const password = data.password;
    const username = data.username;

    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!existingUser) {
      throw new Error("The user does not exist");
    }

    const valid = await compare(password, existingUser.password);

    if (!valid) {
      throw new Error("Invalid password");
    }

    const { smsToken, smsCode } = createTempSMSToken(existingUser);

    await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        tempVerifyCode: smsToken,
      },
    });

    const from = "18662523290";
    const to = "17135945997";
    const text = `Your verification code is ${smsCode}`;

    vonage.message.sendSms(from, to, text, (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        if (responseData.messages[0]["status"] === "0") {
          console.log("Message send successfully");
        } else {
          console.log(
            `Message failed with error: ${responseData.messages[0]["error-text"]}`
          );
        }
      }
    });

    return {
      token: createTempVerifyToken(existingUser),
      user: existingUser,
    };
  },

  createUser: async (_, { data }, { prisma, req }) => {
    // TODO: uncomment this
    // const userId = getUserId(req);

    // if (!userId) {
    //   throw new AuthenticationError("User was not authenticated");
    // }

    // check user role
    // const currUser = await prisma.user.findUnique({
    //   where: {
    //     id: userId,
    //   },
    // });

    // if (!currUser) {
    //   throw new Error("The user sending the request DNE");
    // }

    // const userRole = currUser.role;

    // if (userRole !== "ADMIN") {
    //   throw new AuthenticationError(`The user is not an admin: ${userRole}`);
    // }
    // TODO: Uncomment this

    const hashedPassword = await hash(data.password, 12);

    console.log(data.tempVerifyCode);

    const createdUser = await prisma.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
        email: data.email,
        role: data.role,
        fname: data.fname,
        lname: data.lname,
        tempVerifyCode: data.tempVerifyCode,
      },
    });

    return createdUser;
  },
  updateUser: async (_, { id, data }, { req }) => {
    console.log(data); // TODO: delete
    const userId = getUserId(req);

    if (!userId) {
      throw new AuthenticationError("User was not authenticated");
    }

    const currUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // TODO: this may change to ID
    const targetUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    // if the user requesting the update is updating their own account
    if (currUser.id === targetUser.id) {
      const updatedUser = await prisma.user.update({
        where: {
          id: targetUser.id,
        },
        data: {
          ...data,
        },
      });
    }

    // if the user is an admin and updating someone else's account
  },
};

export default Mutation;
