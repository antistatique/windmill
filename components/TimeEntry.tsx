import { useEffect, useState } from 'react';

import useStore from '@/stores/date';

import TimeInput from './TimeInput';

const TimeEntry = () => {
  const { day } = useStore();

  const [amStart, setAmStart] = useState('');
  const [amStop, setAmStop] = useState('');
  const [pmStart, setPmStart] = useState('');
  const [pmStop, setPmStop] = useState('');

  useEffect(() => {
    if (day) {
      setAmStart(day.am_start);
      setAmStop(day.am_stop);
      setPmStart(day.pm_start);
      setPmStop(day.pm_stop);
    }
  }, [day]);

  const amStopIsValid = () => {
    if (!amStop) {
      return amStart && pmStart
        ? "L'heure de fin de matinée doit être définie."
        : null;
    }

    if (!amStart) {
      return "L'heure de début de matinée doit être définie. ";
    }

    if (amStop <= amStart) {
      return "L'heure de fin doit être supérieure à l'heure de début.";
    }

    return null;
  };

  const pmStartIsValid = () => {
    if (!pmStart) {
      return null;
    }

    if (amStop && pmStart <= amStop) {
      return "L'heure de début d'après-midi doit être supérieure à l'heure de fin de matinée.";
    }

    return null;
  };

  const pmStopIsValid = () => {
    if (!pmStop) {
      return null;
    }

    if (!pmStart) {
      return "L'heure de début d'après-midi doit être définie.";
    }

    if (pmStop <= pmStart) {
      return "L'heure de fin doit être supérieure à l'heure de début.";
    }

    return null;
  };

  return (
    <div className="space-y-4 font-semibold">
      <div className="flex flex-col space-y-2">
        <h2>Matin</h2>
        <TimeInput label="De" value={amStart} onChange={setAmStart} />
        <TimeInput
          label="À"
          value={amStop}
          disabled={!amStart}
          error={amStopIsValid()}
          onChange={setAmStop}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <h2>Après-midi</h2>
        <TimeInput
          label="De"
          value={pmStart}
          disabled={!pmStart && !!amStart && !amStop}
          error={pmStartIsValid()}
          onChange={setPmStart}
        />
        <TimeInput
          label="À"
          value={pmStop}
          disabled={!pmStart}
          error={pmStopIsValid()}
          onChange={setPmStop}
        />
      </div>
    </div>
  );
};

export default TimeEntry;
