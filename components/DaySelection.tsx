import moment from 'moment';
import Image from 'next/image';

import Worktime from '@/interfaces/worktime';
import useStore from '@/stores/date';

type Props = {
  worktime: Worktime | null;
};

const DayNavigation = ({ worktime }: Props) => {
  const { date: selectedDay, selectDay } = useStore();

  const handleSelectDate = (day: moment.Moment) => {
    selectDay(day);
  };

  return (
    <div className="flex items-center justify-between space-x-2">
      {worktime?.days?.map(day => {
        const date = moment(day.date);
        const value = date;
        const isCurrentDay = date.isSame(moment(), 'day');
        const isPastDay = date.isBefore(moment(), 'day');
        const { status } = day;
        const hoursDone = moment.utc(
          moment.duration(day.hours_done, 'hours').asMilliseconds()
        );

        return (
          <button
            type="button"
            key={value.unix()}
            onClick={() => handleSelectDate(value)}
            className={`flex grow cursor-pointer flex-col items-center space-y-1 rounded-xl bg-white p-2 shadow  ${
              value.date() === selectedDay.date()
                ? 'outline outline-3 -outline-offset-2 outline-pink'
                : ''
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
              alt="Thinking face emoji"
              width={24}
              height={24}
            />

            <div
              className={`flex flex-col items-center ${
                isPastDay || isCurrentDay ? 'text-blue' : 'text-gray'
              }`}
            >
              <span className="text-2xl font-semibold capitalize">
                {value.format('dd')}
              </span>

              <span className="font-semibold">{hoursDone.format('HH:mm')}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default DayNavigation;
