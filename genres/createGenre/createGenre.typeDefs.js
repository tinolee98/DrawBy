import { gql } from "apollo-server-express";

export default gql`
  type CreateGenreResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createGenre(genreName: String!): CreateGenreResult!
  }
`;
