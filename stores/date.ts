import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import Day from '@/interfaces/day';
import moment from '@/libs/moment.config';

interface DateState {
  weekNumber: number;
  setWeekNumber: (weekNumber: number) => void;

  day: Day | undefined;
  setDay: (day: Day) => void;
}

const useDateStore = create<DateState>()(
  persist(
    set => ({
      weekNumber: moment().week(),
      setWeekNumber: weekNumber => set({ weekNumber }),

      day: undefined,
      setDay: day => set({ day }),
    }),
    {
      name: 'date',
    }
  )
);

export default useDateStore;
