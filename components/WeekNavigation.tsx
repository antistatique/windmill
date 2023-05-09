import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import moment from 'moment';

import useStore from '@/stores/date';

const WeekNavigation = () => {
  const { day, week, incWeek, decWeek } = useStore();

  const canGoToPreviousWeek = week - 1 > 0;
  const canGoToNextWeek = week + 1 <= moment(day?.date).weeksInYear();

  const handlePreviousWeek = () => {
    if (canGoToPreviousWeek) decWeek();
  };

  const handleNextWeek = () => {
    if (canGoToNextWeek) incWeek();
  };

  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={handlePreviousWeek}
        disabled={!canGoToPreviousWeek}
        className={`flex h-12 w-12 items-center justify-center text-gray ${
          canGoToPreviousWeek ? 'hover:text-blue' : ''
        }`}
      >
        <GoChevronLeft className="h-6 w-6" />
      </button>

      <div className="flex flex-col items-center">
        <span className="text-xl font-semibold capitalize">
          {moment(day?.date).locale('fr').format('MMMM YYYY')}
        </span>
        <span className="text-sm">Semaine {week}</span>
      </div>

      <button
        type="button"
        onClick={handleNextWeek}
        disabled={!canGoToNextWeek}
        className={`flex h-12 w-12 items-center justify-center text-gray ${
          canGoToNextWeek ? 'hover:text-blue' : ''
        }`}
      >
        <GoChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

export default WeekNavigation;
