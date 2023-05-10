type Props = {
  label: string;
  value: string;
  isValid?: boolean;
  onChange: (value: string) => void;
};

const TimeInput = ({ label, value, isValid = true, onChange }: Props) => (
  <input
    type="time"
    data-before={label}
    value={value || '00:00'}
    onChange={event => onChange(event.target.value)}
    className={`grow cursor-pointer rounded-lg px-2 py-3 text-center before:ml-2 before:w-6 before:text-left before:text-blue before:content-[attr(data-before)] 
      ${!value ? 'text-gray' : ''} 
      ${!isValid ? 'line-through decoration-pink decoration-2' : ''}`}
  />
);

export default TimeInput;
