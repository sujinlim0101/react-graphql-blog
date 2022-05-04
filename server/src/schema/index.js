import { gql } from "apollo-server-express";
import feedSchema from "./feed.js";
import userSchema from "./user.js";

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, feedSchema, userSchema];
