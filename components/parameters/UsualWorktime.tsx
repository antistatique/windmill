import { useState } from 'react';

import CheckIcon from '@/components/icons/check';
import TimeEntry from '@/components/time/TimeEntry';
import compare from '@/helpers/array';
import useParameterStore from '@/stores/parameters';

const UsualWorktime = () => {
  const { worktime: storedWorktime, setWorktime: saveWorktime } =
    useParameterStore();
  const [worktime, setWorktime] = useState(storedWorktime);

  const [canSave, setCanSave] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const onTimeChange = (newWorktime: string[], isValid: boolean) => {
    setWorktime(newWorktime);

    setCanSave(isValid);
    setIsSaved(compare(newWorktime, storedWorktime));
  };

  const handleSave = () => {
    saveWorktime(worktime);
    setIsSaved(true);
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <TimeEntry
        worktime={worktime}
        withUsualWorktime={false}
        onTimeChange={onTimeChange}
      />

      <div className="py-4">
        {isSaved ? (
          <span className="flex w-full items-center justify-center gap-x-2 rounded-lg bg-white py-4 text-center drop-shadow">
            <span className="text-success">
              <CheckIcon />
            </span>
            Horaire sauvegardé
          </span>
        ) : (
          <button
            type="button"
            aria-label="Enregistrer une journée type"
            disabled={!canSave}
            onClick={handleSave}
            className="btn"
          >
            Enregistrer ma journée type
          </button>
        )}
      </div>
    </div>
  );
};

export default UsualWorktime;
