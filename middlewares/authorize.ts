import { sheets_v4 } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';

import googleSheetClient from '@/libs/googleSheetClient';

interface CustomNextApiRequest extends NextApiRequest {
  user?: User;
  client: sheets_v4.Sheets;
}
const authorize =
  (handler: CallableFunction) =>
  async (req: CustomNextApiRequest, res: NextApiResponse) => {
    const jwt = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const user = jwt?.user as User;
    const accessToken = jwt?.accessToken as string;

    if (!user || !accessToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const client = await googleSheetClient(accessToken);

    req.user = user;
    req.client = client;

    return handler(req, res);
  };

export default authorize;
