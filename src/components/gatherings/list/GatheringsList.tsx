import { useFilters } from "@/contexts/FilterContext";
import { Gathering } from "@/types/gathering";
import { useEffect, useRef, useState } from "react";
import { getGatherings } from "@/services/gatheringService";
import { MAIN_TAB_TYPE_MAP } from "@/types/gathering";
import GatheringCard from "./GatheringCard";
import EmptyMessage from "./EmptyMessage";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function GatheringsList() {
  const { filters } = useFilters();
  const [gatherings, setGatherings] = useState<Gathering[]>([]);
  const [loading, setLoading] = useState(true);

  // 무한스크롤 관리 state
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const pageSize = 10;
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // 데이터 fetch & 필터 바뀌면 currentPage 초기화
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      if (filters.subTab) {
        const params = {
          type: filters.subTab,
          location: filters.location,
          date: filters.date,
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder,
        };
        const data = await getGatherings(params);
        setGatherings(data);
        setLoading(false);
        setCurrentPage(1);
        return;
      }

      const typeArr = MAIN_TAB_TYPE_MAP[filters.mainTab];
      const results = await Promise.all(
        typeArr.map((t) =>
          getGatherings({
            type: t,
            location: filters.location,
            date: filters.date,
            sortBy: filters.sortBy,
            sortOrder: filters.sortOrder,
          })
        )
      );
      // 중복 제거
      const merged = results.flat().filter(
        (item, idx, arr) => arr.findIndex((g) => g.id === item.id) === idx
      );
      setGatherings(merged);
      setLoading(false);
      setCurrentPage(1);
    };
    fetch();
  }, [filters]);

  // IntersectionObserver로 바닥 감지 (가짜 딜레이)
  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetchingMore) {
        setIsFetchingMore(true);
        setTimeout(() => {
          setCurrentPage((prev) => {
            if (prev * pageSize >= gatherings.length) return prev;
            return prev + 1;
          });
          setIsFetchingMore(false);
        }, 800); // 0.8초 정도 UX용 가짜 로딩
      }
    });
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [gatherings.length, pageSize, isFetchingMore]);

  if (loading) return <LoadingSpinner />;
  if (!gatherings.length) return <EmptyMessage />;

  const visibleGatherings = gatherings.slice(0, currentPage * pageSize);

  return (
    <div className="flex flex-col gap-6 py-12">
      {visibleGatherings.map((item) => (
        <GatheringCard key={item.id} gathering={item} />
      ))}
      {/* 가짜 로딩 중에만 스피너 보여줌 */}
      {isFetchingMore && <LoadingSpinner />}
      {/* 마지막에만 loadMoreRef div 노출 */}
      {visibleGatherings.length < gatherings.length && (
        <div ref={loadMoreRef} style={{ height: 48 }} />
      )}
    </div>
  );
}
