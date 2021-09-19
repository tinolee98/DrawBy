import { gql } from "apollo-server-express";

export default gql`
  type DeletePictureResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deletePicture(id: Int!): DeletePictureResult!
  }
`;
