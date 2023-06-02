import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt/types';
import GoogleProvider from 'next-auth/providers/google';

const id = process.env.GOOGLE_ID;
const secret = process.env.GOOGLE_SECRET;

if (!id || !secret) {
  throw new Error('Missing Google ID or secret');
}

const refreshAccessToken = async (payload: JWT) => {
  console.log('REFRESHING TOKEN');

  try {
    const url = new URL('https://accounts.google.com/o/oauth2/token');

    url.searchParams.set('client_id', id);
    url.searchParams.set('client_secret', secret);
    url.searchParams.set('grant_type', 'refresh_token');
    url.searchParams.set('refresh_token', payload.refreshToken as string);

    const response = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshToken = await response.json();

    if (!response.ok) {
      throw refreshToken;
    }

    const now = new Date();
    const accessTokenExpires = now.setSeconds(
      now.getSeconds() + refreshToken.expires_in - 10
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

const accessTokenHasExpired = (token: JWT) =>
  Date.now() > (token.accessTokenExpires as number);

const freshToken = async (token: JWT) =>
  (accessTokenHasExpired(token) ? refreshAccessToken(token) : token) as JWT;

const scopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/spreadsheets',
];

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: id,
      clientSecret: secret,
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
    async jwt({ token, user, account }) {
      if (account && user) {
        console.log('JWT', token, account, user);

        const now = new Date();

        return {
          accessToken: account.access_token,
          accessTokenExpires: now.setSeconds(
            now.getSeconds() + account.expires_in - 10
          ),
          refreshToken: account.refresh_token,
          user,
        };
      }

      return freshToken(token);
    },

    async redirect() {
      return '/';
    },
  },
});
