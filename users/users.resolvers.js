import client from "../client";

export default {
  User: {
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      if (id == loggedInUser.id) {
        return true;
      }
      return false;
    },
    totalFollowings: ({ id }) => {
      return client.user.count({
        where: {
          follower: {
            some: {
              id,
            },
          },
        },
      });
    },
    totalFollowers: ({ id }) => {
      return client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      });
    },
    like2Pic: async ({ id }) => {
      const pictures = await client.likePic.findMany({
        where: {
          userId: id,
        },
        select: {
          picture: true,
        },
      });
      return pictures.map((picture) => picture.picture);
    },
    followers: ({ id }) => {
      return client.user.findMany({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      });
    },
    followings: ({ id }) => {
      return client.user.findMany({
        where: {
          follower: {
            some: {
              id,
            },
          },
        },
      });
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const follow = await client.user.findFirst({
        where: {
          id,
          follower: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      });
      if (follow) {
        return true;
      }
      return false;
    },
    pictures: async ({ id }) =>
      client.picture.findMany({
        where: {
          userId: id,
        },
      }),
    followHashtags: async ({ id }) =>
      client.hashtag.findMany({
        where: {
          users: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
