// app/api/fetch-umami-stats/route.ts
import { NextResponse } from 'next/server';

const UMAMI_API_URL = `${process.env.UMAMI_API_CLIENT_ENDPOINT}/data`;
const UMAMI_API_KEY = process.env.UMAMI_API_KEY;

export async function GET() {
  try {
    const response = await fetch(UMAMI_API_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${UMAMI_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from Umami API');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
