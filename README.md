This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## File Structure

```bash
/src
  ├── app/
  │   ├── layout.tsx          # 글로벌 레이아웃
  │   ├── page.tsx            # 메인 페이지
  │   ├── playerlist/         # 선수 리스트 페이지
  │   │   ├── page.tsx        # /playerlist
  │   ├── teamlist/           # 팀 리스트 페이지
  │   │   ├── page.tsx        # /teamlist
  │   ├── player/             # 선수 관련 동적 라우팅
  │   │   ├── [id]/           # /player/:id 상세 페이지
  │   │       ├── page.tsx    # 상세 페이지 (스케줄 & 커뮤니티 포함)
  │   ├── team/               # 팀 관련 동적 라우팅
  │   │   ├── [id]/           # /team/:id 상세 페이지
  │   │       ├── page.tsx    # 상세 페이지 (스케줄 & 커뮤니티 포함)
  │   ├── login/              # 로그인 페이지
  │   │   ├── page.tsx
  │   ├── join/               # 회원가입 페이지
  │   │   ├── page.tsx
  │   ├── mypage/             # 마이페이지
  │       ├── page.tsx
  ├── components/
  │   ├── layout/             # 레이아웃 컴포넌트
  │   │   ├── Header.tsx
  │   │   ├── Footer.tsx
  │   │   └── MainLayout.tsx
  │   ├── player/             # 선수 관련 컴포넌트
  │   │   ├── PlayerCard.tsx
  │   │   ├── PlayerSchedule.tsx  # 선수 스케줄 컴포넌트
  │   │   └── PlayerCommunity.tsx # 선수 커뮤니티 컴포넌트
  │   ├── team/               # 팀 관련 컴포넌트
  │   │   ├── TeamCard.tsx
  │   │   ├── TeamSchedule.tsx    # 팀 스케줄 컴포넌트
  │   │   └── TeamCommunity.tsx   # 팀 커뮤니티 컴포넌트
  │   └── common/             # 공통 컴포넌트
  │       ├── Button.tsx
  │       ├── Input.tsx
  │       └── Card.tsx
  ├── hooks/
  │   ├── usePlayer.ts        # 선수 데이터 훅
  │   ├── useTeam.ts          # 팀 데이터 훅
  │   └── useAuth.ts          # 인증 관련 훅
  ├── utils/
  │   ├── api.ts              # API 호출 함수
  │   ├── dateUtils.ts        # 날짜 처리 유틸리티
  │   └── stringUtils.ts      # 문자열 처리 유틸리티
  ├── styles/
  │   ├── globals.css         # 글로벌 스타일
  │   └── components/
  │       ├── PlayerCard.module.css
  │       ├── TeamCard.module.css
  │       └── Common.module.css
  ├── context/
  │   ├── AuthContext.tsx     # 인증 컨텍스트
  │   └── PlayerContext.tsx   # 선수 데이터 컨텍스트
  ├── types/
      ├── player.ts           # 선수 타입 정의
      ├── team.ts             # 팀 타입 정의
      └── auth.ts             # 인증 타입 정의
```
