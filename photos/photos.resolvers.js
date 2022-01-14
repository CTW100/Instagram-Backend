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
    isLiked: async ({ id }, _, { loggedInUser }) => {
      // photo로부터 id를 얻고, logged in된 유저의 id를 얻음
      if (!loggedInUser) {
        // loggedInUser가 없으면(로그인이 안되있으면) 좋아요를 누를 수 없음
        return false;
      }
      // 이제 해당 유저가 사진에 좋아요를 누른 그 좋아요를 찾을 것임
      const ok = await client.like.findUnique({
        where: {
          photoId_userId: {
            photoId: id,
            userId: loggedInUser.id,
          },
        },
        select: {
          id: true, // 우리는 그 like가 존재하는지만 확인
        },
      });
      if (ok) {
        return true;
      }
      return false;
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
