import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserPlus, Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate a network request
    setTimeout(() => {
      setLoading(false)
      navigate('/login') // Redirect to login after "registration"
    }, 1500)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        
        {/* Left Branding Side */}
        <div className="auth-brand-side">
          <div className="auth-brand-content">
            <button className="back-to-site" onClick={() => navigate('/')}>
              <ArrowLeft size={16} />
              <span>Back to site</span>
            </button>
            <h1 className="auth-brand-title">Join FleetCare.</h1>
            <p className="auth-brand-desc">
              Create an account to book vehicles, track your trips, and manage your rentals with the most advanced fleet system.
            </p>
          </div>
          
          <div className="auth-brand-graphic">
            <div className="auth-circle auth-circle-1"></div>
            <div className="auth-circle auth-circle-2"></div>
            <div className="auth-glass-card">
              <div className="auth-glass-stat">
                <span className="auth-glass-label">New Users</span>
                <span className="auth-glass-value" style={{ color: 'var(--green)' }}>+450</span>
              </div>
              <div className="auth-glass-stat">
                <span className="auth-glass-label">Availability</span>
                <span className="auth-glass-value">24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="auth-form-side">
          <div className="auth-form-wrapper">
            <div className="auth-form-header">
              <h2>Create Account</h2>
              <p>Sign up to start your journey with us.</p>
            </div>

            <form onSubmit={handleRegister} className="auth-form">
              
              <div className="auth-input-group">
                <label>Full Name</label>
                <div className="auth-input-icon-wrap">
                  <User size={18} className="auth-input-icon" />
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label>Email Address</label>
                <div className="auth-input-icon-wrap">
                  <Mail size={18} className="auth-input-icon" />
                  <input 
                    type="email" 
                    placeholder="you@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label>Password</label>
                <div className="auth-input-icon-wrap">
                  <Lock size={18} className="auth-input-icon" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Create a password" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                  <button 
                    type="button" 
                    className="auth-pw-toggle" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? (
                  <span className="auth-spinner"></span>
                ) : (
                  <>
                    <span>Create Free Account</span>
                    <UserPlus size={18} />
                  </>
                )}
              </button>

            </form>

            <div className="auth-footer">
              <p>Already have an account?</p>
              <Link to="/login" className="auth-login-link">Sign in instead</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Register
