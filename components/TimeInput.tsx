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
    <input
      type="time"
      data-before={label}
      value={value || '00:00'}
      onChange={event => onChange(event.target.value)}
      disabled={disabled}
      className={`grow  rounded-lg px-2 py-3 text-center shadow before:ml-2 before:w-6 before:text-left before:text-blue before:content-[attr(data-before)] ${
        !value ? 'text-gray' : ''
      } ${!disabled ? 'cursor-pointer' : 'bg-disabled'} ${
        error ? 'outline outline-3 outline-error' : ''
      }`}
    />
    {error && (
      <span className="pb-2 font-normal text-error">
        <MdError className="mr-2 inline" />
        {error}
      </span>
    )}
  </>
);

export default TimeInput;
