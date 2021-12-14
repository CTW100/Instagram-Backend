require('dotenv').config(); // dotenv를 불러들이면서 곧바로 dotenv의 config 메서드를 실행시킴  =  import dotenv from 'dotenv' and dotenv.config(). process.env 로 환경변수에 접근 가능

import { ApolloServer } from 'apollo-server';
import schema from './schema';

const POST = process.env.PORT;

const server = new ApolloServer({
  schema,
});
// 원래
// const server = new ApolloServer({
//   typeDefs: typeDefs,
//   resolvers: resolvers
// })
// 임.

server
  .listen(PORT)
  .then(() => console.log('Server is running on http://localhost:${PORT}/'));
