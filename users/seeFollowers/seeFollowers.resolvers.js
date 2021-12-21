import client from '../../client';

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
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
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          // 참고 prisma.io/docs/concepts/components/prisma-client/relation-queries#fluent-api
          take: 5,
          skip: (page - 1) * 5,
        });
      const totalFollowers = await client.user.count({
        // length 뭐 이런거 할 필요 없음. count가 자동으로 수를 세서 숫자를 반환함
        where: { following: { some: { username } } },
      });
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
};
