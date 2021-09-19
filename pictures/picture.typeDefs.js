import { gql } from "apollo-server-express";

export default gql`
  type Picture {
    id: Int!
    author: User!
    name: String!
    caption: String
    comments: [Comment]
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    id: Int!
    payload: String!
    author: User!
    picture: Picture!
    createdAt: String!
    updatedAt: String!
  }
`;
