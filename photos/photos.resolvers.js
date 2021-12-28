import client from '../client';

export default {
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }), // root(= parent)를 보면 userId 필드가 있음. 강의 4분대에 나옴.
    hashtags: ({ id }) =>
      client.hashtag.findMany({
        // 해시태그를 찾을 것임. 어떤 해시태그냐면 우리가 찾은 사진의 id를 갖고 있는 해시태그(이 말은 #6.4 6분 29초 부분 보면서 읽으면 이해하기 쉬울 듯.). photos 해시태그들 내에서 찾는 것임.
        where: {
          photos: {
            some: { id },
          },
        },
      }),
  },
};
