import { signIn } from 'next-auth/react';

const SignIn = () => {
	return (
		<div className='flex flex-col items-center justify-center gap-8 py-32'>
			<h1 className='text-pink text-3xl font-bold'>Windmill</h1>

			<button
				onClick={() => signIn('google')}
				className='p-2 bg-blue rounded text-white'
			>
				sign in with google
			</button>
		</div>
	);
};

export default SignIn;
