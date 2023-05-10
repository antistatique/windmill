import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import moment from 'moment';

import RemoveIcon from '@/components/icons/remove';
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
    onMutate: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries('week');
    },
    onError: () => {},
  });

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

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleRemove}
          className="rounded-lg bg-white p-4 text-pink shadow"
        >
          <RemoveIcon />
        </button>
      </div>
    </div>
  );
};

export default TimeEntry;
