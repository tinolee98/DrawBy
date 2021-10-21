import client from "../../client";
import { processHashtags } from "../../hashtags/hashtags.utils";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPicture: protectedResolver(
      async (_, { file, name, caption }, { loggedInUser }) => {
        const fileUrl = await uploadToS3(file, loggedInUser.id, "pictures");

        const upload = await client.picture.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            file: fileUrl,
            name,
            caption,
            hashtags: {
              connectOrCreate: processHashtags(caption),
            },
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
