// app/api/fetch-umami-stats/route.ts
import { getClient } from '@umami/api-client';

export const dynamic = 'force-dynamic'; // defaults to auto

interface MetricsData {
  startAt: number;
  endAt: number;
  type: string;
}

const client = getClient();

export async function GET(): Promise<Response> {
  const websiteId = process.env.UMAMI_WEBSITE_ID;

  if (!websiteId) {
    console.error('Umami website ID is missing');
    return new Response(JSON.stringify({ error: 'Umami website ID is missing' }), { status: 500 });
  }

  try {
    const now = Date.now();
    const oneDayInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const startAt = now - oneDayInMilliseconds;

    const metricsData: MetricsData = {
      startAt: startAt,
      endAt: now,
      type: 'url' // Example type, change as needed
    };

    console.log('Fetching metrics with data:', metricsData);

    const response = await client.getWebsiteStats(websiteId, metricsData);

    if (!response.ok) {
      console.error('Failed to fetch metrics:', response);
      return new Response(JSON.stringify({ error: 'Failed to fetch website metrics' }), { status: response.status });
    }

    const { data } = response;
    console.log('Metrics data:', data);

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error fetching website metrics:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch website metrics' }), { status: 500 });
  }
}
