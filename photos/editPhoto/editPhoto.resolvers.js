import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { loggedInUser }) => {
        const ok = await client.photo.findFirst({
          where: {
            id,
            userId: loggedInUser.id, // userId 는 loggedInUser의 id와 일치하는 사진 찾는 것임
          },
        });
        if (!ok) {
          return {
            ok: false,
            error: 'Photo not found.',
          };
        }
        const photo = await client.photo.update({
          where: {
            id,
          },
          data: {
            caption: caption,
          },
        });
        console.log(photo);
      }
    ),
  },
};
