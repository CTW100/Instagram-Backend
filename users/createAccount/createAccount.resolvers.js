import bcrypt from 'bcrypt';
import client from '../../client';

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        // check if username or email are already on DB.
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error('This username/password is already taken.'); // Error 를 throw하면 거기서부터 밑의 코드는 작동안함. try { } 안에서 에러가 생기면 catch {} 로 바로 가버림
        }
        //hash password
        const uglyPassword = await bcrypt.hash(password, 10);
        // save and return the user
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
      } catch (e) {
        return e; // catch(e) 의 e가 위의 그 에러를 잡음. e = 'This username/password is already taken.'
      }
    },
  },
};
