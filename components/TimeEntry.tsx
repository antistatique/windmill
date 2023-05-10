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
    // Value is not set yet
    if (!amStop) {
      return true;
    }

    if (!amStart) {
      console.log('The morning start time must be set first.');
      return false;
    }

    if (amStop <= amStart) {
      console.log('The morning stop time must be greater than the start time.');
      return false;
    }

    return true;
  };

  const pmStartIsValid = () => {
    // Value is not set yet
    if (!pmStart) {
      return true;
    }

    if (amStop && pmStart <= amStop) {
      console.log(
        'The start time must be greater than the morning stop time if defined.'
      );
      return false;
    }

    return true;
  };

  const pmStopIsValid = () => {
    // Value is not set yet
    if (!pmStop) {
      return true;
    }

    if (!pmStart) {
      console.log('The afternoon start time must be set first.');
      return false;
    }

    if (pmStop <= pmStart) {
      console.log('The stop time must be greater than the start time.');
      return false;
    }

    return true;
  };

  return (
    <div className="space-y-4 font-semibold">
      <div className="flex flex-col space-y-2">
        <h2>Matin</h2>
        <TimeInput label="De" value={amStart} onChange={setAmStart} />
        <TimeInput
          label="À"
          value={amStop}
          isValid={amStopIsValid()}
          onChange={setAmStop}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <h2>Après-midi</h2>
        <TimeInput
          label="De"
          value={pmStart}
          isValid={pmStartIsValid()}
          onChange={setPmStart}
        />
        <TimeInput
          label="À"
          value={pmStop}
          isValid={pmStopIsValid()}
          onChange={setPmStop}
        />
      </div>
    </div>
  );
};

export default TimeEntry;
