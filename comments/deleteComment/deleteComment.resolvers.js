import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteComment: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const comment = await client.comment.findUnique({
        where: { id },
      });
      if (!comment) {
        return { ok: false, error: "Comment not found." };
      }
      if (comment.userId != loggedInUser.id) {
        return { ok: false, error: "No authority to delete." };
      }
      // cascade delete를 위해서 nested comment를 먼저 삭제
      const deleteNestedComment = await client.nestedComment.deleteMany({
        where: {
          commentId: id,
        },
      });
      if (!deleteNestedComment) {
        return { ok: false, error: "Fail to delete nested comments." };
      }
      const deleteComment = await client.comment.delete({
        where: { id },
      });
      if (!deleteComment) {
        return { ok: false, error: "Fail to delete." };
      }
      return { ok: true };
    }),
    deleteNestedComment: protectedResolver(
      async (_, { id }, { loggedInUser }) => {
        const comment = await client.nestedComment.findUnique({
          where: { id },
        });
        if (!comment) {
          return { ok: false, error: "Nested Comment not found." };
        }
        if (comment.userId != loggedInUser.id) {
          return { ok: false, error: "No authority to delete." };
        }
        const deleteComment = await client.nestedComment.delete({
          where: { id },
        });
        if (!deleteComment) {
          return { ok: false, error: "Fail to delete." };
        }
        return { ok: true };
      }
    ),
  },
};
