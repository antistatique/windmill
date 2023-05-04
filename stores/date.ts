import { create } from 'zustand';
import moment from 'moment';

interface DateState {
	date: moment.Moment;
	week: number;
	inc: () => void;
	dec: () => void;
	selectDay: (date: moment.Moment) => void;
}

const dateStore = create<DateState>((set) => ({
	date: moment(),
	week: moment().week(),
	inc: () =>
		set((state: any) => ({
			date: moment().week(state.week + 1).startOf('week'),
			week: state.week + 1,
		})),
	dec: () =>
		set((state: any) => ({
			date: moment().week(state.week - 1).startOf('week'),
			week: state.week - 1,
		})),
	selectDay: (date: moment.Moment) =>
		set(() => ({
			date: date,
			week: date.week(),
		})),
}));

export default dateStore;
