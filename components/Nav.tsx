import Link from 'next/link';
import { useRouter } from 'next/router';

import CalendarIcon from '@/components/icons/calendar';
import DashboardIcon from '@/components/icons/dashboard';
import SettingsIcon from '@/components/icons/settings';

const routes = [
  {
    name: 'Calendar',
    path: '/',
    aria: 'Calendrier',
    icon: <CalendarIcon />,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    aria: 'Tableau de bord',
    icon: <DashboardIcon />,
  },
  {
    name: 'Settings',
    path: '/page2',
    aria: 'Paramètres',
    icon: <SettingsIcon />,
  },
];

const Nav = () => {
  const router = useRouter();

  return (
    <nav className="bg-white py-1">
      <ul className="flex justify-evenly">
        {routes.map(route => (
          <li key={route.name}>
            <Link
              href={route.path}
              aria-label={route.aria}
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
