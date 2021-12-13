import { gql } from "apollo-server-express";
import client from "../client";

export default {
  Hashtag: {
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      const isFollow = await client.hashtag.findFirst({
        where: {
          id,
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      });
      if (isFollow) {
        return true;
      }
      return false;
    },
  },
};
