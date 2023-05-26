import Day from '@/interfaces/day';

export default interface Week {
  week_number: number;
  name: string;
  email: string;
  days: Day[];
  hours_todo: number;
  need_justification: boolean;
  justification: string;
}
