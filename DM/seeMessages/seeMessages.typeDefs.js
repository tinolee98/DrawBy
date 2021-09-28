import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeMessages(roomId: Int!): [Message]
  }
`;
