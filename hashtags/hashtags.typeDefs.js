import { gql } from "apollo-server-express";

export default gql`
  type Hashtag {
    id: Int!
    hashtag: String!
    users: [User]
    pictures: [Picture]
  }
`;
