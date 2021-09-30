import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    unfollowHashtag: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const hashtag = await client.hashtag.findUnique({
        where: { id },
      });
      const isFollowed = await client.user.findFirst({
        where: {
          id: loggedInUser.id,
          hashtags: {
            some: { id },
          },
        },
      });
      if (!hashtag || !isFollowed) {
        return { ok: false, error: "Hashtag not found." };
      }
      const unfollow = await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          hashtags: {
            disconnect: {
              id,
            },
          },
        },
      });
      if (!unfollow) {
        return { ok: false, error: "Fail to unfollow the hashtag." };
      }
      return { ok: true };
    }),
  },
};
