import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';

import { getIndex } from '@/pages/api/summary/index';
import googleSheetClient from '@/services/googleSheetClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const jwt = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const user = jwt?.user as User;

  if (!jwt) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const week = Number(req.query.week);

  if (Number.isNaN(week)) {
    return res.status(400).json({ message: 'Bad request' });
  }

  const client = await googleSheetClient(jwt.accessToken as string);
  const index = await getIndex(client, user);

  if (!index) {
    return res.status(404).json({ message: 'No data found' });
  }

  const weekLine = index + week - 1;
  const { justification } = req.body;

  const response = await client.spreadsheets.values.update({
    spreadsheetId: process.env.SHEET_ID,
    range: `saisie-2023!AV${weekLine}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[justification]],
    },
  });

  return res.status(200).json(response.data);
}
