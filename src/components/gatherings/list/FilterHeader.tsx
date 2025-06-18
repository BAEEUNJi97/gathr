"use client";

import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';
import { GatheringFilters, GatheringType } from '@/types/gathering';
import { ChevronDown } from 'lucide-react';

interface Props {
  filters: GatheringFilters;
  setFilters: Dispatch<SetStateAction<GatheringFilters>>;
  openModal: () => void;
}

const MAIN_TYPES = [
  GatheringType.DALLAEM_FIT,
  GatheringType.WORKATION,
] as const;

const SUB_TYPES = [
  undefined,
  GatheringType.OFFICE_STRETCHING,
  GatheringType.MINDFULNESS,
] as const;

const LOCATIONS = [
  '전체',
  '건대입구',
  '을지로3가',
  '신림',
  '홍대입구',
] as const;

const SORT_OPTIONS = [
  { value: 'registrationEnd', label: '마감 임박' },
  { value: 'participantCount', label: '참여 인원 순' },
  { value: 'dateTime', label: '모임 날짜' },
] as const;

type SortValue = typeof SORT_OPTIONS[number]['value'];

export default function FilterHeader({ filters, setFilters, openModal }: Props) {
  const { token } = useContext(AuthContext);
  const isLoggedIn = Boolean(token);
  const [locOpen, setLocOpen] = useState(false);

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">지금 모임에 참여해보세요</h2>
          <p className="text-sm text-gray-500 mt-1">함께 할 사람이 없나요?</p>
        </div>
        {isLoggedIn && (
          <button
            onClick={openModal}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            모임 만들기
          </button>
        )}
      </div>

      <nav className="flex gap-4 mb-4 border-b pb-2">
        {MAIN_TYPES.map((type) => (
          <button
            key={type}
            className={`text-sm font-medium pb-1 transition-colors duration-200 ${
              filters.type === type
                ? 'text-black border-b-2 border-black'
                : 'text-gray-400 border-b-2 border-transparent'
            }`}
            onClick={() => setFilters(prev => ({ ...prev, type, subType: undefined }))}
          >
            {type === GatheringType.DALLAEM_FIT ? '달램핏' : '워케이션'}
          </button>
        ))}
      </nav>

      <div className="flex flex-wrap gap-2 mb-4">
        {SUB_TYPES.map((subType) => (
          <button
            key={String(subType)}
            className={`px-4 py-2 rounded ${
              filters.subType === subType
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setFilters(prev => ({ ...prev, subType }))}
          >
            {subType === undefined
              ? '전체'
              : subType === GatheringType.OFFICE_STRETCHING
              ? '오피스 스트레칭'
              : '마인드풀니스'}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            className="flex items-center px-4 py-2 border rounded text-sm bg-white"
            onClick={() => setLocOpen(open => !open)}
          >
            {filters.location || '전체'}
            <ChevronDown className="ml-2" size={16} />
          </button>
          {locOpen && (
            <ul className="absolute mt-1 bg-white border rounded shadow-lg w-full z-10">
              {LOCATIONS.map(loc => (
                <li
                  key={loc}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    setFilters(prev => ({
                      ...prev,
                      location: loc === '전체' ? '' : loc,
                    }));
                    setLocOpen(false);
                  }}
                >
                  {loc}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="date"
          className="px-3 py-2 border rounded text-sm"
          value={filters.date}
          onChange={e => setFilters(prev => ({ ...prev, date: e.target.value }))}
        />

        <select
          className="px-3 py-2 border rounded text-sm"
          value={filters.sortBy}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFilters(prev => ({
              ...prev,
              sortBy: e.target.value as SortValue,
            }))
          }
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
