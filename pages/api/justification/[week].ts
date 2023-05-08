import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import googleSheetClient from '@/services/googleSheetClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const week = Number(req.query.week);
  const index = 938; // TODO : get index dynamically

  const { justification } = req.body;

  if (Number.isNaN(week) || Number.isNaN(index)) {
    return res.status(400).json({ message: 'Bad request' });
  }

  const weekLine = index + week - 1;

  const client = await googleSheetClient(token.accessToken as string);

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
