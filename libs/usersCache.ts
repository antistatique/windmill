// eslint-disable-next-line import/no-extraneous-dependencies
import { kv } from '@vercel/kv';
import { sheets_v4 } from 'googleapis';
import { User } from 'next-auth';

import { RANGE_END, RANGE_START } from '@/configs/index';
import { SHEET_NAME } from '@/configs/worktime';

const fetchIndexes = async (client: sheets_v4.Sheets) => {
  const response = await client.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `${SHEET_NAME}!${RANGE_START}:${RANGE_END}`,
  });

  const emails = response.data.values?.slice(1).flat(); // Remove header

  if (!emails) {
    throw new Error('No users found in Google Sheets');
  }

  const uniqueEmails = Array.from(new Set(emails));

  const OFFSET = 2; // header and index
  const indexes = uniqueEmails.map(email => ({
    index: emails.indexOf(email) + OFFSET,
    email,
  }));

  return indexes;
};

const getIndex = async (
  client: sheets_v4.Sheets,
  user: User,
  refresh = false
) => {
  let index: number | null = await kv.hget(`user:${user.email}`, 'index');

  if (index && !refresh) {
    return index;
  }

  console.log('User not found in cache, fetching from Google Sheets');

  const indexes = await fetchIndexes(client);

  indexes.forEach(async ({ index: i, email }) => {
    if (email === user.email) {
      index = i;
    }
    await kv.hset(`user:${email}`, { index: i });
  });

  return index;
};

export default getIndex;
