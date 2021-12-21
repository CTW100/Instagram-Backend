import client from '../../client';

export default {
  Query: {
    seeProfile: (_, { username }) =>
      client.user.findUnique({
        where: {
          username,
        },
        include: {
          following: true, // include는 너가 원하는 사용자 관계를 갖고 올 수 있게 해 줌. 즉 이것은 prisma한테 내가 팔로잉 중인 사용자들만 include하라고 구체적으로 얘기하는 것. // following은 우리가 prisma client를 다시 만들었기 때문에 여기 생긴 것임. schema 직접 수정하고 client를 다시 실행해야 한다는 말임.
          followers: true,
        },
      }),
  },
};
