import { useQuery } from 'react-query';
import moment from 'moment';

import Worktime from '@/interfaces/worktime';

import useStore from '@/stores/date';
import { useEffect, useState } from 'react';

const WeekHours = () => {
	const { week } = useStore();

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

	const haveToJustify = worktime
		? worktime.need_justification &&
		  moment().week(worktime.week_number).day(5).isSameOrBefore(moment())
		: false;

	return (
		<div className='py-3 px-4 flex justify-between items-center bg-background rounded-xl'>
			<div>
				<span>Heures</span>
				<div className='-my-1 font-semibold'>
					<span className='text-2xl'>{worktime?.hours_done}</span>
					<span className='text-base'> / {worktime?.hours_todo}</span>
				</div>
			</div>

			<div className='flex space-x-3'>
				{haveToJustify && (
					<span className='p-2 bg-white rounded-full'>
						<img
							src='/emojies/thinkingFace.svg'
							alt='emoji'
							className='h-6 w-6'
						/>
					</span>
				)}

				<button
					className={`py-1 px-5 rounded-lg font-semibold text-xl ${
						haveToJustify
							? 'bg-pink hover:bg-pink-dark text-white'
							: 'bg-white hover:outline outline-3 outline-westar'
					}`}
				>
					Justifier
				</button>
			</div>
		</div>
	);
};

export default WeekHours;
