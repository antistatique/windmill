import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';

import Nav from '@/components/Nav';

import '@/styles/globals.css';

const withoutNav = ['/auth/signin'];
const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { pathname: path } = router;

  return (
    <SessionProvider session={pageProps.session}>
      <div className="flex min-h-screen flex-col">
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
    </SessionProvider>
  );
};

export default App;
