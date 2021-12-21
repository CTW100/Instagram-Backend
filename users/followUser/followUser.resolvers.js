import client from '../../client';
import { protectedResolver } from '../users.utils';

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      const ok = await client.user.findUnique({
        where: { username: username },
      });
      if (!ok) {
        return {
          ok: false,
          error: 'That user does not exist.',
        };
      }
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          following: {
            connect: {
              // 다른 user를 connect 해주는 역할.
              username, //  Prisma가 connect할 user를 검색할 수 있도록 해줌.
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
