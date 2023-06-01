import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import Spinner from '@/components/icons/spinner';
import useWeek from '@/hooks/week';

type Props = {
  onClose: () => void;
  value: string;
};

const HoursJustification = ({ onClose, value }: Props) => {
  const { data: week } = useWeek();

  const [justification, setJustification] = useState(value);

  const justificationQuery = async () => {
    await fetch(`api/weeks/${week?.weekNumber}/justifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ justification }),
    });
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(justificationQuery, {
    onSuccess: () => {
      queryClient.invalidateQueries('week');
      onClose();
    },
  });

  const handleSave = () => {
    mutate();
  };

  return (
    <div
      onClick={onClose}
      onKeyDown={() => {}}
      tabIndex={0}
      role="button"
      className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black/50"
    >
      <div
        onClick={e => e.stopPropagation()}
        onKeyDown={() => {}}
        tabIndex={0}
        role="button"
        className="space-y-8 rounded-lg bg-white px-8 py-6"
      >
        <label htmlFor="justification" className="text-2xl font-semibold">
          Justifier vos heures
        </label>

        <textarea
          name="justification"
          id="justification"
          value={justification}
          onChange={event => setJustification(event.target.value)}
          placeholder="La raison de vos heures supplémentaires"
          className="border-gray-200 w-full rounded border-2 p-2"
        />

        <button
          onClick={handleSave}
          type="button"
          disabled={isLoading}
          className={`relative flex w-full items-center justify-center rounded-lg py-3 font-semibold text-white ${
            isLoading ? 'bg-pink-dark' : 'bg-pink'
          }`}
        >
          Valider
          {isLoading && (
            <Spinner className="absolute right-6 hidden h-5 w-5 animate-spin text-white xsm:block" />
          )}
        </button>
      </div>
    </div>
  );
};

export default HoursJustification;
