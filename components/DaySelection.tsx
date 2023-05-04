import moment from 'moment';

import useStore from '@/stores/date';

import Worktime from '@/interfaces/worktime';

type Props = {
	worktime: Worktime | null;
};

const DayNavigation = ({ worktime }: Props) => {
	const { date: selectedDay, selectDay } = useStore();

	const handleSelectDate = (day: moment.Moment) => {
		selectDay(day);
	};

	return (
		<div className='flex justify-between items-center space-x-2'>
			{worktime?.days?.map((day) => {
				const date = moment(day.date);
				const value = date;
				const isCurrentDay = date.isSame(moment(), 'day');
				const isPastDay = date.isBefore(moment(), 'day');
				const emoji = day.emoji;
				const hoursDone = moment.utc(
					moment.duration(day.hours_done, 'hours').asMilliseconds()
				);

				return (
					<div
						key={value.unix()}
						onClick={() => handleSelectDate(value)}
						className={`grow p-2 flex flex-col items-center cursor-pointer space-y-1 bg-white rounded-xl shadow  ${
							value.date() === selectedDay.date()
								? '-outline-offset-2 outline outline-3 outline-pink'
								: ''
						}`}
					>
						<span
							className={`font-semibold text-base ${
								isCurrentDay ? 'text-pink' : 'text-gray'
							}`}
						>
							{value.format('DD')}
						</span>

						<span className='text-2xl'>{emoji}</span>

						<div
							className={`flex flex-col items-center ${
								isPastDay || isCurrentDay ? 'text-blue' : 'text-gray'
							}`}
						>
							<span className='font-semibold text-2xl capitalize'>
								{value.format('dd')}
							</span>

							<span className='font-semibold'>{hoursDone.format('HH:mm')}</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default DayNavigation;
