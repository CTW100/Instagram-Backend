import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    sendMessage: protectedResolver(
      async (_, { payload, roomId, userId }, { loggedInUser }) => {
        let room = null;
        if (userId) {
          // 채팅방은 없고, 디엠을 보내려는 상대방 id가 있음
          const user = await client.user.findUnique({
            where: {
              id: userId,
            },
            select: {
              id: true,
            },
          });
          if (!user) {
            return {
              ok: false,
              error: 'This user does not exist.',
            };
          }
          room = await client.room.create({
            data: {
              user: {
                connect: [
                  {
                    id: userId, // 내가 디엠 보내려는 상대방을 채팅방에 커넥트함
                  },
                  {
                    id: loggedInUser.id, // 나를 채팅방에 커넥트함
                  },
                ],
              },
            },
          });
        } else if (roomId) {
          // 채팅방은 이미 존재
          room = await client.room.findUnique({
            where: {
              id: roomId,
            },
            select: {
              id: true,
            },
          });
          if (!room) {
            return {
              ok: false,
              error: 'Room not found.',
            };
          }
        }
        await client.message.create({
          data: {
            payload,
            room: {
              connect: {
                id: room.id,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
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
