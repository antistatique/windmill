import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { DEFAULT_NUDGE_MINUTES } from '@/configs/worktime';

interface ParameterState {
  nudge: number;
  setNudge: (nudge: number) => void;

  worktime: string[];
  setWorktime: (worktime: string[]) => void;
}

const useParameterStore = create<ParameterState>()(
  persist(
    set => ({
      nudge: DEFAULT_NUDGE_MINUTES,
      setNudge: (nudge: number) => set({ nudge }),

      worktime: ['', '', '', ''],
      setWorktime: (worktime: string[]) => set({ worktime }),
    }),
    {
      name: 'params',
    }
  )
);

export default useParameterStore;
