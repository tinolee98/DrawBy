import { gql } from "apollo-server-express";

export default gql`
  type DeleteAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteAccount(id: Int!, password: String!): DeleteAccountResult!
  }
`;
