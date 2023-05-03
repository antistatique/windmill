import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

import useStore from '@/stores/date';

const WeekNavigation = () => {
	const { date, week, inc, dec } = useStore();

	const canGoToPreviousWeek = week - 1 > 0;
	const canGoToNextWeek = week + 1 <= date.weeksInYear();

	const handlePreviousWeek = () => {
		if (canGoToPreviousWeek) dec();
	};

	const handleNextWeek = () => {
		if (canGoToNextWeek) inc();
	};

	return (
		<div className='flex justify-between items-center'>
			<button
				type='button'
				onClick={handlePreviousWeek}
				disabled={!canGoToPreviousWeek}
				className={`h-12 w-12 flex justify-center items-center text-gray ${
					canGoToPreviousWeek ? 'hover:text-blue' : ''
				}`}
			>
				<GoChevronLeft className='h-6 w-6' />
			</button>

			<div className='flex flex-col items-center'>
				<span className='text-xl font-semibold capitalize'>
					{date.locale('fr').format('MMMM YYYY')}
				</span>
				<span className='text-sm'>Semaine {week}</span>
			</div>

			<button
				type='button'
				onClick={handleNextWeek}
				disabled={!canGoToNextWeek}
				className={`h-12 w-12 flex justify-center items-center text-gray ${
					canGoToNextWeek ? 'hover:text-blue' : ''
				}`}
			>
				<GoChevronRight className='h-6 w-6' />
			</button>
		</div>
	);
};

export default WeekNavigation;
