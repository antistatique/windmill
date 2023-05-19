import Head from 'next/head';

import DaySelection from '@/components/DaySelection';
import TimeEntry from '@/components/TimeEntry';
import WeekHours from '@/components/WeekHours';
import WeekNavigation from '@/components/WeekNavigation';

import 'moment/locale/fr';

const Index = () => (
  <>
    <Head>
      <title>Windmill - Saisie</title>
      <meta name="description" content="Saisie des heures par semaine" />
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

export default Index;
