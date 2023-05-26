import Day from '@/interfaces/day';

export default interface Week {
  weekNumber: number;
  name: string;
  email: string;
  days: Day[];
  hoursTodo: number;
  needJustification: boolean;
  justification: string;
}
