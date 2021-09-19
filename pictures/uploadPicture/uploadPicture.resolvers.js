import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPicture: protectedResolver(
      async (_, { file, name, caption }, { loggedInUser }) => {
        const upload = await client.picture.create({
          data: {
            id,
            userId: loggedInUser.id,
            file,
            name,
            caption,
          },
        });
        if (!upload) {
          return {
            ok: false,
            error: "Fail to upload.",
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
};