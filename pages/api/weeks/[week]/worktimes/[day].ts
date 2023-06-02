import { sheets_v4 } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';

import { DAYS_COLUMN, SHEET_NAME } from '@/configs/worktime';
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

  const day = Number(req.query.day);
  const { worktime } = req.body;

  if (Number.isNaN(day) || !worktime) {
    return res.status(400).json({ message: 'Bad request' });
  }

  const line = index + weekNumber - 1;
  const column = DAYS_COLUMN[day];

  const response = await client.spreadsheets.values.update({
    spreadsheetId: process.env.SHEET_ID,
    range: `${SHEET_NAME}!${column + line}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [worktime],
    },
  });

  if (response.status !== 200) {
    return res.status(500).json({ message: 'Failed to update worktime' });
  }

  return res.status(200).json({ message: 'Worktime updated' });
};

export default authorize(indexHandler(weekHandler(handler)));
