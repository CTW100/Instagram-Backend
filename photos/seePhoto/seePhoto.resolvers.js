import client from '../../client';

export default {
  Query: {
    seePhoto: (_, { id }) => {
      // 인자는 사진의 id 말하는 것임
      client.photo.findUnique({
        where: {
          id: id,
        },
      });
    },
  },
};
