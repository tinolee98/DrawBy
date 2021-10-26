import { gql } from "apollo-server-express";

export default gql`
  type CreateFeedResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createFeed(pictureId: Int!): CreateFeedResult!
  }
`;
