import client from "../client";

export default {
  Comment: {
    isNested: async ({ id }) => {
      const comment = await client.comment.findUnique({
        where: { id },
      });
      return false;
    },
  },
};
