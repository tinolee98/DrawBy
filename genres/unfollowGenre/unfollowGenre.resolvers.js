import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    unfollowGenre: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const genre = await client.genre.findFirst({
        where: {
          id,
          users: {
            some: { id: loggedInUser.id },
          },
        },
      });
      if (!genre) {
        return { ok: false, error: "Genre not found." };
      }
      const unfollow = await client.genre.update({
        where: {
          id,
        },
        data: {
          users: {
            disconnect: {
              id: loggedInUser.id,
            },
          },
        },
      });
      if (!unfollow) {
        return { ok: false, error: "Fail to unfollow." };
      }
      return { ok: true };
    }),
  },
};
