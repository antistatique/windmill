import { useState } from 'react';
import Image from 'next/image';

import WeekJustification from '@/components/week/WeekJustification';
import { hoursDoneOfWeek } from '@/helpers/hoursDone';
import { hoursToTime } from '@/helpers/time';
import useWeek from '@/hooks/useWeek';
import moment from '@/libs/moment.config';

const WeekHours = () => {
  const { data: week } = useWeek();

  const hoursDone = week ? hoursToTime(hoursDoneOfWeek(week)).time : '00:00';
  const hoursTodo = week ? hoursToTime(week.hoursTodo).time : '00:00';

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenJustifyModal = () => {
    setIsModalOpen(true);
  };

  const haveToJustify = week
    ? week.needJustification &&
      moment().week(week?.weekNumber).day(5).isSameOrBefore(moment())
    : false;

  return (
    <>
      <div className="flex flex-col justify-between gap-4 rounded-xl bg-background px-4 py-3 2xsm:flex-row 2xsm:items-center">
        <div>
          <span>Heures</span>
          <div className="-my-1 space-x-1 font-semibold">
            <span className="text-2xl">{hoursDone}</span>
            <span>/</span>
            <span>{hoursTodo}</span>
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
            className={`w-full rounded-lg px-5 py-2 font-semibold 2xsm:w-auto ${
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
        <WeekJustification
          onClose={() => setIsModalOpen(false)}
          value={week?.justification || ''}
        />
      )}
    </>
  );
};

export default WeekHours;
