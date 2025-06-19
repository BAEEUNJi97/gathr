// src/services/gatheringService.ts
import axiosInstance from "@/lib/axiosInstance";
import {
  Gathering,
  GatheringListApiParams,
  CreateGatheringForm,
} from "@/types/gathering";

/**
 * 서버에서 모임 목록을 조회합니다.
 * @param params - 실제 API 요청 파라미터 (type, location, date 등)
 * @param token - 인증 토큰(optional)
 * @returns 모임 목록 배열
 */
export async function getGatherings(
  params: GatheringListApiParams,
  token?: string,
): Promise<Gathering[]> {
  // 빈 값(null, undefined, '') 제거
  const queryParams = Object.entries(params)
    .filter(([, v]) => v != null && v !== "")
    .reduce<Record<string, string>>((acc, [k, v]) => {
      acc[k] = String(v);
      return acc;
    }, {});

  // query string 생성
  const queryString = new URLSearchParams(queryParams).toString();
  const headers: Record<string, string> = { Accept: "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await axiosInstance.get<Gathering[]>(
    `/gatherings?${queryString}`,
    { headers },
  );
  // console.log('서버 응답 전체:', response.data);

  return response.data;
}

/**
 * 서버에 새로운 모임을 생성합니다.
 * @param data - 모임 생성 폼 데이터
 * @returns 생성된 모임 정보
 */
export async function createGathering(
  data: CreateGatheringForm
): Promise<Gathering> {
  const response = await axiosInstance.post<Gathering>(
    '/gatherings',
    data,
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response.data;
}