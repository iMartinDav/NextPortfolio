import { NextResponse } from 'next/server';

import { UMAMI_CLOUD_API, umamiAuthHeaders } from '@/lib/umami';

export const revalidate = 3600; // Cache data for 1 hour

export async function GET() {
  try {
    // Get environment variables
    const apiToken = process.env.UMAMI_API_TOKEN;
    const websiteId =
      process.env.UMAMI_WEBSITE_ID || process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
    const apiEndpoint =
      process.env.UMAMI_API_CLIENT_ENDPOINT || UMAMI_CLOUD_API;

    if (!apiToken || !websiteId) {
      console.log('Missing Umami credentials, using simulated data');
      const data = generateRealisticData();
      return NextResponse.json({
        ...data.stats,
        dailyData: data.dailyData,
        isRealData: false,
        note: 'Using simulated data due to missing API credentials'
      });
    }

    // Time parameters for last 7 days
    const endDate = Date.now();
    const startDate = endDate - 7 * 24 * 60 * 60 * 1000;

    // Try authenticated API first
    const authSuccess = await tryAuthenticatedAPI(
      apiEndpoint,
      apiToken,
      websiteId,
      startDate,
      endDate
    );
    if (authSuccess) {
      return authSuccess;
    }

    // Fall back to public share URL
    const shareUrl =
      process.env.NEXT_PUBLIC_UMAMI_BASE_URL ||
      `https://cloud.umami.is/share/${process.env.UMAMI_SHARE_TOKEN}/imartin.dev`;


    return await tryPublicShareUrl(shareUrl, startDate, endDate);
  } catch (error) {
    console.error('Error in stats API route:', error);
    const data = generateRealisticData();
    return NextResponse.json({
      ...data.stats,
      dailyData: data.dailyData,
      isRealData: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

const METRICS = ['pageviews', 'visitors', 'visits', 'bounces', 'totaltime'] as const;

// Older Umami returns { pageviews: { value, prev } }; newer returns
// { pageviews: n, comparison: { pageviews: n } }. Normalise to the former.
function normaliseStats(raw: Record<string, any>) {
  return Object.fromEntries(
    METRICS.map((key) => {
      const v = raw[key];
      return [
        key,
        typeof v === 'number'
          ? { value: v, prev: Number(raw.comparison?.[key] ?? 0) }
          : { value: Number(v?.value ?? 0), prev: Number(v?.prev ?? 0) }
      ];
    })
  );
}

async function tryAuthenticatedAPI(
  apiEndpoint: string,
  apiToken: string,
  websiteId: string,
  startDate: number,
  endDate: number
) {
  try {
    const headers = umamiAuthHeaders(apiEndpoint, apiToken);
    const base = `${apiEndpoint}/websites/${websiteId}`;
    const range = `startAt=${startDate}&endAt=${endDate}`;

    const [statsResponse, pageviewsResponse] = await Promise.all([
      fetch(`${base}/stats?${range}`, { headers }),
      fetch(`${base}/pageviews?${range}&unit=day&timezone=UTC`, { headers })
    ]);

    if (!statsResponse.ok) {
      console.warn(
        `Umami stats request failed (${statsResponse.status}) at ${apiEndpoint}; ` +
          'check UMAMI_API_TOKEN / UMAMI_API_CLIENT_ENDPOINT. Falling back.'
      );
      return null; // Signal to fall back to share URL
    }

    const stats = normaliseStats(await statsResponse.json());
    const pageviewsData = pageviewsResponse.ok
      ? await pageviewsResponse.json()
      : null;

    return NextResponse.json({
      ...stats,
      dailyData: {
        pageviews: pageviewsData?.pageviews ?? [],
        sessions: pageviewsData?.sessions ?? []
      },
      isRealData: true,
      ...(pageviewsData ? {} : { note: 'Daily breakdown unavailable' })
    });
  } catch (apiError) {
    console.error('Authenticated API error:', apiError);
    return null; // Signal to fall back to share URL
  }
}

async function tryPublicShareUrl(
  shareUrl: string,
  startDate: number,
  endDate: number
) {


  try {
    // Try a simplified approach for public share URL
    const urlPatterns = [
      `${shareUrl}/stats?startAt=${startDate}&endAt=${endDate}`,
      `${shareUrl}/data?startAt=${startDate}&endAt=${endDate}`
    ];

    // Headers to include with requests
    const requestHeaders = {
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0 (compatible; NextJS/13.0)'
    };

    let statsData = null;
    let successfulPattern = '';

    for (const url of urlPatterns) {
      try {

        const response = await fetch(url, {
          method: 'GET',
          headers: requestHeaders
        });

        // If successful, parse the data
        if (response.ok) {
          try {
            const contentType = response.headers.get('content-type');
            // Only process JSON responses
            if (contentType?.includes('application/json')) {
              const text = await response.text();
              if (text && !text.includes('<!DOCTYPE')) {
                statsData = JSON.parse(text);
                successfulPattern = url;
                console.log(
                  `Successfully fetched stats data using pattern: ${url}`
                );
                break;
              }
            }
          } catch (parseError) {
            console.log(`Failed to parse response from ${url}:`, parseError);
          }
        }
      } catch {
        // try next pattern
      }
    }

    // If we have stats, try to get pageviews data
    if (statsData && successfulPattern) {
      // Use same pattern for pageviews
      const pageviewsUrl =
        successfulPattern
          .replace('/stats', '/pageviews')
          .replace('/data', '/pageviews') +
        (successfulPattern.includes('?') ? '&unit=day' : '?unit=day');

      try {
        const pageviewsResponse = await fetch(pageviewsUrl, {
          headers: requestHeaders
        });

        if (pageviewsResponse.ok) {
          const pageviewsData = await pageviewsResponse.json();
          console.log('Successfully fetched pageviews data');

          return NextResponse.json({
            ...statsData,
            dailyData: {
              pageviews: pageviewsData.pageviews || [],
              sessions: pageviewsData.sessions || []
            },
            isRealData: true
          });
        }
      } catch (pageviewsError) {
        console.error('Failed to fetch pageviews:', pageviewsError);
      }
    }

    // If we got stats but no pageviews, return what we have
    if (statsData) {
      console.log('Returning stats data without daily breakdown');
      return NextResponse.json({
        ...statsData,
        dailyData: {
          pageviews: [],
          sessions: []
        },
        isRealData: true,
        note: 'Real stats data but with simulated daily breakdown'
      });
    }
  } catch (shareError) {
    console.error('Error with share URL methods:', shareError);
  }

  // If all else fails, generate simulated data
  const data = generateRealisticData();

  return NextResponse.json({
    ...data.stats,
    dailyData: data.dailyData,
    isRealData: false,
    note: 'Using simulated data. The public share URL might not support API access.'
  });
}

// Create realistic simulated data function
function generateRealisticData() {
  const today = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // More realistic baseline values for a professional portfolio site
  const pageviewBaseValue = 140; // Higher baseline page views
  const visitorBaseValue = 85; // Higher baseline visitors

  // Create 7 days of data with weekend dips and weekday peaks
  const dailyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - (6 - i)); // Last 7 days ending today

    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // More pronounced traffic patterns
    let multiplier = 1.0;
    if (isWeekend) {
      multiplier = 0.65; // Bigger weekend reduction
    } else if (dayOfWeek === 1) {
      // Monday
      multiplier = 0.9; // Slightly lower after weekend
    } else if (dayOfWeek === 2 || dayOfWeek === 3) {
      // Tuesday/Wednesday
      multiplier = 1.2; // Mid-week peak
    } else if (dayOfWeek === 4) {
      // Thursday
      multiplier = 1.15; // Still strong
    } else if (dayOfWeek === 5) {
      // Friday
      multiplier = 0.85; // Drops for Friday
    }

    // Smoother variation for more natural looking data
    const randomFactor = 0.9 + Math.random() * 0.2;

    // Format date for display
    const dateStr = date.toISOString().split('T')[0];
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });

    // Calculate metrics with multiplier and randomness
    const pageviews = Math.round(pageviewBaseValue * multiplier * randomFactor);
    const visitors = Math.round(visitorBaseValue * multiplier * randomFactor);

    return {
      date: dateStr,
      formattedDate,
      dayName: dayNames[dayOfWeek],
      pageviews,
      visitors
    };
  });

  // Calculate totals based on the daily data
  const totalPageviews = dailyData.reduce((sum, day) => sum + day.pageviews, 0);
  const totalVisitors = dailyData.reduce((sum, day) => sum + day.visitors, 0);
  const totalSessions = Math.round(totalVisitors * 1.3); // More sessions per visitor for engaged audience

  // More realistic bounce and time metrics
  const bounceRate = 0.35 + Math.random() * 0.08; // 35-43% bounce rate (better than average)
  const bounces = Math.round(totalSessions * bounceRate);

  // Average time between 2-4 minutes (typical for portfolio/professional sites)
  const avgTimeOnSite = 150 + Math.floor(Math.random() * 90);
  const totalTime = totalSessions * avgTimeOnSite;

  // Create previous period with slightly lower numbers (showing growth)
  const prevFactor = 0.78 + Math.random() * 0.12; // 78-90% of current (showing 10-22% growth)

  return {
    // Stats summary
    stats: {
      pageviews: {
        value: totalPageviews,
        prev: Math.round(totalPageviews * prevFactor)
      },
      visitors: {
        value: totalVisitors,
        prev: Math.round(totalVisitors * prevFactor)
      },
      visits: {
        value: totalSessions,
        prev: Math.round(totalSessions * prevFactor)
      },
      bounces: { value: bounces, prev: Math.round(bounces * prevFactor) },
      totaltime: { value: totalTime, prev: Math.round(totalTime * prevFactor) }
    },
    // Chart data
    dailyData: {
      pageviews: dailyData.map((day) => ({ x: day.date, y: day.pageviews })),
      sessions: dailyData.map((day) => ({ x: day.date, y: day.visitors }))
    }
  };
}
