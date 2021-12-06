import client from "../../client";

export default {
  Query: {
    seeHashtagPictures: async (_, { hashtagName }) =>
      client.picture.findMany({
        where: {
          hashtags: {
            some: {
              hashtagName,
            },
          },
        },
      }),
  },
};
