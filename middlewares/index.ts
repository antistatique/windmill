import { sheets_v4 } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'next-auth';

import getIndex from '@/libs/usersCache';

interface CustomNextApiRequest extends NextApiRequest {
  user: User;
  client: sheets_v4.Sheets;
  index?: number;
}

const indexHandler =
  (handler: CallableFunction) =>
  async (req: CustomNextApiRequest, res: NextApiResponse) => {
    const index = await getIndex(req.client, req.user);

    if (!index) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.index = index;

    return handler(req, res);
  };

export default indexHandler;
