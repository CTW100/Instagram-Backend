import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        if (caption) {
          const hashtags = caption.match(/#[\w]+/g);
        }
        client.photo.create({
          data: {
            file,
            caption,
            hashtags: {
              connectOrCreate: [
                {
                  where: {
                    hashtag: '#food', // 찾아보고
                  },
                  create: {
                    hashtag: '#food', // 없으면 생성함
                  },
                },
              ],
            },
          },
        });
      }
    ),
  },
};
