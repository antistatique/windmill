import { useQuery } from 'react-query';

import Summary from '@/interfaces/summary';

const useSummary = () =>
  useQuery('summary', async () => {
    const response = await fetch('/api/summaries/me');
    const data = await response.json();

    return data as Summary;
  });

export default useSummary;
