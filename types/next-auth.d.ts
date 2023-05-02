import NextAuth from 'next-auth';

declare module 'next-auth' {
	interface Session {
		accessToken: string;
	}

	interface JWT {
		accessToken: string;
		accessTokenExpires: number;
		refreshToken: string;
		error: string;
		user: {} & DefaultSession['user'];
	}

	interface Account {
		expires_in: number;
	}
}
