export const processHashtags = (caption) => {
  const hashtags = caption.match(/#[0-9a-zA-Z가-힣_]+/g) || [];
  return hashtags.map((hashtag) => ({
    where: { hashtagName: `${hashtag}` },
    create: { hashtagName: `${hashtag}` },
  }));
};

export const findContestHashtag = (caption) => {
  const isContest = caption.match(/#[0-9]+년_[0-9]+월_[0-5]+주차/);
  if (isContest) {
    return true;
  }
  return false;
};
