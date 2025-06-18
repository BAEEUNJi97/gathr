// src/contexts/FilterContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { GatheringFilters } from '@/types/gathering';

const FilterContext = createContext<{
  filters: GatheringFilters;
  setFilters: React.Dispatch<React.SetStateAction<GatheringFilters>>;
} | null>(null);

// FilterProvider 컴포넌트에 children 속성 추가
export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<GatheringFilters>({
    type: 'DALLAEMFIT',
    subType: '',
    location: '건대입구',
    date: '',
    sortBy: 'dateTime',
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

// 필터를 사용하는 커스텀 훅
export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
