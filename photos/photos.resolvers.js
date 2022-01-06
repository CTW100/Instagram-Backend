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
    likes: ({ id }) => client.like.count({ where: { photoId: id } }), // 그니까 내가 찾은 사진의 id를 가지고 like 모델에 저장된 사진들을 탐색해서 해당하는 사진을 골라내고 그 사진의 like필드의 총 개수를 구한다 이말
    comments: ({ id }) => client.comment.count({ where: { photoId } }),
    isMine: ({ userId }, _, { loggedInUser }) => {
      // root는 우리가 갖고 있는 photo이므로 prisma를 보면 userid를 갖고 있음
      if (!loggedInUser) {
        // loggedInUser가 없을 수도 있기 때문에 검사해야됨
        return false;
      }
      return userId === loggedInUser.id;
    },
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
