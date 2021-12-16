import client from "../client";

export default {
  Query: {
    infiniteTest: async (_, { skip, take }) => {
      return await client.picture.findMany({
        skip,
        take,
      });
    },
  },
};
