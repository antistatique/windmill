import moment from 'moment';
import Image from 'next/image';

import Day from '@/interfaces/day';
import useStore from '@/stores/date';

const DaySelection = () => {
  const { day: selectedDay, setDay, week } = useStore();

  const handleSelectDate = (day: Day) => {
    setDay(day);
  };

  const days = week.days?.map(day => {
    const date = moment(day.date);

    return {
      day,
      value: date,
      isCurrentDay: date.isSame(moment(), 'day'),
      isPastDay: date.isBefore(moment(), 'day'),
      status: day.status,
      hoursDone: moment.utc(
        moment.duration(day.hours_done, 'hours').asMilliseconds()
      ),
    };
  });

  return (
    <div className="flex items-center justify-between space-x-2 overflow-x-auto px-4 py-2 pb-4 em:pb-2">
      {days?.map(
        ({ day, value, isCurrentDay, isPastDay, status, hoursDone }) => (
          <button
            type="button"
            key={value.unix()}
            onClick={() => handleSelectDate(day)}
            className={`flex grow cursor-pointer flex-col items-center justify-center space-y-1 rounded-xl bg-white px-1 py-2 shadow sm:px-2  ${
              value.date() === moment(selectedDay?.date).date()
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
              <span className="text-xl font-semibold capitalize sm:text-2xl">
                {value.format('dd')}
              </span>

              <span className="w-12 font-semibold">
                {hoursDone.format('HH:mm')}
              </span>
            </div>
          </button>
        )
      )}
    </div>
  );
};

export default DaySelection;
