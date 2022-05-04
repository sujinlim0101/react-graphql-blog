import gql from "graphql-tag";

export const GET_FEEDS = gql`
  query GET_FEEDS($cursor: ID) {
    feeds(cursor: $cursor) {
      id
      text
      timestamp
      user {
        id
        nickname
      }
    }
  }
`;

export const GET_FEED = gql`
  query GET_FEED($id: ID!) {
    feed(id: $id) {
      id
      text
      user {
        id
        nickname
      }
      timestamp
    }
  }
`;

export const CREATE_FEED = gql`
  mutation CREATE_FEED($text: String!, $userId: ID!) {
    createFeed(text: $text, userId: $userId) {
      id
      text
      user {
        id
        nickname
      }
      timestamp
    }
  }
`;

export const UPDATE_FEED = gql`
  mutation UPDATE_FEED($id: ID!, $text: String!, $userId: ID!) {
    updateFeed(id: $id, text: $text, userId: $userId) {
      id
      text
      user {
        id
        nickname
      }
      timestamp
    }
  }
`;

export const DELETE_FEED = gql`
  mutation DELETE_FEED($id: ID!, $userId: ID!) {
    deleteFeed(id: $id, userId: $userId)
  }
`;
