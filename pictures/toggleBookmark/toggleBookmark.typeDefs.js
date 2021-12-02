import { gql } from "apollo-server-express";

export default gql`
  type ToggleBookmarkResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    toggleBookmark(pictureId: Int!): ToggleBookmarkResult!
  }
`;
