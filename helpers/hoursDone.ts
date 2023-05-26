import { timeToHours } from '@/helpers/time';
import Day from '@/interfaces/day';
import Week from '@/interfaces/week';

const hoursDoneOfDay = (day: Day) => {
  const am = day.amStop
    ? timeToHours(day.amStop) - timeToHours(day.amStart)
    : 0;
  const pm = day.pmStop
    ? timeToHours(day.pmStop) - timeToHours(day.pmStart)
    : 0;
  const hours = am + pm;

  return Number(hours.toFixed(2));
};

const hoursDoneOfWeek = (week: Week) =>
  week.days?.reduce((acc, day) => acc + hoursDoneOfDay(day), 0) || 0;

export { hoursDoneOfWeek, hoursDoneOfDay };
