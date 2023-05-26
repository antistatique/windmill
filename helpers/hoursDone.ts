import { timeToHours } from '@/helpers/time';
import Day from '@/interfaces/day';
import Week from '@/interfaces/week';

const hoursDoneOfDay = (day: Day) => {
  const am = day.am_stop
    ? timeToHours(day.am_stop) - timeToHours(day.am_start)
    : 0;
  const pm = day.pm_stop
    ? timeToHours(day.pm_stop) - timeToHours(day.pm_start)
    : 0;
  const hours = am + pm;

  return Number(hours.toFixed(2));
};

const hoursDoneOfWeek = (week: Week) =>
  week.days?.reduce((acc, day) => acc + hoursDoneOfDay(day), 0) || 0;

export { hoursDoneOfWeek, hoursDoneOfDay };
