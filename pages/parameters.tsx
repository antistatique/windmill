import React from 'react';
import Head from 'next/head';
import { signOut } from 'next-auth/react';

import LogoutIcon from '@/components/icons/logout';

const Parameters = () => (
  <>
    <Head>
      <title>Windmill - Parameters</title>
      <meta name="description" content="Paramètres de l'application" />
    </Head>

    <main className="space-y-4 p-4">
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
    </main>
  </>
);

export default Parameters;
