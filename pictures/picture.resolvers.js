import client from "../client";

export default {
  Picture: {
    whoLikes: async ({ id }) => {
      const users = await client.likePic.findMany({
        where: {
          pictureId: id,
        },
        select: {
          user: true,
        },
      });
      return users.map((user) => user.user);
    },
    author: async ({ id }) => {
      const author = await client.picture.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
        },
      });
      return await client.user.findUnique({
        where: { id: author.userId },
      });
    },
    comments: async ({ id }) => {
      return client.picture.findUnique({ where: { id } }).comments();
    },
    totalComment: async ({ id }) => {
      return await client.comment.count({
        where: {
          pictureId: id,
        },
      });
    },
    totalLike: async ({ id }) => {
      return await client.likePic.count({
        where: { pictureId: id },
      });
    },
    isMine: async ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        console.log("loggedInUser fail");
        return false;
      }
      const like = await client.likePic.findUnique({
        where: {
          userId_pictureId: {
            pictureId: id,
            userId: loggedInUser.id,
          },
        },
      });
      //console.log(like);
      if (like) {
        return true;
      }
      return false;
    },
    hashtags: async ({ id }) =>
      client.hashtag.findMany({
        where: {
          pictures: {
            some: {
              id,
            },
          },
        },
      }),
    isBookmarked: async ({ id }, _, { loggedInUser }) => {
      const bookmark = await client.bookmark.findUnique({
        where: {
          userId_pictureId: {
            userId: loggedInUser.id,
            pictureId: id,
          },
        },
      });
      if (bookmark) {
        return true;
      }
      return false;
    },
  },
};
