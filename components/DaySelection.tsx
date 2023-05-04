import moment from 'moment';

import useStore from '@/stores/date';

import Worktime from '@/interfaces/worktime';

type Props = {
	worktime: Worktime | null;
};

const DayNavigation = ({ worktime }: Props) => {
	const { date, week, selectDay } = useStore();

	const days = worktime?.days.map((day) => ({
		value: moment(day.date),
		emoji: day.emoji,
		hoursWorked: day.hours,
	}));

	const handleSelectDate = (day: moment.Moment) => {
		selectDay(day);
	};

	return (
		<div className='flex justify-between items-center space-x-2'>
			{days?.map((day) => (
				<div
					key={day.value.unix()}
					onClick={() => handleSelectDate(day.value)}
					className={`grow p-2 flex flex-col items-center cursor-pointer space-y-1 bg-white rounded-xl shadow  ${
						day.value.date() === date.date()
							? '-outline-offset-2 outline outline-3 outline-pink'
							: ''
					}`}
				>
					<span className='font-semibold text-base text-gray'>
						{day.value.format('DD')}
					</span>

					{day.emoji}
					{/* 
					<img src={day.emoji} alt='emoji' className='h-6 w-6' />
					 */}

					<span className='font-semibold text-2xl capitalize'>
						{day.value.format('dd')}
					</span>

					<span className='font-semibold'>{day.hoursWorked}</span>
				</div>
			))}
		</div>
	);
};

export default DayNavigation;
