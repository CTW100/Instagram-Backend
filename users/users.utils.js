import jwt from 'jsonwebtoken';
import client from '../client';

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY); // jwt.verify --> user가 준 token과 CEXRET_KEY를 이용해서 decoded(해독된) token을 리턴해줌. 그 결과 user에게 token을 줬던 당시 payload에 넣어뒀던 정보가 리턴되는데 {id:1, iat: 163045} 이런 식임. 참고) iat은 issue가 된 시점임.
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectResolver = (user) => {
  if (!user) {
    throw new Error('You need to login.');
  }
};
