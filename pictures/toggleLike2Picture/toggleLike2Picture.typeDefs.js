import { gql } from "apollo-server-express";

export default gql`
  type ToggleLike2PictureResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    toggleLike2Picture(id: Int!): ToggleLike2PictureResult!
  }
`;
