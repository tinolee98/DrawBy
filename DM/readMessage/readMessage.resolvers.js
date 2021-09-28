import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    readMessage: protectedResolver(async (_, { roomId }, { loggedInUser }) => {
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
          messages: true,
        },
      });
      if (!room) {
        return { ok: false, error: "Room not found." };
      }
      const read = await client.readMessage.deleteMany({
        where: {
          messageId: room.messages.id,
          userId: loggedInUser.id,
        },
      });
      if (!read) {
        return { ok: false, error: "Fail to delete." };
      }
      return { ok: true };
    }),
  },
};
