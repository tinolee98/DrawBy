import client from "../client";

export default {
  User: {
    isMe: ({ id }, _, { loggedInUser }) => {
      if (id == loggedInUser.id) {
        return true;
      }
      return false;
    },
    totalFollowers: async ({ id }) => {
      return await client.user.count({
        where: {
          follower: {
            some: {
              id,
            },
          },
        },
      });
    },
    totalFollowings: async ({ id }) => {
      return await client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      });
    },
  },
};
