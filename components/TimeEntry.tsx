import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import moment from 'moment';

import TrashIcon from '@/components/icons/trash';
import TimeInput from '@/components/TimeInput';
import useStore from '@/stores/date';

const TimeEntry = () => {
  const { week, day } = useStore();

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

  const amStopError = () => {
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

  const pmStartError = () => {
    if (!pmStart) {
      return null;
    }

    if (amStop && pmStart <= amStop) {
      return "L'heure de début d'après-midi doit être supérieure à l'heure de fin de matinée.";
    }

    return null;
  };

  const pmStopError = () => {
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

  const canSave = !amStopError() && !pmStartError() && !pmStopError();

  const worktimeQuery = async (worktime: string[]) => {
    const date = moment(day?.date).weekday();
    await fetch(`api/weeks/${week?.week_number}/worktimes/${date}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ worktime }),
    });
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation(worktimeQuery, {
    onSuccess: () => {
      queryClient.invalidateQueries('week');
    },
  });

  const handleAmStartChange = (value: string) => {
    setAmStart(value);

    if (canSave) {
      console.log('saving worktime');
      mutate([value, amStop, pmStart, pmStop]);
    }
  };

  const handleAmStopChange = (value: string) => {
    setAmStop(value);

    if (canSave) {
      console.log('saving worktime');
      mutate([amStart, value, pmStart, pmStop]);
    }
  };

  const handlePmStartChange = (value: string) => {
    setPmStart(value);

    if (canSave) {
      console.log('saving worktime');
      mutate([amStart, amStop, value, pmStop]);
    }
  };

  const handlePmStopChange = (value: string) => {
    setPmStop(value);

    if (canSave) {
      console.log('saving worktime');
      mutate([amStart, amStop, pmStart, value]);
    }
  };

  const handleRemove = () => {
    setAmStart('');
    setAmStop('');
    setPmStart('');
    setPmStop('');

    mutate(['', '', '', '']);
  };

  return (
    <div className="space-y-4 font-semibold">
      <div className="flex flex-col space-y-2">
        <h2>Matin</h2>
        <TimeInput label="De" value={amStart} onChange={handleAmStartChange} />
        <TimeInput
          label="À"
          value={amStop}
          disabled={!amStart}
          error={amStopError()}
          onChange={handleAmStopChange}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <h2>Après-midi</h2>
        <TimeInput
          label="De"
          value={pmStart}
          disabled={!pmStart && !!amStart && !amStop}
          error={pmStartError()}
          onChange={handlePmStartChange}
        />
        <TimeInput
          label="À"
          value={pmStop}
          disabled={!pmStart}
          error={pmStopError()}
          onChange={handlePmStopChange}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleRemove}
          className="rounded-lg bg-white p-4 text-pink shadow"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default TimeEntry;
