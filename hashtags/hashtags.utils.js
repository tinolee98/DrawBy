export const processHashtags = (caption) => {
  const hashtags = caption.match(/#[0-9a-zA-Z가-힣]+/g) || [];
  return hashtags.map((hashtag) => ({
    where: { hashtagName: `${hashtag}` },
    create: { hashtagName: `${hashtag}` },
  }));
};
