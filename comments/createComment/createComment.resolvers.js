import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createComment: protectedResolver(
      async (_, { payload, pictureId, commentId }, { loggedInUser }) => {
        const pictureExist = await client.picture.findUnique({
          where: {
            id: pictureId,
          },
        });
        if (!pictureExist) {
          return { ok: false, error: "Picture not found." };
        }
        let newComment = null;
        const userAndPicture = {
          payload,
          user: {
            connect: {
              id: `${loggedInUser.id}`,
            },
          },
          picture: {
            connect: {
              id: pictureId,
            },
          },
        };
        if (commentId) {
          // nested
          const commentExist = await client.comment.findUnique({
            where: { id: commentId },
          });
          if (!commentExist) {
            return { ok: false, error: "Comment not found." };
          }
          newComment = await client.nestedComment.create({
            data: {
              payload,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              picture: {
                connect: {
                  id: pictureId,
                },
              },
              comment: {
                connect: {
                  id: commentId,
                },
              },
            },
          });
        } else {
          newComment = await client.comment.create({
            data: {
              payload,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              picture: {
                connect: {
                  id: pictureId,
                },
              },
            },
          });
        }

        if (!newComment) {
          return { ok: false, error: "Fail to reply." };
        }
        return { ok: true };
      }
    ),
  },
};
