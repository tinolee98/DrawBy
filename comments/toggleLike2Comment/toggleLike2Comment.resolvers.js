import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleLike2Comment: protectedResolver(
      async (_, { id }, { loggedInUser }) => {
        const comment = await client.comment.findUnique({
          where: {
            id,
          },
        });
        if (!comment) {
          return {
            ok: false,
            error: "Comment not found.",
          };
        }
        const likeExist = await client.likeCom.findUnique({
          where: {
            userId_commentId: {
              userId: loggedInUser.id,
              commentId: id,
            },
          },
        });
        if (!likeExist) {
          await client.likeCom.create({
            data: {
              userId: loggedInUser.id,
              commentId: id,
            },
          });
        } else {
          await client.likeCom.delete({
            where: {
              userId_commentId: {
                userId: loggedInUser.id,
                commentId: id,
              },
            },
          });
        }
        return { ok: true };
      }
    ),
    toggleLike2NestedComment: protectedResolver(
      async (_, { id }, { loggedInUser }) => {
        const comment = await client.nestedComment.findUnique({
          where: {
            id,
          },
        });
        if (!comment) {
          return {
            ok: false,
            error: "Nested comment not found.",
          };
        }
        const likeExist = await client.likeNestCom.findUnique({
          where: {
            userId_nestedCommentId: {
              userId: loggedInUser.id,
              nestedCommentId: id,
            },
          },
        });
        if (!likeExist) {
          await client.likeNestCom.create({
            data: {
              userId: loggedInUser.id,
              nestedCommentId: id,
            },
          });
        } else {
          await client.likeNestCom.delete({
            where: {
              userId_nestedCommentId: {
                userId: loggedInUser.id,
                nestedCommentId: id,
              },
            },
          });
        }
        return { ok: true };
      }
    ),
  },
};
