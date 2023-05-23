import React from 'react';
import Head from 'next/head';
import { signOut } from 'next-auth/react';

import LogoutIcon from '@/components/icons/logout';

const Parameters = () => {
  const options = [5, 10, 15, 20, 30, 45, 60];

  const selected = 15;

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
            {options.map(option => (
              <button
                key={option}
                type="button"
                className={`rounded-xl bg-white py-4 font-semibold outline-3 drop-shadow 
                ${
                  selected === option
                    ? 'outline outline-pink'
                    : 'outline-westar hover:outline'
                }`}
              >
                {option}'
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Parameters;
