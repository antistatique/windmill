import { useQuery } from 'react-query';

import DaySelection from '@/components/DaySelection';
import TimeEntry from '@/components/TimeEntry';
import WeekHours from '@/components/WeekHours';
import WeekNavigation from '@/components/WeekNavigation';
import useDateStore from '@/stores/date';

import 'moment/locale/fr';

const Index = () => {
  const { weekNumber, setWorktime } = useDateStore();

  useQuery(['worktime', weekNumber], async () => {
    const response = await fetch(`/api/weeks/${weekNumber}`);
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

      <div className="px-4">
        <DaySelection />
      </div>

      <div className="px-4">
        <TimeEntry />
      </div>
    </main>
  );
};

export default Index;
