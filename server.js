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
import pubsub from './pubsub';

const PORT = process.env.PORT;

const startServer = async () => {
  const app = express();
  app.use(logger('tiny'));
  app.use(graphqlUploadExpress());
  app.use('/static', express.static('uploads'));
  const httpServer = createServer(app);
  const subscriptionServer = SubscriptionServer.create(
    { typeDefs, resolvers, execute, subscribe },
    { server: httpServer, path: '/graphql' }
  );

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        protectResolver,
      };
    },
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      {
        async serverWillStart() {
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

  app.listen({ port: PORT }, () =>
    console.log(`Server is running on http://localhost:${PORT}/graphql`)
  );
};

startServer();
