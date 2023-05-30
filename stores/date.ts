import { create } from 'zustand';

import Day from '@/interfaces/day';
import moment from '@/libs/moment.config';

interface DateState {
  weekNumber: number;
  setWeekNumber: (weekNumber: number) => void;

  day: Day | undefined;
  setDay: (day: Day) => void;
}

const useDateStore = create<DateState>(set => ({
  weekNumber: moment().week(),
  setWeekNumber: weekNumber => set({ weekNumber }),

  day: undefined,
  setDay: day => set({ day }),
}));

export default useDateStore;
