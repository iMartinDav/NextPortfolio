export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET(): Promise<Response> {
  try {
    // Uncomment the following line if you need to use the client or other sensitive data
    // const client = getClient();
    // const websiteId = process.env.UMAMI_WEBSITE_ID!;

    return new Response(
      JSON.stringify({
        msg: 'hello world',
        app: 'NextPortfolio',
        version: '3.0.0',
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
    });
  }
}
