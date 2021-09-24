import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editComment: protectedResolver(
      async (_, { id, payload }, { loggedInUser }) => {
        const comment = await client.comment.findUnique({
          where: {
            id,
          },
        });
        if (!comment) {
          return { ok: false, error: "Comment not found." };
        }
        if (comment.userId != loggedInUser.id) {
          return { ok: false, error: "No authority to edit." };
        }
        const updateComment = await client.comment.update({
          where: { id },
          data: { payload },
        });
        if (!updateComment) {
          return { ok: false, error: "Fail to update." };
        }
        return { ok: true };
      }
    ),
    editNestedComment: protectedResolver(
      async (_, { id, payload }, { loggedInUser }) => {
        const comment = await client.nestedComment.findUnique({
          where: {
            id,
          },
        });
        if (!comment) {
          return { ok: false, error: "Nested comment not found." };
        }
        if (comment.userId != loggedInUser.id) {
          return { ok: false, error: "No authority to edit." };
        }
        const updateComment = await client.nestedComment.update({
          where: { id },
          data: { payload },
        });
        if (!updateComment) {
          return { ok: false, error: "Fail to update." };
        }
        return { ok: true };
      }
    ),
  },
};
