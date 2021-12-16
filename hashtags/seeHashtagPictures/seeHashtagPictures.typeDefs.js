import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeHashtagPictures(hashtagName: String!): [Picture]
  }
`;
