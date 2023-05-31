import Head from 'next/head';

import DayNavigation from '@/components/day/DayNavigation';
import DayWorktime from '@/components/day/DayWorktime';
import WeekHours from '@/components/week/WeekHours';
import WeekNavigation from '@/components/week/WeekNavigation';

const Index = () => (
  <>
    <Head>
      <title>Windmill - Saisie</title>
      <meta name="description" content="Saisie des heures par semaine" />
    </Head>

    <main className="space-y-2 pb-4">
      <div className="space-y-2 bg-white py-4 shadow 2xsm:space-y-8">
        <div className="px-8">
          <WeekNavigation />
        </div>
        <div className="px-4">
          <WeekHours />
        </div>
      </div>

      <DayNavigation />

      <div className="px-4">
        <DayWorktime />
      </div>
    </main>
  </>
);

export default Index;
