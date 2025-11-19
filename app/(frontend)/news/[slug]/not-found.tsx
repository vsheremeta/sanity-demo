import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '1rem' }}>
        404
      </h1>
      <h2 style={{ fontSize: '2rem', fontWeight: '600', color: '#4a5568', marginBottom: '1rem' }}>
        News Article Not Found
      </h2>
      <p style={{ color: '#718096', marginBottom: '2rem' }}>
        The article you're looking for doesn't exist or has been removed.
      </p>
      <Link 
        href="/news" 
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#667eea',
          color: 'white',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'background-color 0.2s'
        }}
      >
        ← Back to All News
      </Link>
    </div>
  )
}

