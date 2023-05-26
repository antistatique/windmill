import { QueryClient, QueryClientProvider } from 'react-query';
import moment from 'moment';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';

import Nav from '@/components/Nav';

import 'moment/locale/fr';

import '@/styles/globals.css';

const withoutNav = ['/auth/signin'];
const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  moment.updateLocale('fr', {
    week: { dow: 1 },
  });

  const router = useRouter();
  const { pathname: path } = router;

  return (
    <SessionProvider session={pageProps.session}>
      <div className="flex min-h-screen items-center justify-center bg-background-dark">
        <div className="flex h-screen max-w-2xl grow flex-col overflow-auto bg-background md:rounded-xl">
          <div className="grow">
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </div>

          {!withoutNav.includes(path) && (
            <header className="sticky bottom-0 shadow">
              <Nav />
            </header>
          )}
        </div>
      </div>
    </SessionProvider>
  );
};

export default App;
