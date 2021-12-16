# To Do List

- [x] See Profile
- [x] Login
- [ ] Edit Profile
- [ ] Change Avatar (Image Upload)
- [ ] Follow User
- [ ] Unfollow User
- [ ] Search Users
- [ ] See Followers
- [ ] See Following

## Photos

- [ ] See Photo
- [ ] Upload Photo
- [ ] Edit Photo
- [ ] Like / Unlike Photo
- [ ] See Photo Likes
- [ ] See Feed
- [ ] Search Photos
- [ ] See Hashtags

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

npm install apollo-server@2.25.2 graphql (Apollo server랑 graphql 설치) #북마크4 (해당 강의 모든 내용 다 들어가있음)

# 3.2

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
