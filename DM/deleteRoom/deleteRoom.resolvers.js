import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

// 내가 속해있는 room을 나가는 행위 (채팅방 나가기)
export default {
  Mutation: {
    deleteRoom: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const room = await client.room.findFirst({
        where: {
          id,
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
        include: {
          users: true,
        },
      });
      if (!room) {
        return { ok: false, error: "Room not found." };
      }
      if (room.users.length == 1) {
        // 로그인 유저만이 해당 채팅방에 속해있으므로 room을 삭제
        const deleteRoom = await client.room.delete({
          where: { id },
        });
        if (!deleteRoom) {
          return { ok: false, error: "Fail to delete." };
        }
      } else {
        // 로그인 유저만 해당 채팅방에서 나가기.
        const out = await client.room.update({
          where: {
            id,
          },
          include: {
            users: true,
          },
          data: {
            users: {
              disconnect: {
                id: loggedInUser.id,
              },
            },
          },
        });
        if (!out) {
          return { ok: false, error: "Fail to go out." };
        }
      }
      return { ok: true };
    }),
  },
};
