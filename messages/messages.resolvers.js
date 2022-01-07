import client from '../client';

export default {
  Room: {
    users: ({ id }) => client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }) =>
      client.message.findMany({
        where: {
          roomId: id,
        },
      }),
    unreadTotal: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      return client.message.count({
        where: {
          read: false, // read: false 인 녀석이여야 하고
          roomId: id, // 대화방 안에 있는 메세지여야 하고
          user: {
            id: {
              not: loggedInUser.id, // 내가 보낸 게 아니어야 함
            },
          },
        },
      });
    },
  },
  Message: {
    user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
  },
};
