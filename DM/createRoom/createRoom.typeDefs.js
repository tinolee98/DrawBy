import { gql } from "apollo-server-express";

export default gql`
  type CreateRoomResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createRoom(userId: [Int]): CreateRoomResult!
  }
`;
