import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import moment from 'moment';
import Image from 'next/image';

import HoursJustification from '@/components/HoursJustification';
import { hoursToTime } from '@/helpers/time';
import useWeek from '@/hooks/week';

const WeekHours = () => {
  const { data: week } = useWeek();

  const haveToJustify = week
    ? week.need_justification &&
      moment().week(week?.week_number).day(5).isSameOrBefore(moment())
    : false;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJustifying, setIsJustifying] = useState(false);

  const handleOpenJustifyModal = () => {
    setIsModalOpen(true);
  };

  const justificationQuery = async (justification: string) => {
    await fetch(`api/weeks/${week?.week_number}/justifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ justification }),
    });
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation(justificationQuery, {
    onMutate: () => {
      setIsJustifying(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('week');

      setIsJustifying(false);
      setIsModalOpen(false);
    },
    onError: () => {
      setIsJustifying(false);
    },
  });

  const onJustify = (justification: string) => {
    mutate(justification);
  };

  return (
    <>
      <div className="flex flex-col justify-between gap-4 rounded-xl bg-background px-4 py-3 2xsm:flex-row 2xsm:items-center">
        <div>
          <span>Heures</span>
          <div className="-my-1 space-x-1 font-semibold">
            <span className="text-2xl">
              {week ? hoursToTime(week?.hours_done).time : '00:00'}
            </span>
            <span>/</span>
            <span>{week ? hoursToTime(week?.hours_todo).time : '00:00'}</span>
          </div>
        </div>

        <div className="flex space-x-3">
          {haveToJustify && (
            <span className="rounded-full bg-white p-2">
              <Image
                src="/emojies/thinking_face.svg"
                alt="Thinking face emoji"
                width={24}
                height={24}
              />
            </span>
          )}

          <button
            type="button"
            onClick={handleOpenJustifyModal}
            className={`w-full rounded-lg px-5 py-1 text-xl font-semibold 2xsm:w-auto ${
              haveToJustify
                ? 'bg-pink text-white hover:bg-pink-dark'
                : 'bg-white outline-3 outline-westar hover:outline'
            }`}
          >
            Justifier
          </button>
        </div>
      </div>

      {isModalOpen && (
        <HoursJustification
          onJustify={onJustify}
          onClose={() => setIsModalOpen(false)}
          isLoading={isJustifying}
          value={week?.justification || ''}
        />
      )}
    </>
  );
};

export default WeekHours;
