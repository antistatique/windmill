import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { google } from 'googleapis';

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

	if (isNaN(week) || isNaN(index)) {
		res.status(400).json({ message: 'Bad request' });
		return;
	}
	
	const weekLine = index + week - 1;

	const sheets = google.sheets({ version: 'v4', auth: auth });
	const range = `saisie-2023!A${weekLine}:AV${weekLine}`;

	const response = await sheets.spreadsheets.values.get({
		spreadsheetId: process.env.SHEET_ID,
		range,
	});

	const rows = response.data.values;
	if (!rows?.length) {
		res.status(404).json({ message: 'No data found' });
		return;
	}

	const worktime = rows!.map((row) => {
		return {
			week_start: row[0],
			week_number: row[1],
			name: row[2],
			email: row[3],
			monday: {
				emoji: row[4],
				hours: row[5],
				hours_hundred: row[6],
				total: row[7],
				am_start: row[8],
				am_stop: row[9],
				pm_start: row[10],
				pm_stop: row[11],
			},
			tuesday: {
				emoji: row[12],
				hours: row[13],
				hours_hundred: row[14],
				total: row[15],
				am_start: row[16],
				am_stop: row[17],
				pm_start: row[18],
				pm_stop: row[19],
			},
			wednesday: {
				emoji: row[20],
				hours: row[21],
				hours_hundred: row[22],
				total: row[23],
				am_start: row[24],
				am_stop: row[25],
				pm_start: row[26],
				pm_stop: row[27],
			},
			thursday: {
				emoji: row[28],
				hours: row[29],
				hours_hundred: row[30],
				total: row[31],
				am_start: row[32],
				am_stop: row[33],
				pm_start: row[34],
				pm_stop: row[35],
			},
			friday: {
				emoji: row[36],
				hours: row[37],
				hours_hundred: row[38],
				total: row[39],
				am_start: row[40],
				am_stop: row[41],
				pm_start: row[42],
				pm_stop: row[43],
			},
			hours_done: row[44],
			hours_todo: row[45],
			is_validated: row[46],
			justification: row[47],
		};
	})[0];

	res.status(200).json(worktime);
}
