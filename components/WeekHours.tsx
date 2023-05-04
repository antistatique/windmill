import moment from 'moment';

import Worktime from '@/interfaces/worktime';

type Props = {
	worktime: Worktime | null;
};

const WeekHours = ({worktime}: Props) => {
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
