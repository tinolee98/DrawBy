import client from "../client";

export default {
  Query: {
    search: async (_, { keyword }) => {
      console.log(/keyword[a-zA-Z0-9ㄱ-힇]+/g);
      // keyword로 시작하는 모든 유저, 해시태그, 장르의 목록을 얻어야함.
      return await client.user.findMany({
        where: {
          username: keyword,
        },
      });
    },
  },
};
