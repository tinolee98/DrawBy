import client from "../../client";

export default {
  Query: {
    seeComment: async (_, { id }) => {
      return await client.comment.findUnique({
        where: { id },
      });
    },
  },
};
