import client from '../client';

export default {
  User: {
    totalFollowing: (
      { id } // root가 request된 user임. 그 user의 id만 뽑겠다는 것
    ) =>
      client.user.count({
        // 내가 팔로잉 하면 그 사람의 팔로워 목록에는 내가 있음. 팔로워 리스트에 내 id가 존재하는 사람들을 찾을 것임
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: (
      { id } // root가 request된 user임. 그 user의 id만 뽑겠다는 것
    ) =>
      client.user.count({
        // 누군가 나를 팔로잉 하면 나의 팔로워 목록에는 그 사람이 있음. 팔로잉 리스트에 내 id가 존재하는 사람들을 찾을 것임
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      // request할 때 누가 seeProfile을 요청하는지 알고 있어야 함 root context 둘 다 필요
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
  },
};
