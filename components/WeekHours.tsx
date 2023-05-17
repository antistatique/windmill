import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import moment from 'moment';
import Image from 'next/image';

import HoursJustification from '@/components/HoursJustification';
import useStore from '@/stores/date';

const WeekHours = () => {
  const { week } = useStore();

  const haveToJustify = week
    ? week.need_justification &&
      moment().week(week.week_number).day(5).isSameOrBefore(moment())
    : false;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJustifying, setIsJustifying] = useState(false);

  const handleOpenJustifyModal = () => {
    if (!haveToJustify) {
      return;
    }

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
      <div className="flex flex-col justify-between gap-4 rounded-xl bg-background px-4 py-3 em:flex-row em:items-center">
        <div>
          <span>Heures</span>
          <div className="-my-1 font-semibold">
            <span className="text-2xl">{week?.hours_done}</span>
            <span className="text-base"> / {week?.hours_todo}</span>
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
            className={`w-full rounded-lg px-5 py-1 text-xl font-semibold em:w-auto ${
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
          value={week?.justification}
        />
      )}
    </>
  );
};

export default WeekHours;
