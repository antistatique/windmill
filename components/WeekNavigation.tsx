import { useEffect, useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

import useWeek from '@/hooks/week';
import moment from '@/libs/moment.config';
import useStore from '@/stores/date';

const WeekNavigation = () => {
  const { data: week } = useWeek();

  const { weekNumber, setWeekNumber, day, setDay } = useStore();
  const [previousWeekNumber, setPreviousWeekNumber] = useState(0);

  const isCurrentWeek = weekNumber === moment().week();
  const isCurrentDay = day ? moment(day.date).isSame(moment(), 'day') : false;

  const currentDay = week?.days?.find(d =>
    moment(d.date).isSame(moment(), 'day')
  );

  const showTodayButton = !isCurrentWeek || (!isCurrentDay && currentDay);

  useEffect(() => {
    if (!week || !week.days) {
      return;
    }

    if (weekNumber !== previousWeekNumber) {
      setDay(currentDay ?? week?.days[0]);
    }

    setPreviousWeekNumber(weekNumber);
  }, [week]);

  const canGoToPreviousWeek = weekNumber - 1 > 0;

  const canGoToNextWeek = weekNumber + 1 <= moment(day?.date).weeksInYear();

  const handleWeekNumberChange = (newWeekNumber: number) => {
    setWeekNumber(newWeekNumber);
  };

  const handlePreviousWeek = () => {
    if (canGoToPreviousWeek) {
      handleWeekNumberChange(weekNumber - 1);
    }
  };

  const handleNextWeek = () => {
    if (canGoToNextWeek) {
      handleWeekNumberChange(weekNumber + 1);
    }
  };

  const handleToday = () => {
    if (isCurrentWeek && currentDay) {
      setDay(currentDay);
      return;
    }

    handleWeekNumberChange(moment().week());
  };

  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={handlePreviousWeek}
        disabled={!canGoToPreviousWeek}
        aria-label="Semaine précédente"
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

        <div className="text flex flex-col gap-x-4 2xsm:flex-row">
          <span>Semaine {weekNumber}</span>

          {showTodayButton && (
            <button
              type="button"
              onClick={handleToday}
              className="font-semibold text-pink"
            >
              Aujourd'hui
            </button>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleNextWeek}
        disabled={!canGoToNextWeek}
        aria-label="Semaine suivante"
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
