📝 같이달램 (Together Dallaem)

Next.js, TypeScript, Tailwind CSS를 기반으로 제작한 모임 탐색·관리 웹 애플리케이션입니다. 디자인 시안 및 Swagger API 문서를 바탕으로 기능을 구현하고, 공용 UI 컴포넌트와 사용자 경험을 고려한 상세 페이지를 포함하고 있습니다.

🔗 배포 링크

프로젝트 바로가기

✅ 과제 요구사항 체크리스트

(상위)

CRUD 기능 구현

필터링 & 정렬(UI) 반영

무한 스크롤 + SSR 연동

인증(회원가입·로그인) 및 토큰 관리

(하위)

이메일/비밀번호/이름/회사명 유효성 검사

찜하기 로컬 스토리지 처리

모달 기반 모임 생성 폼

진행 상태 시각화(Progress Bar)

리뷰 페이지 페이지네이션

💡 주요 기능

모임 목록 등록(주최자)

모임 참여(사용자)

찜하기 · 찜한 모임 로컬 스토리지 저장

필터(카테고리, 지역, 날짜) 및 정렬(날짜·참여인원) 적용

무한 스크롤으로 추가 데이터 로드

상세 페이지: 메모 작성 및 이미지 업로드

리뷰 페이지: 평점 하트 아이콘·분포 막대 차트

상태별 UI 스타일 변경(미확정·확정)

📸 프로젝트 화면

메인 목록 페이지

모바일 목록 페이지





상세 페이지

모바일 상세 페이지





🛠️ 사용 기술

Next.js 14 (App Router)

TypeScript

Tailwind CSS

React Hook Form (폼 검증)

Axios (Interceptor 설정)

React Context API (Auth, Filter)

Jest & React Testing Library

Vercel 배포

⚙️ 프로젝트 실행 방법

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드 후 프로덕션 모드
pnpm build
pnpm start

접속: http://localhost:3000

📁 디렉토리 구조 요약

my-project/
├── app/                 # 라우팅 페이지 구조
│   ├── login/           # 로그인
│   ├── signup/          # 회원가입
│   └── gatherings/      # 모임 리스트 · 상세
├── components/          # 공용 UI 컴포넌트
│   ├── common/          # GNB, Modal 등
│   └── gatherings/      # 모임 관련 컴포넌트
├── contexts/            # React Context
├── hooks/               # 커스텀 훅
├── lib/                 # Axios 인스턴스, 유틸
├── services/            # API 연동 함수
├── types/               # TypeScript 타입
├── styles/              # Tailwind 설정
└── public/              # 정적 자원

📡 API 정보

Swagger 문서: API Docs

팀 ID(tenantId)를 통해 개인화된 데이터 조회

📝 회고 및 정리

완성도: 약 90%, 주요 기능 모두 구현 및 반응형 대응 완료

도전 과제: Next.js SSR·CSR 구분, API 에러 핸들링 개선 필요

개선 사항: 디자인 일관성 보강, 예외 상황 UX 처리 보완

느낀 점: 짧은 기간 내 전체 개발 흐름 경험, 배포까지 완료하며 자신감 상승

오류 기록: 주요 Axios 에러 및 유효성 검사 실패 사례 링크

🚀 테스트 및 배포

테스트

pnpm test로 Jest 기반 유닛 테스트 및 React Testing Library 컴포넌트 테스트 실행

주요 컴포넌트 (FilterHeader, GatheringsList, CreateMeetingModal) 커버리지 80% 이상

CI/CD

GitHub Actions 설정: PR 병합 시 자동 빌드 및 테스트

Vercel 연동: 메인 브랜치 푸시 시 자동 배포

🌿 기여 가이드

Issue 생성: 버그/기능 제안 시 이슈 열기

브랜치 전략: feature/<이름>, fix/<이름> 형태로 브랜치 생성

커밋 메시지: feat:, fix:, docs:, chore: 등 prefix 사용

PR 요청: 변경 내용 설명 및 스크린샷 첨부

리뷰 완료 후 병합

📞 문의 및 연락처

이메일: your.email@example.com

깃허브 이슈: https://github.com/BAEEUNJi97/gathr/issues

📜 라이선스

MIT License

