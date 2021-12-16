import client from "../client";

export default {
  Query: {
    searchUser: async (_, { keyword }) => {
      if (keyword === "") {
        return await client.user.findMany({
          select: {
            id: true,
            username: true,
            avatar: true,
          },
          take: 4,
        });
      }
      return await client.user.findMany({
        where: {
          username: {
            startsWith: keyword,
          },
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
        take: 4,
      });
    },
    searchHashtag: async (_, { keyword }) => {
      if (!keyword) {
        return await client.hashtag.findMany({
          select: {
            id: true,
            hashtagName: true,
            pictures: true,
          },
          take: 4,
        });
      }
      return await client.hashtag.findMany({
        where: {
          hashtagName: {
            contains: keyword,
          },
        },
        select: {
          id: true,
          hashtagName: true,
          pictures: true,
        },
        take: 4,
      });
    },
    searchPicture: async (_, { keyword }) => {
      if (!keyword) {
        return await client.picture.findFirst({
          orderBy: {
            createdAt: true,
          },
          select: {
            id: true,
            name: true,
            file: true,
          },
          take: 4,
        });
      }
      return await client.picture.findMany({
        where: {
          name: {
            startsWith: keyword,
          },
        },
        select: {
          id: true,
          name: true,
          file: true,
        },
        take: 4,
      });
    },
  },
};
