import React from 'react';
import { useQuery } from 'react-query';
import Head from 'next/head';

import Section from '@/components/dashboard/Section';
import Skeleton from '@/components/dashboard/Skeleton';
import {
  FORMATION_BUDGET,
  FORMATION_EXPENSE_BUDGET,
  HOURS_PER_DAY,
} from '@/configs/dashboard';
import pluralize from '@/helpers/pluralize';

const Dashboard = () => {
  const { data: summary, isLoading } = useQuery('summary', async () => {
    const response = await fetch('/api/summary');
    const data = await response.json();
    return data;
  });

  const remainingVacationDays = summary
    ? summary.vacation_sold - summary.vacation
    : 0;
  const remainingOverTimeDays = summary
    ? summary.remaining_overtime / HOURS_PER_DAY
    : 0;

  const currentYear = new Date().getFullYear();

  return (
    <>
      <Head>
        <title>Windmill - Dashboard</title>
        <meta name="description" content="Résumé des congés" />
      </Head>

      <main className="space-y-8 pb-4">
        {isLoading ? (
          <Skeleton />
        ) : (
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
                {`${pluralize(
                  Number(remainingOverTimeDays.toFixed(2)),
                  'jour'
                )} 
                (${summary.remaining_overtime}h) supplémentaires`}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-8 px-4">
          <Section
            label="Budget congés / vacances"
            items={[
              {
                label: `Budget année en cours ${currentYear}`,
                value: summary?.vacation_sold,
                metric: 'j',
              },
              {
                label: `Solde année précedente ${currentYear - 1}`,
                value: summary?.previous_year_vacation_sold,
                metric: 'j',
              },
              {
                label: 'Heures supplémentaires totales',
                value: summary?.remaining_overtime,
                metric: 'h',
              },
            ]}
          />
          <Section
            label="Consommées"
            items={[
              {
                label: 'Vacances posées',
                value: summary?.vacation,
                metric: 'j',
              },
              {
                label: 'Jours supplémentaires récupérés',
                value: summary?.overtime,
                metric: 'j',
              },
            ]}
          />
          <Section
            label="Indicatifs"
            items={[
              {
                label: 'Absences justifiées',
                value: '',
                metric: 'j',
              },
              {
                label: 'Temps de formation',
                value: summary?.formation,
                metric: `/ ${FORMATION_BUDGET}`,
              },
              {
                label: 'Budget de formation CHF',
                value: summary?.formation_expenses,
                metric: `/ ${FORMATION_EXPENSE_BUDGET}`,
              },
            ]}
          />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
