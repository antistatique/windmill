import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/globals.css';

import Nav from '@/components/Nav';

const withoutNav = ['/auth/signin'];
const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
	const router = useRouter();
	const { pathname: path } = router;

	return (
		<SessionProvider session={pageProps.session}>
			<div className='min-h-screen flex flex-col'>
				<div className='grow'>
					<QueryClientProvider client={queryClient}>
						<Component {...pageProps} />
					</QueryClientProvider>
				</div>

				{!withoutNav.includes(path) && (
					<header className='sticky bottom-0'>
						<Nav />
					</header>
				)}
			</div>
		</SessionProvider>
	);
};

export default App;
