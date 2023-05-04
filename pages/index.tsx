import 'moment/locale/fr';

import useStore from '@/stores/date';

import WeekNavigation from '@/components/WeekNavigation';
import WeekHours from '@/components/WeekHours';
import DaySelection from '@/components/DaySelection';

const Index = () => {
	const { date, week } = useStore();

	return (
		<main className='space-y-4'>
			<div className='bg-white shadow'>
				<div className='p-8'>
					<WeekNavigation />
				</div>
				<div className='p-4'>
					<WeekHours />
				</div>
			</div>

			<div className='p-4'>
				<DaySelection />
			</div>

			{/* Dev */}
			<span className='block'>
				{date.locale('fr').format('dddd Do MMMM YYYY')}
			</span>
			<span className='block'>{week}</span>
			{/* Dev */}
		</main>
	);
};

export default Index;
