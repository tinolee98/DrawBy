import { gql } from "apollo-server-express";

export default gql`
  type UnfollowHashtagResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    unfollowHashtag(id: Int!): UnfollowHashtagResult!
  }
`;
