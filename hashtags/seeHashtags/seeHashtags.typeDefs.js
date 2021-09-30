import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeHashtags(id: Int!): [Hashtag]
  }
`;
