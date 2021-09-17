import { protectedResolver } from "../users.utils";
import * as bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { id, username, password, avatar, bio, phoneNumber },
        { loggedInUser }
      ) => {
        if (id != loggedInUser.id) {
          return {
            ok: false,
            error: "No authority to edit.",
          };
        }
        let newPassword = null;
        if (password) {
          newPassword = await bcrypt.hash(password, 10);
        }
        await client.user.update({
          where: {
            id,
          },
          data: {
            username,
            ...(password && { password: newPassword }),
            //avatar는 추후 aws ec2 사용하게 되면 변경해야함!
            avatar,
            bio,
            phoneNumber,
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
