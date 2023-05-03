import { useEffect, useState } from 'react';

import Summary from '@/interfaces/summary';
import pluralize from '@/helpers/pluralize';

import Section from '@/components/dashboard/Section';
import { useQuery } from 'react-query';

const Dashboard = () => {
	const summaryQuery = useQuery('summary', () =>
		fetch('/api/summary').then((res) => res.json())
	);
	const summary: Summary = summaryQuery.data;

	if (summaryQuery.isLoading) return <div>Loading...</div>;

	const remainingVacationDays = summary.vacation_sold - summary.vacation;
	const remainingOverTimeDays = summary.remaining_overtime / 8.4;

	const currentYear = new Date().getFullYear();

	const formation_budget = 5;
	const formation_expense_budget = 1200;

	return (
		<main>
			<div className='h-64 flex flex-col items-center justify-center text-center bg-pink text-white font-semibold space-y-4'>
				<h1 className='text-4xl'>{summary?.name}</h1>

				<span className='py-2 px-4 bg-yellow rounded-xl text-blue'>
					{`Il te reste ${pluralize(
						summary.remaining_days_to_take,
						'jour'
					)} à poser`}
				</span>

				<div>
					<p>{`${pluralize(remainingVacationDays, 'jour')} de vacances`}</p>
					<p>
						{`${pluralize(Number(remainingOverTimeDays.toFixed(2)), 'jour')} 
						(${summary.remaining_overtime}h) supplémentaires`}
					</p>
				</div>
			</div>

			<div className='py-6 px-3 space-y-8'>
				<Section
					label='Budget congés / vacances'
					items={[
						{
							label: `Budget année en cours ${currentYear}`,
							value: `${summary.vacation_sold} j`,
						},
						{
							label: `Solde année précedente ${currentYear - 1}`,
							value: `${summary.previous_year_vacation_sold} j`,
						},
						{
							label: 'Heures supplémentaires totales',
							value: `${summary.remaining_overtime} h`,
						},
					]}
				/>
				<Section
					label='Consommées'
					items={[
						{
							label: 'Vacances posées',
							value: `${summary.vacation} j`,
						},
						{
							label: 'Jours supplémentaires récupérés',
							value: `${summary.overtime} j`,
						},
					]}
				/>
				<Section
					label='Indicatifs'
					items={[
						{
							label: 'Absences justifiées',
							value: `${1} j`,
						},
						{
							label: 'Temps de formation',
							value: `${summary.formation} / ${formation_budget} j`,
						},
						{
							label: 'Budget de formation CHF',
							value: `${summary.formation_expenses} / ${formation_expense_budget}`,
						},
					]}
				/>
			</div>
		</main>
	);
};

export default Dashboard;
