import { getClient } from '@umami/api-client';

export const dynamic = 'force-dynamic'; // Defaults to auto

const client = getClient();

export async function GET() {
  try {
    // The website ID
    const websiteId = '1cb76843-7b97-489c-8564-d2429ad9bddb';

    // Get the current time and the Unix epoch time in milliseconds
    const now = Date.now();
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const startAt = now - oneWeekInMilliseconds; // 7 days ago

    // Prepare the data object for getWebsiteMetrics
    const metricsData = {
      startAt: startAt,
      endAt: now,
      type: 'url' // Example type, change as needed
    };

    // Fetch the website stats
    const { ok, data, status } = await client.getWebsiteStats(
      websiteId,
      metricsData
    );

    if (!ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch website metrics' }),
        { status: status }
      );
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error fetching website metrics:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch website metrics' }),
      { status: 500 }
    );
  }
}
