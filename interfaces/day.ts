export default interface Day {
  date: Date;
  status: string;
  hours_done: number;
  hours_todo: number;
  total: number;
  am_start: string;
  am_stop: string;
  pm_start: string;
  pm_stop: string;
}
