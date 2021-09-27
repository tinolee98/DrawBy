import { gql } from "apollo-server-express";

export default gql`
  type DeleteRoomResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteRoom(id: Int!): DeleteRoomResult!
  }
`;
