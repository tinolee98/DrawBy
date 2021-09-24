import { gql } from "apollo-server-express";

export default gql`
  type Picture {
    id: Int!
    file: String!
    author: User!
    name: String!
    caption: String
    comments: [Comment]
    whoLikes: [User]
    totalLike: Int!
    createdAt: String!
    updatedAt: String!
  }
  type LikePic {
    id: Int!
    user: User!
    picture: Picture!
  }
`;
