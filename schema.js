import {
  loadFilesSync,
  makeExecutableSchema,
  mergeResolvers,
  mergeTypeDefs,
} from 'graphql-tools';

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
// pattern language임. ** 모든 폴더 안 * 모든 파일 이든 typeDef.js로 끝나는 애들
// loadFilesSync 는 export default 밖에 못불러옴. 그래서 movies.mutations 랑 movies.queries, movies.typeDefs 는 export default 로 해줘야 함.
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
