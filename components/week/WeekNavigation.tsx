import { useEffect } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

import useStore from '@/hooks/useStore';
import useWeek from '@/hooks/week';
import moment from '@/libs/moment.config';
import useDateStore from '@/stores/date';

const WeekNavigation = () => {
  const { data: week } = useWeek();

  const weekNumber = useStore(useDateStore, state => state.weekNumber);
  const day = useStore(useDateStore, state => state.day);

  const { setWeekNumber, setDay } = useDateStore();

  const isCurrentWeek = weekNumber === moment().week();
  const isCurrentDay = day ? moment(day.date).isSame(moment(), 'day') : false;

  const findDayInTheWeek = (date?: Date) =>
    week?.days?.find(d => moment(d.date).isSame(date, 'day'));

  const storedDay = findDayInTheWeek(day?.date);
  const currentDay = findDayInTheWeek(moment().toDate());

  const showTodayButton = !isCurrentWeek || (!isCurrentDay && currentDay);

  useEffect(() => {
    if (!week) {
      return;
    }

    setDay(storedDay ?? currentDay ?? week.days[0]);
  }, [week]);

  const canGoToPreviousWeek = weekNumber ? weekNumber - 1 > 0 : false;

  const canGoToNextWeek = weekNumber
    ? weekNumber + 1 <= moment(day?.date).weeksInYear()
    : false;

  const handlePreviousWeek = () => {
    if (weekNumber && canGoToPreviousWeek) {
      setWeekNumber(weekNumber - 1);
    }
  };

  const handleNextWeek = () => {
    if (weekNumber && canGoToNextWeek) {
      setWeekNumber(weekNumber + 1);
    }
  };

  const handleToday = () => {
    if (week && isCurrentWeek) {
      setDay(currentDay ?? week.days[0]);
    } else {
      setWeekNumber(moment().week());
    }
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
