import { graphqlUploadExpress, GraphQLUpload } from "graphql-upload";
import { hash, compare } from "bcryptjs";
import prisma from "../../lib/prisma";
import { createRefreshToken, createAccessToken, getUserId } from "../utils";
import { AuthenticationError } from "apollo-server-micro";

const Mutation = {
  login: async (_, { data }, { res }, info) => {
    const password = data.password;
    const username = data.username;

    // find if the user exists
    // returns null if the user does not exist
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

    // sign was successful (set cookies)
    const tokenExpireDate = new Date();

    tokenExpireDate.setDate(
      tokenExpireDate.getDate() + 60 * 60 * 24 * 7 // 7 days
    );

    res.setHeader(
      "Set-Cookie",
      `jid=${createRefreshToken(
        existingUser
      )}; expires=${tokenExpireDate}; httpOnly=true`
    );

    return {
      token: createAccessToken(existingUser),
      user: existingUser,
    };
  },

  signUp: async (parent, { data }, ctx, info) => {
    const hashedPassword = await hash(data.password, 12);

    try {
      const newUser = await prisma.user.create({
        data: {
          username: data.username,
          password: hashedPassword,
          email: data.email,
          fname: data.fname,
          lname: data.lname,
        },
      });

      return {
        token: createAccessToken(newUser),
        user: newUser,
      };
    } catch (err) {
      console.log(err.message);
      throw new Error("There was a problem inserting the user into the DB");
    }
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
  updateUser: (_, { data }, { req }) => {
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
