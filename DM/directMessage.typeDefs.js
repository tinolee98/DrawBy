import { gql } from "apollo-server-express";

export default gql`
  type Message {
    id: Int!
    payload: String!
    author: User!
    room: Room!
    unRead: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Room {
    id: Int!
    users: [User]
    messages: [Message]
    latestMessage: String!
    time: String!
  }
  type ReadMessage {
    id: Int!
    user: User!
    message: Message!
  }
`;
