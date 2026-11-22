import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchSessions } from '../services/api'

export default function Classes() {
  const [sessions, setSessions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [simulateError, setSimulateError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError(null)

    fetchSessions(simulateError)
      .then((data) => {
        if (isMounted) {
          setSessions(data)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message)
          setIsLoading(false)
        }
      })

    return () => { isMounted = false }
  }, [simulateError])

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          session.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === 'All' || session.category === category
    return matchesSearch && matchesCategory
  })

  if (isLoading) {
    return <h2 style={{ textAlign: 'center', marginTop: '3rem' }}>Loading classes...</h2>
  }

  if (error) {
    return (
      <div className="alert alert-error" style={{ textAlign: 'center', marginTop: '3rem' }}>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => setSimulateError(false)} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Our Classes</h2>
      
      {/* Demo Control */}
      <div className="alert" style={{ background: '#e0f2fe', color: '#0369a1', border: '1px solid #7dd3fc' }}>
        <label style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          <input 
            type="checkbox" 
            checked={simulateError} 
            onChange={(e) => setSimulateError(e.target.checked)} 
            style={{ marginRight: '0.5rem' }}
          />
          Simulate Loading Failure (Demo Control)
        </label>
      </div>

      {/* Search and Filter Controls */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="Search by class or instructor..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
          style={{ flex: 1, minWidth: '250px' }}
        />
        
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="form-control"
          style={{ width: 'auto' }}
        >
          <option value="All">All Categories</option>
          <option value="Yoga">Yoga</option>
          <option value="Cardio">Cardio</option>
          <option value="Strength">Strength</option>
          <option value="Combat">Combat</option>
        </select>
      </div>

      {/* Empty State */}
      {filteredSessions.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '1rem' }}>
            No classes found matching your criteria.
          </p>
          <button onClick={() => { setSearchTerm(''); setCategory('All') }} className="btn btn-primary">
            Clear Search & Filters
          </button>
        </div>
      )}

      {/* Class List (Using Grid and Cards) */}
      <div className="grid grid-cols-2">
        {filteredSessions.map((session) => (
          <div key={session.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{session.title}</h3>
              <span style={{ background: '#e2e8f0', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>
                {session.category}
              </span>
            </div>
            
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              <strong>Instructor:</strong> {session.instructor} <br/>
              <strong>Level:</strong> {session.difficulty}
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary-color)' }}>
                Rs. {session.price}
              </span>
              <Link to={`/classes/${session.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}