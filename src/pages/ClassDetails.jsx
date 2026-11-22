import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { fetchSessionById } from '../services/api'

export default function ClassDetails({ addToCart }) {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [session, setSession] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError(null)

    fetchSessionById(id)
      .then((data) => {
        if (isMounted) {
          setSession(data)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message)
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [id])

  if (isLoading) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading class details...</h2>
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2 style={{ color: 'red' }}>Class Not Found</h2>
        <p>Sorry, we couldn't find a class with that ID.</p>
        <Link to="/classes" style={{ color: '#007bff' }}>Back to all classes</Link>
      </div>
    )
  }

  const dateObj = new Date(session.startsAt)
  const formattedDate = dateObj.toLocaleString('en-US', { 
    weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' 
  })
  const spotsLeft = session.capacity - session.booked

  const handleBookClick = () => {
    addToCart(session)
    navigate('/booking')
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <Link to="/classes" style={{ color: '#007bff', textDecoration: 'none' }}>&larr; Back to Classes</Link>
      
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h1 style={{ marginTop: 0 }}>{session.title}</h1>
        <p style={{ fontSize: '1.2rem', color: '#555' }}>{session.description}</p>
        
        <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <p><strong>Instructor:</strong> {session.instructor}</p>
          <p><strong>Category:</strong> {session.category}</p>
          <p><strong>Difficulty:</strong> {session.difficulty}</p>
          <p><strong>Price:</strong> Rs. {session.price}</p>
          <p><strong>Date & Time:</strong> {formattedDate}</p>
          <p><strong>Min Age:</strong> {session.minAge} years</p>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', background: spotsLeft > 0 ? '#e8f5e9' : '#ffebee', borderRadius: '5px' }}>
          {spotsLeft > 0 ? (
            <p style={{ margin: 0, color: '#2e7d32', fontWeight: 'bold' }}>Availability: {spotsLeft} spots left!</p>
          ) : (
            <p style={{ margin: 0, color: '#c62828', fontWeight: 'bold' }}>Availability: Fully Booked</p>
          )}
        </div>

        <button 
          onClick={handleBookClick}
          disabled={spotsLeft === 0}
          style={{ width: '100%', padding: '15px', marginTop: '20px', background: spotsLeft > 0 ? '#007bff' : '#ccc', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1.1rem', cursor: spotsLeft > 0 ? 'pointer' : 'not-allowed' }}
        >
          {spotsLeft > 0 ? 'Add to Booking' : 'Sold Out'}
        </button>
      </div>
    </div>
  )
}