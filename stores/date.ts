import moment from 'moment';
import { create } from 'zustand';

interface DateState {
  date: moment.Moment;
  week: number;
  inc: () => void;
  dec: () => void;
  selectDay: (date: moment.Moment) => void;
}

const dateStore = create<DateState>(set => ({
  date: moment(),
  week: moment().week(),
  inc: () =>
    set(({ week }) => ({
      date: moment()
        .week(week + 1)
        .startOf('week'),
      week: week + 1,
    })),
  dec: () =>
    set(({ week }) => ({
      date: moment()
        .week(week - 1)
        .startOf('week'),
      week: week - 1,
    })),
  selectDay: (date: moment.Moment) =>
    set(() => ({
      date,
      week: date.week(),
    })),
}));

export default dateStore;
