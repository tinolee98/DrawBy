import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    checkFollowHashtag: protectedResolver(
      async (_, { hashtagName }, { loggedInUser }) => {
        const isFollow = await client.hashtag.findFirst({
          where: {
            hashtagName,
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        });
        const countPictures = await client.picture.count({
          where: {
            hashtags: {
              some: {
                hashtagName,
              },
            },
          },
        });
        console.log(countPictures);
        if (isFollow) {
          if (countPictures) {
            return { ok: true, countPictures };
          }
          return { ok: true, countPictures: 0 };
        }
        if (countPictures) {
          return { ok: false, countPictures };
        }
        return { ok: false, countPictures: 0 };
      }
    ),
  },
};
