import { gql } from "apollo-server-express";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      id: Int!
      username: String
      password: String
      avatar: String
      bio: String
      phoneNumber: String
    ): EditProfileResult!
  }
`;
