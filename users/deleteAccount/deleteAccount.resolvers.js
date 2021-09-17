import client from "../../client";
import { protectedResolver } from "../users.utils";
import * as bcrypt from "bcrypt";

export default {
  Mutation: {
    deleteAccount: protectedResolver(
      async (_, { id, password }, { loggedInUser }) => {
        if (loggedInUser.id == id) {
          const passwordOk = await bcrypt.compare(
            password,
            loggedInUser.password
          );
          if (passwordOk) {
            await client.user.delete({
              where: {
                id,
              },
            });
            return {
              ok: true,
            };
          }
          return {
            ok: false,
            error: "Incorrect password.",
          };
        }
        return {
          ok: false,
          error: "No authority to delete.",
        };
      }
    ),
  },
};
