import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: Int!
    username: String!
    password: String!
    email: String!
    phoneNumber: String
    avatar: String
    bio: String
    pictures: [Picture]
    contestPictures: [Picture]
    isMe: Boolean!
    like2Pic: [Picture]
    followHashtags: [Hashtag]
    followers: [User]
    followings: [User]
    totalFollowers: Int!
    totalFollowings: Int!
    isFollowing: Boolean!
  }
`;
