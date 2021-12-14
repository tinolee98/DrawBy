import client from "../../client";

export default {
  Query: {
    seeHashtag: async (_, { hashtagName, skip, take }) => {
      return await client.hashtag.findFirst({
        where: {
          hashtagName,
        },
        include: {
          pictures: true,
        },
        skip,
        take,
      });
    },
  },
};
