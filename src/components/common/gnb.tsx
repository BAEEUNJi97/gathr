// components/common/gnb.tsx
'use client';

import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';
import Link from "next/link";

export default function GNB() {
    const { token, userName, signout, isLoading, isClient } = useContext(AuthContext);

   //if (isLoading) return null; // ✅ 깜빡임 방지 핵심!/

  return (
    <nav className="bg-orange-600 text-white w-full h-16 flex items-center justify-between px-8 shadow-md">
      {/* 왼쪽: 로고 + 메뉴 */}
      <div className="flex items-center gap-6">
        <Link href="/gatherings" className="font-bold text-lg">
          같이달램
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/gatherings">모임 찾기</Link>
          <Link href="/liked">찜한 모임</Link>
          <Link href="/reviews">모든 리뷰</Link>
        </div>
      </div>

      {/* 오른쪽: 로그인 */}
       <div className="flex items-center gap-4">
                      {!isClient || isLoading  ? (
            <div className="w-[80px] h-[20px]" />
          ) : token ? (
            <>
              <span className="text-sm text-gray-700"> {userName ? `${userName}님 환영합니다` : '환영합니다'}</span>
              <button
                onClick={signout}
                className="text-sm text-gray-600 hover:text-orange-500"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link href="/login" className="text-sm hover:underline">
              로그인
            </Link>
          )}
      </div>
    </nav>
  );
}
