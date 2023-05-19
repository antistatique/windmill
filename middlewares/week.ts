import type { NextApiRequest, NextApiResponse } from 'next';

interface CustomNextApiRequest extends NextApiRequest {
  weekNumber?: number;
}

const weekHandler =
  (handler: any) => async (req: CustomNextApiRequest, res: NextApiResponse) => {
    const week = Number(req.query.week);

    if (Number.isNaN(week)) {
      return res.status(400).json({ message: 'Bad request' });
    }

    req.weekNumber = week;

    return handler(req, res);
  };

export default weekHandler;
