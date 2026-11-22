import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Classes from './pages/Classes'
import Booking from './pages/Booking'
import ClassDetails from './pages/ClassDetails'

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('fitnessCart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('fitnessCart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (session) => {
    if (!cart.find(item => item.id === session.id)) {
      setCart([...cart, session])
    }
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  return (
    <div>
      {/* Styled Navbar */}
      <nav style={{ 
        background: '#1e293b', 
        padding: '1rem 2rem', 
        display: 'flex', 
        justify: 'space-between',
        alignItems: 'center',
        color: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Iron Pulse 💪
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/classes" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Classes</Link>
          <Link to="/booking" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
            Booking ({cart.length})
          </Link>
        </div>
      </nav>

      {/* Main Content Container */}
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classes/:id" element={<ClassDetails addToCart={addToCart} />} />
          <Route path="/booking" element={<Booking cart={cart} removeFromCart={removeFromCart} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App