import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../../client';

export default {
  Mutation: {
    editProfile: (
      _,
      { firstName, lastName, username, email, password: newPassword, token } // 이 resolver에서만 password를 newPassword라는 이름으로 이용할 것
    ) => {
      const { id } = await jwt.verify(token, process.env.SECRET_KEY); // jwt.verify --> user가 준 token과 CEXRET_KEY를 이용해서 decoded(해독된) token을 리턴해줌. 그 결과 user에게 token을 줬던 당시 payload에 넣어뒀던 정보가 리턴되는데 {id:1, iat: 163045} 이런 식임. 참고) iat은 issue가 된 시점임.
      let uglyPassword = null;
      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }
      const updatedUser = await client.user.update({
        where: {
          id,
        },
        data: {
          firstName,
          lastName,
          username,
          email,
          ...(uglyPassword && { password: uglyPassword }), // field 를 조건을 이용해 추가하는 es6 문법. uglyPassword가 참일 경우에만 password: uglyPassword 오브젝트를 보냄.
        },
      });
      if (updatedUser.id) {
        // update했다는 것. 그러면 updatedUser도 있을 것이고 그 유저의 id도 있을 것임
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: 'Could not update profile.',
        };
      }
    },
  },
};
