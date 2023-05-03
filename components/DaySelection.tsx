import moment from 'moment';

import useWeek from '@/stores/week';

export default function DayNavigation() {
	const { week } = useWeek();

	const firstDay = moment().week(week).startOf('week');
	const days = [...Array(5)].map((_, index) => {
		return {
			value: moment(firstDay).add(index, 'days'),
			emoji: '/emojies/workDay.svg',
			hoursWorked: Math.floor(Math.random() * 9 * 100) / 100,
		};
	});

	const handleSelectDate = (day: moment.Moment) => {
		console.log(day);
	};

	return (
		<div className='flex justify-between items-center space-x-2'>
			{days.map((day) => (
				<div
					key={day.value.unix()}
					onClick={() => handleSelectDate(day.value)}
					className='w-24 p-2 flex flex-col items-center cursor-pointer space-y-1 bg-white rounded-xl shadow'
				>
					<span className='font-semibold text-base text-gray'>
						{day.value.format('DD')}
					</span>

					<img src={day.emoji} alt='emoji' className='h-6 w-6' />

					<span className='font-semibold text-2xl capitalize'>
						{day.value.format('dd')}
					</span>

					<span className='font-semibold'>
						{moment.utc(day.hoursWorked * 60 * 60 * 1000).format('HH:mm')}
					</span>
				</div>
			))}
		</div>
	);
}
