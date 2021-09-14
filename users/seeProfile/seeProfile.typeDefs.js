import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeProfile(id: Int!): User!
  }
`;
