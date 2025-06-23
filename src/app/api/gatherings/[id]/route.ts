// src/app/api/gatherings/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

/**
 * 모임 상세 조회 API
 * @param req 요청 정보
 * @param params.url 파라미터로 전달된 모임 ID
 * @returns 모임 상세 정보 (200) 또는 에러 JSON
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const teamId = process.env.NEXT_PUBLIC_TEAM_ID;

  // 1) 필수 값 검증
  if (!id) {
    return NextResponse.json(
      {
        code: "VALIDATION_ERROR",
        parameter: "id",
        message: "모임 id가 필요합니다.",
      },
      { status: 400 },
    );
  }
  if (!baseUrl || !teamId) {
    return NextResponse.json(
      {
        code: "SERVER_ERROR",
        message: "서버 설정 오류: API_BASE_URL 또는 TEAM_ID 미설정",
      },
      { status: 500 },
    );
  }

  try {
    // 2) 외부 백엔드 호출
    const res = await fetch(`${baseUrl}/${teamId}/gatherings/${id}`, {
      method: "GET",
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ 모임 상세 조회 실패:", data);
      return NextResponse.json(data, { status: res.status });
    }

    console.log("✅ 모임 상세 조회 성공:", data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("🔥 모임 상세 조회 중 예외 발생:", error);
    return NextResponse.json(
      {
        code: "SERVER_ERROR",
        message: "모임 상세 조회 중 서버 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}
