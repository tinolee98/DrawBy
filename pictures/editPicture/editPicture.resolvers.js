import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editPicture: protectedResolver(
      async (_, { id, name, caption }, { loggedInUser }) => {
        const oldPicture = await client.picture.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            hashtags: true,
          },
        });
        if (!oldPicture) {
          return { ok: false, error: "No authority." };
        }
        const edit = await client.picture.update({
          where: {
            id,
          },
          data: {
            name,
            caption,
            hashtags: {
              disconnect: oldPicture.hashtags,
              connectOrCreate: processHashtags(caption),
            },
            //hashtag, genre 추가 필요
          },
        });
        if (!edit) {
          return { ok: false, error: "Fail to edit." };
        }
        return { ok: true };
      }
    ),
  },
};
