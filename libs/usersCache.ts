import fs from 'fs';
import path from 'path';

import { sheets_v4 } from 'googleapis';
import { User } from 'next-auth';

import { getSummaries } from '@/pages/api/summary';

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

export default getIndex;
