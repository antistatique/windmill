import { sheets_v4 } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';

import { getUsersInCache, setUsersInCache } from '@/helpers/usersCache';
import ApiError from '@/interfaces/apiError';
import Summary from '@/interfaces/summary';
import googleSheetClient from '@/services/googleSheetClient';

const getSummaries = async (client: sheets_v4.Sheets) => {
  const response = await client.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'résumé-2023!A:P',
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

  return summaries;
};

export const getIndex = async (
  client: sheets_v4.Sheets,
  user: User,
  force = false
) => {
  let index;

  if (!force) {
    const users = await getUsersInCache();
    index = users?.find((u: User) => u.email === user.email)?.index;
  }

  if (!index) {
    console.log('User not found in cache, fetching from Google Sheets');

    const summaries = await getSummaries(client);
    const users = summaries?.map(sum => ({
      index: sum.index,
      email: sum.email,
    }));

    if (!users) {
      throw new Error('No users found in Google Sheets');
    }

    index = users?.find(u => u.email === user.email)?.index;

    if (!index) {
      throw new Error(`User ${user.email} not found in Google Sheets`);
    }

    // Cache all users so others don't have to fetch them from Google Sheets
    await setUsersInCache(users);
  }

  return index;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Summary | ApiError>
) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const jwt = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const user = jwt?.user as User;

  if (!jwt || !user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const client = await googleSheetClient(jwt.accessToken as string);
  const summaries = await getSummaries(client);
  const summary = summaries?.find(sum => sum.email === user.email);

  if (!summary) {
    return res.status(404).json({ message: 'No data found' });
  }

  return res.status(200).json(summary);
};

export default handler;
