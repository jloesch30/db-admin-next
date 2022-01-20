import Layout from "../components/layout/Layout";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";
import { AuthContextProvider } from "../store/auth-context";

process.on("warning", (e) => console.warn(e.stack));

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
