import client from '../../client';
import { protectedResolver } from '../../users/users.utils';
export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = [];
        if (caption) {
          const hashtags = caption.match(/#[\w]+/g);
          hashtagObj = hashtags.map((hashtag) => ({
            where: { hashtag },
            create: { hashtag },
          }));
        }
        return client.photo.create({
          // uploadPhoto의 리턴은 Photo 이기 때문에 return 하는 것
          data: {
            file,
            caption,
            user: {
              // photo는 그것을 올린 유저, 즉 주인이 있을 것임.
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });
      }
    ),
  },
};
