import { gql } from "apollo-server-express";

export default gql`
  type Query {
    infiniteTest(skip: Int!, take: Int!): [Picture]
  }
`;
