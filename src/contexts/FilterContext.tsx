import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { GatheringFilters, GatheringType } from '@/types/gathering';

interface FilterContextType {
  filters: GatheringFilters;
  setFilters: Dispatch<SetStateAction<GatheringFilters>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
  initialFilters?: Partial<GatheringFilters>;
}

export function FilterProvider({
  children,
  initialFilters,
}: FilterProviderProps) {
  const [filters, setFilters] = useState<GatheringFilters>({
    type: GatheringType.DALLAEM_FIT,
    subType: undefined,
    location: '',
    date: '',
    sortBy: 'dateTime',
    ...initialFilters,
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters(): FilterContextType {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
