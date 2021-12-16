require('dotenv').config(); // dotenv를 불러들이면서 곧바로 dotenv의 config 메서드를 실행시킴  =  import dotenv from 'dotenv' and dotenv.config(). process.env 로 환경변수에 접근 가능

import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './schema';
import { getUser, protectResolver } from './users/users.utils';

const PORT = process.env.PORT;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // context는 함수가 될 수 있고, request와 response를 가질 수 있음
    return {
      loggedInUser: await getUser(req.headers.token),
      protectResolver, // 모든 resolver의 context에서 사용할 수 있도록 context에 등록
    };
  },
});
// 원래
// const server = new ApolloServer({
//   typeDefs: typeDefs,
//   resolvers: resolvers
// })
// 임.

server
  .listen(PORT)
  .then(() => console.log(`Server is running on http://localhost:${PORT}/`));
