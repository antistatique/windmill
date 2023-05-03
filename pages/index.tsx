import 'moment/locale/fr';

import WeekNavigation from '@/components/WeekNavigation';
import DaySelection from '@/components/DaySelection';

const Index = () => {
	return (
		<main className='space-y-4'>
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
