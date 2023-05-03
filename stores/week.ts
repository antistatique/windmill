import { create } from 'zustand';
import moment from 'moment';

interface WeekState {
	date: moment.Moment;
	week: number;
	inc: () => void;
	dec: () => void;
}

const weekStore = create<WeekState>((set) => ({
	date: moment().startOf('week'),
	week: moment().week(),
	inc: () =>
		set((state: any) => ({
			date: state.date.add(1, 'week'),
			week: state.week + 1,
		})),
	dec: () =>
		set((state: any) => ({
			date: state.date.subtract(1, 'week'),
			week: state.week - 1,
		})),
}));

export default weekStore;
