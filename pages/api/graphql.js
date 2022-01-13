import { ApolloServer } from "apollo-server-micro";
import { resolvers } from "../../graphql/resolvers";
import { typeDefs } from "../../graphql/schemas";
import { createContext } from "../../graphql/context";
import Cors from "micro-cors";

const cors = Cors();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  // TODO: unset this
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );

  res.setHeader("Access-Control-Allow-Credentials", "true");

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
