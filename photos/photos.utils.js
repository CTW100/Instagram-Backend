export const processHashtags = (caption) => {
  const hashtags = caption.match(/#[\w]+/g) || []; // 만약 내가 업로드하려는 caption 에 해시태그(# ~~)가 없다면 caption.match(/#[\w]+/g) 부분이 null이 됨. 그럼 null인 값으로 밑의 코드에서 map을 돌릴 수 없으므로 error가 뜨게 됨. 그래서 caption.match(/#[\w]+/g) 부분이 null이면 빈 배열을 할당하도록 해준 것.
  return hashtags.map((hashtag) => ({
    where: { hashtag },
    create: { hashtag },
  }));
};
