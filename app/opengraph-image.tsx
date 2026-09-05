import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Tadreebak — Find internships that launch your career';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '96px',
          background: 'linear-gradient(135deg, #ECFDF5 0%, #FFFFFF 48%, #D1FAE5 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: '#0B1220',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10B981',
              fontSize: 34,
            }}
          >
            🎓
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, color: '#0B1220' }}>tadreebak</div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 48,
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.08,
            color: '#0B1220',
            letterSpacing: '-0.03em',
          }}
        >
          <span>Find internships that</span>
          <span style={{ color: '#10B981' }}>launch your career</span>
        </div>
        <div style={{ display: 'flex', marginTop: 44, fontSize: 30, color: '#6B7280' }}>
          Egypt&rsquo;s first platform connecting university students with internships.
        </div>
      </div>
    ),
    { ...size }
  );
}
