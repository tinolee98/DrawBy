import { gql } from "apollo-server-express";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      username: String
      password: String
      avatar: Upload
      bio: String
      phoneNumber: String
    ): EditProfileResult!
  }
  scalar Upload
`;
