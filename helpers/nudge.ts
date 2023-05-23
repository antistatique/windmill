import { DEFAULT_NUDGE_MINUTES } from '@/configs/worktime';

const getNudge = () => {
  const storedNudge = localStorage.getItem('nudge');
  return storedNudge ? Number(storedNudge) : DEFAULT_NUDGE_MINUTES;
};

export default getNudge;
