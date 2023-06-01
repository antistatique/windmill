import Link from 'next/link';
import { useRouter } from 'next/router';

import CalendarIcon from '@/components/icons/calendar';
import DashboardIcon from '@/components/icons/dashboard';
import SettingsIcon from '@/components/icons/settings';
import useStore from '@/hooks/useStore';
import useParameterStore from '@/stores/parameters';

const Nav = () => {
  const param = useStore(useParameterStore, state => state.tab) ?? 'nudge';

  const router = useRouter();
  const routes = [
    {
      path: '/',
      name: 'Calendrier',
      icon: <CalendarIcon />,
    },
    {
      path: '/dashboard',
      name: 'Tableau de bord',
      icon: <DashboardIcon />,
    },
    {
      path: `/parameters/${encodeURIComponent(param)}`,
      name: 'Paramètres',
      icon: <SettingsIcon />,
    },
  ];

  return (
    <nav className="bg-white py-1">
      <ul className="flex items-center justify-evenly">
        {routes.map(route => (
          <li key={route.path}>
            <Link
              href={route.path}
              aria-label={route.name}
              className={`flex h-12 w-12 items-center justify-center ${
                router.pathname === route.path
                  ? 'cursor-default text-blue'
                  : 'text-gray hover:text-pink'
              }`}
            >
              {route.icon}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
