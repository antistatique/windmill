import { MdError } from 'react-icons/md';
import moment from 'moment';

import ClockIcon from '@/components/icons/clock';
import RemoveIcon from '@/components/icons/remove';

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
      <div
        className={`flex w-full rounded-lg shadow
          ${disabled ? 'bg-disabled' : 'bg-white'}
          ${error ? 'outline outline-3 outline-error' : ''}
      `}
      >
        <label className="flex grow items-center">
          <label className="pointer-events-none w-12 px-4 text-blue">
            {label}
          </label>

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
        </label>

        <div className="flex w-12 items-center justify-end">
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-3 text-2xl text-gray hover:text-blue"
            >
              <RemoveIcon />
            </button>
          )}

          {!disabled && !value && (
            <button
              type="button"
              onClick={handleSetCurrentTime}
              className="p-3 text-gray hover:text-blue"
            >
              <ClockIcon />
            </button>
          )}
        </div>
      </div>

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
