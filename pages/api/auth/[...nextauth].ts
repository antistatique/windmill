import NextAuth, { User } from 'next-auth';
import { JWT } from 'next-auth/jwt/types';
import GoogleProvider from 'next-auth/providers/google';

const refreshAccessToken = async (payload: JWT) => {
	try {
		const url = new URL('https://accounts.google.com/o/oauth2/token');
		url.searchParams.set('client_id', process.env.GOOGLE_ID!);
		url.searchParams.set('client_secret', process.env.GOOGLE_SECRET!);
		url.searchParams.set('grant_type', 'refresh_token');
		url.searchParams.set('refresh_token', payload.refreshToken as string);

		const response = await fetch(url.toString(), {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			method: 'POST',
		});

		const refreshToken = await response.json();
		console.log('REFRESHED TOKEN', refreshToken);

		if (!response.ok) {
			throw refreshToken;
		}

		// Give a 10 sec buffer
		const now = new Date();
		const accessTokenExpires = now.setSeconds(
			now.getSeconds() + parseInt(refreshToken.expires_in) - 10
		);

		return {
			...payload,
			accessToken: refreshToken.access_token,
			accessTokenExpires,
			refreshToken: payload.refreshToken,
		};
	} catch (error) {
		console.error('ERR', error);

		return {
			...payload,
			error: 'RefreshAccessTokenError',
		};
	}
};

const scopes = [
	'https://www.googleapis.com/auth/userinfo.profile',
	'https://www.googleapis.com/auth/userinfo.email',
	'https://www.googleapis.com/auth/spreadsheets',
];

export default NextAuth({
	secret: process.env.AUTH_SECRET,
	pages: {
		signIn: '/auth/signin',
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID || '',
			clientSecret: process.env.GOOGLE_SECRET || '',
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
					scope: scopes.join(' '),
				},
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async session({ session, token }) {
			session.user = token.user as User;

			return { ...session, accessToken: token.accessToken as string };
		},
		async jwt({ token, user, account }) {
			// Initial sign in
			if (account && user) {
				return {
					accessToken: account.accessToken,
					accessTokenExpires: Date.now() + account.expires_in * 1000,
					refreshToken: account.refresh_token,
				};
			}

			// Return previous token if the access token has not expired yet
			if (Date.now() < (token.accessTokenExpires as number)) {
				return token;
			}

			// Access token has expired, try to update it
			return refreshAccessToken(token);
		},
	},
});
