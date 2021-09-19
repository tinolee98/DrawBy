import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deletePicture: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const isMine = await client.picture.findFirst({
        where: {
          id,
          userId: loggedInUser.id,
        },
      });
      if (!isMine) {
        return { ok: false, error: "It is not yours." };
      }
      const del = await client.picture.delete({
        where: {
          id,
        },
      });
      if (!del) {
        return { ok: false, error: "Fail to delete." };
      }
      return { ok: true };
    }),
  },
};
