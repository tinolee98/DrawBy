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
  Message: {
    unRead: async ({ id }) =>
      client.readMessage.count({
        where: {
          messageId: id,
        },
      }),
    author: async ({ id }) =>
      client.user.findFirst({
        where: {
          messages: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
