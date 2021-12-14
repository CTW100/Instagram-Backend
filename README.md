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
