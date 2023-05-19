import { sheets_v4 } from 'googleapis';
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'next-auth';

import getIndex from '@/libs/usersCache';
import ApiError from '@/interfaces/apiError';
import Week from '@/interfaces/week';
import authorize from '@/middlewares/authorize';
import indexHandler from '@/middlewares/index';
import weekHandler from '@/middlewares/week';
import getStatusFromEmoji from '@/helpers/mapEmojiToStatus';

interface CustomNextApiRequest extends NextApiRequest {
  weekNumber: number;
  user: User;
  index: number;
  client: sheets_v4.Sheets;
}

const handler = async (
  req: CustomNextApiRequest,
  res: NextApiResponse<Week | ApiError>
): Promise<Week | ApiError | void> => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { weekNumber, user, index, client } = req;

  const weekLine = index + weekNumber - 1;

  const response = await client.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `saisie-2023!A${weekLine}:AV${weekLine}`,
  });
  if (!response.data.values) {
    return res.status(404).json({ message: 'No data found' });
  }

  const values = response.data.values[0];
  const weekStart = values[0];

  const week: Week = {
    week_start: weekStart,
    week_number: Number(values[1]),
    name: values[2],
    email: values[3],
    days: [
      {
        date: moment(weekStart).toDate(),
        status: getStatusFromEmoji(values[4]),
        hours_todo: Number(values[5]),
        hours_done: Number(values[6]),
        total: values[7],
        am_start: values[8],
        am_stop: values[9],
        pm_start: values[10],
        pm_stop: values[11],
      },
      {
        date: moment(weekStart).add(1, 'days').toDate(),
        status: getStatusFromEmoji(values[12]),
        hours_todo: Number(values[13]),
        hours_done: Number(values[14]),
        total: values[15],
        am_start: values[16],
        am_stop: values[17],
        pm_start: values[18],
        pm_stop: values[19],
      },
      {
        date: moment(weekStart).add(2, 'days').toDate(),
        status: getStatusFromEmoji(values[20]),
        hours_todo: Number(values[21]),
        hours_done: Number(values[22]),
        total: values[23],
        am_start: values[24],
        am_stop: values[25],
        pm_start: values[26],
        pm_stop: values[27],
      },
      {
        date: moment(weekStart).add(3, 'days').toDate(),
        status: getStatusFromEmoji(values[28]),
        hours_todo: Number(values[29]),
        hours_done: Number(values[30]),
        total: values[31],
        am_start: values[32],
        am_stop: values[33],
        pm_start: values[34],
        pm_stop: values[35],
      },
      {
        date: moment(weekStart).add(4, 'days').toDate(),
        status: getStatusFromEmoji(values[36]),
        hours_todo: Number(values[37]),
        hours_done: Number(values[38]),
        total: values[39],
        am_start: values[40],
        am_stop: values[41],
        pm_start: values[42],
        pm_stop: values[43],
      },
    ],
    hours_done: Number(values[44]),
    hours_todo: Number(values[45]),
    need_justification: Boolean(values[46]),
    justification: values[47],
  };

  // Check data consistency
  if (week.email !== user.email || week.week_number !== weekNumber) {
    // There is an error between the cached index and the spreadsheet index, we should update the cache here
    const remoteIndex = await getIndex(client, user, true);

    // Verify is the index was truly wrong
    if (index === remoteIndex) {
      console.log('Error between the cached index and the spreadsheet');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Retry the request
    return handler(req, res);
  }

  return res.status(200).json(week);
};

export default authorize(indexHandler(weekHandler(handler)));
