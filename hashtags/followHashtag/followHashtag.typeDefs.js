import { gql } from "apollo-server-express";

export default gql`
  type FollowHashtagResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    followHashtag(id: Int!): FollowHashtagResult!
  }
`;
