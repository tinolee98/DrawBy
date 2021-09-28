import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createMessage: protectedResolver(
      async (_, { roomId, payload }, { loggedInUser }) => {
        const room = await client.room.findFirst({
          where: {
            id: roomId,
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        });
        let newMessage = null;
        if (!room) {
          return { ok: false, error: "Room not found." };
        } else {
          newMessage = await client.message.create({
            data: {
              room: {
                connect: {
                  id: room.id,
                },
              },
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              payload,
            },
          });
        }
        if (!newMessage) {
          return { ok: false, error: "Fail to create a message." };
        }
        return { ok: true };
      }
    ),
  },
};
