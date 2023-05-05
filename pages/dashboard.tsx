import React from 'react';
import { useQuery } from 'react-query';

import Section from '@/components/dashboard/Section';
import pluralize from '@/helpers/pluralize';
import Summary from '@/interfaces/summary';

const Dashboard = () => {
  const summaryQuery = useQuery('summary', async () => {
    const response = await fetch('/api/summary');
    const data = await response.json();
    return data;
  });

  const summary: Summary = summaryQuery.data;

  if (summaryQuery.isLoading) return <div>Loading...</div>;

  const remainingVacationDays = summary.vacation_sold - summary.vacation;
  const remainingOverTimeDays = summary.remaining_overtime / 8.4;

  const currentYear = new Date().getFullYear();

  const formationBudget = 5;
  const formationExpenseBudget = 1200;

  return (
    <main>
      <div className="flex h-64 flex-col items-center justify-center space-y-4 bg-pink text-center font-semibold text-white">
        <h1 className="text-4xl">{summary?.name}</h1>

        <span className="rounded-xl bg-yellow px-4 py-2 text-blue">
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

      <div className="space-y-8 px-3 py-6">
        <Section
          label="Budget congés / vacances"
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
          label="Consommées"
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
          label="Indicatifs"
          items={[
            {
              label: 'Absences justifiées',
              value: `${1} j`,
            },
            {
              label: 'Temps de formation',
              value: `${summary.formation} / ${formationBudget} j`,
            },
            {
              label: 'Budget de formation CHF',
              value: `${summary.formation_expenses} / ${formationExpenseBudget}`,
            },
          ]}
        />
      </div>
    </main>
  );
};

export default Dashboard;
