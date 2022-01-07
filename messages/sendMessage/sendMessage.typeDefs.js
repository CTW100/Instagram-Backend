import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    sendMessage(payload: String!, roomId: Int, userId: Int): MutationResponse!
  }
`;

// room이 이미 있다면 payload를 room으로, 그게 아니라 방도 아직 없고 처음 메세지 보내는 거면 user쪽으로 payload를 보내려고 이렇게 인자를 받음. 그래서 ! (required)로 안함. 둘 중 하나로 갈 테니
