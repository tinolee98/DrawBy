import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeFeed(skip: Int!, take: Int!): [Picture]
  }
`;

// userFollow 동작 시 Feed를 생성하거나 삭제하는 요소 필요 (삭제는 onCascade로 해결하더라도 생성은 필요!)
