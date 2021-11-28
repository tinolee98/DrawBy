import { gql } from 'apollo-server-express'

export default gql`
  type SocialLoginResult {
    ok: Boolean!
    error: String
    token: String
  }
  type Mutation {
    socialLogin(socialId: String!, email: String): SocialLoginResult!
  }
`
