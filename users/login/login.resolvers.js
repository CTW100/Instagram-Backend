import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../../client';

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      // find user with args.username
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          // return 값이 {ok:~, error:~}(object)인 것은 typeDefs에서 정의한 대로 반환해야되기 때문. token은 필수 아니고 기본값은 null
          ok: false,
          error: 'User not found.',
        };
      }
      // check password with args.password
      const passwordOk = await bcrypt.compare(password, user.password); // user.password 는 이미 db에 hashing돼서 저장된 uglyPassword임.
      if (!passwordOk) {
        return {
          ok: false,
          error: 'Incorrect password.',
        };
      }
      // issue a token and ssend it to the user
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
