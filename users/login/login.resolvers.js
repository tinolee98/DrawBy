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
