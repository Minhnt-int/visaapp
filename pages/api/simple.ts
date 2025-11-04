import type { NextApiRequest, NextApiResponse } from 'next';

// Extremely simple test route
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ ok: true });
}

