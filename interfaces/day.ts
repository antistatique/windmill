import { Moment } from 'moment';

export default interface Day {
  date: Moment;
  emoji: string;
  hours_done: number;
  hours_todo: number;
  total: number;
  am_start: string;
  am_stop: string;
  pm_start: string;
  pm_stop: string;
}
