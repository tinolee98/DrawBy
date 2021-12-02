import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleBookmark: protectedResolver(
      async (_, { pictureId }, { loggedInUser }) => {
        const bookmarkExist = await client.bookmark.findUnique({
          where: {
            userId_pictureId: {
              userId: loggedInUser.id,
              pictureId,
            },
          },
        });
        if (!bookmarkExist) {
          await client.bookmark.create({
            data: {
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              picture: {
                connect: {
                  id: pictureId,
                },
              },
            },
          });
        } else {
          await client.bookmark.delete({
            where: {
              userId_pictureId: {
                userId: loggedInUser.id,
                pictureId,
              },
            },
          });
        }
        return { ok: true };
      }
    ),
  },
};
