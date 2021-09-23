import { gql } from "apollo-server-express";

export default gql`
  type Comment {
    id: Int!
    payload: String!
    author: User!
    picture: Picture!
    comment: Comment
    nestedComments: [Comment]
    isNested: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
