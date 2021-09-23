import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seePicture(id: Int!): Picture!
  }
`;
