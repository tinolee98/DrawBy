import { gql } from "apollo-server-express";

export default gql`
  type Comment {
    id: Int!
    payload: String!
    author: User!
    picture: Picture!
    comment: Comment
    nestedComments: [Comment]
    whoLikes: [User]
    totalLike: Int!
    createdAt: String!
    updatedAt: String!
  }
  type LikeCom {
    id: Int!
    user: User!
    comment: Comment!
  }
`;
