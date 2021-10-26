import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createFeed: protectedResolver(
      async (_, { pictureId }, { loggedInUser }) => {
        for (let i = 0; i < loggedInUser.follower.length; i++) {
          const exist = await client.feed.findFirst({
            where: {
              userId: loggedInUser.follower[i].id,
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
                  id: loggedInUser.follower[i].id,
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
