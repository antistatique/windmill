import moment from 'moment';
import { create } from 'zustand';

import Day from '@/interfaces/day';
import Week from '@/interfaces/week';

interface DateState {
  day: Day | undefined;
  setDay: (day: Day) => void;

  week: Week;
  setWeek: (week: Week) => void;
}

const useDateStore = create<DateState>(set => ({
  day: undefined,
  setDay: (day: Day) =>
    set(() => ({
      day,
    })),

  week: { week_number: moment().week() } as Week,
  setWeek: (week: Week) =>
    set(state => {
      let day;

      // If it's the same week, keep the current day
      if (day && week.week_number === state.week?.week_number) {
        day = state.day;
      }
      // If it's the current week, set the current day
      else if (week?.week_number === moment().week()) {
        day = week?.days.find((d: Day) =>
          moment(d.date).isSame(moment(), 'day')
        );
      }

      return {
        day: day ?? week?.days[0],
        week,
      };
    }),
}));

export default useDateStore;
