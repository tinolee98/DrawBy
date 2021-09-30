export const processHashtags = (caption) => {
  const hashtags = caption.match(/#[0-9a-zA-Z_ㄱ-힣]+/g) || [];
  return hashtags.map((hashtag) => ({
    where: { hashtag: `${hashtag}` },
    create: { hashtag: `${hashtag}` },
  }));
};
