import { ImageResponse } from '@vercel/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Martin DAVILA Portfolio';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #1a1a2e, #16213e, #0f3460)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div
            style={{
              fontSize: '84px',
              fontWeight: 800,
              background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            Martin DAVILA
          </div>
          <div
            style={{
              fontSize: '42px',
              fontWeight: 500,
              color: '#a0aec0',
              textAlign: 'center',
              letterSpacing: '-1px',
            }}
          >
            Full Stack Bioinformatics Engineer
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: '40px',
              gap: '20px',
            }}
          >
            <div style={{ display: 'flex', fontSize: '32px', color: '#e2e8f0' }}>imartin.dev</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
