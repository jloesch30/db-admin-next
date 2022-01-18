import { graphqlUploadExpress, GraphQLUpload } from "graphql-upload";
import { hash, compare } from "bcryptjs";
import prisma from "../../lib/prisma";
import {
  createRefreshToken,
  createAccessToken,
  getUserId,
  createTempVerifyToken,
} from "../utils";
import { AuthenticationError } from "apollo-server-micro";

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
      // I need to redirect them to the sign in page
      throw new Error("The user does not exist");
    }

    const valid = await compare(password, existingUser.password);

    if (!valid) {
      throw new Error("Invalid password");
    }

    // send the verification code here and set in the database
    // this could be in the form of a JWT that has an expiration date...

    // const tokenExpireDate = new Date();

    // tokenExpireDate.setDate(
    //   tokenExpireDate.getDate() + 60 * 60 * 24 * 7 // 7 days
    // );

    // TODO: use this to set the cookie when verified
    // res.setHeader(
    //   "Set-Cookie",
    //   `jid=${createRefreshToken(
    //     existingUser
    //   )}; Expires=${tokenExpireDate}; HttpOnly; Secure`
    // );

    return {
      token: createTempVerifyToken(existingUser),
      user: existingUser,
    };
  },

  createUser: async (_, { data }, { prisma, req }) => {
    const userId = getUserId(req);

    if (!userId) {
      throw new AuthenticationError("User was not authenticated");
    }

    // check user role
    const currUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!currUser) {
      throw new Error("The user sending the request DNE");
    }

    const userRole = currUser.role;

    if (userRole !== "ADMIN") {
      throw new AuthenticationError(`The user is not an admin: ${userRole}`);
    }

    const hashedPassword = await hash(data.password, 12);

    const createdUser = await prisma.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
        email: data.email,
        role: data.role,
        fname: data.fname,
        lname: data.lname,
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
