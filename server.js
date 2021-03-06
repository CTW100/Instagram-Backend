require('dotenv').config();

import express from 'express';
import logger from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { graphqlUploadExpress } from 'graphql-upload';
import { typeDefs, resolvers } from './schema';
import { getUser, protectResolver } from './users/users.utils';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';

const PORT = process.env.PORT;

const startServer = async () => {
  const app = express();
  app.use(logger('tiny'));
  app.use(graphqlUploadExpress());
  app.use('/static', express.static('uploads'));
  const httpServer = createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      async onConnect(connectionParams, webSocket, context) {
        const { token } = connectionParams;
        if (!token) {
          throw new Error('You cant listen.');
        }
        const loggedInUser = await getUser(token);
        return { loggedInUser };
      },
    },
    { server: httpServer, path: '/graphql' }
  );

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (ctx) => {
      if (ctx.req) {
        return {
          loggedInUser: await getUser(ctx.req.headers.token),
        };
      } else {
        const {
          connection: { context },
        } = ctx;
        return {
          loggedInUser: context.loggedInUser,
        };
      }
    },
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      {
        async serverWillStart() {
          // apollo.installSubscriptionHandlers(httpServer) : subscription에 대한 정보를, 다시 말해 웹소켓에 대한 정보를 우리 서버에 설치하는 것임. 이건 버전상 지원안되서 다른 걸로 대체한 코드가 이것임.
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await apollo.start();
  apollo.applyMiddleware({ app });

  httpServer.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}/graphql`)
  );
};

startServer();

// 이제 우리의 subscription인 resolvers는 websocket의 세상에서 loggedInUser에 접근할 수 있음.

// 기억해야 함. ctx는 HTTP context가 될 수도 있고 websocket context가 될 수도 있음.
