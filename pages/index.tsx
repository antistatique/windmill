import { useQuery } from 'react-query';

import DaySelection from '@/components/DaySelection';
import WeekHours from '@/components/WeekHours';
import WeekNavigation from '@/components/WeekNavigation';
import useStore from '@/stores/date';

import 'moment/locale/fr';

const Index = () => {
  const { date, week, setWorktime } = useStore();

  useQuery(['worktime', week], async () => {
    const response = await fetch(`/api/worktime/${week}`);
    const data = await response.json();

    setWorktime(data);
  });

  return (
    <main className="space-y-4">
      <div className="bg-white shadow">
        <div className="p-8">
          <WeekNavigation />
        </div>
        <div className="p-4">
          <WeekHours />
        </div>
      </div>

      <div className="p-4">
        <DaySelection />
      </div>

      {/* Dev */}
      <span className="block">
        {date.locale('fr').format('dddd Do MMMM YYYY')}
      </span>
      <span className="block">{week}</span>
      {/* Dev */}
    </main>
  );
};

export default Index;
