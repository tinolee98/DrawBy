import client from "../../client";

export default {
  Query: {
    seeContestRank: async (_, { hashtagName }) => {
      const contestPicture = await client.picture.findMany({
        where: {
          hashtags: {
            some: {
              hashtagName,
            },
          },
        },
        select: {
          id: true,
        },
      });
      const IdList = contestPicture.map((picture) => picture.id);
      const countLikePic = await client.likePic.groupBy({
        where: {
          pictureId: {
            in: IdList,
          },
        },
        by: ["pictureId"],
        _count: {
          pictureId: true,
        },
        orderBy: {
          _count: {
            pictureId: "desc",
          },
        },
        take: 10,
      });
      const contestRankedPictureId = countLikePic.map((lst) => lst.pictureId);
      let contestRankedPictures = [];
      let tempPictureInfo;
      for (let i = 0; i < 10; i++) {
        if (contestRankedPictureId[i] === undefined) {
          break;
        }
        tempPictureInfo = await client.picture.findUnique({
          where: {
            id: contestRankedPictureId[i],
          },
          select: {
            id: true,
            file: true,
            name: true,
            hashtags: true,
          },
        });
        tempPictureInfo.rank = i + 1;
        contestRankedPictures.push(tempPictureInfo);
      }
      return contestRankedPictures;
    },
  },
};
