import AWS from 'aws-sdk';

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadPhoto = async (file, userId) => {
  // 두번째 인자 userId는 파일명 만들기 용
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3() // upload() 이 함수가 리턴하는 녀석을 보고 싶다면 console.log() 해보면 됨. 강의 8분 12초에 나옴.
    .upload({
      // upload()에는 명시해줘야 할 게 있는데 하나는 Body임. 파일을 말함. 엄연히 말하면 스트림.
      Bucket: 'instaclone-uploads-ctw100', // aws.com 에 내가 등록한 버킷의 이름
      Key: objectName, // Key는 파일의 이름
      ACL: 'public-read', // ACL 이건 object의 프라이버시를 말함. "public-read"는 아무나 read할 수 있다는 것
      Body: readStream,
    })
    .promise();
  return Location;
};
