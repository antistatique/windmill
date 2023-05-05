import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import Summary from '@/interfaces/summary';
import googleSheetClient from '@/services/googleSheetClient';

type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Summary | Error>
) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const session = await getSession({ req });
  const client = await googleSheetClient(session);

  const response = await client.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'résumé-2023!A:P',
  });

  const rows = response.data.values;
  if (!rows?.length) {
    res.status(404).json({ message: 'No data found' });
    return;
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
    .filter(row => row.email === session?.user?.email)[0];

  res.status(200).json(summary);
}
