import { useState } from 'react';
import Head from 'next/head';
import { signOut } from 'next-auth/react';

import LogoutIcon from '@/components/icons/logout';
import Nudge from '@/components/parameters/Nudge';
import UsualWorktime from '@/components/parameters/UsualWorktime';

const Parameters = () => {
  type Tab = {
    name: string;
    aria: string;
    component: JSX.Element;
  };

  const tabs = [
    {
      name: 'Nudge',
      aria: 'Configuration du nudge',
      component: <Nudge />,
    },
    {
      name: 'Horaire habituel',
      aria: "Configuration d'un horaire habituel",
      component: <UsualWorktime />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
		<>
			<Head>
				<title>Windmill - Parameters</title>
				<meta name='description' content="Paramètres de l'application" />
			</Head>

			<main className='flex h-full flex-col space-y-8 p-4'>
				<div className='mt-8 flex items-center'>
					<h1 className='grow text-4xl font-semibold truncate'>Paramètres</h1>
					<button
						type='button'
						onClick={() => signOut()}
						className='scale-125 hover:text-pink'
					>
						<LogoutIcon />
					</button>
				</div>

				<nav className='flex rounded-2xl bg-westar p-1'>
					{tabs.map((tab) => (
						<button
							key={tab.name}
							type='button'
							onClick={() => handleTabChange(tab)}
							aria-label={tab.aria}
							className={`nav-button grow rounded-xl p-4 font-semibold truncate ${
								tab.name === activeTab.name ? 'bg-white' : 'hover:text-pink'
							}`}
						>
							{tab.name}
						</button>
					))}
				</nav>

				<div className='grow space-y-4'>{activeTab.component}</div>
			</main>
		</>
	);
};

export default Parameters;
