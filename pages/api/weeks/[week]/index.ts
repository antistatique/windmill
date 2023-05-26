import { sheets_v4 } from 'googleapis';
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'next-auth';

import { RANGE_END, RANGE_START, SHEET_NAME } from '@/configs/worktime';
import getStatusFromEmoji from '@/helpers/mapEmojiToStatus';
import ApiError from '@/interfaces/apiError';
import Week from '@/interfaces/week';
import getIndex from '@/libs/usersCache';
import authorize from '@/middlewares/authorize';
import indexHandler from '@/middlewares/index';
import weekHandler from '@/middlewares/week';

moment.updateLocale('fr', {
  week: { dow: 1 },
});

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
  const startAt = RANGE_START + weekLine;
  const endAt = RANGE_END + weekLine;

  const response = await client.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `${SHEET_NAME}!${startAt}:${endAt}`,
  });
  if (!response.data.values) {
    return res.status(404).json({ message: 'No data found' });
  }

  const values = response.data.values[0];
  const date = moment(values[0]);

  const week: Week = {
    weekNumber: Number(values[1]),
    name: values[2],
    email: values[3],
    days: [
      {
        date: date.weekday(0).toDate(),
        status: getStatusFromEmoji(values[4]),
        hoursTodo: Number(values[5]),
        amStart: values[8],
        amStop: values[9],
        pmStart: values[10],
        pmStop: values[11],
      },
      {
        date: date.weekday(1).toDate(),
        status: getStatusFromEmoji(values[12]),
        hoursTodo: Number(values[13]),
        amStart: values[16],
        amStop: values[17],
        pmStart: values[18],
        pmStop: values[19],
      },
      {
        date: date.weekday(2).toDate(),
        status: getStatusFromEmoji(values[20]),
        hoursTodo: Number(values[21]),
        amStart: values[24],
        amStop: values[25],
        pmStart: values[26],
        pmStop: values[27],
      },
      {
        date: date.weekday(3).toDate(),
        status: getStatusFromEmoji(values[28]),
        hoursTodo: Number(values[29]),
        amStart: values[32],
        amStop: values[33],
        pmStart: values[34],
        pmStop: values[35],
      },
      {
        date: date.weekday(4).toDate(),
        status: getStatusFromEmoji(values[36]),
        hoursTodo: Number(values[37]),
        amStart: values[40],
        amStop: values[41],
        pmStart: values[42],
        pmStop: values[43],
      },
    ],
    hoursTodo: Number(values[45]),
    needJustification: Boolean(values[46]),
    justification: values[47],
  };

  // Check data consistency
  if (week.email !== user.email || week.weekNumber !== weekNumber) {
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
