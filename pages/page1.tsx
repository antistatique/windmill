import { useSession } from "next-auth/react";

const Page1 = () => {
	const { data } = useSession();
	
	return (
		<main className="text-center">
			<h1 className='text-xl'>{data?.user?.name}</h1>
		</main>
	);
};

export default Page1;
