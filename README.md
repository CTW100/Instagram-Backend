# To Do List

- [x] See Profile
- [x] Login
- [x] Edit Profile
- [x] Change Avatar (Image Upload)
- [x] Follow User
- [x] Unfollow User
- [x] See Followers w/ Pagination
- [x] See Following w/ Pagination
- [x] Computed Fields
- [x] Search Users

## Photos

- [x] Upload Photo
- [x] See Photo
- [x] See Hashtag
- [x] Search Photos
- [ ] Edit Photo
- [ ] Like / Unlike Photo
- [ ] See Photo Likes
- [ ] See Feed

## Comments

- [ ] Comment on Photo
- [ ] Edit Comment
- [ ] Delete Comment

# 3.0

    1. 인스타 폴더 이동
    2. git init(git 저장소 initialize)
    3. git remote add origin 'github repository url 주소' #북마크1
    4. cd instaclone
    5. npm init -y(-y는 붙이면 알아서 project name이나 github 주소가 자동으로 설정되는 듯)
    6. package.json이 만들어짐 --> code .
    7. git add . #북마크2
    8. git commit -m(message 의 약자) '~~~~'
    9. git push origin master #북마크3

# 3.1

npm install apollo-server@2.25.2 graphql@15.4.0 (Apollo server랑 graphql 설치) #북마크4 (해당 강의 모든 내용 다 들어가있음)

# 3.2

Q
혹시 babel 설치 후에도 import 구문에 오류 있으신 분 있으신가요..? 저는 babel을 설치해도 계속 type:module을 추가하라고 뜨네요.. 이거 때문에 뒷 강좌에서 자꾸 오류가 발생하네요 ㅠㅠㅠ 며칠째 해결을 못하고 있습니다 ㅠㅠ
A
계속 검색해보다가 드디어 해결했네요.
혹시 아직 해결 못하셨으면
package.json에서
"dev": "nodemon --exec ./node_modules/.bin/babel-node server.js"
로 수정해보세요. 저는 이 방법으로 해결했습니다.
보통 "은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
배치 파일이 아닙니다." 문제는 시스템 환경변수 문제라고 하네요 제대로 된 경로를 못찾아가서 일어나는 문제인 것 같습니다 그래서 댓글 쓰신분 말씀처럼 babel-node의 직접적인 위치를 지정해주어야 하는 것 같아요

Q2
버전업떄문에 sandbox로 연결됨. 해결은??
A2
apollo 서버 버전 3으로 최근에 업데이트 되면서 localhost 에서 sandbox로 넘어가서 불편하신 분들은 다음 설정으로 변경하시면 됩니다.

npm install apollo-server-core

