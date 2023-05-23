import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import debounce from 'lodash.debounce';
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

  const date = moment(day?.date).weekday();

  const worktimeQuery = useCallback(
    async (worktime: string[]) => {
      if (!canSave) {
        return;
      }

      await fetch(`api/weeks/${week?.week_number}/worktimes/${date}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ worktime }),
      });
    },
    [canSave, date, week?.week_number]
  );

  const queryClient = useQueryClient();

  const { mutate } = useMutation(worktimeQuery, {
    onSuccess: () => {
      queryClient.invalidateQueries('week');
    },
  });

  const debouncedWorktimeQuery = useMemo(
    () => debounce(mutate, 1000),
    [mutate]
  );

  useEffect(() => {
    debouncedWorktimeQuery([amStart, amStop, pmStart, pmStop]);
  }, [amStart, amStop, pmStart, pmStop, debouncedWorktimeQuery]);

  const handleRemove = () => {
    setAmStart('');
    setAmStop('');
    setPmStart('');
    setPmStop('');
  };

  return (
    <div className="space-y-4 font-semibold">
      <div className="flex flex-col space-y-2">
        <h2>Matin</h2>
        <TimeInput id="0" label="De" value={amStart} onChange={setAmStart} />
        <TimeInput
          id="1"
          label="À"
          value={amStop}
          disabled={!amStart}
          error={amStopError()}
          onChange={setAmStop}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <h2>Après-midi</h2>
        <TimeInput
          id="2"
          label="De"
          value={pmStart}
          disabled={!pmStart && !!amStart && !amStop}
          error={pmStartError()}
          onChange={setPmStart}
        />
        <TimeInput
          id="3"
          label="À"
          value={pmStop}
          disabled={!pmStart}
          error={pmStopError()}
          onChange={setPmStop}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleRemove}
          aria-label="Supprimer les heures"
          className="rounded-lg bg-white p-4 text-pink shadow"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default TimeEntry;
