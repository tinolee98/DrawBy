import { gql } from "apollo-server-express";

export default gql`
  type UploadPictureResult {
    ok: Boolean!
    id: Int
    file: String
    name: String
    caption: String
    error: String
    hashtags: [Hashtag]
  }
  type Mutation {
    uploadPicture(
      file: Upload!
      name: String!
      caption: String
    ): UploadPictureResult!
  }
`;
