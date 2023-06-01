import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

import LogoutIcon from '@/components/icons/logout';
import Nudge from '@/components/parameters/Nudge';
import UsualWorktime from '@/components/parameters/UsualWorktime';
import useParameterStore from '@/stores/parameters';

const Parameters = () => {
  type Tab = {
    key: string;
    name: string;
    component: JSX.Element;
  };

  const tabs = [
    {
      key: 'nudge',
      name: 'Nudge',
      component: <Nudge />,
    },
    {
      key: 'usual-worktime',
      name: 'Horaire habituel',
      component: <UsualWorktime />,
    },
  ];

  const router = useRouter();
  const { param } = router.query as { param: string };
  const { setTab } = useParameterStore();

  const activeTab = tabs.find((t: Tab) => t.key === param) ?? tabs[0];

  return (
    <>
      <Head>
        <title>Windmill - Paramètres</title>
        <meta name="description" content="Paramètres de l'application" />
      </Head>

      <main className="flex h-full flex-col space-y-8 px-4">
        <div className="mt-8 flex items-center">
          <h1 className="grow truncate text-4xl font-semibold">Paramètres</h1>
          <button
            type="button"
            onClick={() => signOut()}
            aria-label="Déconnexion"
            className="scale-125 hover:text-pink"
          >
            <LogoutIcon />
          </button>
        </div>

        <nav className="flex rounded-2xl bg-westar p-1">
          {tabs.map(tab => (
            <Link
              key={tab.key}
              onClick={() => setTab(tab.key)}
              href={`/parameters/${tab.key}`}
              className={`w-full truncate rounded-xl p-4 text-center font-semibold ${
                tab.name === activeTab?.name ? 'bg-white' : 'hover:text-pink'
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </nav>

        {activeTab && <div className="h-full">{activeTab?.component}</div>}
      </main>
    </>
  );
};

export default Parameters;
