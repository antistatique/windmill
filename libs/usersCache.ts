import fs from 'fs';
import path from 'path';

import { sheets_v4 } from 'googleapis';
import { User } from 'next-auth';

import { RANGE_END, RANGE_START } from '@/configs/index';
import { SHEET_NAME } from '@/configs/worktime';

const FILE_PATH = 'configs/users.json';

const getUsersInCache = async () => {
  try {
    const users = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), FILE_PATH), 'utf8')
    );
    return users;
  } catch (error) {
    console.log('Could not read users cache', error);
    return null;
  }
};

const setUsersInCache = async (
  users: {
    index: number;
    email: string;
  }[]
) => {
  try {
    fs.writeFileSync(
      path.join(process.cwd(), FILE_PATH),
      JSON.stringify(users),
      'utf8'
    );
  } catch (error) {
    console.log('Could not write users cache', error);
  }
};

const fetchIndexes = async (client: sheets_v4.Sheets) => {
  const response = await client.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `${SHEET_NAME}!${RANGE_START}:${RANGE_END}`,
  });

  // Log in the google sheet when the cache was last updated
  const timestamps = new Date().toLocaleString('fr-FR');

  await client.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: `log!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[timestamps]],
    },
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
  force = false
) => {
  let index;

  if (!force) {
    const users = await getUsersInCache();
    index = users?.find((u: User) => u.email === user.email)?.index;
  }

  if (!index) {
    console.log('User not found in cache, fetching from Google Sheets');

    const indexes = await fetchIndexes(client);

    // Cache all users so others don't have to fetch them from Google Sheets
    await setUsersInCache(indexes);

    index = indexes?.find(u => u.email === user.email)?.index;
  }

  return index;
};

export default getIndex;
