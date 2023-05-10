import moment from 'moment';
import { create } from 'zustand';

import Day from '@/interfaces/day';
import Week from '@/interfaces/week';

interface DateState {
  weekNumber: number;
  incWeek: () => void;
  decWeek: () => void;

  day: Day | undefined;
  setDay: (day: Day) => void;

  week: Week;
  setWeek: (week: Week) => void;
}

const useDateStore = create<DateState>(set => ({
  weekNumber: moment().week(),
  incWeek: () =>
    set(({ weekNumber }) => ({
      weekNumber: weekNumber + 1,
    })),
  decWeek: () =>
    set(({ weekNumber }) => ({
      weekNumber: weekNumber - 1,
    })),

  day: undefined,
  setDay: (day: Day) =>
    set(() => ({
      day,
      weekNumber: moment(day.date).week(),
    })),

  week: {} as Week,
  setWeek: (week: Week) =>
    set(state => {
      // If the week number is the same, keep the current day
      let day =
        week.week_number === state.week.week_number ? state.day : week.days[0];

      // Set the current day the first time
      if (!state.day) {
        const currentDate = moment();
        const currentDay = week.days.find((d: Day) =>
          moment(d.date).isSame(currentDate, 'day')
        );

        if (currentDay) day = currentDay;
      }

      return {
        day,
        week,
      };
    }),
}));

export default useDateStore;
