import { gql } from "apollo-server-express";

export default gql`
  type Comment {
    id: Int!
    payload: String!
    author: User!
    picture: Picture!
    nestedComments: [NestedComment]
    whoLikes: [User]
    totalLike: Int!
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type NestedComment {
    id: Int!
    payload: String!
    author: User!
    picture: Picture!
    comment: Comment
    whoLikes: [User]
    totalLike: Int!
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type LikeCom {
    id: Int!
    user: User!
    comment: Comment!
  }
`;
