import { createWriteStream, write } from 'fs';
import bcrypt from 'bcrypt';
import client from '../../client';
import { protectedResolver } from '../users.utils';

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar }, // 이 resolver에서만 password를 newPassword라는 이름으로 이용할 것
  { loggedInUser, protectResolver }
) => {
  const { filename, createReadStream } = await avatar;
  const readStream = createReadStream(); // 파일을 읽고 있는 것
  const writeStream = createWriteStream(process.cwd() + '/uploads/' + filename); // 폴더에다가 stream을 씀
  readStream.pipe(writeStream); // 파이프를 연결해서, 한 스트림을 다른 스트림으로 연결시킴. 물론 aws 쓸 때는 이 코드 필요없음
  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
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
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};

//resolver에는 4개의 arguements가 있음. _, args, context, info. 그 중 context --> 모든 resolver에서 접근가능한 정보를 넣을 수 있는 object
// server를 시작하는 server.js 안에 apollo server는 context 파트를 가지고 있음. 거기서 설정하면 어느 resolver에서나 사용 가능.
