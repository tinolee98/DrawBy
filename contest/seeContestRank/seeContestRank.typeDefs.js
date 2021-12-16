import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeContestRank(hashtagName: String!): [Picture]
  }
`;
