import { MdError } from 'react-icons/md';

type Props = {
  label: string;
  value: string;
  disabled?: boolean;
  error?: string | null;
  onChange: (value: string) => void;
};

const TimeInput = ({ label, value, disabled, error, onChange }: Props) => (
  <>
    <label
      className={`relative flex w-full items-center justify-center rounded-lg shadow
        ${disabled ? 'bg-disabled' : 'cursor-pointer bg-white'}
        ${error ? 'outline outline-3 outline-error' : ''}
      `}
    >
      <div
        data-before={label}
        className="w-full grow text-center before:absolute before:left-2 before:top-3 before:text-blue before:content-[attr(data-before)]"
      >
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

    {error && (
      <span className="pb-2 font-normal text-error">
        <MdError className="mr-2 inline" />
        {error}
      </span>
    )}
  </>
);

export default TimeInput;
