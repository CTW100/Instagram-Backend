import client from '../../client';

export default {
  Query: {
    seePhotoLikes: async (_, { id }) => {
      const likes = await client.like.findMany({
        where: {
          photoId: id,
        },
        select: {
          user: true,
        },
      });
      return likes.map((like) => like.user);
    },
  },
};

// include와 select 의 차이
// #6.11 에 정확히 나옴. include는 결과에 relationship을 추가해주고, select는 말그대로 받고 싶은 데이터를 선택하는 것.
