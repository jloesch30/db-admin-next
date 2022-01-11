import { ApolloServer } from "apollo-server-micro";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schemas";
import Cors from "micro-cors";

const cors = Cors();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
