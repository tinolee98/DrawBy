import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createFeed: protectedResolver(
      async (_, { pictureId }, { loggedInUser }) => {
        for (let i = 0; i < loggedInUser.follower.length + 1; i++) {
          let userId = loggedInUser.follower[i].id;
          if (i === loggedInUser.follower.length) {
            userId = loggedInUser.id;
          }
          const exist = await client.feed.findFirst({
            where: {
              userId,
            },
            include: {
              user: true,
            },
          });

          if (exist) {
            continue;
          }
          const feed = await client.feed.create({
            data: {
              user: {
                connect: {
                  id: userId,
                },
              },
              picture: {
                connect: {
                  id: pictureId,
                },
              },
              read: false,
            },
          });
          if (!feed) {
            return {
              ok: false,
              error: "fail to create feeds",
            };
          }
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
