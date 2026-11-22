import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
        Transform Your Fitness Journey
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
        Join Iron Pulse Fitness today. Browse our expert-led classes, from high-intensity interval training to mindful yoga sessions.
      </p>
      
      <Link to="/classes" className="btn btn-primary" style={{ fontSize: '1.25rem', padding: '1rem 2rem' }}>
        Browse All Classes
      </Link>

      <div className="grid grid-cols-2" style={{ marginTop: '4rem', textAlign: 'left' }}>
        <div className="card">
          <h3 style={{ marginBottom: '0.5rem' }}>Expert Instructors</h3>
          <p style={{ color: 'var(--text-muted)' }}>Train with certified professionals who care about your progress.</p>
        </div>
        <div className="card">
          <h3 style={{ marginBottom: '0.5rem' }}>State-of-the-Art Equipment</h3>
          <p style={{ color: 'var(--text-muted)' }}>Access top-tier gear for strength, cardio, and combat training.</p>
        </div>
      </div>
    </div>
  )
}