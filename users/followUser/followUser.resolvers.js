import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const isExisted = await client.user.findUnique({
        where: {
          id,
        },
      });
      if (!isExisted) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      const follow = await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          following: {
            connect: {
              id,
            },
          },
        },
      });
      if (!follow) {
        return {
          ok: false,
          error: "Fail to follow.",
        };
      }
      return {
        ok: true,
      };
    }),
    unfollowUser: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const isExisted = client.user.findUnique({
        where: {
          id,
        },
      });
      if (!isExisted) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      const unfollow = client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: { following: { disconnect: { id } } },
      });
      if (!unfollow) {
        return {
          ok: false,
          error: "Fail to unfollow.",
        };
      }
      return {
        ok: true,
      };
    }),
  },
};
