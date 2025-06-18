// src/app/api/auth/signin/route.ts

/**
 * 로그인 API (프록시 역할)
 * 
 * 클라이언트에서 전달된 로그인 정보를 백엔드 서버의 인증 엔드포인트에 전달하고,
 * 응답을 그대로 클라이언트에 반환합니다.
 * 
 * @param req - 클라이언트에서 받은 로그인 요청 (email, password)
 * @returns 로그인 성공 또는 실패에 대한 JSON 응답
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/auths/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(data, { status: response.status });
  }

  return NextResponse.json(data);
}
