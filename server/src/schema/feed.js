import { gql } from "apollo-server-express";

const feedSchema = gql`
  type Feed {
    id: ID!
    text: String!
    user: User
    userId: ID!
    timestamp: Float
  }
  extend type Query {
    feeds(cursor: ID): [Feed!]! # getFeeds
    feed(id: ID!): Feed! # getFeed
  }
  extend type Mutation {
    createFeed(text: String!, userId: ID!): Feed!
    updateFeed(id: ID!, text: String!, userId: ID!): Feed!
    deleteFeed(id: ID!, userId: ID!): ID!
  }
`;

export default feedSchema;
