import { useEffect, useState } from 'react';

import Summary from '@/interfaces/summary';

import pluralize from '@/helpers/plurial';

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

	const currentYear = new Date().getFullYear();

	return (
		<main>
			<div className='h-64 flex flex-col items-center justify-center text-center bg-pink text-white font-semibold space-y-4'>
				<h1 className='text-4xl'>{summary?.name}</h1>

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

			<div className='py-6 px-3 space-y-6'>
				<div className='space-y-3'>
					<h2 className='font-semibold'>Budget congés / vacances</h2>

					<div className='bg-white rounded-xl divide-y divide-background shadow'>
						<div className='p-3 flex'>
							<span className='grow'>{`Budget année en cours ${currentYear}`}</span>
							<span className='font-semibold'>{`${summary.vacation_sold} j`}</span>
						</div>
						<div className='p-3 flex'>
							<span className='grow'>Solde année précedente 2022</span>
							<span className='font-semibold'>{`${summary.previous_year_vacation_sold} j`}</span>
						</div>
						<div className='p-3 flex'>
							<span className='grow'>Heures supplémentaires totales</span>
							<span className='font-semibold'>{`${summary.remaining_overtime} h`}</span>
						</div>
					</div>
				</div>

				<div className='space-y-3'>
					<h2 className='font-semibold'>Consommées</h2>

					<div className='bg-white rounded-xl divide-y divide-background shadow'>
						<div className='p-3 flex'>
							<span className='grow'>Vacances posées</span>
							<span className='font-semibold'>{`${summary.vacation} j`}</span>
						</div>
						<div className='p-3 flex'>
							<span className='grow'>Jours supplémentaires récupérés</span>
							<span className='font-semibold'>{`${summary.overtime} j`}</span>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Dashboard;