import { ApolloServer } from "apollo-server";
import {
ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";

const server = new ApolloServer({
typeDefs,
resolvers,
plugins: [
ApolloServerPluginLandingPageGraphQLPlayground(),
],
});

- 강의내용
  JS 자체의 발전속도 빠름, nodejs의 발전속도 상대적으로 느림 --> babel이 최신문법 JS들을 node가 이해가능한 옛날 JS 문법으로 바꿔줌 1. npm i --save-dev @babel/core, npm i --save-dev @babel/preset-env, npm i --save-dev @babel/node 2. touch babel.config.json 3. "scripts"에서 "dev": "nodemon --exec babel-node server.js" --> babel이 server.js를 실행시켜준다는 의미

# 3.3

    Mustation: {(_, args)} --> _ : convention

# 3.4

    npm install prisma -D
    npx prisma init
    지식적인 부분 많음. 노트의 정리 참고.

# 3.5

npx prisma migrate dev
prisma migrate 은 우리의 스키마를 보고 이를 데이터베이스에 적용시켜주는 역할임

# 3.6

# 3.7

# 3.8

<cli>
npx prisma studio --> 스튜디오는 기본적으로 우리의 DB에 있는 MODEL들을 위한 데이터 브라우저
# 3.9
resolver 랑 type을 적는 방식이 구림. 한 곳에 다 넣음. divide and conquer 하자.
# 3.10

npm i graphql-tools --> 모든 mutations query typeDefs 끼리끼리 임포트하고 싶을 때 쓰기 위함

(수정) graphql-tools 업데이트로 각각 따로 설치해야 하네요..

npm install @graphql-tools/schema @graphql-tools/load-files @graphql-tools/merge

import { makeExecutableSchema } from '@graphql-tools/schema'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'

정상 작동됩니다

# 3.11

가상환경에서 우리의 환경 변수를 읽을 수 있도록 설정할 것
npm i dotenv --> app의 가장 먼저에서 불러야 함

---

# 4.0

npx prisma init
(코드 작성)
npm run migrate (name of migrate은 user_model)

# 4.2

npm i bcrypt --> To hash password

# 4.4

npm install jsonwebtoken --> jsonwebtoken은 웹에서 유명한 토큰의 한 종류. userid를 가져와서 (매우 조그만 정보) 우리가 토큰에 싸인함. 우리 서버의 특징있는 사인. 마치 신용카드 긁고 사인하는 것처럼. 그리고 토큰을 user에게 보냄. 유저는 그걸 저장함. 유저는 브라우저. 안드로이드 앱 등등. 유저는 토큰을 저장해놓고 본인이 뭘 원할때마다 우리한테 토큰을 보냄. 우리가 토큰을 받으면 그 토큰이 갖고 있는 id를 확인하고 그 담에 토큰이 우리가 서명한 토큰인지 확인함.
jwt.sign(payload, secretOrPrivateKey) --> 사인을 발행하려면 두 가지가 필요함. payload는 우리가 토큰에 넣고 싶은 것. secretOrPrivateKey 이건 서버가 서명하는 것.

# 4.5

토큰 안을 누구나 볼 수 있기에 payload 는 개인적인 정보 들어가면 안됨
secretOrPrivateKey는 공개되면 안되기떄문에 .env에 환경변수로 처리
jwt.io에서 발행된 토큰으로 정보 확인가능

# 4.8

강의 마지막에 이런 접근법에 대한 문제 말함
--> 모든 mutation에 token을 주는 것은 비효율적.

# 4.10

http header와 context를 연결함. http header에 token 넣는 것은 아직까지는 localhost:4000 에서 우리가 수동으로 함.

# 4.12

다른 resolver를 wrap하고 있는 resolver를 만듦. = 함수를 리턴하는 함수를 만듦.
const x = (resolver) => (root, args, context, info) => {
if(!context.loggedInUser) {
return {
ok: false,
error: 'log in pls
}
}
return resolver(root, args, context, info)
}
==
function x(resolver) {
return function(root, args, context, info) {
if(!context.loggedInUser) {
return {
ok: false,
error: 'log in pls'
}
}
return resolver(root, args, context, info)
}
}
--> At first, I couldn't understand for a while but now I understand what "Protecting Resolvers" means.
Before actually setting the resolvers, this protectedResolver function works like a gate guardian.
Seems like wrapping the actual resolver to check the context is valid and if it is, it returns the actual resolver.

# 4.14

prisma model에 새로운 컬럼이 추가됐으니 npm run migrate 해줄 것. and npm run studio 해서 prisma를 다시 실행해줄 것.
upload에 대한 설명
--> rest를 이용해 upload하는 것

1. file을 rest를 이용해서 backend가 업로드하게 하는 것
2. 그 후에 파일의 url을 가져옴
3. updateUser mutation을 새 url과 함께 보내줌
   풀어서 설명하면 유저는 프론트엔드에 있음 유저는 파일을 선택한 다음에 저장하면 파일은 백엔드로 업로드되고 백엔드는 url을 리턴함 그 다음에 graphql mutation을 그 url고 함께 보냄 (2번 왔다갔다 하는 것임)
   apollo 도 upload를 지원함. 단 우리는 현재 graphql tools의 makeExecutableSchema를 통해 스키마를 만들고 있기 때문에 사용못함. 사용하려면 apollo server가 스키마를 생성하게 해야 함. 그래야 apollo server가 Upload type을 활성화시켜줌

# 4.15

playground(localhost//:4000) 로는 파일 업로드를 못하기 때문에 테스트를 위해서 graphql client인 altair를 다운받아야 함. (https://altair.sirmuel.design/ 접속) 강의는 Chrome으로 진행.
header 에 토큰을 설정하고 해야 함. #4.15 2분 25초
altair 조작법은 2분25초에서 조금 더 볼 것.
업로드 과정
유저가 내 서버에 파일을 업로드하면 나는 서버에 있는 파일을 aws로 업로드하고, aws는 나에게 url을 줌. 원래 서버 안에다가 저장하지 않지만 aws를 하기 전까지 일단 우리 폴더(서버 안)에 저장할 것임. 우리가 가진 파일을 어떻게 저장하는지 배워보자. uploads폴더를 생성한 다음 거기에 저장할 것임. 물론 다음시간에^^

    [Error: Unknown type "Upload". Did you mean "Float"?]

Apollo Server 3버전 이상으로 진행 중이신 분들 중 위와 같은 에러 발생시 아폴로 서버를 아폴로 익스프레스 서버로 바꾸고 아래와 같이 몇 가지 설정을 해주셔야 합니다.
강의 #4.18에서 아폴로 서버를 아폴로 익스프레스 서버로 바꾸기 때문에 여기서 미리 바꾸고 진행하셔도 됩니다.

npm i apollo-server-express express graphql-upload

server.js

```
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import express from "express";
const PORT=process.env.PORT;
const startServer = async () => {
const server = new ApolloServer({
typeDefs,
resolvers,
context: async ({req }) => {
return {
loggedInUser : await getUser(req.headers.token),
}
},
});
await server.start();
const app = express();
app.use(graphqlUploadExpress());
server.applyMiddleware({ app });
await new Promise((func) => app.listen({ port: PORT }, func));
console.log(`🚀 Server: http://localhost:${PORT}${server.graphqlPath}`);
}
startServer();
```

editProfile.typeDefs.js에 scalar Upload 추가

```
export default gql`
scalar Upload
`
```

editProfile.resolvers.js 파일에 Upload: GraphQLUpload 추가

```
import { GraphQLUpload } from "graphql-upload";
export default {
Upload: GraphQLUpload,
};
```

🚀 http://localhost:4000/graphql

https://www.apollographql.com/docs/apollo-server/data/file-uploads/

# 4.16

altair를 이용한 파일 업로드시 node 14버전 이상에서만 일어나는 에러가 있음
해결

1. package.json에
   "resolutions" : {
   "fs-capacitor" : "^6.2.0",
   "graphql-upload" : "^11.0.0"
   }
   복붙
2. package.json에
   "preinstall" : "npx npm-force-resolutions"
   추가
3. node_modules 삭제
4. npm install 하기

# 4.17

하지만 서버는 uploads의 존재를 인지하지 못함. 그렇다고 다른 강의에서 했던 것처럼 uploads파일을 인식시켜서 사용자에게 보여줄 수 없음. apollo server는 그런 기능이 없기 때문. graphql 서버이기 때문. 그래서 apollo-server-express를 사용해야 함.
이 부분은 강의 들으면서 문제점 파악 전반적으로 하는 게 낫다
우리가 원래 하던 것처럼 express 서버를 만들고 graphql url에만 apollo server를 생성하는 것임.

# 4.18

Apollo Server를 Apollo Server Express로 전환할 것. Express server 가 필요하기 때문. Apollo Server는 할 수 있는게 제한적임.
Express server를 만들고 Apollo Server에 추가할 것임.
npm install express apollo-server-express
npm install morgan --> 우리 서버에 들어오는 모든 요청들을 볼 수 있음

# 4.19

테스트 하는 과정 해볼 것. 강의에서 함.

# 4.20

테스트 하려면 새로운 user 하나를 더 만들어야 됨.
self relation
prisma 수정 후 npm run migrate
npm run studio 해서 가시적으로 확인

# 4.25

offset pagination : user가 우리에게 user가 어디 위치하고 있는지 페이지를 알려줘야 했음
cursor based pagination : 우리가 DB에게 알려줘야 함 우리가 본 마지막 결과물이 뭔지

# 4.26

강의 필히 다시 볼 것
computed fields : graphql schema로 채워져있지만 DB에는 없는 것. 매번 request를 받을 때마다 계산됨

# 6.0

migrate 해야함.

# 6.1

강의 다시 볼 것.
Database Viewer 사용 (강의 보면 됨.) -- > 실제 DB에 저장안된 녀석(user, hashtag)들 볼 수 있음. DB에 저장되는 것처럼 보이지만 안보이는 곳에서 prisma가 자동으로 관리함. 사실 Following Follower도 User DB에는 저장안되고 FollowRelation이라는 테이블에 따로 관리됨 이것이 실제로 SQL DB에서 일어나고 있는 일 하지만 우리는 Prisma덕분에 이 부분을 수동적으로 관리할 필요가 없음.

# 6.2

4분 초반까지 다시 볼 필요

# 6.3

Regular Expression : regexpal.com 참고

# 6.4

다시보기다시보기다시보기
hashtags 배열 속에 있는 각각의 해시태그를 connectOrCreate 내에서 사용가능한 object로 변형시켜야 함.
6분 20초쯤에 결과 보기

# 6.7

#6.8에서 할 내용 : #6.7 에서의 업데이트만으로는 (캡션은 잘 수정되지만) 사진에 엮어져 있는 해시태그들이 그대로 남아있기 때문에 안됨.
사진을 수정할 때 해시태그도 다시 업데이트 되도록 코드를 수정해줘야 함.

# 6.8

(\*)
const oldPhoto = await client.photo.findFirst({
where: {
id,
userId: loggedInUser.id,
},
})
이 상태에서
console.log(oldPhoto) 하면 결과가
{
id: 1,
userId: 1,
file: 'empty',
caption: 'I love everything',
createdAt: ~~,
updatedAt: ~~
}
이러함.

const oldPhoto = await client.photo.findFirst({
where: {
id,
userId: loggedInUser.id,
},
include: {
hashtags: {
select: {
hashtag: true
}
}
}
})
이 상태에서 console.log(oldPhoto) 하면 결과가
{
id: 1,
userId: 1,
file: 'empty',
caption: 'I love everything',
createdAt: ~~,
updatedAt: ~~,
hashtags: [
{hashtag: '#food},
{hashtag: '#much},
{hashtag: '#avocado}
]
}
이렇게 나옴

정리해보자. oldPhoto 자체가 결국 client.photo.~ 이런식으로 결과가 리턴되는 애니까 결국 schema.prisma 파일을 중점적으로 봐야 할 것. 뿐만 아니라 computed fields로 보려면 photos.typeDefs.js 파일도 같이 봐야 함. shcema.prisma를 보면 hashtags 부분은 다른 모델과 relation을 맺고 있음. 즉 DB에는 실제로 저장되지 않음. 하지만 photos.typeDefs.js 에서는 hashtags라는 부분이 존재함. 이것이 computed fields로 볼 수 있는 근거임. 공식 docs를 보면 prisma에서는 특정 모델과 relation을 맺는 녀석은 실제로 DB에 저장이 안되기 때문에 console.log(oldPhoto)를 해도 hashtags 부분이 DB에 존재하지 않기 때문에 결과에 반영되지 않는 것 같음. 이럴 때 해당 정보를 불러오고 싶으면 공식문서에서는 include와 select를 사용하라고 나와 있음. 밑에 그 부분을 링크와 함께 복붙해놓으니 읽기 바람.

https://www.prisma.io/docs/concepts/components/prisma-client/select-fields

Include relations and select relation fields
To return specific relation fields, you can:

Use a nested select
Use a select within an include
To return all relation fields, use include only - for example, { include: { posts: true } }.

The following query uses a nested select to select each user's name and the title of each related post:

const users = await prisma.user.findMany({
select: {
name: true,
posts: {
select: {
title: true,
},
},
},
})
Show CLI results
The following query uses select within an include, and returns all user fields and each post's title field:

const users = await prisma.user.findMany({
// Returns all user fields
include: {
posts: {
select: {
title: true,
},
},
},
})
(\*)
