import fs from 'fs';
import path from 'path';

const MEMBERS_CACHE_PATH = 'configs/users.json';

type User = {
  index: number;
  email: string;
};

export const getUsers = async () => {
  let users;

  try {
    users = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), MEMBERS_CACHE_PATH), 'utf8')
    );
  } catch (error) {
    console.log('Could not read users cache', error);
  }

  return users;
};

export const setUsers = async (users: User[]) => {
  try {
    fs.writeFileSync(
      path.join(process.cwd(), MEMBERS_CACHE_PATH),
      JSON.stringify(users),
      'utf8'
    );
  } catch (error) {
    console.log('Could not write users cache', error);
  }
};
