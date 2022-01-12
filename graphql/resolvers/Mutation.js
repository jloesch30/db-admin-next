import { graphqlUploadExpress, GraphQLUpload } from "graphql-upload";
import { hash, compare } from "bcryptjs";
import prisma from "../../lib/prisma";

const Mutation = {
  login: async (parent, { data }, ctx, info) => {
    const password = data.password;
    const username = data.username;

    // find if the user exists
    // returns null if the user does not exist
    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    console.log(existingUser);

    return {
      token: "test",
      user: null,
    };
  },

  signUp: async (parent, { data }, ctx, info) => {
    console.log("Creating user");
    console.log(`data coming in is: ${JSON.stringify(data)}`);

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

      console.log(newUser);
    } catch (err) {
      console.log(err.message);
      throw new Error("There was a problem inserting the user into the DB");
    }

    return {
      token: "test",
      user: newUser,
    };
  },
};

export default Mutation;
