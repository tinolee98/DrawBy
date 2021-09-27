import { PersistedQueryNotSupportedError } from "apollo-server-errors";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

// 내가 속한 채팅방 목록 보기
export default {
  Query: {
    seeRooms: protectedResolver(async (_, __, { loggedInUser }) => {
      const rooms = await client.room.findMany({
        where: {
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
      return rooms;
    }),
  },
};
