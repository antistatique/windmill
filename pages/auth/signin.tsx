import { signIn } from 'next-auth/react';

const SignIn = () => (
  <div className="flex flex-col items-center justify-center gap-16 px-4 py-32">
    <h1 className="text-4xl font-bold">Windmill</h1>

    <button type="button" onClick={() => signIn('google')} className="btn">
      Se connecter
    </button>
  </div>
);

export default SignIn;
