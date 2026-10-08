import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, startupError } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <main className="loading-panel" aria-live="polite">
        <span className="loading-inline"><span className="spinner" /> Verifying admin session</span>
      </main>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location, message: startupError }} />
  }

  return children
}