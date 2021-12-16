import client from "../../client";

export default {
  Query: {
    seeHashtag: async (_, { hashtagName }) => {
      return await client.hashtag.findFirst({
        where: {
          hashtagName,
        },
        include: {
          pictures: true,
        },
      });
    },
  },
};
