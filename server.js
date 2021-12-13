// prisma client를 import해서 새로운 client를 생성할 것임. client는 prisma를 dev로 migrate할 때 prisma가 자동생성해서 node_modules에 넣어놓음
import { Prisma, PrismaClient } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server';

const client = new PrismaClient();

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }

  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(id: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_, { id }) => ({ title: 'Hello', year: 2021 }),
  },
  Mutation: {
    createMovie: (_, { title, year, genre }) =>
      client.movie.create({
        data: {
          title,
          yearm,
          genre,
        },
      }),
    deleteMovie: (_, { title }) => {
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(() => console.log('Server is running on http://localhost:4000/'));
