import * as bcrypt from 'bcrypt'
import client from '../../client'

export default {
  Mutation: {
    createAccount: async (
      _,
      { socialId, username, password, email, phoneNumber, avatar, bio }
    ) => {
      const existed = await client.user.findUnique({
        where: {
          username,
        },
        select: {
          username: true,
        },
      })
      if (existed) {
        return {
          ok: false,
          error: 'username is already existed',
        }
      }
      if (password && !socialId) {
        const uglyPW = await bcrypt.hash(password, 10)
        await client.user.create({
          data: {
            username,
            password: uglyPW,
            email,
            phoneNumber,
            avatar,
            bio,
          },
        })
      }
      if (socialId && !password) {
        const uglyPW = await bcrypt.hash(socialId, 10)
        await client.user.create({
          data: {
            username,
            socialId: uglyPW,
            email,
            phoneNumber,
            avatar,
            bio,
          },
        })
      }
      return {
        ok: true,
      }
    },
  },
}
