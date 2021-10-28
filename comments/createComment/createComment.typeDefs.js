import { gql } from "apollo-server-express";

export default gql`
  type CreateCommentResult {
    ok: Boolean!
    id: Int!
    error: String
  }
  type Mutation {
    createComment(
      payload: String!
      pictureId: Int!
      commentId: Int
    ): CreateCommentResult!
  }
`;
