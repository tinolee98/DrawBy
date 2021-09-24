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
  },
};
