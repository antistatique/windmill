import React from 'react';
import { signOut } from 'next-auth/react';

const Page2 = () => (
  <main className="space-y-4 p-4">
    <h1 className="text-xl">Not implemented yet</h1>
    <button
      type="button"
      onClick={() => signOut()}
      className="w-full rounded-lg bg-pink px-3 py-2 text-lg font-semibold text-white"
    >
      sign out
    </button>
  </main>
);

export default Page2;
