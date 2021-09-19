import { gql } from "apollo-server-express";

export default gql`
  type EditPictureResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editPicture(id: Int!, name: String, caption: String): EditPictureResult!
  }
`;
