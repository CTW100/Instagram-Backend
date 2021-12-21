import client from '../../client';
import { protectedResolver } from '../users.utils';

export default {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }, { loggedInUser }) => {
        const ok = await client.user.findUnique({
          where: { username: username },
        });
        if (!ok) {
          return {
            ok: false,
            error: 'Cant unfollow user.',
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              disconnect: {
                username, // 저 위에 인자로 받은 username 말하는 것임
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
