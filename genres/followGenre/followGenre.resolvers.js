import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    followGenre: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const genre = await client.genre.findUnique({
        where: { id },
      });
      if (!genre) {
        return { ok: false, error: "Genre not found." };
      }
      const follow = await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          genres: {
            connect: { id },
          },
        },
      });
      if (!follow) {
        return { ok: false, error: "Fail to follow." };
      }
      return { ok: true };
    }),
  },
};
