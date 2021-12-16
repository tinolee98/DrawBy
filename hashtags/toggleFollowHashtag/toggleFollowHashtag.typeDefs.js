import { gql } from "apollo-server-express";

export default gql`
  type ToggleFollowHashtagResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    followHashtag(hashtagName: String!): ToggleFollowHashtagResult!
    unfollowHashtag(hashtagName: String!): ToggleFollowHashtagResult!
  }
`;
