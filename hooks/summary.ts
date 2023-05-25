import { useQuery } from 'react-query';

const useSummary = () =>
  useQuery('summary', async () => {
    const response = await fetch('/api/summary');
    const data = await response.json();

    return data;
  });

export default useSummary;
