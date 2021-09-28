import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    // 입력되는 userId는 리스트 형태로 받음 -> [1,2,3,4]
    createRoom: protectedResolver(async (_, { userId }, { loggedInUser }) => {
      let userExist = null;
      for (let i = 0; i < userId.length; i++) {
        userExist = await client.user.findUnique({
          where: { id: userId[i] },
        });
        console.log(userExist);
        if (!userExist) {
          return { ok: false, error: `User ${userId[i]} is not found.` };
        }
      }
      let userIdList = userId.map((user) => ({ id: parseInt(`${user}`) }));
      userIdList = userIdList.concat({ id: parseInt(`${loggedInUser.id}`) });
      const room = await client.room.create({
        data: {
          users: {
            connect: userIdList,
          },
        },
        include: {
          users: true,
        },
      });
      if (!room) {
        return { ok: false, error: "Fail to create a room." };
      }
      return { ok: true };
    }),
  },
};
