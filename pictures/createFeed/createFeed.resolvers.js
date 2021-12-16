import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createFeed: protectedResolver(
      async (_, { pictureId }, { loggedInUser }) => {
        let userId;
        for (let i = 0; i < loggedInUser.follower.length + 1; i++) {
          if (i === loggedInUser.follower.length) {
            userId = loggedInUser.id;
          } else {
            userId = loggedInUser.follower[i].id;
          }
          const exist = await client.feed.findFirst({
            where: {
              userId,
              pictureId,
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
              userId,
              pictureId,
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
