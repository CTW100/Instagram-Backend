import client from '../../client';

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true }, // 특정 field를 선택할 수 있음. 존재하는지 유무만 보기 위한 코드인데 쓸데없는 field들까지 다 불러오게 되기 때문에 넣는 것임.
      });
      if (!ok) {
        return {
          ok: false,
          error: 'User not found.',
        };
      }
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return {
        ok: true,
        following: following,
      };
    },
  },
};
