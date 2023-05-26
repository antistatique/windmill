import { signIn } from 'next-auth/react';

const SignIn = () => (
  <div className="flex flex-col items-center justify-center gap-8 py-32">
    <h1 className="text-3xl font-bold text-pink">Windmill</h1>

    <button
      type="button"
      onClick={() => signIn('google')}
      className="rounded bg-blue p-2 text-white"
    >
      sign in with google
    </button>
  </div>
);

export default SignIn;
