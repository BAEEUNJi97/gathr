import { useFilters } from "@/contexts/FilterContext";
import { Gathering } from "@/types/gathering";
import { useEffect, useState } from "react";
import { getGatherings } from "@/services/gatheringService"; // 실제 API 서비스
import { MAIN_TAB_TYPE_MAP } from "@/types/gathering";
import GatheringCard from "./GatheringCard"; 
import EmptyMessage from "./EmptyMessage";
import LoadingSpinner from "@/components/common/LoadingSpinner";
;

export default function GatheringsList() {
  const { filters } = useFilters();
  const [gatherings, setGatherings] = useState<Gathering[]>([]);
  const [loading, setLoading] = useState(true);

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

    // 중복 제거!
    const merged = results.flat().filter(
      (item, idx, arr) => arr.findIndex((g) => g.id === item.id) === idx
    );
    setGatherings(merged);
    setLoading(false);
  };
  fetch();
}, [filters]);

  // location/date 등 filters로 이미 서버에서 필터링됨. 추가로 프론트에서 조건필터 원하면 여기에 && 추가

  if (loading) return <LoadingSpinner />;
  if (!gatherings.length) return <EmptyMessage />;

  return (
    <div className="flex flex-col gap-4">
      {gatherings.map((item) => (
        <GatheringCard key={item.id} gathering={item} />
      ))}
    </div>
  );
}
