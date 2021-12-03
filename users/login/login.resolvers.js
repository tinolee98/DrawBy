import * as bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await client.user.findFirst({
        where: {
          username,
        },
        select: {
          id: true,
          socialId: true,
          username: true,
          password: true,
        },
      });
      if (!user) {
        return {
          ok: false,
          error: "This username is not existed.",
        };
      }
      if (user.socialId) {
        return {
          ok: false,
          error: "소셜로그인을 사용중인 계정입니다.",
        };
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Password is incorrect.",
        };
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        error: "test",
        token,
      };
    },
  },
};
