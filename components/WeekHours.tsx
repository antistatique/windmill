import { useQuery } from "react-query";

import Worktime from "@/interfaces/worktime";

import useStore from '@/stores/date';

const WeekHours = () => {
	const { week } = useStore();

	const worktimeQuery = useQuery(['worktime', week], () =>
		fetch(`/api/worktime/${week}`).then((res) => res.json())
	);
	const worktime: Worktime = worktimeQuery.data;

	return (
		<div className='py-3 px-4 flex justify-between items-center bg-background rounded-xl'>
			<div>
				<span>Heures</span>
				<div className='-my-1 font-semibold'>
					<span className='text-2xl'>{worktime?.hours_done}</span>
					<span className='text-base'> / {worktime?.hours_todo}</span>
				</div>
			</div>

			<button className='py-1 px-5 bg-white hover:outline outline-3 outline-westar rounded-lg font-semibold text-xl'>
				Justifier
			</button>
		</div>
	);
};

export default WeekHours;
