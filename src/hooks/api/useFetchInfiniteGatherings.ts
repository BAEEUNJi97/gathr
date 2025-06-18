import { useQuery } from '@tanstack/react-query';
import { getGatherings } from '@/services/gatheringService';
import { Gathering, GatheringFilters } from '@/types/gathering';

/**
 * 전체 모임 데이터를 한 번에 불러오는 훅 (가짜 무한스크롤용)
 * @param filters - 서버에 전달할 필터 객체
 * @param enabled - API 호출 활성화 여부
 */
export function useFetchInfiniteGatherings(
  filters: GatheringFilters,
  enabled: boolean = true
) {
  const query = useQuery<Gathering[], Error>({
    queryKey: ['gatherings', filters],
    queryFn: () => getGatherings(filters),
    enabled,
  });

  return {
    gatherings: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
