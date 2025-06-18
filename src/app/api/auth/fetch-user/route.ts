import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

/**
 * 사용자 정보 조회 API
 * @param req 클라이언트에서 전달받은 요청 (body에 토큰 포함)
 * @returns 사용자 정보 JSON
 */
export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    console.log("📥 fetch-user 요청 token:", token);

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/auths/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ 사용자 정보 응답:", response.data);
    return NextResponse.json(response.data, { status: 200 });

  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
  console.error("❌ fetch-user 실패:", error.response.data);
  return NextResponse.json(
    { error: error.response.data },
    { status: error.response.status }
  );
}
console.error("❌ fetch-user 실패 (알 수 없는 오류):", error);
return NextResponse.json(
  { error: '사용자 정보 조회 실패' },
  { status: 500 }
);
  }
}