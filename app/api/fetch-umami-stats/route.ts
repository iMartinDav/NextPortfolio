import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Public share URL for Umami analytics
    const shareUrl = 'https://cloud.umami.is/share/XaGIKEcmjDG5Inp2/imartin.dev';
    const websiteId = '1cb76843-7b97-489c-8564-d2429ad9bddb';
    
    // Time parameters for last 7 days
    const endDate = Date.now();
    const startDate = endDate - 7 * 24 * 60 * 60 * 1000;
    
    console.log(`Fetching stats from public share URL: ${shareUrl}`);
    
    try {
      // First, get a cookie/session by visiting the share URL
      const initialResponse = await fetch(shareUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; NextJS/13.0)',
        },
      });
      
      if (!initialResponse.ok) {
        throw new Error(`Share URL not accessible: ${initialResponse.status}`);
      }
      
      const cookies = initialResponse.headers.get('set-cookie');
      
      // Try more URL patterns that might work with Umami
      const urlPatterns = [
        // 1. Try the standard share URL but with different formatting
        `${shareUrl}/stats?startAt=${startDate}&endAt=${endDate}`,
        // 2. Try the .json extension again
        `${shareUrl}/stats.json?startAt=${startDate}&endAt=${endDate}`,
        // 3. Try accessing via API with website ID
        `https://cloud.umami.is/api/websites/${websiteId}/stats?startAt=${startDate}&endAt=${endDate}`,
        // 4. Try with different path format
        `${shareUrl.replace('/share/', '/api/share/')}/stats?startAt=${startDate}&endAt=${endDate}`,
        // 5. Try with base API URL
        `https://cloud.umami.is/api/stats?websiteId=${websiteId}&startAt=${startDate}&endAt=${endDate}`,
        // 6. Try accessing via the data route
        `${shareUrl}/data?startAt=${startDate}&endAt=${endDate}`
      ];
      
      // Headers to include with requests
      const requestHeaders = {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; NextJS/13.0)',
        ...(cookies ? { 'Cookie': cookies } : {})
      };
      
      let statsData = null;
      let successfulPattern = '';
      
      for (const url of urlPatterns) {
        try {
          console.log(`Trying URL pattern: ${url}`);
          
          const response = await fetch(url, {
            method: 'GET',
            headers: requestHeaders,
            cache: 'no-store'
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
                  console.log(`Successfully fetched stats data using pattern: ${url}`);
                  break;
                }
              }
            } catch (parseError) {
              console.log(`Failed to parse response from ${url}:`, parseError);
            }
          } else {
            console.log(`URL ${url} returned status ${response.status}`);
          }
        } catch (e) {
          console.log(`Error fetching ${url}:`, e);
        }
      }
      
      // If we have stats, try to get pageviews data
      if (statsData && successfulPattern) {
        // Use same pattern for pageviews
        const pageviewsUrl = successfulPattern.replace('/stats', '/pageviews').replace('/data', '/pageviews') + 
                            (successfulPattern.includes('?') ? '&unit=day' : '?unit=day');
        
        try {
          console.log(`Trying pageviews URL: ${pageviewsUrl}`);
          const pageviewsResponse = await fetch(pageviewsUrl, {
            headers: requestHeaders,
            cache: 'no-store'
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
    console.log('Could not fetch real data from share URL, using simulated data');
    const data = generateRealisticData();
    
    return NextResponse.json({
      ...data.stats,
      dailyData: data.dailyData,
      isRealData: false,
      note: "Using simulated data. The public share URL might not support API access."
    });
  } catch (error) {
    console.error('Error in stats API route:', error);
    
    // Fall back to simulated data
    const data = generateRealisticData();
    return NextResponse.json({
      ...data.stats,
      dailyData: data.dailyData,
      isRealData: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Create realistic simulated data function
function generateRealisticData() {
  const today = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // More realistic baseline values for a professional portfolio site
  const pageviewBaseValue = 140; // Higher baseline page views
  const visitorBaseValue = 85;   // Higher baseline visitors
  
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
    } else if (dayOfWeek === 1) { // Monday
      multiplier = 0.9;  // Slightly lower after weekend
    } else if (dayOfWeek === 2 || dayOfWeek === 3) { // Tuesday/Wednesday
      multiplier = 1.2;  // Mid-week peak
    } else if (dayOfWeek === 4) { // Thursday
      multiplier = 1.15; // Still strong
    } else if (dayOfWeek === 5) { // Friday
      multiplier = 0.85; // Drops for Friday
    }
    
    // Smoother variation for more natural looking data
    const randomFactor = 0.90 + (Math.random() * 0.2);
    
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
  const bounceRate = 0.35 + (Math.random() * 0.08); // 35-43% bounce rate (better than average)
  const bounces = Math.round(totalSessions * bounceRate);
  
  // Average time between 2-4 minutes (typical for portfolio/professional sites)
  const avgTimeOnSite = 150 + Math.floor(Math.random() * 90); 
  const totalTime = totalSessions * avgTimeOnSite;
  
  // Create previous period with slightly lower numbers (showing growth)
  const prevFactor = 0.78 + (Math.random() * 0.12); // 78-90% of current (showing 10-22% growth)
  
  return {
    // Stats summary
    stats: {
      pageviews: { value: totalPageviews, prev: Math.round(totalPageviews * prevFactor) },
      visitors: { value: totalVisitors, prev: Math.round(totalVisitors * prevFactor) },
      visits: { value: totalSessions, prev: Math.round(totalSessions * prevFactor) },
      bounces: { value: bounces, prev: Math.round(bounces * prevFactor) },
      totaltime: { value: totalTime, prev: Math.round(totalTime * prevFactor) }
    },
    // Chart data
    dailyData: {
      pageviews: dailyData.map(day => ({ x: day.date, y: day.pageviews })),
      sessions: dailyData.map(day => ({ x: day.date, y: day.visitors }))
    }
  };
}
