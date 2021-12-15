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
