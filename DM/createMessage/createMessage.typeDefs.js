import { gql } from "apollo-server-express";

export default gql`
  type CreateMessageResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createMessage(roodId: Int!, payload: String!): CreateMessageResult!
  }
`;
