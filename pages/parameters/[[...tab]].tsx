import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

import LogoutIcon from '@/components/icons/logout';
import Nudge from '@/components/parameters/Nudge';
import UsualWorktime from '@/components/parameters/UsualWorktime';
import useStore from '@/hooks/useStore';
import useParameterStore from '@/stores/parameters';

const Parameters = () => {
  type Tab = {
    key: string;
    name: string;
    aria: string;
    component: JSX.Element;
  };

  const tabs = [
    {
      key: 'nudge',
      name: 'Nudge',
      aria: 'Configuration du nudge',
      component: <Nudge />,
    },
    {
      key: 'usual-worktime',
      name: 'Horaire habituel',
      aria: "Configuration d'un horaire habituel",
      component: <UsualWorktime />,
    },
  ];
  const router = useRouter();
  const slug = router.query.tab?.[0];

  const storedTab = useStore(useParameterStore, state => state.tab);
  const { setTab } = useParameterStore();

  const activeTab = tabs.find((t: Tab) => t.key === storedTab);

  useEffect(() => {
    if (slug) {
      setTab(slug);
    }
  }, [setTab, slug]);

  return (
    <>
      <Head>
        <title>Windmill - Parameters</title>
        <meta name="description" content="Paramètres de l'application" />
      </Head>

      <main className="flex h-full flex-col space-y-8 p-4">
        <div className="mt-8 flex items-center">
          <h1 className="grow truncate text-4xl font-semibold">Paramètres</h1>
          <button
            type="button"
            onClick={() => signOut()}
            className="scale-125 hover:text-pink"
          >
            <LogoutIcon />
          </button>
        </div>

        <nav className="flex rounded-2xl bg-westar p-1">
          {tabs.map(tab => (
            <Link
              key={tab.key}
              href={`/parameters/${tab.key}`}
              aria-label={tab.aria}
              className={`w-full truncate rounded-xl p-4 text-center font-semibold ${
                tab.name === activeTab?.name ? 'bg-white' : 'hover:text-pink'
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </nav>

        {activeTab && (
          <div className="grow space-y-4">{activeTab?.component}</div>
        )}
      </main>
    </>
  );
};

export default Parameters;
