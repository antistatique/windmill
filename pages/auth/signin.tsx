import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function IndexPage() {
	const { data, status } = useSession();

	if (status === 'loading') return <h1> loading... please wait</h1>;

	if (status === 'authenticated') {
		console.log('data', data);

		return (
			<div>
				<h1> hi {data.user?.name}</h1>
				{data.user?.image && (
					<Image
						src={data.user?.image}
						alt={data.user?.name + ' photo'}
						width={50}
						height={50}
					/>
				)}

				<h2>Access token</h2>
				<p>{data.accessToken}</p>

				<button onClick={() => signOut()}>sign out</button>
			</div>
		);
	}

	return (
		<div>
			<h1 className='text-xl'>Antistatique</h1>
			<button onClick={() => signIn('google')}>sign in with google</button>
		</div>
	);
}
