import { gql } from "apollo-server-express";

export default gql`
  type Genre {
    id: Int!
    genre: String!
    users: [User]
    Pictures: [Picture]
  }
`;
