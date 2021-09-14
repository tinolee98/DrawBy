import client from "../../client";

export default {
  Query: {
    seeProfile: async (_, { id }) => {
      return await client.user.findFirst({
        where: {
          id,
        },
      });
    },
  },
};
