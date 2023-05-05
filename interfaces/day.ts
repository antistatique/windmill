import { Moment } from 'moment';

import { Statues } from '@/helpers/mapEmojiToStatus';

export default interface Day {
  date: Moment;
  status: Statues;
  hours_done: number;
  hours_todo: number;
  total: number;
  am_start: string;
  am_stop: string;
  pm_start: string;
  pm_stop: string;
}
