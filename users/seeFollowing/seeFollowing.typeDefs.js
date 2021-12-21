import { gql } from 'apollo-server';

export default gql`
  type SeeFollowingResult {
    ok: Boolean!
    error: String
    follwing: [User]
  }
  type Query {
    seeFollowing(username: String!, lastId: Int): SeeFollowingResult
  }
`;
// lastId는 id가 될 것임
// lastId는 우리가 DB에 보내는 녀석임 이게 마지막 결과야 라고 말하는 것임
