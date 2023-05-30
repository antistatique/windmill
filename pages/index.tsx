import Head from 'next/head';

import DayNavigation from '@/components/DayNavigation';
import DayWorktime from '@/components/DayWorktime';
import WeekHours from '@/components/WeekHours';
import WeekNavigation from '@/components/WeekNavigation';

const Index = () => (
  <>
    <Head>
      <title>Windmill - Saisie</title>
      <meta name="description" content="Saisie des heures par semaine" />
    </Head>

    <main className="space-y-4 pb-4">
      <div className="space-y-4 bg-white shadow 2xsm:space-y-8">
        <div className="px-8 pt-8">
          <WeekNavigation />
        </div>
        <div className="p-4">
          <WeekHours />
        </div>
      </div>

      <div>
        <DayNavigation />
      </div>

      <div className="px-4">
        <DayWorktime />
      </div>
    </main>
  </>
);

export default Index;
