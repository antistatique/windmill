import { useState } from 'react';
import moment from 'moment';
import Image from 'next/image';

import HoursJustification from '@/components/HoursJustification';
import Worktime from '@/interfaces/worktime';

type Props = {
  worktime: Worktime | null;
};

const WeekHours = ({ worktime }: Props) => {
  const haveToJustify = worktime
    ? worktime.need_justification &&
      moment().week(worktime.week_number).day(5).isSameOrBefore(moment())
    : false;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenJustifyModal = () => {
    if (!haveToJustify) {
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between rounded-xl bg-background px-4 py-3">
        <div>
          <span>Heures</span>
          <div className="-my-1 font-semibold">
            <span className="text-2xl">{worktime?.hours_done}</span>
            <span className="text-base"> / {worktime?.hours_todo}</span>
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
            className={`rounded-lg px-5 py-1 text-xl font-semibold ${
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
          onClose={() => setIsModalOpen(false)}
          value={worktime?.justification}
        />
      )}
    </>
  );
};

export default WeekHours;
