import type { NextApiRequest, NextApiResponse } from 'next';

// Simple test route to verify Pages Router API is working
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ 
    success: true, 
    message: 'API test route works! Pages Router is working.',
    timestamp: new Date().toISOString(),
    route: 'pages/api/test.ts',
    method: req.method
  });
}

