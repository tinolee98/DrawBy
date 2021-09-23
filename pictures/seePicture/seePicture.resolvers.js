import client from "../../client";

export default {
  Query: {
    seePicture: async (_, { id }) => {
      return await client.picture.findUnique({
        where: {
          id,
        },
      });
    },
  },
};
