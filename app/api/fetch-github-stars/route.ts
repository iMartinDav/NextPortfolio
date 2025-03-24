export const dynamic = 'force-dynamic'; // defaults to auto

interface Repo {
  stargazers_count: number;
  name: string;
}

export async function GET(): Promise<Response> {
  const username = 'iMartinDav';
  const token = process.env.GITHUB_TOKEN; // Ensure you set this in your environment variables
  const baseUrl = `https://api.github.com/users/${username}/repos`;
  
  try {
    // Enhanced token validation and debugging
    if (!token) {
      console.error('GitHub token is missing. Please set the GITHUB_TOKEN environment variable.');
      return new Response(
        JSON.stringify({ error: 'GitHub token is missing', totalStars: 0 }),
        { status: 200 } // Return 200 to avoid UI errors, with an indication no token exists
      );
    }

    // Validate token format
    const cleanToken = token.trim();
    if (cleanToken.length < 10) { // Basic length check
      console.error('GitHub token appears to be malformed (too short)');
      return new Response(
        JSON.stringify({ error: 'Invalid GitHub token format', totalStars: 0 }),
        { status: 200 }
      );
    }

    // Create proper headers with correctly formatted token
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'NextPortfolio/1.0'
    };
    
    // Format token correctly - GitHub now recommends Bearer format
    // Remove any existing prefixes to ensure clean formatting
    let tokenValue = cleanToken;
    if (tokenValue.startsWith('token ')) {
      tokenValue = tokenValue.substring(6);
    }
    if (tokenValue.startsWith('Bearer ')) {
      tokenValue = tokenValue.substring(7);
    }
    
    // Add properly formatted Authorization header
    headers.Authorization = `Bearer ${tokenValue}`;
    
    console.log(`Making GitHub API request for user: ${username}`);
    console.log('Authorization header format: Bearer [token-hidden]');

    let totalStars = 0;
    let nextUrl: string | null = baseUrl;
    let page = 1;

    while (nextUrl) {
      // Add cache busting and improve request URL
      const requestUrl = `${nextUrl}${nextUrl.includes('?') ? '&' : '?'}page=${page}&per_page=100&t=${Date.now()}`;
      console.log(`Fetching GitHub repos (page ${page}) from: ${requestUrl.split('?')[0]}`);
      
      // Make the request with improved error handling
      const response: Response = await fetch(requestUrl, { 
        headers,
        cache: 'no-store'
      });
      
      // Check response and handle all potential errors
      if (!response.ok) {
        const statusCode = response.status;
        
        // Try to get response body for more error details
        let responseBody = '';
        try {
          responseBody = await response.text();
        } catch (e) {
          // Ignore if we can't read the body
        }
        
        let errorMessage = `GitHub API Error: ${statusCode}`;
        const debugInfo = responseBody ? `Response: ${responseBody}` : 'No response body';
        
        if (statusCode === 401) {
          // Check for common auth errors in the response
          const isInvalidToken = responseBody.includes('Bad credentials') || 
                               responseBody.includes('invalid_token');
                               
          errorMessage = isInvalidToken 
            ? 'GitHub token is invalid or expired' 
            : 'GitHub API authentication failed';
            
          console.error(`${errorMessage}. Please check your token and ensure it has proper permissions.`);
          console.error(`Debug info: ${debugInfo}`);
          
          // Return mock data to avoid breaking the UI
          return new Response(
            JSON.stringify({ 
              error: errorMessage, 
              totalStars: 0,
              mockData: true
            }),
            { status: 200 }
          );
        }
        
        if (statusCode === 403) {
          errorMessage = 'GitHub API rate limit exceeded or forbidden access';
        } else if (statusCode === 404) {
          errorMessage = `GitHub user '${username}' not found`;
        }
        
        console.error(`${errorMessage}\n${debugInfo}`);
        
        // Handle other errors gracefully
        return new Response(
          JSON.stringify({ 
            error: errorMessage,
            totalStars: 0,
            mockData: true 
          }),
          { status: 200 }
        );
      }

      const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
      const rateLimitReset = response.headers.get('x-ratelimit-reset');
      if (rateLimitRemaining !== null && Number.parseInt(rateLimitRemaining) === 0) {
        // Define resetTime message regardless of whether rateLimitReset is available
        const resetTimeMessage = rateLimitReset 
          ? `Try again after ${new Date(Number.parseInt(rateLimitReset) * 1000)}`
          : 'Try again later';
          
        console.error(`Rate limit exceeded. ${resetTimeMessage}`);
        return new Response(JSON.stringify({ 
          error: `Rate limit exceeded. ${resetTimeMessage}` 
        }), {
          status: 429
        });
      }

      const repos: Repo[] = await response.json();
      
      // Log success
      console.log(`Successfully fetched ${repos.length} repositories on page ${page}`);
      
      for (const repo of repos) {
        totalStars += repo.stargazers_count;
      }

      // Check for pagination
      const linkHeader: string | null = response.headers.get('link');
      if (linkHeader) {
        const nextLink: string | undefined = linkHeader
          .split(',')
          .find((s) => s.includes('rel="next"'));
        if (nextLink) {
          const match: RegExpMatchArray | null = nextLink.match(/<([^>]+)>/);
          nextUrl = match ? match[1] : null;
          page += 1; // Increment the page number
        }
      } else {
        nextUrl = null;
      }
    }

    console.log(`Total stars fetched: ${totalStars}`);
    return new Response(JSON.stringify({ totalStars, mockData: false }), { status: 200 });
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error instanceof Error ? error.message : error);
    
    // Return fallback data in case of error
    return new Response(
      JSON.stringify({ error: 'Failed to fetch repositories', totalStars: 0, mockData: true }),
      { status: 200 }
    );
  }
}
