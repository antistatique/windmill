import { useQuery } from 'react-query';

import Week from '@/interfaces/week';
import useStore from '@/stores/date';

const useWeek = () => {
  const { weekNumber } = useStore();

  return useQuery(
    ['week', weekNumber],
    async () => {
      const response = await fetch(`/api/weeks/${weekNumber}`);
      const data = await response.json();

      return data as Week;
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );
};

export default useWeek;
