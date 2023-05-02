import { signOut } from 'next-auth/react';

const Page2 = () => {
	return (
		<main>
			<h1 className='text-xl'>Page 2</h1>
			<button onClick={() => signOut()} className='px-2 bg-pink rounded'>sign out</button>
		</main>
	);
};

export default Page2;
