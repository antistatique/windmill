import { useEffect, useState } from 'react';
import Head from 'next/head';
import { signOut } from 'next-auth/react';

import LogoutIcon from '@/components/icons/logout';
import getNudge from '@/helpers/nudge';

const Parameters = () => {
  const nudges = [5, 10, 15, 20, 30, 45, 60];

  const [nudge, setNudge] = useState(0);

  useEffect(() => {
    setNudge(getNudge());
  }, [nudge]);

  const handleSelect = (option: number) => {
    localStorage.setItem('nudge', option.toString());
    setNudge(option);
  };

  return (
    <>
      <Head>
        <title>Windmill - Parameters</title>
        <meta name="description" content="Paramètres de l'application" />
      </Head>

      <main className="space-y-8 p-4">
        <div className="mt-8 flex items-center">
          <h1 className="grow text-4xl font-semibold">Paramètres</h1>
          <button
            type="button"
            onClick={() => signOut()}
            className="scale-125 hover:text-pink"
          >
            <LogoutIcon />
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold">
            Montant de l'ajout / retrait de temps
          </h2>

          <div className="grid grid-cols-3 gap-4">
            {nudges.map(n => (
              <button
                key={n}
                type="button"
                onClick={() => handleSelect(n)}
                className={`rounded-xl bg-white py-4 font-semibold outline-3 drop-shadow 
                ${
                  n === nudge
                    ? 'text-pink outline outline-pink'
                    : 'outline-westar hover:outline'
                }`}
              >
                {n}'
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Parameters;
