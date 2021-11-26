import * as bcrypt from 'bcrypt'
import client from '../../client'
import { protectedResolver } from '../users.utils'
import jwt from 'jsonwebtoken'

export default {
  Mutation: {
    socialLogin: async (_, { socialId, email }) => {
      const user = await client.user.findFirst({
        where: {
          email,
        },
        select: {
          id: true,
          socialId: true,
          username: true,
        },
      })
      if (!user) {
        return {
          ok: false,
          error: 'This email is not existed.',
        }
      }
      if (!socialId) {
        return {
          ok: false,
          error: '같은 email을 사용하는 다른 계정이 있습니다.',
        }
      }
      const passwordOk = await bcrypt.compare(socialId, user.socialId)
      if (!passwordOk) {
        return {
          ok: false,
          error: 'Password is incorrect.',
        }
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY)
      return {
        ok: true,
        error: 'test',
        token,
      }
    },
  },
}
