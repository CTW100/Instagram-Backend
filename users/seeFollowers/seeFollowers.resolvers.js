import client from '../../client';

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          // 참고 prisma.io/docs/concepts/components/prisma-client/relation-queries#fluent-api
          take: 5,
          skip: (page - 1) * 5,
        });
      return {
        ok: true,
        followers,
      };
    },
  },
};
