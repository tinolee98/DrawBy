import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleLike2Picture: protectedResolver(
      async (_, { id }, { loggedInUser }) => {
        const picture = await client.picture.findUnique({
          where: {
            id,
          },
        });
        if (!picture) {
          return {
            ok: false,
            error: "Picture not found.",
          };
        }
        const likeExist = await client.likePic.findUnique({
          where: {
            userId_pictureId: {
              userId: loggedInUser.id,
              pictureId: id,
            },
          },
        });
        if (!likeExist) {
          await client.likePic.create({
            data: {
              userId: loggedInUser.id,
              pictureId: id,
            },
          });
        } else {
          await client.likePic.delete({
            where: {
              userId_pictureId: {
                userId: loggedInUser.id,
                pictureId: id,
              },
            },
          });
        }
        return { ok: true };
      }
    ),
  },
};
