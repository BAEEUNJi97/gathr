import { create } from 'zustand';
import { Gathering } from '@/types/gathering';

interface GatheringsState {
  gatherings: Gathering[];
  setGatherings: (data: Gathering[]) => void;
}

export const useGatheringsStore = create<GatheringsState>((set) => ({
  gatherings: [],
  setGatherings: (data) => set({ gatherings: data }),
}));
