import { introspectionFromSchema } from "graphql";
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
    totalLike: async ({ id }) => {
      return await client.likePic.count({
        where: { pictureId: id },
      });
    },
  },
};
