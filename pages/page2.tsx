import React from 'react';
import { signOut } from 'next-auth/react';

const Page2 = () => (
  <main>
    <h1 className="text-xl">Page 2</h1>
    <button
      type="button"
      onClick={() => signOut()}
      className="rounded bg-pink px-2"
    >
      sign out
    </button>
  </main>
);

export default Page2;
