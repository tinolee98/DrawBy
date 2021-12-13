import { gql } from "apollo-server-express";

export default gql`
  type Hashtag {
    id: Int!
    hashtagName: String!
    users: [User]
    pictures: [Picture]
    isFollowing: Boolean!
  }
`;
