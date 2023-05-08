import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';

import ApiError from '@/interfaces/apiError';
import Summary from '@/interfaces/summary';
import googleSheetClient from '@/services/googleSheetClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Summary | ApiError>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const jwt = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const user = jwt?.user as User;

  if (!jwt || !user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const client = await googleSheetClient(jwt.accessToken as string);
  const response = await client.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'résumé-2023!A:P',
  });

  const rows = response.data.values;
  if (!rows?.length) {
    return res.status(404).json({ message: 'No data found' });
  }

  const summary = rows
    .map(row => ({
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
      index: row[15],
    }))
    .filter(row => row.email === user.email)[0];

  return res.status(200).json(summary);
}
