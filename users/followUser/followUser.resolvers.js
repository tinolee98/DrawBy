import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      const isExisted = await client.user.findFirst({
        where: {
          username,
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
              username,
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
    unfollowUser: protectedResolver(
      async (_, { username }, { loggedInUser }) => {
        const isExisted = client.user.findFirst({
          where: {
            username,
          },
        });
        if (!isExisted) {
          return {
            ok: false,
            error: "User not found.",
          };
        }
        const unfollow = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: { following: { disconnect: { username } } },
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
      }
    ),
  },
};
