// pages/api/fetch-umami-stats.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const UMAMI_API_URL = `${process.env.UMAMI_API_CLIENT_ENDPOINT}/data`;
const UMAMI_API_KEY = process.env.UMAMI_API_KEY;

const fetchUmamiStats = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(UMAMI_API_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${UMAMI_API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from Umami API');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export default fetchUmamiStats;
