// src/app/layout.tsx
import "../styles/globals.css";
import GNB from '@/components/common/gnb';
import { ReactNode } from "react";
import { Providers } from '@/contexts/Providers';

export const metadata = {
  title: "같이달램",
  description: "같이 모임을 만들어요!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
      <Providers>
        <GNB />
        {children}
      </Providers>
      </body>
    </html>
  );
}
