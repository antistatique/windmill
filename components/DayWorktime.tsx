import { useCallback, useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import debounce from 'lodash.debounce';

import TimeEntry from '@/components/TimeEntry';
import useWeek from '@/hooks/week';
import Day from '@/interfaces/day';
import moment from '@/libs/moment.config';
import useStore from '@/stores/date';

const DayWorktime = () => {
  const { data: week } = useWeek();
  const { day: selectedDay } = useStore();

  const worktimeQuery = useCallback(
    async (variables: { day: Day; worktime: string[] }) => {
      const { day, worktime } = variables;
      const dayNumber = moment(day?.date).weekday();

      await fetch(`api/weeks/${week?.weekNumber}/worktimes/${dayNumber}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ worktime }),
      });
    },
    [week?.weekNumber]
  );

  const queryClient = useQueryClient();

  const { mutate } = useMutation(worktimeQuery, {
    onMutate: async ({ day, worktime }) => {
      // Cancel any outgoing re fetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['week'] });

      // Snapshot the previous value
      const previousWeek = queryClient.getQueryData(['week']);

      // Optimistically update to the new value
      if (!week) {
        return { previousWeek };
      }

      const [newAmStart, newAmStop, newPmStart, newPmStop] = worktime;

      const index = week.days.findIndex(d => d.date === day?.date);

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
      debounce((day: Day, worktime: string[]) => {
        mutate({ day, worktime });
      }, 300),
    [mutate]
  );

  const onTimeChange = (worktime: string[]) => {
    if (!selectedDay) {
      return;
    }

    debouncedWorktimeQuery(selectedDay, worktime);
  };

  return (
    <TimeEntry
      defaultWorktime={
        [
          selectedDay?.amStart,
          selectedDay?.amStop,
          selectedDay?.pmStart,
          selectedDay?.pmStop,
        ] as string[]
      }
      onTimeChange={onTimeChange}
    />
  );
};

export default DayWorktime;
