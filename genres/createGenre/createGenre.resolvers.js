import client from "../../client";

export default {
  Mutation: {
    createGenre: async (_, { genreName }) => {
      const newGenre = await client.genre.create({
        data: {
          genreName,
        },
      });
      if (!newGenre) {
        return { ok: false, error: "Fail to create a genre." };
      }
      return { ok: true };
    },
  },
};
