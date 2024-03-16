# 홍대대 (HDD Project)
![image](https://github.com/ooing-0720/HDD-Project/assets/87466004/0ef2cbfc-441c-472b-8672-f3221ae9cbf0)
홍익대학교 재학생 전용 커뮤니티 웹 사이트

## 📜 서비스 내용
홍대생의 학교 생활을 보다 편리하게 해줄 기능을 포함한 **홍대생 전용 커뮤니티 웹 사이트** 입니다.

4년간 학교를 다니며 마주한 크고 작은, 반복되지만 해결되지 않는 문제를 직접 해결하고 학우들이 같은 문제를 마주했을 때 **솔루션을 제공**하기 위해 만들었습니다.

### 주요 기능
1. **회원 관리** : 홍익대 학생만이 이용 가능하도록 회원 가입 시 홍대생 인증
2. **구인 게시판** : 정해진 틀을 제공하여 프로젝트, 스터디, 룸메이드 구인과 검색을 도움
3. **홍보 게시판** : 교내 전시회 정보(일정, 위치 등) 확인
4. **맛집 게시판** : 광고를 제외한 학교 인근의 음식점, 카페 정보 제공
5. **공지사항 모아보기** : 학교 전체 공지사항과 학교별 공지사항을 크롤링하여 제공

### 목표
- 대학 커뮤니티 앱에서 제공하지 않는 기능을 제공해 학생들이 보다 편리하게 학교생활을 할 수 있도록 돕습니다.
- 학교 전용 커뮤니티 사이트를 제공하여 단합력을 높입니다.

## 🛠 기술 스택
|분류|기슬 스택|
|:-----------------:|---|
|      **IDE**      | <img src="https://img.shields.io/badge/intellijidea-000000?style=for-the-badge&logo=intellijidea&logoColor=white"> <img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> |
|   **Framework**   | <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> |
|    **Database**   | <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">  |
|    **Library**    | <img src="https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white"> <img src="https://img.shields.io/badge/jsonwebtokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">  |
| **Collaboration** | <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"> |
|  **Distribution** |  <img src="https://img.shields.io/badge/amazonrds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white"> <img src="https://img.shields.io/badge/googlecloudstorage-AECBFA?style=for-the-badge&logo=googlecloudstorage&logoColor=white">  |

## 🏗️ API 명세(일부)
![image](https://github.com/ooing-0720/HDD-Project/assets/87466004/e4012717-fe50-4337-8fbb-4e5fdb2a5401)

## 🗒️ 구현 기능
### 로그인 및 회원 가입
![image](https://github.com/ooing-0720/HDD-Project/assets/87466004/859a667d-4d61-45c0-a713-7c9cf2693b51)
- **Spring Security**와 **JWT**를 사용하여 **사용자 인증(로그인, 인가)** 구현
- 회원 관리의 **model, service, controller**를 구분하여 코드를 작성하여 응집도를 높임.
- 회원 관리의 repository(MemberRepository)는 **Spring Data JPA**를 사용하여 효율적으로 구현.
- 회원 가입 시 이메일 인증, 닉네임 중복 버튼을 누르는 경우 GET method를 통해 파라미터를 전달하여 어떤 버튼이 눌렸는지 확인하고 처리.
- **RESTful하게 구현**하여 프론트엔드, 백엔드의 협업을 원활하게 함.
- 회원 데이터는 **스키마가 정해져**있으며, 회원 정보(닉네임, 비밀번호, 학년, 학과 등)가 **변경(UPDATE)**되거나 **권한을 부여(JOIN)**하는 등의 연산이 자주 발생하여 **관계형 데이터베이스인 MySQL**을 이용하여 관리
![image](https://github.com/ooing-0720/HDD-Project/assets/87466004/ef940adb-7e37-4f72-896f-eca0c2692b70)

### 구인/홍보 게시판
![image](https://github.com/ooing-0720/HDD-Project/assets/87466004/776ee786-04ac-460c-95ec-b069f97de78a)
- 구인 : 정해진 폼에 맞게 구인 게시글을 등록하거나, 키워드 검색을 통해 원하는 게시글 확인.
- 홍보 : SVG 형식의 교내 건물 배치도를 클릭하여 해당 건물에서 현재 진행중인 전시회를 확인.
- 각 기능에 맞게 프로젝트 구인, 룸메이트 구인, 댓글, 북마크의 **model, service, controller, request object**를 구분하여 코드를 작성하여 응집도를 높임.
- 게시판의 **데이터를 유연하게 저장**하기 위해 NoSQL인 **Firebase**에 데이터 관리.
    - 댓글 기능은 게시글 Document의 Collection으로 Comment라는 Document를 생성하여 관리함으로써 해당 게시글의 댓글을 편하게 관리할 수 있음.
- 게시판의 데이터는 스키마가 정해져있지 않고 UPDATE 연산이 많지 않으며, **Document 내의 Collection을 이용하여 댓글을 관리**하기 용이하여 **Firebase**를 이용하여 관리


## 📱 예시 서비스 화면
![image](https://github.com/ooing-0720/HDD-Project/assets/87466004/d3cdd154-faf9-4d08-abef-ce3d6f72fbaa)
