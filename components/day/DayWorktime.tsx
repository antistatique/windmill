import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import debounce from 'lodash.debounce';

import TimeEntry from '@/components/time/TimeEntry';
import useStore from '@/hooks/useStore';
import useWeek from '@/hooks/week';
import Day from '@/interfaces/day';
import moment from '@/libs/moment.config';
import useDateStore from '@/stores/date';

const DayWorktime = () => {
  const { data: week } = useWeek();

  const day = useStore(useDateStore, state => state.day);

  const [worktime, setWorktime] = useState<string[]>([]);

  useEffect(() => {
    if (day) {
      setWorktime([day.amStart, day.amStop, day.pmStart, day.pmStop]);
    }
  }, [day]);

  const worktimeQuery = useCallback(
    async (variables: { updatedDay: Day; updatedWorktime: string[] }) => {
      const { updatedDay, updatedWorktime } = variables;
      const dayNumber = moment(updatedDay?.date).weekday();

      await fetch(`api/weeks/${week?.weekNumber}/worktimes/${dayNumber}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ worktime: updatedWorktime }),
      });
    },
    [week?.weekNumber]
  );

  const queryClient = useQueryClient();

  const { mutate } = useMutation(worktimeQuery, {
    onMutate: async ({ updatedDay, updatedWorktime }) => {
      // Cancel any outgoing re fetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['week'] });

      // Snapshot the previous value
      const previousWeek = queryClient.getQueryData(['week']);

      // Optimistically update to the new value
      if (!week) {
        return { previousWeek };
      }

      const [newAmStart, newAmStop, newPmStart, newPmStop] = updatedWorktime;

      const index = week.days.findIndex(d => d.date === updatedDay?.date);

      week.days[index].amStart = newAmStart;
      week.days[index].amStop = newAmStop;
      week.days[index].pmStart = newPmStart;
      week.days[index].pmStop = newPmStop;

      queryClient.setQueryData(['week'], week);

      // Return a context object with the snapshotted value
      return { previousWeek };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newWeek, context) => {
      queryClient.setQueryData(['week'], context?.previousWeek);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['week'] });
    },
  });

  const debouncedWorktimeQuery = useMemo(
    () =>
      debounce((updatedDay: Day, updatedWorktime: string[]) => {
        mutate({ updatedDay, updatedWorktime });
      }, 300),
    [mutate]
  );

  const handleTimeChange = (updatedWorktime: string[], isValid: boolean) => {
    setWorktime(updatedWorktime);

    if (day && isValid) {
      debouncedWorktimeQuery(day, updatedWorktime);
    }
  };

  return <TimeEntry worktime={worktime} onTimeChange={handleTimeChange} />;
};

export default DayWorktime;
