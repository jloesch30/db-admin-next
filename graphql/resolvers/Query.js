import { AuthenticationError } from "apollo-server-micro";
import { getUserId } from "../utils";

const Query = {
  users: async (parent, args, ctx, info) => {
    return await prisma.user.findMany();
  },
  user: async (_, { query }, { prisma, req }) => {
    const userId = getUserId(req);

    const currUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!currUser || currUser.role !== "ADMIN") {
      throw new AuthenticationError(
        "You do not have permissions to access this query"
      );
    }

    const queriedUser = await prisma.user.findUnique({
      where: {
        ...query,
      },
    });

    if (!queriedUser) {
      throw new Error("The user DNE");
    }

    return queriedUser;
  },
};

export default Query;
