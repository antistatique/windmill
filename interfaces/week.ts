import Day from '@/interfaces/day';

export default interface Week {
  week_start: string;
  week_number: number;
  name: string;
  email: string;
  days: Day[];
  hours_done: number;
  hours_todo: number;
  need_justification: boolean;
  justification: string;
}
