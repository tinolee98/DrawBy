import { gql } from "apollo-server-express";

export default gql`
  type ToggleLike2CommentResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    toggleLike2Comment(id: Int!): ToggleLike2CommentResult!
    toggleLike2NestedComment(id: Int!): ToggleLike2CommentResult!
  }
`;
