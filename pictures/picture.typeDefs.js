import { gql } from "apollo-server-express";

export default gql`
  type Picture {
    id: Int!
    file: String!
    author: User!
    name: String!
    caption: String
    comments: [Comment]
    totalComment: Int!
    likes: [User]
    whoLikes: [User]
    totalLike: Int!
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
    isLiked: Boolean!
  }
  type LikePic {
    user: User!
    picture: Picture!
  }
`;
