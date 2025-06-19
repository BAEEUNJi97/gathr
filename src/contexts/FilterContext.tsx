"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { GatheringFilters } from "@/types/gathering";

interface FilterContextType {
  filters: GatheringFilters;
  setFilters: Dispatch<SetStateAction<GatheringFilters>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<GatheringFilters>({
    mainTab: "DALLEM",
    subTab: "", // 전체보기(서브탭 X)
    location: "",
    date: "",
    sortBy: "dateTime",
    sortOrder: "desc",
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters(): FilterContextType {
  const context = useContext(FilterContext);
  if (!context)
    throw new Error("useFilters must be used within a FilterProvider");
  return context;
}
