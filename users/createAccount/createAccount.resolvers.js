import { exists } from "fs";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      root,
      { username, password, email, phoneNumber, avatar, bio }
    ) => {
      const existed = await client.user.findUnique({
        where: {
          username,
        },
        select: {
          username: true,
        },
      });
      if (existed) {
        return {
          ok: false,
          error: "username is already existed",
        };
      }
      await client.user.create({
        data: {
          username,
          password,
          email,
          phoneNumber,
          avatar,
          bio,
        },
      });
      return {
        ok: true,
      };
    },
  },
};
