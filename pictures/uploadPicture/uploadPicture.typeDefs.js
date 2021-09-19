import { gql } from "apollo-server-express";

export default gql`
  type UploadPictureResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    uploadPicture(
      file: String!
      name: String!
      caption: String
    ): UploadPictureResult!
  }
`;
