import { gql } from 'apollo-server';

export default gql`
  type Query {
    seePhotoLikes(id: Int!): [User]
  }
`;
// photo를 좋아요 누른 user들을 보여주는 것
