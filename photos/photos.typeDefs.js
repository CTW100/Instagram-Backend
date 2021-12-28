import { gql } from 'apollo-server';

// shcema.prisma 모델참고해서 작성했음.
// userId는 DB쪽에서만 필요한 것이라 추가 안해도 됨.

export default gql`
  type Photo {
    id: Int!
    user: User!
    file: String!
    caption: String
    hashtags: [Hashtag]
    createdAt: String!
    updatedAt: String!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    photos: [Photo]
    createdAt: String!
    updatedAt: String!
  }
`;
