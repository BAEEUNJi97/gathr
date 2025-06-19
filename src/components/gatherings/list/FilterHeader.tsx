import { useFilters } from '@/contexts/FilterContext';
import { MAIN_TAB_TYPE_MAP, GatheringType, MainTab, GATHERING_LABEL_MAP } from '@/types/gathering';
import { ChevronDown, Sun, Umbrella } from 'lucide-react';
import {  useState } from 'react';
import CreateMeetingButtonWithModal from '@/components/common/CreateMeetingButtonWithModal';

function getDateLabel(date: string) {
  if (!date) return "날짜 전체";
  const [, mm, dd] = date.split('-');
  return `${Number(mm)}월 ${Number(dd)}일`;
}

export default function FilterHeader() {
  const { filters, setFilters } = useFilters();

  // 메인탭 선택
  const handleMainTab = (tab: MainTab) => {
    setFilters((prev) => ({
      ...prev,
      mainTab: tab,
      subTab: '',
    }));
  };

  // 서브탭 목록
  const subTabTypes: GatheringType[] = [...MAIN_TAB_TYPE_MAP[filters.mainTab]];

  // 서브탭 선택
  const handleSubTab = (type: GatheringType | "") => {
    setFilters((prev) => ({
      ...prev,
      subTab: prev.subTab === type ? "" : type,
    }));
  };

  // 지역/날짜/정렬 필터
    const handleLocation = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFilters((prev) => ({
      ...prev,
      location: e.target.value as "" | "건대입구" | "을지로3가" | "신림" | "홍대입구",
    }));

 const handleDate = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilters((prev) => ({
      ...prev,
      date: e.target.value,
    }));

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFilters((prev) => ({
      ...prev,
      sortBy: e.target.value as "dateTime" | "registrationEnd" | "participantCount",
      sortOrder: e.target.value === 'dateTime' ? 'desc' : 'asc',
    }));

  // 날짜 필터 버튼을 위한 상태
   const [datePickerOpen, setDatePickerOpen] = useState(false);

  return (
    <div className="mb-8">
      {/* 인트로 문구 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-orange-50 w-14 h-14 flex items-center justify-center text-3xl">
            <span role="img" aria-label="함께달램">🤗</span>
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">함께 할 사람이 없나요?</div>
            <div className="text-xl md:text-2xl font-bold text-gray-900 mt-1">지금 모임에 참여해보세요</div>
          </div>
        </div>
        <CreateMeetingButtonWithModal />
      </div>

      {/* 메인탭 */}
      <div className="flex gap-8 mb-4">
        <button
          className={`flex items-center gap-1 px-0 pb-1 text-base font-semibold border-b-2 transition ${
            filters.mainTab === 'DALLEM'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-gray-400'
          }`}
          onClick={() => handleMainTab('DALLEM')}
        >
          달램핏
          <Sun className="w-4 h-4 ml-1" />
        </button>
        <button
          className={`flex items-center gap-1 px-0 pb-1 text-base font-semibold border-b-2 transition ${
            filters.mainTab === 'WORKATION'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-gray-400'
          }`}
          onClick={() => handleMainTab('WORKATION')}
        >
          워케이션
          <Umbrella className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* 서브탭 */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filters.subTab === '' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
          }`}
          onClick={() => handleSubTab("")}
        >
          전체
        </button>
        {subTabTypes.map((type) => (
          <button
            key={type}
            type="button"
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filters.subTab === type ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => handleSubTab(type)}
          >
            {GATHERING_LABEL_MAP[type]}
          </button>
        ))}
      </div>

      {/* 필터/정렬 */}
      <div className="flex gap-2 items-center mb-3">
        {/* 지역 */}
        <div className="relative">
          <select
            value={filters.location}
            onChange={handleLocation}
            className="appearance-none border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm w-32 pr-6 focus:ring-2 focus:ring-main-500 transition"
          >
            <option value="">지역 전체</option>
            <option value="건대입구">건대입구</option>
            <option value="을지로3가">을지로3가</option>
            <option value="신림">신림</option>
            <option value="홍대입구">홍대입구</option>
          </select>
          <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        {/* 날짜 (라벨+date picker) */}
        <div className="relative">
          <button
            type="button"
            className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm w-32 flex items-center justify-between"
            onClick={() => setDatePickerOpen(true)}
          >
            {getDateLabel(filters.date)}
            <ChevronDown className="w-4 h-4 ml-1 text-gray-400" />
          </button>
          {/* 날짜 선택: 실제 date picker가 아니라면 아래 인풋 참고 */}
          {datePickerOpen && (
            <input
              type="date"
              value={filters.date}
              onChange={e => { handleDate(e); setDatePickerOpen(false); }}
              onBlur={() => setDatePickerOpen(false)}
              className="absolute left-0 top-10 z-10 border px-2 py-1 bg-white rounded"
              autoFocus
            />
          )}
        </div>
        {/* 정렬(최신순/마감임박/참여인원순) */}
        <div className="relative">
          <select
            value={filters.sortBy}
            onChange={handleSort}
            className="appearance-none border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm w-32 pr-6 focus:ring-2 focus:ring-main-500 transition"
          >
            <option value="dateTime">최신순</option>
            <option value="registrationEnd">마감 임박</option>
            <option value="participantCount">참여 인원순</option>
          </select>
          <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
