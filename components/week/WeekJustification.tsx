import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import Spinner from '@/components/icons/spinner';
import useWeek from '@/hooks/useWeek';

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
    onMutate: async () => {
      // Cancel any outgoing re fetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['week'] });

      // Snapshot the previous value
      const previousWeek = queryClient.getQueryData(['week']);

      // Optimistically update to the new value
      if (!week) {
        return { previousWeek };
      }

      week.justification = justification;
      queryClient.setQueryData(['week'], week);

      // Return a context object with the snapshotted value
      return { previousWeek };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      // Rollback to the previous value
      queryClient.setQueryData(['week'], context?.previousWeek);
    },
    onSuccess: () => {
      onClose();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['week'] });
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
        className="space-y-6 rounded-lg bg-white px-4 py-6 sm:px-8"
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
          className="btn relative flex items-center justify-center"
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
