import { gql } from "apollo-server-express";
//일단 user를 result로 가져오도록 설정하였고
// hashtag, genre 등이 추가되면 result type을 변경해주어야함.
export default gql`
  type Query {
    userSearch(keyword: String!): [User]
    hashtagSearch(keyword: String!): [Hashtag]
    pictureSearch(keyword: String!): [Picture]
    genreSearch(keyword: String!): [Genre]
  }
`;
