require('dotenv').config(); // dotenv를 불러들이면서 곧바로 dotenv의 config 메서드를 실행시킴  =  import dotenv from 'dotenv' and dotenv.config(). process.env 로 환경변수에 접근 가능

import express from 'express';
import logger from 'morgan';
import { ApolloServer } from 'apollo-server-express';
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

const app = express();
app.use(logger('tiny'));

server.applyMiddleware({ app });
app.listen({ port: PORT }, () =>
  console.log(`Server is running on http://localhost:${PORT}/`)
);

// apollo server에 app server를 주는 것임. Apollo Server한테 '이제 너 우리 express server랑 함께 작동해'라고 말하는 것.
