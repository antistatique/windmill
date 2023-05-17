import { useQuery } from 'react-query';
import Head from 'next/head';

import DaySelection from '@/components/DaySelection';
import TimeEntry from '@/components/TimeEntry';
import WeekHours from '@/components/WeekHours';
import WeekNavigation from '@/components/WeekNavigation';
import useDateStore from '@/stores/date';

import 'moment/locale/fr';

const Index = () => {
  const { weekNumber, setWeek } = useDateStore();

  useQuery(['week', weekNumber], async () => {
    const response = await fetch(`/api/weeks/${weekNumber}`);
    const data = await response.json();

    setWeek(data);
  });

  return (
    <>
      <Head>
        <title>Windmill - Saisie</title>
      </Head>

      <main className="space-y-4 pb-4">
        <div className="space-y-4 bg-white shadow em:space-y-8">
          <div className="px-8 pt-8">
            <WeekNavigation />
          </div>
          <div className="p-4">
            <WeekHours />
          </div>
        </div>

        <div>
          <DaySelection />
        </div>

        <div className="px-4">
          <TimeEntry />
        </div>
      </main>
    </>
  );
};

export default Index;
