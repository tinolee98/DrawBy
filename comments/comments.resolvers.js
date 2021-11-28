import client from "../client";

export default {
  Comment: {
    author: async ({ id, commentId }) => {
      if (commentId) {
        return await client.nestedComment
          .findUnique({
            where: {
              id,
            },
          })
          .user();
      }
      return await client.comment
        .findUnique({
          where: {
            id,
          },
        })
        .user();
    },
    isMine: async ({ id, commentId }, _, { loggedInUser }) => {
      if (commentId) {
        const nestedComment = await client.nestedComment.findUnique({
          where: { id },
        });
        return nestedComment.userId === loggedInUser.id;
      }
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
  NestedComment: {
    author: async ({ id }) => {
      return await client.nestedComment
        .findUnique({
          where: {
            id,
          },
        })
        .user();
    },
    isMine: async ({ id }, _, { loggedInUser }) => {
      const nestedComment = await client.nestedComment.findUnique({
        where: { id },
      });
      return nestedComment.userId === loggedInUser.id;
    },
    totalLike: async ({ id }) => {
      return client.likeNestCom.count({
        where: {
          nestedCommentId: id,
        },
      });
    },
    whoLikes: async ({ id }) => {
      const users = await client.likeNestCom.findMany({
        where: {
          nestedCommentId: id,
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
