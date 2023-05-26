import { timeToHours } from '@/helpers/time';
import Day from '@/interfaces/day';
import Week from '@/interfaces/week';

const hoursDoneOfDay = (day: Day) => {
  const amDone = day.am_stop
    ? timeToHours(day.am_stop) - timeToHours(day.am_start)
    : 0;
  const pmDone = day.pm_stop
    ? timeToHours(day.pm_stop) - timeToHours(day.pm_start)
    : 0;
  const totalDone = amDone + pmDone;

  return totalDone;
};

const hoursDoneOfWeek = (week: Week) =>
  week.days.reduce((acc, day) => acc + hoursDoneOfDay(day), 0);

export { hoursDoneOfWeek, hoursDoneOfDay };
