import moment from 'moment';
import { create } from 'zustand';

import Day from '@/interfaces/day';
import Worktime from '@/interfaces/week';

interface DateState {
  weekNumber: number;
  incWeek: () => void;
  decWeek: () => void;

  day: Day | undefined;
  setDay: (day: Day) => void;

  worktime: Worktime;
  setWorktime: (worktime: Worktime) => void;
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

  worktime: {} as Worktime,
  setWorktime: (worktime: Worktime) =>
    set(state => {
      // If the week number is the same, keep the current day
      let day =
        worktime.week_number === state.worktime.week_number
          ? state.day
          : worktime.days[0];

      // Set the current day the first time
      if (!state.day) {
        const currentDate = moment();
        const currentDay = worktime.days.find((d: Day) =>
          moment(d.date).isSame(currentDate, 'day')
        );

        if (currentDay) day = currentDay;
      }

      return {
        day,
        worktime,
      };
    }),
}));

export default useDateStore;
