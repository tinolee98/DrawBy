# DrawBy

그림은 내 취미: 드로비

## 만들어야할 resolver 목록

### User 관련

- [x] Create Account
- [x] See Profile
- [x] Edit Profile
- [x] Login
- [x] Delete Account
- [ ] Search User (hashtag, genre도 포함하여 search 필요) -> startWith / contains 사용하면 될듯
- [x] Follow User
- [x] Unfollow User
- [x] See Followers
- [x] See Followings

### Picture 관련

- [x] Upload Picture (hashtag, genre 추가 필요)
- [x] Delete Picture (hashtag, genre 추가 필요)
- [x] Edit Picture (hashtag, genre 추가 필요)
- [x] Toggle Like 2 Picture
- [x] Comment
- [x] Nested Comment
- [ ] Secret Comment
- [x] Toggle Like 2 Comment
- [ ] File Upload & Connect 2 EC2 in AWS

### Repactoring 필요한 부분들

1. NestedComment와 Comment의 resolvers가 비슷한 역할을 수행하고 있으므로 하나의 함수로 만들어서 쉽게 배포할 수 있는 형식이 더 좋을 듯.
2.
