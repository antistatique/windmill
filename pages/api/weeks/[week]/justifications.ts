import { sheets_v4 } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';

import authorize from '@/middlewares/authorize';
import weekHandler from '@/middlewares/week';

interface CustomNextApiRequest extends NextApiRequest {
  weekNumber: number;
  index: number;
  client: sheets_v4.Sheets;
}

const handler = async (req: CustomNextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { weekNumber, index, client } = req;

  const weekLine = index + weekNumber - 1;
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
};

export default authorize(weekHandler(handler));
