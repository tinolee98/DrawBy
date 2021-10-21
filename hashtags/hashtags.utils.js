export const processHashtags = (caption) => {
  const hashtags = caption.match(/#[\w]+/g) || [];
  return hashtags.map((hashtag) => ({
    where: { hashtag: `${hashtag}` },
    create: { hashtag: `${hashtag}` },
  }));
};
