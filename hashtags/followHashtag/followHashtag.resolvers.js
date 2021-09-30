import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    followHashtag: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const hashtag = await client.hashtag.findUnique({
        where: {
          id,
        },
      });
      if (!hashtag) {
        return { ok: false, error: "Hashtag not found." };
      }
      const followhashtag = await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          hashtags: {
            connect: {
              id,
            },
          },
        },
      });
      if (!followhashtag) {
        return { ok: false, error: "Fail to follow the hashtag." };
      }
      return { ok: true };
    }),
  },
};
