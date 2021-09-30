import { gql } from "apollo-server-express";

export default gql`
  type UnfollowGenreResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    unfollowGenre(id: Int!): UnfollowGenreResult!
  }
`;
