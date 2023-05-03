import Summary from '@/interfaces/summary';
import { useEffect, useState } from 'react';

const Dashboard = () => {
	const [summary, setSummary] = useState({} as Summary);

	useEffect(() => {
		fetch('/api/summary')
			.then((res) => res.json())
			.then((data) => {
				setSummary(data);
				console.log(data);
			});
	}, []);

	const remainingVacationDays = summary.vacation_sold - summary.vacation;
	const remainingOverTimeDays = summary.remaining_overtime / 8.4;

	return (
		<main>
			<div className='h-64 flex flex-col items-center justify-center text-center bg-pink text-white text-lg font-semibold space-y-4'>
				<h2 className='text-4xl'>{summary?.name}</h2>

				<span className='py-2 px-4 bg-yellow rounded-xl text-black'>
					{`Il te reste ${summary?.remaining_days_to_take} ${
						summary.remaining_days_to_take > 1 ? 'jours' : 'jour'
					} à poser`}
				</span>

				<div>
					<p>
						{`${remainingVacationDays} ${
							remainingVacationDays > 1 ? 'jours' : 'jour'
						} de vacances`}
					</p>
					<p>
						{`${remainingOverTimeDays.toFixed(2)} ${
							remainingOverTimeDays > 1 ? 'jours' : 'jour'
						}
						(${summary.remaining_overtime}h) supplémentaires`}
					</p>
				</div>
			</div>
		</main>
	);
};

export default Dashboard;
