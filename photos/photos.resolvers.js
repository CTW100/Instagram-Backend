import client from '../client';

export default {
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: { id },
          },
        },
      }),
  },
  Hashtag: {
    photos: ({ id }, { page }, { loggedInUser }) => {
      return client.hashtag
        .findUnique({
          where: {
            id,
          },
        })
        .photos();
    },
    totalPhotos: ({ id }) =>
      client.photo.count({
        // 인자로 전달된 id를 가진 해시태그가 hashtags 리스트에 포함 돼 있는 사진들을 모두 카운팅
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
