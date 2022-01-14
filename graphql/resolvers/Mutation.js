import { graphqlUploadExpress, GraphQLUpload } from "graphql-upload";
import { hash, compare } from "bcryptjs";
import prisma from "../../lib/prisma";
import { sign } from "jsonwebtoken";

const Mutation = {
  login: async (_, { data }, { res }, info) => {
    const password = data.password;
    const username = data.username;

    // this seemingly works haha
    // res.setHeader("Set-Cookie", `mycookie=test`);

    console.log(res);

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

    // sign was successful

    return {
      token: sign(
        {
          userId: existingUser.id,
        },
        "asdfhehjasdf",
        { expiresIn: "15m" }
      ),
      user: existingUser,
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

      return {
        token: "test",
        user: newUser,
      };
    } catch (err) {
      console.log(err.message);
      throw new Error("There was a problem inserting the user into the DB");
    }
  },
};

export default Mutation;
