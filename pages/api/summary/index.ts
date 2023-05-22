import { sheets_v4 } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'next-auth';

import { RANGE_END, RANGE_START, SHEET_NAME } from '@/configs/dashboard';
import ApiError from '@/interfaces/apiError';
import Summary from '@/interfaces/summary';
import authorize from '@/middlewares/authorize';

interface CustomNextApiRequest extends NextApiRequest {
  user: User;
  client: sheets_v4.Sheets;
}

const handler = async (
  req: CustomNextApiRequest,
  res: NextApiResponse<Summary | ApiError>
) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { user, client } = req;

  const response = await client.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `${SHEET_NAME}!${RANGE_START}:${RANGE_END}`,
  });

  const rows = response.data.values;

  const summaries = rows
    ?.map(row => ({
      name: row[0],
      diff_valid: row[1],
      vacation: row[2],
      formation: row[3],
      formation_expenses: row[4],
      sick: row[5],
      overtime: row[6],
      working_percent: row[7],
      remaining_overtime: row[8],
      vacation_sold: row[9],
      previous_year_vacation_sold: row[10],
      remaining_days_to_take: row[11],
      email: row[12],
      index: Number(row[15]),
    }))
    .slice(1); // Remove header

  const summary = summaries?.find(sum => sum.email === user.email);

  if (!summary) {
    return res.status(404).json({ message: 'No data found' });
  }

  return res.status(200).json(summary);
};

export default authorize(handler);
