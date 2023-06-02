import { sheets_v4 } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';

import { JUSTIFICATION_COLUMN, SHEET_NAME } from '@/configs/worktime';
import authorize from '@/middlewares/authorize';
import indexHandler from '@/middlewares/index';
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
    range: `${SHEET_NAME}!${JUSTIFICATION_COLUMN + weekLine}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[justification]],
    },
  });

  if (response.status !== 200) {
    return res.status(500).json({ message: 'Failed to update justification' });
  }

  return res.status(200).json({ message: 'Justification updated' });
};

export default authorize(indexHandler(weekHandler(handler)));
