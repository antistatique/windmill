import Image from 'next/image';

import DaySkeleton from '@/components/DaySkeleton';
import { hoursDoneOfDay } from '@/helpers/hoursDone';
import { hoursToTime } from '@/helpers/time';
import useStore from '@/hooks/useStore';
import useWeek from '@/hooks/week';
import moment from '@/libs/moment.config';
import useDateStore from '@/stores/date';

const DayNavigation = () => {
  const { data: week } = useWeek();

  const selectedDay = useStore(useDateStore, state => state.day);
  const { setDay } = useDateStore();

  const days = week?.days?.map(day => {
    const date = moment(day.date);

    return {
      day,
      value: date,
      status: day.status,
      hoursDone: hoursToTime(hoursDoneOfDay(day)).time,
      isCurrentDay: date.isSame(moment(), 'day'),
      isPastDay: date.isBefore(moment(), 'day'),
      isSelectedDay: selectedDay ? date.isSame(selectedDay.date, 'day') : false,
    };
  });

  if (!days) {
    return <DaySkeleton />;
  }

  return (
    <div className="flex items-center justify-between space-x-2 overflow-x-auto px-4 py-2 2xsm:py-1">
      {days?.map(
        ({
          day,
          value,
          status,
          hoursDone,
          isCurrentDay,
          isPastDay,
          isSelectedDay,
        }) => (
          <button
            type="button"
            key={value.unix()}
            onClick={() => setDay(day)}
            className={`flex grow cursor-pointer flex-col items-center justify-center space-y-0.5 rounded-xl bg-white p-1 shadow sm:px-0 ${
              isSelectedDay
                ? 'outline outline-3 -outline-offset-2 outline-pink'
                : ' '
            }`}
          >
            <span
              className={`text-base font-semibold ${
                isCurrentDay ? 'text-pink' : 'text-gray'
              }`}
            >
              {value.format('DD')}
            </span>

            <Image
              src={`/emojies/${status}.svg`}
              alt="Emoji représentent le statut du jour"
              width={24}
              height={24}
            />

            <div
              className={`flex flex-col items-center ${
                isPastDay || isCurrentDay ? 'text-blue' : 'text-gray'
              }`}
            >
              <span className="text-xl font-semibold capitalize sm:text-2xl">
                {value.format('dd')}
              </span>

              <span className="w-12 font-semibold">{hoursDone}</span>
            </div>
          </button>
        )
      )}
    </div>
  );
};

export default DayNavigation;
