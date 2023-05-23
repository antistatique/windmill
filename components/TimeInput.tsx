import { MdError } from 'react-icons/md';
import moment from 'moment';

import ClockIcon from '@/components/icons/clock';
import MinusIcon from '@/components/icons/minus';
import PlusIcon from '@/components/icons/plus';
import RemoveIcon from '@/components/icons/remove';

type Props = {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
  error?: string | null;
  onChange: (value: string) => void;
};

const TimeInput = ({ id, label, value, disabled, error, onChange }: Props) => {
  const canUpdateQuickly = !disabled && value;

  const handleIncrementTime = () => {
    if (!canUpdateQuickly) return;

    const momentValue = moment(value, 'HH:mm');
    const newMomentValue = momentValue.add(15, 'minutes');

    onChange(newMomentValue.format('HH:mm'));
  };

  const handleDecrementTime = () => {
    if (!canUpdateQuickly) return;

    const momentValue = moment(value, 'HH:mm');
    const newMomentValue = momentValue.subtract(15, 'minutes');

    onChange(newMomentValue.format('HH:mm'));
  };

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
        <label htmlFor={`time-${id}`} className="flex grow items-center">
          <label className="pointer-events-none w-12 px-4 text-blue">
            {label}
          </label>

          <div className="flex w-full items-center justify-center">
            {canUpdateQuickly && (
              <button
                type="button"
                aria-label="Retrait rapide de temps"
                onClick={handleDecrementTime}
                className="p-3 hover:text-pink"
              >
                <MinusIcon />
              </button>
            )}

            <input
              id={`time-${id}`}
              type="time"
              value={value || '00:00'}
              onChange={event => onChange(event.target.value)}
              disabled={disabled}
              className={`w-[70px] py-3 text-center tabular-nums ${
                !value ? 'text-gray' : ''
              } ${disabled ? 'bg-disabled' : 'bg-white'}`}
            />

            {canUpdateQuickly && (
              <button
                type="button"
                aria-label="Ajout rapide de temps"
                onClick={handleIncrementTime}
                className="p-3 hover:text-pink"
              >
                <PlusIcon />
              </button>
            )}
          </div>
        </label>

        <div className="flex w-12 items-center justify-end">
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              aria-label="Supprimer l'heure"
              className="p-3 text-2xl text-gray hover:text-blue"
            >
              <RemoveIcon />
            </button>
          )}

          {!disabled && !value && (
            <button
              type="button"
              onClick={handleSetCurrentTime}
              aria-label="Remplir avec l'heure actuelle"
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
