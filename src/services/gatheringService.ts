// src/services/gatheringService.ts
import axiosInstance from '@/lib/axiosInstance';
import { Gathering, GatheringFilters, CreateGatheringForm } from '@/types/gathering';

/**
 * 서버에서 모임 목록을 조회합니다.
 * subType은 서버에서 지원하지 않으므로 클라이언트 필터링으로 처리합니다.
 * @param filters - 필터 조건
 * @param token - 인증 토큰(optional)
 * @returns 모임 목록 배열
 */
export async function getGatherings(
  filters: GatheringFilters,
  token?: string
): Promise<Gathering[]> {
  // 서버에 전달할 필터 중 subType 제외
  const { subType, ...rest } = filters;

  // 빈 값(null, undefined, '') 제거
  const params = Object.entries(rest)
    .filter(([, v]) => v != null && v !== '')
    .reduce<Record<string, string>>((acc, [k, v]) => {
      acc[k] = String(v);
      return acc;
    }, {});

  // 정렬 키 매핑 (프론트 sortBy → 백엔드 필드명)
  const sortMap: Record<string, string> = {
    dateTime: 'dateTime',
    participants: 'participantCount',
    deadline: 'joinedAt',
  };
  const sortKey = filters.sortBy && sortMap[filters.sortBy]
    ? sortMap[filters.sortBy]
    : sortMap.dateTime;
  params.sortBy = sortKey;

  // query string 생성
  const queryString = new URLSearchParams(params).toString();
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await axiosInstance.get<Gathering[]>(
    `/gatherings?${queryString}`,
    { headers }
  );

  // subType이 지정된 경우, 클라이언트에서 추가 필터링
  let list = response.data;
  if (subType) {
    list = list.filter(item => item.subType === subType);
  }
  return list;
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
