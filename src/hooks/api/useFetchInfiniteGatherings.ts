import { useQuery } from '@tanstack/react-query';
import { getGatherings } from '@/services/gatheringService';
import type { Gathering, GatheringFilters, GatheringListApiParams } from '@/types/gathering';

/**
 * 전체 모임 데이터를 한 번에 불러오는 훅 (가짜 무한스크롤용)
 * @param filters - 화면용 필터 객체
 * @param enabled - API 호출 활성화 여부
 */
export function useFetchInfiniteGatherings(
  filters: GatheringFilters,
  enabled: boolean = true
) {
  const query = useQuery<Gathering[], Error>({
    queryKey: ['gatherings', filters],
    queryFn: () => {
      // 화면 필터 → API 파라미터로 매핑
      const params: GatheringListApiParams = {
       // 빈 문자열이면 undefined
        type: filters.subTab || undefined,
        location: filters.location || undefined,
        date: filters.date || undefined,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      };
      return getGatherings(params);
    },
    enabled,
  });

  return {
    gatherings: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
