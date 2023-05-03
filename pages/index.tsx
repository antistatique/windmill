import 'moment/locale/fr';

import WeekNavigation from '@/components/WeekNavigation';
import DaySelection from '@/components/DaySelection';

import useStore from '@/stores/date';

const Index = () => {
	const { date, week } = useStore();

	return (
		<main className='space-y-4'>
			<span className='block'>{date.locale('fr').format('dddd Do MMMM YYYY')}</span>
			<span className='block'>{week}</span>

			<div className='p-8 bg-white shadow'>
				<WeekNavigation />
			</div>

			<div className='p-4'>
				<DaySelection />
			</div>
		</main>
	);
};

export default Index;
