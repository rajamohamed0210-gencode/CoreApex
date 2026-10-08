import { useState } from 'react'
import { AlertCircle, Eye, EyeOff, KeyRound, LockKeyhole, LogIn } from 'lucide-react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import { getApiErrorMessage } from '../services/api.js'

export default function Login() {
  const { isAuthenticated, loading, login, startupError } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(location.state?.message || '')
  const visibleError = error || startupError

  if (loading) {
    return <main className="loading-panel"><span className="loading-inline"><span className="spinner" /> Loading</span></main>
  }

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const normalizedUsername = username.trim()
    if (!normalizedUsername || !password) {
      setError('Enter your email or username and password to continue.')
      return
    }

    setSubmitting(true)
    try {
      await login(normalizedUsername, password)
      const destination = location.state?.from?.pathname || '/admin/dashboard'
      navigate(destination === '/login' ? '/admin/dashboard' : destination, { replace: true })
    } catch (loginError) {
      setError(loginError.response?.status === 401
        ? 'Invalid username/email or password.'
        : getApiErrorMessage(loginError))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-aside" aria-label="Core Apex administration">
        <a className="brand" href="/login">
          <span className="brand-mark" aria-hidden="true">CA</span>
          <span>Core Apex.dev</span>
        </a>
        <div className="login-aside-content">
          <span className="eyebrow"><KeyRound size={14} /> Administration</span>
          <h1>Good work starts with a clear view.</h1>
          <p>Sign in to manage your Core Apex.dev workspace and keep your team, projects, and client conversations moving.</p>
        </div>
        <div className="login-aside-footer">Core Apex.dev admin workspace</div>
      </section>

      <section className="login-main">
        <div className="login-form-wrap">
          <h2>Welcome back</h2>
          <p className="login-intro">Enter your admin credentials to continue.</p>
          {visibleError && (
            <div className="form-alert" role="alert">
              <AlertCircle size={17} aria-hidden="true" />
              <span>{visibleError}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="username">Email or username</label>
              <div className="input-wrap">
                <KeyRound className="input-icon" aria-hidden="true" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="name@company.com"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  disabled={submitting}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="input-wrap">
                <LockKeyhole className="input-icon" aria-hidden="true" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={submitting}
                  required
                />
                <button
                  className="password-toggle"
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
            <button className="submit-button" type="submit" disabled={submitting}>
              {submitting ? <><span className="spinner" /> Signing in</> : <>Sign in <LogIn size={16} /></>}
            </button>
          </form>
          <div className="login-security-note"><LockKeyhole size={13} /> Secured with your Core Apex admin account</div>
        </div>
      </section>
    </main>
  )
}