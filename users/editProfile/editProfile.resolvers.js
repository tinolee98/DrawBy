import { protectedResolver } from "../users.utils";
import * as bcrypt from "bcrypt";
import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { GraphQLUpload } from "graphql-upload";

export default {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { username, password, avatar, bio, phoneNumber },
        { loggedInUser }
      ) => {
        let avatarUrl = null;
        if (avatar) {
          avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatar");
        }
        let newPassword = null;
        if (password) {
          newPassword = await bcrypt.hash(password, 10);
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            username,
            ...(password && { password: newPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
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
