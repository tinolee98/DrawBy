import client from "../client";

export default {
  Comment: {
    nestedComments: async ({ id }) => {
      //pagination 추가 필요!
      return client.nestedComment.findMany({
        where: {
          commentId: id,
        },
      });
    },
    totalLike: async ({ id }) => {
      return client.likeCom.count({
        where: {
          commentId: id,
        },
      });
    },
    whoLikes: async ({ id }) => {
      const users = await client.likeCom.findMany({
        where: {
          commentId: id,
        },
        select: {
          user: true,
        },
      });
      const result = users.map((user) => user.user);
      return result;
    },
  },
};
