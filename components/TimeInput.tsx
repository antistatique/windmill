import { MdError } from 'react-icons/md';
import moment from 'moment';

import ClockIcon from '@/components/icons/clock';

type Props = {
  label: string;
  value: string;
  disabled?: boolean;
  error?: string | null;
  onChange: (value: string) => void;
};

const TimeInput = ({ label, value, disabled, error, onChange }: Props) => {
  const handleSetCurrentTime = () => {
    if (disabled) return;
    onChange(moment().format('HH:mm'));
  };

  return (
    <>
      <label
        className={`flex w-full items-center rounded-lg px-4 shadow
        ${disabled ? 'bg-disabled' : 'cursor-pointer bg-white'}
        ${error ? 'outline outline-3 outline-error' : ''}
      `}
      >
        <label className="pointer-events-none text-blue">{label}</label>

        <div className="w-full grow text-center">
          <input
            type="time"
            value={value || '00:00'}
            onChange={event => onChange(event.target.value)}
            disabled={disabled}
            className={`w-[70px] py-3 text-center
            ${!value ? 'text-gray' : ''}
            ${disabled ? 'bg-disabled' : 'bg-white'}
          `}
          />
        </div>

        {!disabled && (
          <button
            type="button"
            onClick={handleSetCurrentTime}
            className="text-gray hover:text-blue"
          >
            <ClockIcon  />
          </button>
        )}
      </label>

      {error && (
        <span className="pb-2 font-normal text-error">
          <MdError className="mr-2 inline" />
          {error}
        </span>
      )}
    </>
  );
};

export default TimeInput;
