import { useEffect, useState } from 'react';

import { DEFAULT_NUDGE_MINUTES } from '@/configs/worktime';

const useNudge = () => {
  const [nudge, setNudge] = useState<number>();

  useEffect(() => {
    if (nudge) {
      return;
    }

    const storedNudge = localStorage.getItem('nudge');
    console.log('storedNudge: ', storedNudge);

    setNudge(storedNudge ? Number(storedNudge) : DEFAULT_NUDGE_MINUTES);
  }, [nudge]);

  const updateValue = (value: number) => {
    setNudge(value);
    localStorage.setItem('nudge', String(value));
  };

  return [nudge, updateValue] as const;
};

export default useNudge;
