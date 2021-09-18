import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { id }) => {
      return await client.user.findMany({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      });
    },
    seeFollowings: async (_, { id }) => {
      return await client.user.findMany({
        where: {
          follower: {
            some: {
              id,
            },
          },
        },
      });
    },
  },
};
