import { useEffect, useState } from 'react';

import useStore from '@/stores/date';

const TimeEntry = () => {
  const { worktime, day: selectedDay } = useStore();

  const DEFAULT_VALUE = '00:00';

  const [amStart, setAmStart] = useState(DEFAULT_VALUE);
  const [amStop, setAmStop] = useState(DEFAULT_VALUE);
  const [pmStart, setPmStart] = useState(DEFAULT_VALUE);
  const [pmStop, setPmStop] = useState(DEFAULT_VALUE);

  useEffect(() => {
    if (!worktime.days) return;

    const currentDay = worktime.days.find(d => d.date === selectedDay?.date);

    if (!currentDay) return;

    setAmStart(currentDay.am_start);
    setAmStop(currentDay.am_stop);
    setPmStart(currentDay.pm_start);
    setPmStop(currentDay.pm_stop);
  }, [selectedDay, worktime.days]);

  return (
    <div className="space-y-8 font-semibold">
      <div className="flex flex-col space-y-2">
        <h2>Matin</h2>
        <input
          type="time"
          name="am-start"
          id="am-start"
          value={amStart || DEFAULT_VALUE}
          onChange={e => setAmStart(e.target.value)}
          placeholder={DEFAULT_VALUE}
          className="grow cursor-pointer rounded-lg px-2 py-3 text-center before:mx-2 before:content-['À']"
        />

        <input
          type="time"
          name="am-end"
          id="am-end"
          value={amStop || DEFAULT_VALUE}
          onChange={e => setAmStop(e.target.value)}
          placeholder={DEFAULT_VALUE}
          className="grow cursor-pointer rounded-lg px-2 py-3 text-center before:mx-2 before:content-['À']"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <h2>Après-midi</h2>

        <input
          type="time"
          name="pm-start"
          id="pm-start"
          value={pmStart || DEFAULT_VALUE}
          onChange={e => setPmStart(e.target.value)}
          placeholder={DEFAULT_VALUE}
          className="grow cursor-pointer rounded-lg px-2 py-3 text-center before:mx-2 before:content-['À']"
        />

        <input
          type="time"
          name="pm-end"
          id="pm-end"
          value={pmStop || DEFAULT_VALUE}
          onChange={e => setPmStop(e.target.value)}
          placeholder={DEFAULT_VALUE}
          className="grow cursor-pointer rounded-lg px-2 py-3 text-center before:mx-2 before:content-['À']"
        />
      </div>
    </div>
  );
};

export default TimeEntry;
