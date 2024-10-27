import { getClient } from '@umami/api-client';

export const dynamic = 'force-dynamic'; // defaults to auto

const client = getClient();

export async function GET(): Promise<Response> {
  // Specify the return type
  try {
    // The website ID
    const websiteId = '1cb76843-7b97-489c-8564-d2429ad9bddb';

    // Get the current time and one year ago in milliseconds
    const now = Date.now();
    const oneYearAgo = now - 365 * 24 * 60 * 60 * 1000; // 1 year ago

    // Prepare the data object for getWebsitePageviews
    const pageviewsData = {
      startAt: oneYearAgo,
      endAt: now,
      unit: 'day', // Change to 'day' for daily data over the year
      timezone: 'Europe/Paris',
      region: 'FR'
    };

    console.log('Fetching pageviews with data:', pageviewsData);

    const response = await client.getWebsitePageviews(websiteId, pageviewsData);
    const { ok, data, status } = response;

    if (!ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch website pageviews' }),
        { status }
      );
    }

    console.log('Pageviews data:', data);

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error fetching website pageviews:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch website pageviews' }),
      { status: 500 }
    );
  }
}
