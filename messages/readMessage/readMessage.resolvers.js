import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    readMessage: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const message = await client.message.findFirst({
        where: {
          id: id, // 내가 전달한 id를 가진 메세지여야 하고
          userId: {
            not: loggedInUser.id, // 내가 보낸 메세지는 아니어야 하고
          },
          room: {
            users: {
              some: {
                id: loggedInUser.id, // 내가 메세지가 있는 그 대화방의 참여자여야 함
              },
            },
          },
        },
        select: {
          id: true,
        },
      });
      if (!message) {
        return {
          ok: false,
          error: 'Message not found.',
        };
      }
      await client.message.update({
        where: {
          id,
        },
        data: {
          read: true,
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
