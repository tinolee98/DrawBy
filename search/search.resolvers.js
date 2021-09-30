import client from "../client";

export default {
  Query: {
    userSearch: async (_, { keyword }) => {
      return await client.user.findMany({
        where: {
          username: {
            startsWith: { keyword },
          },
        },
      });
    },
    hashtagSearch: async (_, { keyword }) => {
      return await client.hashtag.findMany({
        where: {
          hashtagName: {
            startsWith: { keyword },
          },
        },
      });
    },
    genreSearch: async (_, { keyword }) => {
      return await client.genre.findMany({
        where: {
          genreName: {
            startsWith: { keyword },
          },
        },
      });
    },
    pictureSearch: async (_, { keyword }) => {
      return await client.picture.findMany({
        where: {
          name: {
            startsWith: { keyword },
          },
        },
      });
    },
  },
};
