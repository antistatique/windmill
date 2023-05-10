import { useEffect, useState } from 'react';

import DEFAULT_TIME_ENTRY from '@/configs/worktime';
import useStore from '@/stores/date';

import TimeInput from './TimeInput';

const TimeEntry = () => {
  const { day } = useStore();

  const [amStart, setAmStart] = useState(DEFAULT_TIME_ENTRY);
  const [amStop, setAmStop] = useState(DEFAULT_TIME_ENTRY);
  const [pmStart, setPmStart] = useState(DEFAULT_TIME_ENTRY);
  const [pmStop, setPmStop] = useState(DEFAULT_TIME_ENTRY);

  useEffect(() => {
    if (!day) return;

    setAmStart(day.am_start);
    setAmStop(day.am_stop);
    setPmStart(day.pm_start);
    setPmStop(day.pm_stop);
  }, [day]);

  return (
    <div className="space-y-4 font-semibold">
      <div className="flex flex-col space-y-2">
        <h2>Matin</h2>
        <TimeInput label="De" value={amStart} onChange={setAmStart} />
        <TimeInput label="À" value={amStop} onChange={setAmStop} />
      </div>

      <div className="flex flex-col space-y-2">
        <h2>Après-midi</h2>
        <TimeInput label="De" value={pmStart} onChange={setPmStart} />
        <TimeInput label="À" value={pmStop} onChange={setPmStop} />
      </div>
    </div>
  );
};

export default TimeEntry;
