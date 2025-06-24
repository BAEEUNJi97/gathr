<span style="color:#6366f1">같이달램 (Together Dallaem)</span>
모임 탐색 · 관리 웹앱
<sub>with Next.js · TypeScript · Tailwind CSS</sub>

🚀 배포 바로가기

</div>
<p align="center"> <img src="https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&style=flat-square"/> <img src="https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&style=flat-square"/> <img src="https://img.shields.io/badge/Tailwind-38bdf8?logo=tailwindcss&style=flat-square"/> <img src="https://img.shields.io/badge/React Hook Form-EC5990?logo=reacthookform&style=flat-square"/> <img src="https://img.shields.io/badge/Axios-5A29E4?logo=axios&style=flat-square"/> <img src="https://img.shields.io/badge/Vercel-000000?logo=vercel&style=flat-square"/> <img src="https://img.shields.io/badge/Jest-C21325?logo=jest&style=flat-square"/> <img src="https://img.shields.io/badge/CI/CD-GitHub%20Actions-2088FF?logo=githubactions&style=flat-square"/> </p>
✨ 프로젝트 한눈에 보기
"모임부터 찜, 참여, 리뷰까지
실제 서비스급으로 동작하는 프론트엔드 실전 프로젝트!"

디자인 시안 & Swagger API 기반 완전 맞춤 개발

공용 UI, 반응형, SSR, 모달, 무한스크롤, 인증, 테스트, 배포, CI/CD까지 직접 경험

코드/UX/협업력, 세 마리 토끼 다 잡았습니다.

🏆 주요 기능
<div align="center">
<b>메인/목록(모바일)</b>	<b>상세(모바일)</b>

</div>
모임 목록 등록 & 참여

찜하기 (로컬스토리지)

카테고리/날짜/지역/인원 필터 & 정렬

SSR 기반 무한 스크롤

상세페이지 (메모/이미지 업로드)

리뷰 (하트평점/분포차트/페이지네이션)

상태별 UI, 진행도 Progress Bar

PC/모바일 완벽 대응

(디자인/UX/로직 직접 구현)

✅ 요구사항 클리어 현황
<div align="center">
CRUD	필터/정렬	무한스크롤	SSR
✔️	✔️	✔️	✔️

회원가입/로그인	토큰 인증	유효성 검사	찜하기
✔️	✔️	✔️	✔️

모달	Progress Bar	리뷰(목업)	반응형
✔️	✔️	✔️	✔️

</div>
🛠️ 기술스택
Next.js 14 (App Router)

TypeScript

Tailwind CSS

React Hook Form (폼 검증)

Axios (Interceptor/에러 핸들링)

React Context API (Auth, Filter)

Jest & React Testing Library

Vercel (배포)

GitHub Actions (CI/CD)

📂 디렉토리 구조
text
복사
편집
my-project/
├── app/           # 라우팅 (로그인, 회원가입, 모임)
├── components/    # 공용 UI, 모임 컴포넌트
├── contexts/      # Context (Auth, Filter)
├── hooks/         # 커스텀 훅
├── lib/           # Axios, 유틸
├── services/      # API 함수
├── types/         # 타입 정의
├── styles/        # Tailwind 설정
└── public/        # 정적 리소스(이미지)
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

📡 API/문서
Swagger API Docs:
API Docs

팀 ID(tenantId) 기반 데이터 분리

🏁 개발 포인트 & 회고
90%+ 구현 (모든 주요 기능/반응형/SSR/테스트 OK)

SSR/CSR 데이터 처리, 에러 핸들링, 모듈화 직접 설계/구현

디자인/UX 일관성, 예외 처리 지속 개선 중

진짜 서비스 배포/테스트/CI 경험

<details> <summary>🔎 <b>실전에서 터진 오류/시행착오 (클릭!)</b></summary> - Axios 에러/토큰 만료/유효성 실패 등 사례 <br/> - SSR/CSR 분기, localStorage 동기화 등 경험치 ↑ - [오류/리팩토링 사례 따로 보기](./docs/error-cases.md) </details>
🧪 테스트/배포
pnpm test (Jest + RTL, 컴포넌트 커버리지 80%↑)

CI/CD:

GitHub Actions (PR 자동 빌드/테스트)

Vercel (메인 브랜치 자동 배포)

🌱 기여/협업 가이드
브랜치 컨벤션	feature/, fix/
커밋 메시지	feat:, fix:, docs:, chore:
PR	스크린샷/변경 설명/리뷰 포함

Issue 등록 → 브랜치 생성 → PR → 리뷰/머지

📨 문의
Email: your.email@example.com

GitHub Issue: 바로가기

