# 같이달램 (Together Dallaem)

모임 탐색 · 관리 웹앱  
with **Next.js · TypeScript · Tailwind CSS**

[🚀 배포 바로가기](https://gathr-baeeunjis-projects.vercel.app/)

---

## ✨ 프로젝트 소개

- 디자인 시안 & Swagger API 기반 설계
- 공용 UI, 반응형, SSR, 모달, 무한스크롤, 인증, 배포

---

## 🏆 주요 기능

- 모임 목록 등록 / 참여
- 찜하기(로컬스토리지)
- 카테고리/날짜/지역/참여 인원 필터 & 정렬
- 무한 스크롤(SSR)
- 상세 페이지(메모/이미지 업로드)
- 리뷰 페이지(평점 하트, 분포 막대, 페이지네이션)
- 상태별 UI / 진행도 Progress Bar
- **PC/모바일 완벽 반응형**

---

## ✅ 요구사항 체크리스트

| CRUD | 필터/정렬 | 무한스크롤 | SSR |
| :--: | :------: | :--------: | :-: |
|  ✔️  |   ✔️     |    ✔️      | ✔️  |

| 회원가입/로그인 | 토큰 인증 | 유효성 검사 |
|:---:|:---:|:---:|:---:|
| ✔️  | ✔️  | ✔️  | ✔️  |

| 모달 | Progress Bar | 리뷰(목업) | 반응형 |
|:---:|:---:|:---:|:---:|
| ✔️  | ✔️  | ✔️  | ✔️  |

---

## 🛠️ 사용 기술

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form (폼 검증)
- Axios (Interceptor)
- React Context API (Auth, Filter)
- Vercel (배포)
- GitHub Actions (CI/CD)

---

## 📂 디렉토리 구조

my-project/
├── app/ # 라우팅 (로그인, 회원가입, 모임)
├── components/ # 공용 UI, 모임 컴포넌트
├── contexts/ # Context (Auth, Filter)
├── hooks/ # 커스텀 훅
├── lib/ # Axios, 유틸
├── services/ # API 함수
├── types/ # 타입 정의
├── styles/ # Tailwind 설정
└── public/ # 정적 리소스(이미지)

---

## ⚡️ 실행 방법

```bash
# 의존성 설치
pnpm install

# 개발 서버
pnpm dev

# 프로덕션 빌드/실행
pnpm build
pnpm start
접속: http://localhost:3000

📡 API & 문서
Swagger API Docs: API Docs

팀 ID(tenantId) 기반 데이터 분리

🏁 개발 포인트 & 회고
70%+ 구현 (주요 기능/반응형/SSR)

SSR/CSR 데이터 처리, 에러 핸들링, 모듈화 직접 설계/구현

디자인/UX 일관성, 예외 처리 지속 개선 중

실서비스 배포

<details> <summary>🔎 실전에서 겪은 시행착오/오류 기록 보기</summary>
Axios 에러/토큰 만료/유효성 실패 등 경험


</details>
🧪배포

GitHub Actions: PR 자동 빌드/테스트

Vercel: 메인 브랜치 자동 배포

🌱 기여/협업 가이드
브랜치: feature/, fix/

커밋 메시지: feat:, fix:, docs:, chore:

PR: 스크린샷/변경 설명/리뷰 포함

Issue 등록 → 브랜치 생성 → PR → 리뷰/머지

📨 문의
Email: your.email@example.com

GitHub Issue: 바로가기

