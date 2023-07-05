import { sheets_v4 } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'next-auth';

import {
  HOURS_PER_DAY,
  RANGE_END,
  RANGE_START,
  SHEET_NAME,
} from '@/configs/dashboard';
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
      overtime: Number(row[1]),
      vacation: Number(row[2]),
      formation: Number(row[3]),
      formationExpenses: row[4],
      justifiedAbsence: Number(row[5]),
      overtimeRecovery: Number(row[6]),
      overtimePaid: Number(row[7]) * HOURS_PER_DAY,
      workingPercent: Number(row[8]),
      overtimeRemaining: Number(row[9]),
      vacationPreviousYearRemaining: Number(row[11]),
      vacationCurrentYear: Number(row[12]),
      vacationBalance: Number(row[13]),
      remainingDaysToTake: Number(row[14]),
      email: row[15],
    }))
    .slice(1); // Remove header

  const summary = summaries?.find(sum => sum.email === user.email);

  if (!summary) {
    return res.status(404).json({ message: 'No data found' });
  }

  return res.status(200).json(summary);
};

export default authorize(handler);
