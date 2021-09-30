import { gql } from "apollo-server-express";

export default gql`
  type FollowGenreResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    followGenre(id: Int!): FollowGenreResult!
  }
`;
