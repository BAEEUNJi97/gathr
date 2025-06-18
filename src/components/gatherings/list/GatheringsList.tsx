'use client';

import { useRef, useState, useEffect } from 'react';
import { useFetchInfiniteGatherings } from '@/hooks/api/useFetchInfiniteGatherings';
import GatheringCard from './GatheringCard';
import LoadingSpinner from './LoadingSpinner';
import EmptyMessage from './EmptyMessage';
import { GatheringFilters, Gathering } from '@/types/gathering';

interface Props {
  filters: GatheringFilters;
  fetchFromApi?: boolean;
}

export default function GatheringsList({
  filters,
  fetchFromApi = true,
}: Props) {
  const {
    gatherings: allGatherings,
    isLoading,
    isError,
  } = useFetchInfiniteGatherings(filters, fetchFromApi);

  // 화면에 보일 아이템 수 (초기 10개)
  const [visibleCount, setVisibleCount] = useState(10);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver로 스크롤 끝 감지하여 visibleCount 증가
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => prev + 10);
        }
      },
      { rootMargin: '0px', threshold: 1.0 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <div className="text-center">데이터 로드 중 오류가 발생했습니다.</div>;
  if (allGatherings.length === 0)
    return <EmptyMessage />;

  // 전체 데이터에서 visibleCount 만큼만 잘라서 렌더링
  const visibleList: Gathering[] = allGatherings.slice(0, visibleCount);

  return (
    <div className="flex flex-col gap-4">
      {visibleList.map((g) => (
        <GatheringCard key={g.id} gathering={g} />
      ))}

      {/* 화면 하단에 닿으면 visibleCount를 +10 해 줌 */}
      <div ref={loadMoreRef} className="h-1" />
    </div>
  );
}
