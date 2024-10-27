export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
  return new Response(
    JSON.stringify({
      msg: 'hello world',
      app: 'NextPortfolio',
      version: '3.0.0'
    }),
    {
      status: 200
    }
  );
}
