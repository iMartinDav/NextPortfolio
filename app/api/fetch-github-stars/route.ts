export const dynamic = 'force-dynamic'; // Ensures fresh data on each request

interface Repo {
  stargazers_count: number;
  name: string;
}

/**
 * Fetches GitHub repositories and counts total stars
 * Implements proper error handling and rate limit management
 */
export async function GET(): Promise<Response> {
  const username = process.env.GITHUB_USERNAME || 'iMartinDav';
  const token = process.env.GITHUB_TOKEN;
  const baseUrl = `https://api.github.com/users/${username}/repos`;

  try {
    // Enhanced token validation
    if (!token) {
      console.error(
        'GitHub token is missing. Please set the GITHUB_TOKEN environment variable.'
      );
      return new Response(
        JSON.stringify({ error: 'GitHub token is missing', totalStars: 0 }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Prepare properly formatted headers
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'NextPortfolio/1.0',
      'Authorization': `Bearer ${token.trim()}`
    };

    let totalStars = 0;
    let nextUrl: string | null = baseUrl;
    let page = 1;

    // Implement pagination to fetch all repositories
    while (nextUrl) {
      // Add cache busting with proper type annotation
      const requestUrl: string = `${nextUrl}${nextUrl.includes('?') ? '&' : '?'}page=${page}&per_page=100&t=${Date.now()}`;

      // Fetch with improved error handling
      const response = await fetch(requestUrl, {
        headers,
        cache: 'no-store'
      });

      if (!response.ok) {
        const statusCode = response.status;
        let responseBody = '';

        try {
          responseBody = await response.text();
        } catch {
          console.error('Error fetching GitHub stars');
          return new Response(
            JSON.stringify({
              error: 'Failed to parse error response',
              totalStars: 0
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }

        // Handle different error scenarios with specific messages
        const errorHandler = {
          401: 'GitHub API authentication failed. Check token validity.',
          403: 'GitHub API rate limit exceeded or forbidden access',
          404: `GitHub user '${username}' not found`,
          default: `GitHub API Error: ${statusCode}`
        };

        const errorMessage =
          errorHandler[statusCode as keyof typeof errorHandler] ||
          errorHandler.default;
        console.error(`${errorMessage}\nResponse: ${responseBody}`);

        return new Response(
          JSON.stringify({
            error: errorMessage,
            totalStars: 0,
            mockData: true
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      // Check rate limits
      const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
      const rateLimitReset = response.headers.get('x-ratelimit-reset');

      if (
        rateLimitRemaining !== null &&
        Number.parseInt(rateLimitRemaining) === 0
      ) {
        const resetTime = rateLimitReset
          ? new Date(Number.parseInt(rateLimitReset) * 1000).toLocaleString()
          : 'later';

        console.error(`Rate limit exceeded. Try again after ${resetTime}`);
        return new Response(
          JSON.stringify({
            error: `Rate limit exceeded. Try again after ${resetTime}`
          }),
          {
            status: 429,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      // Process repository data
      const repos: Repo[] = await response.json();
      totalStars = repos.reduce(
        (sum, repo) => sum + repo.stargazers_count,
        totalStars
      );

      // Handle pagination via Link header
      const linkHeader = response.headers.get('link');
      nextUrl = null;

      if (linkHeader) {
        const nextLink = linkHeader
          .split(',')
          .find((s) => s.includes('rel="next"'));
        if (nextLink) {
          const match = nextLink.match(/<([^>]+)>/);
          if (match) nextUrl = match[1];
          page += 1;
        }
      }
    }

    return new Response(JSON.stringify({ totalStars, mockData: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(
      'Error fetching GitHub repositories:',
      error instanceof Error ? error.message : error
    );

    return new Response(
      JSON.stringify({
        error: 'Failed to fetch repositories',
        totalStars: 0,
        mockData: true
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
