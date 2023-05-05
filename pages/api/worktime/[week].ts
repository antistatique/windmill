import { google } from 'googleapis';
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import Worktime from '@/interfaces/worktime';

type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Worktime | Error>
) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const session = await getSession({ req });

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: session?.accessToken });

  const week = Number(req.query.week);
  const index = Number(req.query.index);

  if (Number.isNaN(week) || Number.isNaN(index)) {
    res.status(400).json({ message: 'Bad request' });
    return;
  }
  const weekLine = index + week - 1;

  const sheets = google.sheets({ version: 'v4', auth });
  const range = `saisie-2023!A${weekLine}:AV${weekLine}`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  if (!response.data.values) {
    res.status(404).json({ message: 'No data found' });
    return;
  }

  const values = response.data.values[0];

  const weekStart = values[0];

  const worktime: Worktime = {
    week_start: weekStart,
    week_number: values[1],
    name: values[2],
    email: values[3],
    days: [
      {
        date: moment(weekStart).add(0, 'days'),
        emoji: values[4],
        hours_todo: values[5],
        hours_done: values[6],
        total: values[7],
        am_start: values[8],
        am_stop: values[9],
        pm_start: values[10],
        pm_stop: values[11],
      },
      {
        date: moment(weekStart).add(1, 'days'),
        emoji: values[12],
        hours_todo: values[13],
        hours_done: values[14],
        total: values[15],
        am_start: values[16],
        am_stop: values[17],
        pm_start: values[18],
        pm_stop: values[19],
      },
      {
        date: moment(weekStart).add(2, 'days'),
        emoji: values[20],
        hours_todo: values[21],
        hours_done: values[22],
        total: values[23],
        am_start: values[24],
        am_stop: values[25],
        pm_start: values[26],
        pm_stop: values[27],
      },
      {
        date: moment(weekStart).add(3, 'days'),
        emoji: values[28],
        hours_todo: values[29],
        hours_done: values[30],
        total: values[31],
        am_start: values[32],
        am_stop: values[33],
        pm_start: values[34],
        pm_stop: values[35],
      },
      {
        date: moment(weekStart).add(4, 'days'),
        emoji: values[36],
        hours_todo: values[37],
        hours_done: values[38],
        total: values[39],
        am_start: values[40],
        am_stop: values[41],
        pm_start: values[42],
        pm_stop: values[43],
      },
    ],
    hours_done: values[44],
    hours_todo: values[45],
    need_justification: Boolean(values[46]),
    justification: values[47],
  };

  res.status(200).json(worktime);
}
