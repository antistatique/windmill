import { useState } from 'react';

type Props = {
  onClose: () => void;
  value: string | undefined;
};

const HoursJustification = ({ onClose, value }: Props) => {
  const [justification, setJustification] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJustification(e.target.value);
  };

  return (
    <div
      onClick={onClose}
      onKeyDown={() => {}}
      tabIndex={0}
      role="button"
      className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black/50"
    >
      <div
        onClick={e => e.stopPropagation()}
        onKeyDown={() => {}}
        tabIndex={0}
        role="button"
        className="space-y-8 rounded bg-white p-8"
      >
        <label htmlFor="justification" className="text-2xl font-semibold">
          Justifier vos heures
        </label>

        <textarea
          name="justification"
          id="justification"
          onChange={handleChange}
          value={justification}
          placeholder="La raison de vos heures supplémentaires"
          className="border-gray-200 w-full rounded border-2 p-2"
        />

        <button
          onClick={onClose}
          type="button"
          className="w-full rounded-lg bg-pink px-4 py-2 font-semibold text-white"
        >
          Valider
        </button>
      </div>
    </div>
  );
};

export default HoursJustification;
