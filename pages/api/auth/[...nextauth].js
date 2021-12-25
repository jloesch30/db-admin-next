import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const options = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: (credentials) => {
        // database lookup
        if (
          credentials.username === "john@gmail.com" &&
          credentials.password === "test"
        ) {
          // logins
          // get user information
          return {
            id: 2,
            name: "John",
            email: "johndoe@gmail.com",
          };
        } else {
          // login failed
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/newuser'
  },
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object will be available
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
};

export default (req, res) => NextAuth(req, res, options);
