import client from "../client";

export default {
  Comment: {
    author: async ({ id }) => {
      return await client.comment
        .findUnique({
          where: {
            id,
          },
        })
        .user();
    },
    isMine: async ({ id }, _, { loggedInUser }) => {
      const comment = await client.comment.findUnique({
        where: {
          id,
        },
      });
      return comment.userId === loggedInUser.id;
    },
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
