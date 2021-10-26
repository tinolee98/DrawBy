import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeFeed: protectedResolver(async (_, { page }, { loggedInUser }) => {
      const unreadFeeds = await client.feed.findMany({
        where: {
          userId: loggedInUser.id,
          read: false,
        },
        select: {
          picture: {
            include: {
              user: true,
            },
          },
        },
      });
      const readFeeds = await client.feed.findMany({
        where: {
          userId: loggedInUser.id,
          read: true,
        },
        select: {
          picture: {
            include: {
              user: true,
            },
          },
        },
      });
      const unreads = unreadFeeds.map((f) => f.picture);
      const reads = readFeeds.map((f) => f.picture);
      console.log("unread", unreads);
      console.log("read", reads);
      const feeds = unreads.concat(reads);
      if (!feeds) {
        console.log("No Feed!");
        return null;
      }
      //   console.log(readPictures);
      //   console.log("herererere!!");
      //   console.log(pictures);
      return feeds;
    }),
  },
};
