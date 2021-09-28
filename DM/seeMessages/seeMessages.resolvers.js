import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeMessages: protectedResolver(async (_, { roomId }, { loggedInUser }) => {
      const room = await client.room.findFirst({
        where: {
          id: roomId,
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
      if (!room) {
        return null;
      }
      return room.messages;
    }),
  },
};
