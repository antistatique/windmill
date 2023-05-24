/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import debounce from 'lodash.debounce';
import moment from 'moment';

import TrashIcon from '@/components/icons/trash';
import TimeInput from '@/components/TimeInput';
import Day from '@/interfaces/day';
import useStore from '@/stores/date';

const TimeEntry = () => {
  const { week, day } = useStore();

  const [worktime, setWorktime] = useState<string[]>([]);
  const [amStart, amStop, pmStart, pmStop] = worktime;

  useEffect(() => {
    if (day) {
      setWorktime([day.am_start, day.am_stop, day.pm_start, day.pm_stop]);
    }
  }, [day]);

  const amStopError = (worktimeToValidate?: string[]) => {
    const [newAmStart, newAmStop, newPmStart] = worktimeToValidate || worktime;

    if (!newAmStop) {
      return newAmStart && newPmStart
        ? "L'heure de fin de matinée doit être définie."
        : null;
    }

    if (!newAmStart) {
      return "L'heure de début de matinée doit être définie. ";
    }

    if (newAmStop <= newAmStart) {
      return "L'heure de fin doit être supérieure à l'heure de début.";
    }

    return null;
  };

  const pmStartError = (worktimeToValidate?: string[]) => {
    const [_newAmStart, newAmStop, newPmStart] = worktimeToValidate || worktime;

    if (!newPmStart) {
      return null;
    }

    if (newAmStop && newPmStart <= newAmStop) {
      return "L'heure de début d'après-midi doit être supérieure à l'heure de fin de matinée.";
    }

    return null;
  };

  const pmStopError = (worktimeToValidate?: string[]) => {
    const [_newAmStart, _newAmStop, newPmStart, newPmStop] =
      worktimeToValidate || worktime;

    if (!newPmStop) {
      return null;
    }

    if (!newPmStart) {
      return "L'heure de début d'après-midi doit être définie.";
    }

    if (newPmStop <= newPmStart) {
      return "L'heure de fin doit être supérieure à l'heure de début.";
    }

    return null;
  };

  const worktimeQuery = useCallback(
    async (variables: { dayNumber: number; newWorktime: string[] }) => {
      const { dayNumber, newWorktime } = variables;

      await fetch(`api/weeks/${week?.week_number}/worktimes/${dayNumber}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ worktime: newWorktime }),
      });
    },
    [week?.week_number]
  );

  const queryClient = useQueryClient();

  const { mutate } = useMutation(worktimeQuery, {
    onSuccess: () => {
      queryClient.invalidateQueries('week');
    },
  });

  const debouncedWorktimeQuery = useMemo(
    () =>
      debounce((updatedDay: Day, newWorktime: string[]) => {
        const dayNumber = moment(updatedDay?.date).weekday();
        mutate({ dayNumber, newWorktime });
      }, 1000),
    [mutate]
  );

  const handleTimeChange = (newWorktime: string[]) => {
    if (!day) return;

    setWorktime(newWorktime);

    if (
      !amStopError(newWorktime) &&
      !pmStartError(newWorktime) &&
      !pmStopError(newWorktime)
    ) {
      console.log('Saving');
      const [newAmStart, newAmStop, newPmStart, newPmStop] = newWorktime;

      day.am_start = newAmStart;
      day.am_stop = newAmStop;
      day.pm_start = newPmStart;
      day.pm_stop = newPmStop;

      debouncedWorktimeQuery(day, newWorktime);
    }
  };

  const handleRemove = () => {
    handleTimeChange(['', '', '', '']);
  };

  const onInputChange = (index: number, value: string) => {
    const updatedWorktime = [...worktime];
    updatedWorktime[index] = value;

    handleTimeChange(updatedWorktime);
  };

  return (
    <div className="space-y-4 font-semibold">
      <div className="flex flex-col space-y-2">
        <h2>Matin</h2>
        <TimeInput
          id="0"
          label="De"
          value={amStart}
          onChange={value => onInputChange(0, value)}
        />
        <TimeInput
          id="1"
          label="À"
          value={amStop}
          disabled={!amStart}
          error={amStopError()}
          onChange={value => onInputChange(1, value)}
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
          onChange={value => onInputChange(2, value)}
        />
        <TimeInput
          id="3"
          label="À"
          value={pmStop}
          disabled={!pmStart}
          error={pmStopError()}
          onChange={value => onInputChange(3, value)}
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
