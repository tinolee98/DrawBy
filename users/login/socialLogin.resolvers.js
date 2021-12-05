import * as bcrypt from 'bcrypt'
import client from '../../client'
import { protectedResolver } from '../users.utils'
import jwt from 'jsonwebtoken'

export default {
  Mutation: {
    socialLogin: async (_, { socialId }) => {
      if (!socialId) {
        return {
          ok: false,
          error: 'socialId가 비어있습니다.',
        }
      }

      const user = await client.user.findFirst({
        where: {
          socialId,
        },
        select: {
          id: true,
          socialId: true,
          username: true,
          password: true,
        },
      })
      if (!user) {
        return {
          ok: false,
          error: 'user not found.',
        }
      }
      const passwordOk = await bcrypt.compare(
        socialId + process.env.SOCIAL_LOGIN_HASH_KEY,
        user.password
      )
      if (!passwordOk) {
        return {
          ok: false,
          error: 'password is incorrect',
        }
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY)
      return {
        ok: true,
        token,
      }
    },
  },
}
