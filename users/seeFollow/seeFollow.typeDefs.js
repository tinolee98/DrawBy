import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeFollowers(id: Int!): [User]
    seeFollowings(id: Int!): [User]
  }
`;
