import client from "../client";

export default {
  Room: {
    time: async ({ id }) => {
      const room = await client.room.findFirst({
        where: {
          id,
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
      return room.messages[0].createdAt;
    },
    latestMessage: async ({ id }) => {
      const room = await client.room.findFirst({
        where: {
          id,
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
      return room.messages[0].payload;
    },
  },
};
