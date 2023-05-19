import { sheets_v4 } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';

import { getIndex } from '@/pages/api/summary';
import googleSheetClient from '@/services/googleSheetClient';

interface CustomNextApiRequest extends NextApiRequest {
  user?: User;
  index?: number;
  client?: sheets_v4.Sheets;
}
const authorize =
  (handler: any) => async (req: CustomNextApiRequest, res: NextApiResponse) => {
    console.log('authorize middleware');
    // JWT
    const jwt = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const user = jwt?.user as User;
    const accessToken = jwt?.accessToken as string;

    if (!jwt || !user || !accessToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Client
    const client = await googleSheetClient(accessToken);

    // Index
    const index = await getIndex(client, user);

    if (!index) {
      return res.status(404).json({ message: 'No data found' });
    }

    req.user = user;
    req.index = index;
    req.client = client;

    return handler(req, res);
  };

export default authorize;
