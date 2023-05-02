import { Html, Head, Main, NextScript } from 'next/document';
import Nav from '@/components/Nav';

const Document = () => {
  return (
		<Html lang='en'>
			<Head />
			<body className='bg-background'>
				<Main />
				<NextScript />
			</body>

			<header className='absolute bottom-0 w-full bg-white py-1 drop-shadow'>
				<Nav />
			</header>
		</Html>
	);
}

export default Document;
