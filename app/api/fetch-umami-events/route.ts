// app/api/fetch-umami-events/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get environment variables with fallback
    const apiToken = process.env.UMAMI_API_TOKEN || process.env.UMAMI_API_KEY;
    const websiteId =
      process.env.UMAMI_WEBSITE_ID || process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
    const apiEndpoint =
      process.env.UMAMI_API_CLIENT_ENDPOINT || 'https://cloud.umami.is/api';

    if (!apiToken || !websiteId) {
      return NextResponse.json(
        {
          message: 'Missing Umami API credentials',
          events: []
        },
        { status: 200 }
      );
    }

    // Time parameters for last 7 days
    const endDate = Date.now();
    const startDate = endDate - 7 * 24 * 60 * 60 * 1000;

    const eventsUrl = `${apiEndpoint}/websites/${websiteId}/events?startAt=${startDate}&endAt=${endDate}`;

    const response = await fetch(eventsUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(
        `Umami API returned ${response.status}: ${await response.text()}`
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Umami events:', error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
        events: []
      },
      { status: 500 }
    );
  }
}
