import { useState } from 'react'
import { Link } from 'react-router-dom'
import { checkCapacity, checkEligibility, checkBookingCutoff } from '../rules/businessRules'

export default function Booking({ cart, removeFromCart }) {
  const [formData, setFormData] = useState({ name: '', email: '', age: '' })
  const [errors, setErrors] = useState({})
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required."
    if (!formData.email.includes('@')) newErrors.email = "Please enter a valid email."
    if (!formData.age) newErrors.age = "Age is required."

    if (cart.length === 0) {
      newErrors.cart = "You must add a class before booking."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    let ruleErrors = []
    for (const item of cart) {
      const capacityResult = checkCapacity(item, 1)
      if (!capacityResult.valid) ruleErrors.push(`${item.title}: ${capacityResult.message}`)

      const ageResult = checkEligibility(formData.age, item)
      if (!ageResult.valid) ruleErrors.push(`${item.title}: ${ageResult.message}`)

      const timeResult = checkBookingCutoff(item)
      if (!timeResult.valid) ruleErrors.push(`${item.title}: ${timeResult.message}`)
    }

    if (ruleErrors.length > 0) {
      setErrors({ global: ruleErrors.join(" | ") })
      return
    }

    setErrors({})
    setIsConfirmed(true)
  }

  if (isConfirmed) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h1 style={{ color: 'var(--success-text)', fontSize: '2.5rem', marginBottom: '1rem' }}>Booking Confirmed! 🎉</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Thank you, <strong>{formData.name}</strong>. Your spot is reserved.</p>
        <div className="card" style={{ display: 'inline-block', padding: '1.5rem 3rem', marginBottom: '2rem' }}>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Total Paid</p>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>Rs. {totalPrice}</p>
        </div>
        <br/>
        <Link to="/classes" className="btn btn-primary">Book another class</Link>
      </div>
    )
  }

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Your Booking</h1>
      
      <div className="grid grid-cols-2">
        {/* Left Side: Cart Items */}
        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Selected Classes</h2>
          {cart.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>Your cart is empty. Go to the Classes page to add some sessions!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map((item) => (
                <div key={item.id} className="card" style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{item.title}</h3>
                      <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.instructor}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="btn btn-danger">Remove</button>
                  </div>
                  <p style={{ margin: '1rem 0 0 0', fontWeight: 'bold' }}>Rs. {item.price}</p>
                </div>
              ))}
              <div style={{ textAlign: 'right', padding: '1rem', borderTop: '2px solid var(--border-color)', marginTop: '1rem' }}>
                <h2 style={{ margin: 0 }}>Total: Rs. {totalPrice}</h2>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Form */}
        {cart.length > 0 && (
          <div className="card" style={{ padding: '2rem', height: 'fit-content' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Customer Details</h2>
            
            {errors.global && <div className="alert alert-error">{errors.global}</div>}
            {errors.cart && <div className="alert alert-error">{errors.cart}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
                {errors.name && <p style={{ color: 'var(--error-text)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.name}</p>}
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="text" name="email" value={formData.email} onChange={handleChange} className="form-control" />
                {errors.email && <p style={{ color: 'var(--error-text)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.email}</p>}
              </div>

              <div className="form-group">
                <label>Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-control" />
                {errors.age && <p style={{ color: 'var(--error-text)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.age}</p>}
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
                Confirm Booking
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}