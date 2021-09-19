import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editPicture: protectedResolver(
      async (_, { id, name, caption }, { loggedInUser }) => {
        const isMine = await client.picture.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
        });
        if (!isMine) {
          return { ok: false, error: "No authority." };
        }
        const edit = await client.picture.update({
          where: {
            id,
          },
          data: {
            name,
            caption,
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
