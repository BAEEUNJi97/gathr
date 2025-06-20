import { FilterProvider } from '@/contexts/FilterContext'; // FilterProvider 임포트
import GatheringListPage from '@/components/gatherings/list/GatheringListPage';

export default function HomePage() {
  return (

    <FilterProvider>
      
      {/* 이 부분에 FilterProvider로 감싸는 자식 컴포넌트 */}
      <GatheringListPage />
    </FilterProvider>
  );
}