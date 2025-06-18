import { NextRequest, NextResponse } from "next/server";

/**
 * 회원가입 API
 * @param req 클라이언트에서 받은 회원가입 정보 (email, password, name, companyName)
 * @returns 회원가입 성공/실패 응답
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("📥 signup 요청 본문:", body);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/auths/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ 회원가입 실패:", data);
      return NextResponse.json(data, { status: response.status });
    }

    console.log("✅ 회원가입 성공:", data);
    return NextResponse.json(data, { status: 200 });

  }  catch (error: unknown) {
    console.error("🔥 signup 요청 중 예외 발생:", error);
   return NextResponse.json(
     { code: "SERVER_ERROR", message: "회원가입 요청 중 오류가 발생했습니다." },
    { status: 500 }
   );
  }
}
