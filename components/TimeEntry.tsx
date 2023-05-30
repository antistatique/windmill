/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { useRouter } from 'next/router';

import TrashIcon from '@/components/icons/trash';
import TimeInput from '@/components/TimeInput';
import useParameterStore from '@/stores/parameters';

type Props = {
  worktime: string[];
  withUsualWorktime?: boolean;
  onTimeChange: (worktime: string[], isValid: boolean) => void;
};

const TimeEntry = ({
  worktime,
  withUsualWorktime = true,
  onTimeChange,
}: Props) => {
  const [amStart, amStop, pmStart, pmStop] = worktime;

  const { worktime: usualWorktime } = useParameterStore();

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

  const handleTimeChange = (newWorktime: string[]) => {
    const isValid =
      !amStopError(newWorktime) &&
      !pmStartError(newWorktime) &&
      !pmStopError(newWorktime);

    onTimeChange(newWorktime, isValid);
  };

  const onInputChange = (index: number, value: string) => {
    const updatedWorktime = [...worktime];
    updatedWorktime[index] = value;

    handleTimeChange(updatedWorktime);
  };

  const router = useRouter();

  const handleUsualWorktime = () => {
    if (usualWorktime.every(time => time === '')) {
      router.push('/parameters/usual-worktime');
    } else {
      handleTimeChange(usualWorktime);
    }
  };

  const handleReset = () => {
    handleTimeChange(['', '', '', '']);
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

      <div className="flex justify-end gap-4">
        {withUsualWorktime && (
          <button
            type="button"
            onClick={handleUsualWorktime}
            aria-label="Appliquer l'horaire habituel"
            className="grow rounded-lg bg-pink py-4 text-white drop-shadow hover:bg-pink-dark"
          >
            Horaire habituel
          </button>
        )}

        <button
          type="button"
          onClick={handleReset}
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
