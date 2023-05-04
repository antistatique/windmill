import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import 'moment/locale/fr';

import useStore from '@/stores/date';

import Worktime from '@/interfaces/worktime';

import WeekNavigation from '@/components/WeekNavigation';
import WeekHours from '@/components/WeekHours';
import DaySelection from '@/components/DaySelection';

const Index = () => {
	const { date, week } = useStore();

	const [index, setIndex] = useState(0);
	const summaryQuery = useQuery('summary', async () => {
		const response = await fetch('/api/summary');
		const data = await response.json();
		return data.index;
	});

	const [worktime, setWorktime] = useState<Worktime | null>(null);
	const worktimeQuery = useQuery(['worktime', week], async () => {
		if (!index) {
			return;
		}

		const response = await fetch(`/api/worktime/${week}?index=${index}`);
		const data = await response.json();
		return data;
	});

	useEffect(() => {
		const storedIndex = localStorage.getItem('index');

		if (storedIndex) {
			setIndex(Number(storedIndex));
		} else if (summaryQuery.data) {
			localStorage.setItem('index', summaryQuery.data);
			setIndex(summaryQuery.data);
		}

		worktimeQuery.refetch();
		setWorktime(worktimeQuery.data!);
	}, [summaryQuery.data, worktimeQuery.data]);

	return (
		<main className='space-y-4'>
			<div className='bg-white shadow'>
				<div className='p-8'>
					<WeekNavigation />
				</div>
				<div className='p-4'>
					<WeekHours worktime={worktime} />
				</div>
			</div>

			<div className='p-4'>
				<DaySelection worktime={worktime} />
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
