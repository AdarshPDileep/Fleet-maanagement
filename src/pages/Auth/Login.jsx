import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate a network request for dummy login
    setTimeout(() => {
      setLoading(false)
      navigate('/provider/dashboard') // Redirect to Provider Dashboard after "login"
    }, 1000)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        
        {/* Left Branding Side */}
        <div className="auth-brand-side">
          <div className="auth-brand-content">
            <h1 className="auth-brand-title">Welcome Back.</h1>
            <p className="auth-brand-desc">
              Sign in to the Fleet Management System to track your vehicles, manage bookings, and view maintenance alerts in real-time.
            </p>
          </div>
          
          <div className="auth-brand-graphic">
            {/* Some decorative elements for the glassmorphism aesthetic */}
            <div className="auth-circle auth-circle-1"></div>
            <div className="auth-circle auth-circle-2"></div>
            <div className="auth-glass-card">
              <div className="auth-glass-stat">
                <span className="auth-glass-label">Active Fleet</span>
                <span className="auth-glass-value">128</span>
              </div>
              <div className="auth-glass-stat">
                <span className="auth-glass-label">System Status</span>
                <span className="auth-glass-value" style={{ color: 'var(--green)' }}>Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="auth-form-side">
          <div className="auth-form-wrapper">
            <div className="auth-form-header">
              <h2>Sign In</h2>
              <p>Enter your credentials to access your account.</p>
            </div>

            <form onSubmit={handleLogin} className="auth-form">
              
              <div className="auth-input-group">
                <label>Email Address</label>
                <div className="auth-input-icon-wrap">
                  <Mail size={18} className="auth-input-icon" />
                  <input 
                    type="email" 
                    placeholder="you@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <div className="auth-label-row">
                  <label>Password</label>
                  <a href="#" className="auth-forgot-link">Forgot password?</a>
                </div>
                <div className="auth-input-icon-wrap">
                  <Lock size={18} className="auth-input-icon" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    <span>Sign In to Dashboard</span>
                    <LogIn size={18} />
                  </>
                )}
              </button>

            </form>

            <div className="auth-footer">
              <p>Don't have an account? <Link to="/register" style={{color: 'var(--green)', fontWeight: '700', marginLeft: '5px'}}>Sign up for free</Link></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login