import prisma from "../../lib/prisma";

const Query = {
  users: async (parent, args, ctx, info) => {
    return await prisma.user.findMany();
  },
};

export default Query;
