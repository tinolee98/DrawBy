import { gql } from "apollo-server-express";

export default gql`
  type CheckFollowHashtagResult {
    ok: Boolean!
    countPictures: Int!
  }
  type Query {
    checkFollowHashtag(hashtagName: String!): CheckFollowHashtagResult!
  }
`;
