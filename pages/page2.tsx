import { signOut } from 'next-auth/react';
import weekStore from '@/stores/week';

const Page2 = () => {
	const { week } = weekStore();

	return (
		<main>
			{week}

			<h1 className='text-xl'>Page 2</h1>
			<button onClick={() => signOut()} className='px-2 bg-pink rounded'>
				sign out
			</button>
		</main>
	);
};

export default Page2;
