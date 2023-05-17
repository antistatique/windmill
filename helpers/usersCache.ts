import fs from 'fs';
import path from 'path';

const FILE_PATH = 'configs/users.json';

type User = {
  index: number;
  email: string;
};

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

const setUsersInCache = async (users: User[]) => {
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

export { getUsersInCache, setUsersInCache };
