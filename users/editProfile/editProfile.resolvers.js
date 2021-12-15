import bcrypt from 'bcrypt';
import client from '../../client';

export default {
  Mutation: {
    editProfile: (
      _,
      { firstName, lastName, username, email, password: newPassword } // 이 resolver에서만 password를 newPassword라는 이름으로 이용할 것
    ) => {
      let uglyPassword = null;
      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }
      const updatedUser = await client.user.update({
        where: {
          id: 1,
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
