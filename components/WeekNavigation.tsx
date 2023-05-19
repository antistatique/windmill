import { useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { useQuery } from 'react-query';
import moment from 'moment';

import useStore from '@/stores/date';

const WeekNavigation = () => {
  const { week, setWeek, day, setDay } = useStore();
  const [weekNumber, setWeekNumber] = useState(week?.week_number);

  useQuery(['week', weekNumber], async () => {
    const response = await fetch(`/api/weeks/${weekNumber}`);
    const data = await response.json();
    setWeek(data);
  });

  const isCurrentWeek = weekNumber === moment().week();
  const isCurrentDay = moment(day?.date).isSame(moment(), 'day');

  const canGoToPreviousWeek = weekNumber - 1 > 0;
  const canGoToNextWeek = weekNumber + 1 <= moment(day?.date).weeksInYear();

  const handlePreviousWeek = () => {
    if (canGoToPreviousWeek) {
      setWeekNumber(weekNumber - 1);
    }
  };

  const handleNextWeek = () => {
    if (canGoToNextWeek) {
      setWeekNumber(weekNumber + 1);
    }
  };

  const handleToday = () => {
    if (isCurrentWeek) {
      const currentDay = week?.days?.find(d =>
        moment(d.date).isSame(moment(), 'day')
      );

      if (currentDay) {
        setDay(currentDay);
      }

      return;
    }

    setWeekNumber(moment().week());
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

        <div className="text flex flex-col gap-x-4 em:flex-row">
          <span>Semaine {weekNumber}</span>

          {!isCurrentDay && (
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
