import { graphqlUploadExpress, GraphQLUpload } from "graphql-upload";
import { hash, compare } from "bcryptjs";
import prisma from "../../lib/prisma";

const Mutation = {
  signUp: async (parent, { data }, ctx, info) => {
    console.log("Creating user");
    console.log(`data coming in is: ${JSON.stringify(data)}`);

    const hashedPassword = await hash(data.password, 12);

    console.log(hashedPassword);

    const newUser = await prisma.user.create({
      data: {
        userName: data.userName,
        password: hashedPassword,
        email: data.email,
        fname: data.fname,
        lname: data.lname,
      },
    });

    console.log(newUser);

    return newUser;
  },
};

export default Mutation;
