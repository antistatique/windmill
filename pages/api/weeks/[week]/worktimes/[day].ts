import { sheets_v4 } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';

import { DAYS_COLUMN } from '@/configs/worktime';
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
    range: `saisie-2023!${column + line}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [worktime],
    },
  });

  return res.status(200).json(response.data);
};

export default authorize(indexHandler(weekHandler(handler)));
