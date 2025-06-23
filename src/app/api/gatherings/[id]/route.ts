// src/app/api/gatherings/[id]/route.ts
import { NextResponse } from "next/server";
import { getGatheringDetail } from "@/services/gatheringService";
import axios from "axios";
/**
 * 모임 상세 조회 API
 * @param req 요청 정보
 * @param params.url 파라미터로 전달된 모임 ID
 * @returns 모임 상세 정보 (200) 또는 에러 JSON
 */
export async function GET(request: Request) {
  // URL에서 id 추출
  const url = new URL(request.url);
  const segments = url.pathname.split("/");
  const rawId = segments.at(-1) ?? "";
  const id = Number(rawId);

  // ID 유효성 검사
  if (!rawId || isNaN(id) || id <= 0) {
    return NextResponse.json(
      { code: "VALIDATION_ERROR", parameter: "id", message: "유효한 모임 id가 필요합니다." },
      { status: 400 }
    );
  }

  try {
    // 서비스 함수로 상세 데이터 조회
    const detail = await getGatheringDetail(id);
    return NextResponse.json(detail, { status: 200 });
  } catch (err: unknown) {
    // axios 오류인지 확인하고 404 처리
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return NextResponse.json(
        { code: "NOT_FOUND", message: "해당 모임을 찾을 수 없습니다." },
        { status: 404 }
      );
    }
    // 기타 서버 에러
    console.error("모임 상세 조회 오류:", err);
    return NextResponse.json(
      { code: "SERVER_ERROR", message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}