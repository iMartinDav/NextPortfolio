export const dynamic = 'force-dynamic'; // defaults to auto

// Define an interface for the project post structure
interface ProjectPost {
  id: number; // Assuming there's an 'id' field
  title: string; // Assuming there's a 'title' field
  // Add more fields based on the structure of your posts
}

export async function GET(): Promise<Response> { // Removed 'request' parameter
  const url = `https://projects.imartin.dev/api/v1/fetchProjectsFeed.json`;
  const headers = { "Accept": "application/json" };

  try {
    let postsData: ProjectPost[] = []; // Change from any[] to ProjectPost[]
    let nextUrl: string | null = url; // Change to string | null
    let pageCount = 0;

    while (nextUrl) {
      const response: Response = await fetch(nextUrl, { headers });
      if (!response.ok) {
        return new Response(JSON.stringify({ error: 'Failed to fetch projects feed' }), { status: response.status });
      }

      const posts: ProjectPost[] = await response.json(); // Specify the expected type
      postsData = postsData.concat(posts);

      // Logging for debugging
      console.log(`Fetched ${posts.length} posts on page ${pageCount + 1}`);

      // Check for pagination
      const linkHeader: string | null = response.headers.get('link');
      if (linkHeader) {
        const nextLink: string | undefined = linkHeader.split(',').find((s: string) => s.includes('rel="next"'));
        nextUrl = nextLink ? nextLink.split(';')[0].replace('<', '').replace('>', '').trim() : null; // Use null instead of an empty string
      } else {
        nextUrl = null; // Set to null when there's no next URL
      }

      pageCount++;
    }

    console.log(`Total posts: ${postsData.length}`);
    return new Response(JSON.stringify({ postsData }), { status: 200 });
  } catch (error) {
    console.error('Error fetching projects feed:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch projects feed' }), { status: 500 });
  }
}
