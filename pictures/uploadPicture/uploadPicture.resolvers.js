import client from '../../client'
import { processHashtags } from '../../hashtags/hashtags.utils'
import { uploadToS3 } from '../../shared/shared.utils'
import { protectedResolver } from '../../users/users.utils'

export default {
  Mutation: {
    uploadPicture: protectedResolver(
      async (_, { file, name, caption }, { loggedInUser }) => {
        console.log(file)
        const fileUrl = await uploadToS3(file, loggedInUser.id, 'pictures')
        let hashtagsObj = []
        if (caption) {
          hashtagsObj = processHashtags(caption)
        }
        const upload = await client.picture.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            file: fileUrl,
            name,
            caption,
            ...(hashtagsObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagsObj,
              },
            }),
            //hastag 생성 부분에서 match 부분 오류.
          },
        })
        if (!upload) {
          return {
            ok: false,
            error: 'Fail to upload.',
          }
        }
        return {
          ok: true,
        }
      }
    ),
  },
}
