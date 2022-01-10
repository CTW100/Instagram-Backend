import { withFilter } from 'apollo-server';
import client from '../../client';
import { NEW_MESSAGE } from '../../constants';
import pubsub from '../../pubsub';

export default {
  Subscription: {
    roomUpdates: {
      subscribe: async (root, args, context, info) => {
        // server.js에서 보낸  context를 그대로 받고 있음
        const room = await client.room.findFirst({
          where: {
            id: args.id,
            users: {
              some: {
                id: context.loggedInUser.id,
              },
            },
          },
          select: {
            id: true,
          },
        });
        if (!room) {
          throw new Error('You shall not see this.');
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          async ({ roomUpdates }, { id }, { loggedInUser }) => {
            // payload(첫번째 인자)는 sendMessage resolver에서 우리가 넣는 roomUpdates: { ...message }를 말하고, variables는 우리가 roomUpdate resolver에 인자로 넣는 roomId를 말함
            // 정확한 메커니즘은 강의 보기!!!!!!!
            if (roomUpdates.roomId === id) {
              const room = await client.room.findFirst({
                where: {
                  id,
                  users: {
                    some: {
                      id: loggedInUser.id,
                    },
                  },
                },
                select: {
                  id: true,
                },
              });
              if (!room) {
                return false;
              }
              return true;
            }
          }
        )(root, args, context, info); // 위에 context 가 다 여기로 전달되고 있음.
      },
    },
  },
};

// () => pubsub.asyncIterator(NEW_MESSAGE), // NEW_MESSAGE라는 이벤트를 리스닝 중. 그 이벤트가 생겨나는 곳은 sendMessage.resolvers.js임.

// withFilter : 기본적으로 우리가 어떻게 event들을 필터하는지에 대한 것. withFilter는 2개의 arguments를 받는데 하나는 iterator. 두번째 argument는 function. 이 function은 Boolean을 return 하게 되는 function인데, true를 return하면 user는 그 업데이트(NEW_MESSAGE)를 받게 됨.

// cf) iterator
// 반복자(iterator)는 객체 지향적 프로그래밍에서 배열이나 그와 유사한 자료 구조의 내부의 요소를 순회(traversing)하는 객체이다. Iterator는 자바의 컬렉션 프레임워크에서 컬렉션에 저장되어 있는 요소들을 읽어오는 방법을 표준화한 것이다 .....so on...
