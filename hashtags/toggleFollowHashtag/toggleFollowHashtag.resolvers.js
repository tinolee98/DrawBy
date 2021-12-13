import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    followHashtag: protectedResolver(
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
        if (isFollow) {
          return { ok: false, error: "Hashtag not found OR already followed." };
        }
        const followhashtag = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            hashtags: {
              connect: {
                hashtagName,
              },
            },
          },
        });
        if (!followhashtag) {
          return { ok: false, error: "Fail to follow the hashtag." };
        }
        return { ok: true };
      }
    ),
    unfollowHashtag: protectedResolver(
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
        if (!isFollow) {
          return {
            ok: false,
            error: "Hashtag not found OR already not followed.",
          };
        }
        const unfollow = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            hashtags: {
              disconnect: {
                hashtagName,
              },
            },
          },
        });
        if (!unfollow) {
          return { ok: false, error: "Fail to unfollow the hashtag." };
        }
        return { ok: true };
      }
    ),
  },
};
