import DEFAULT_TIME_ENTRY from '@/configs/worktime';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const TimeInput = ({ label, value, onChange }: Props) => (
  <input
    type="time"
    data-before={label}
    value={value || DEFAULT_TIME_ENTRY}
    onChange={e => onChange(e.target.value)}
    className={`grow cursor-pointer rounded-lg px-2 py-3 text-center before:ml-2 before:w-6 before:text-left before:text-blue before:content-[attr(data-before)] ${
      value ? 'text-blue' : 'text-gray'
    }`}
  />
);

export default TimeInput;
