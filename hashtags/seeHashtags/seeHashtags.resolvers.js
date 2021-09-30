import client from "../../client";

export default {
  Query: {
    seeHashtags: async (_, { id }) =>
      client.hashtag.findUnique({
        where: { id },
      }),
  },
};
