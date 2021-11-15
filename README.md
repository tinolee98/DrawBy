a나도 이제 참여하는건가?!~~ㅋㅋ

# 그림은 내 취미: DrawBy ✏️

그림을 취미로 갖고 있는 사람들을 위한 SNS 플랫폼입니다.

ApolloGraphQL과 Prisma, PostgresQL을 활용하여 구성하였습니다.

_광주과학기술원 GSS 프로그램의 지원을 받아 제작하였습니다._

---

## Done List

### User

- [x] Create Account
- [x] See Profile
- [x] Edit Profile
  - [x] uploadAvatar
- [x] Login
- [x] Delete Account
- [ ] Search User (hashtag, genre도 포함하여 search 필요) -> startWith / contains 사용하면 될듯
- [x] Follow User
- [x] Unfollow User
- [x] See Followers
- [x] See Followings

### Picture

- [x] Upload Picture (genre 추가 필요)
- [x] Delete Picture (hashtag, genre 추가 필요)
- [x] Edit Picture (genre 추가 필요)
- [x] Toggle Like 2 Picture
- [x] File Upload & Connect 2 EC2 in AWS
- [ ] See Feed

### Comment

- [x] Create Comment & Nested Comment
- [x] Delete Comment & Nested Comment
- [x] Edit Comment
- [ ] Toggle Secret Comment (비밀 댓글)
- [x] Toggle Like 2 Comment

### Hashtag

- [x] Follow Hashtag: User가 관심있는 Hashtag를 follow
- [x] See Hashtags
- [x] Unfollow Hashtag

### Genre

- [x] Create Genre (Hashtag와 유사하게 Picture가 등록, 수정, 삭제될 때 cascade 되도록 수정 필요)
- [x] Follow Genre: User가 관심있는 Genre를 follow
- [x] Unfollow Genre

### DM

- [x] Create Room: 채팅방 생성
- [x] Delete Room
- [x] Create Message
- [x] Read Message: 메세지를 읽음
- [x] See Messages (Read와 합칠 필요 O)
- [x] See Rooms

---

### To Do List

### Repactoring 필요한 부분들

1. NestedComment와 Comment의 resolvers가 비슷한 역할을 수행하고 있으므로 하나의 함수로 만들어서 쉽게 배포할 수 있는 형식이 더 좋을 듯.
