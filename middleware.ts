import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    authorized: async ({ req, token }) => {
      const { pathname } = req.nextUrl;

      if (pathname.startsWith('/_next') || pathname === '/favicon.ico')
        return true;

      if (token) return true;

      return false;
    },
  },
});
