import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';

import '@/styles/globals.css';

import Nav from '@/components/Nav';

const withoutNav = ['/auth/signin'];

const App = ({ Component, pageProps }: AppProps) => {
	const router = useRouter();
	const { pathname: path } = router;

	return (
		<SessionProvider session={pageProps.session}>
			<Component {...pageProps} />

			{!withoutNav.includes(path) && (
				<header className='absolute bottom-0 w-full bg-white py-1 drop-shadow'>
					<Nav />
				</header>
			)}
		</SessionProvider>
	);
};

export default App;
