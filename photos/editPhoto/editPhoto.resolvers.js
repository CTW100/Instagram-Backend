import client from '../../client';
import { protectedResolver } from '../../users/users.utils';
import { processHashtags } from '../photos.utils';

export default {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { loggedInUser }) => {
        const oldPhoto = await client.photo.findFirst({
          where: {
            id,
            userId: loggedInUser.id, // userId 는 loggedInUser의 id와 일치하는 사진 찾는 것임
          }, // 길어서 README.md (*) 참고
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });

        if (!oldPhoto) {
          return {
            ok: false,
            error: 'Photo not found.',
          };
        }
        await client.photo.update({
          where: {
            id,
          },
          data: {
            caption: caption,
            hashtags: {
              disconnect: oldPhoto.hashtags, // 원래 있던 hashtag들의 relation을 끊어버리고
              connectOrCreate: processHashtags(caption), // 새로 입력하는 caption에서 hashtag들을 추출해 다시 등록해버리는 것
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
