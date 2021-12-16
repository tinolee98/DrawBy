import { gql } from "apollo-server-express";

export default gql`
  scalar Upload
  type Picture {
    id: Int!
    file: String!
    author: User!
    name: String!
    caption: String
    comments: [Comment]
    totalComment: Int!
    hashtags: [Hashtag]
    whoLikes: [User]
    totalLike: Int!
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
    isLiked: Boolean!
    isBookmarked: Boolean!
    rank: Int
  }
  type LikePic {
    user: User!
    picture: Picture!
  }
`;
