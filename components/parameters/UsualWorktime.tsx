import { useState } from 'react';

import CheckIcon from '@/components/icons/check';
import TimeEntry from '@/components/TimeEntry';
import compareArrays from '@/helpers/compareArrays';
import getUsualWorktime from '@/helpers/usualWorktime';

const UsualWorktime = () => {
  const [worktime, setWorktime] = useState(getUsualWorktime());

  const [isValidate, setIsValidate] = useState(false);
  const [isSaved, setIsSaved] = useState(true);

  const onTimeChange = (updatedWorktime: string[], isValid: boolean) => {
    setWorktime(updatedWorktime);
    setIsValidate(isValid);

    setIsSaved(compareArrays(updatedWorktime, getUsualWorktime()));
  };

  const handleSave = () => {
    localStorage.setItem('usual_worktime', worktime.join(','));
    setIsSaved(true);
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <TimeEntry
        worktime={worktime}
        withUsualWorktime={false}
        onTimeChange={onTimeChange}
      />

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
          disabled={!isValidate}
          onClick={handleSave}
          className="w-full truncate rounded-lg bg-pink py-4 text-white drop-shadow hover:bg-pink-dark disabled:opacity-50"
        >
          Enregistrer ma journée type
        </button>
      )}
    </div>
  );
};

export default UsualWorktime;
