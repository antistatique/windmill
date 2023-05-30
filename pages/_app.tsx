import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';

import Nav from '@/components/layout/Nav';

import 'moment/locale/fr';

import '@/styles/globals.css';

const withoutNav = ['/auth/signin'];
const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { pathname: path } = router;

  return (
    <SessionProvider session={pageProps.session}>
      <div className="mx-auto flex h-screen w-full max-w-2xl flex-col bg-background md:rounded-xl">
        <div className="grow overflow-y-auto overflow-x-hidden">
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </div>

        {!withoutNav.includes(path) && (
          <footer className="sticky bottom-0 shadow">
            <Nav />
          </footer>
        )}
      </div>
    </SessionProvider>
  );
};

export default App;
