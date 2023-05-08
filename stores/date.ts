import moment from 'moment';
import { create } from 'zustand';

import Worktime from '@/interfaces/worktime';

interface DateState {
  week: number;
  incWeek: () => void;
  decWeek: () => void;

  date: moment.Moment;
  setDate: (date: moment.Moment) => void;

  worktime: Worktime;
  setWorktime: (worktime: Worktime) => void;
}

const dateStore = create<DateState>(set => ({
  week: moment().week(),
  incWeek: () =>
    set(({ week }) => ({
      date: moment()
        .week(week + 1)
        .startOf('week'),
      week: week + 1,
    })),
  decWeek: () =>
    set(({ week }) => ({
      date: moment()
        .week(week - 1)
        .startOf('week'),
      week: week - 1,
    })),

  date: moment(),
  setDate: (date: moment.Moment) =>
    set(() => ({
      date,
      week: date.week(),
    })),

  worktime: {} as Worktime,
  setWorktime: (worktime: Worktime) =>
    set(() => ({
      worktime,
    })),
}));

export default dateStore;
