📝 <span style="color:#4f46e5">같이달램 (Together Dallaem)</span>
모임 탐색 · 관리 웹앱
<sub><sup>with Next.js · TypeScript · Tailwind CSS</sup></sub>

🚀 배포 바로가기

</div>
✨ 프로젝트 소개
“모임 찾기부터, 참여, 찜, 리뷰까지
실제 서비스처럼 동작하는
풀스택 프론트엔드 실전 프로젝트”

디자인 시안 & Swagger API 문서 기반 기획

공용 UI, 반응형, SSR, 모달, 무한스크롤, 인증, 테스트, 배포, CI/CD까지 올인원 경험

💡 주요 기능
<img src="./public/screenshots/main_mobile.png" width="250"/>	<img src="./public/screenshots/detail_mobile.png" width="250"/>
<b>메인/목록(모바일)</b>	<b>상세(모바일)</b>

모임 목록 등록 / 참여

찜하기(로컬스토리지)

카테고리/날짜/지역/참여 인원 필터 & 정렬

무한 스크롤(SSR)

상세 페이지(메모/이미지 업로드)

리뷰 페이지(평점 하트, 분포 막대, 페이지네이션)

상태별 UI/진행도 Progress Bar

PC/모바일 반응형

(디자인/코드/UX까지 직접 구현)

✅ 요구사항 체크리스트
<div align="center">
CRUD	필터/정렬	무한스크롤	SSR
✅	✅	✅	✅

회원가입/로그인	토큰 인증	유효성 검사	찜하기(localStorage)
✅	✅	✅	✅

모달	Progress Bar	리뷰(목업)	반응형
✅	✅	✅	✅

</div>
🛠️ 사용 기술
<p align="center"> <img src="https://img.shields.io/badge/Next.js-000?style=flat-square&logo=next.js&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178c6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/TailwindCSS-38bdf8?style=flat-square&logo=tailwind-css&logoColor=white"/> <img src="https://img.shields.io/badge/Axios-5a29e4?style=flat-square&logo=axios&logoColor=white"/> <img src="https://img.shields.io/badge/Vercel-000?style=flat-square&logo=vercel&logoColor=white"/> <img src="https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white"/> </p>
Next.js 14 (App Router)

TypeScript

Tailwind CSS

React Hook Form

Axios (Interceptor)

React Context API (Auth, Filter)

Jest & React Testing Library

Vercel (배포)

GitHub Actions (CI/CD)

📂 디렉토리 구조
csharp
복사
편집
my-project/
├── app/                 # 라우팅 (로그인, 회원가입, 모임)
├── components/          # 공용 UI, 모임 전용 컴포넌트
├── contexts/            # React Context (Auth, Filter)
├── hooks/               # 커스텀 훅
├── lib/                 # Axios 인스턴스, 유틸
├── services/            # API 함수
├── types/               # 타입 정의
├── styles/              # Tailwind 설정
└── public/              # 정적 리소스(이미지 등)
⚡️ 실행 방법
bash
복사
편집
# 의존성 설치
pnpm install

# 개발 서버
pnpm dev

# 프로덕션 빌드/실행
pnpm build
pnpm start
접속: http://localhost:3000

📡 API
Swagger 문서: API Docs

팀 ID(tenantId) 기반 데이터 분리

🚩 개발 포인트 & 회고
90%+ 구현 (주요 기능/반응형/SSR/테스트)

SSR/CSR 데이터 처리, 에러 핸들링, 모듈화

디자인/UX 일관성 개선 여지 있음

진짜 서비스 배포/테스트/CI까지 경험

<details> <summary>🔎 <b>실전에서 겪은 시행착오/오류 기록 (펼치기)</b></summary>
Axios 에러/토큰 만료/유효성 실패 등 사례 바로가기

SSR/CSR 분기, localStorage 관리 등 경험치 상승!

</details>
🧪 테스트/배포
테스트

pnpm test (Jest+RTL, 주요 컴포넌트 커버리지 80%+)

CI/CD

GitHub Actions: PR 자동 빌드/테스트

Vercel: 메인 브랜치 자동 배포

🌱 기여/협업 가이드
브랜치 컨벤션	feature/, fix/
커밋 메시지	feat:, fix:, docs:, chore:
PR	스크린샷/변경 설명/리뷰 포함

Issue 등록 → 브랜치 생성 → PR → 리뷰/머지

📨 문의
Email: your.email@example.com

GitHub Issue: 질문/버그 남기기

🪪 License
MIT

