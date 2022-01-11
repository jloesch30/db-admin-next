import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    users(query: String): [User!]!
    files(query: String): [File!]!
    user(id: ID, query: String!): User!
    me: User!
  }

  type Mutation {
    signUp(data: signUpInput!): AuthPayload
    login(data: loginInput!): AuthPayload
    createUser(data: signUpInput!): User!
    updateUser(id: ID!, data: updateUserInput!): User!
    updateProfile(id: ID!, data: updateProfileInput!): Profile!
  }

  type User {
    id: ID!
    userName: String!
    password: String!
    email: String!
    fname: String!
    lname: String!
  }

  type Profile {
    id: ID!
    profileImage: File!
    fname: String!
    mname: String
    lname: String
    birthYear: Int
    birthMonth: Int
    birthDay: Int
    Country: String
    State: String
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input signUpInput {
    username: String!
    password: String!
    email: String!
    fname: String!
    lname: String!
    profileImage: String
  }

  input signUpInput {
    username: String
    password: String
    email: String
    fname: String
    lname: String
    profileImage: String
  }

  input loginInput {
    username: String!
    password: String!
  }

  input updateUserInput {
    username: String
    password: String
    email: String
    fname: String
    lname: String
    profileImage: String
  }

  input updateProfileInput {
    fname: String
    mname: String
    lname: String
    birthYear: Int
    birthMonth: Int
    birthDay: Int
    county: String
    State: String
  }
`;
