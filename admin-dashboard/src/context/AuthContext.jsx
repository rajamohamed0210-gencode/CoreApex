import { useEffect, useState } from 'react'
import api, { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../services/api.js'
import { AuthContext } from './authContext.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem(ACCESS_TOKEN_KEY)))
  const [startupError, setStartupError] = useState('')

  useEffect(() => {
    let active = true
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)

    const handleExpired = () => {
      if (active) {
        setUser(null)
        setStartupError('Your admin session has expired. Sign in to continue.')
      }
    }

    window.addEventListener('coreapex:auth-expired', handleExpired)

    if (!accessToken) {
      if (active) setLoading(false)
      return () => {
        active = false
        window.removeEventListener('coreapex:auth-expired', handleExpired)
      }
    }

    api.get('/auth/me/')
      .then(({ data }) => {
        if (active) setUser(data)
      })
      .catch((error) => {
        if (active && error.response?.status !== 401) {
          setStartupError('Could not verify the saved admin session. Sign in again after checking the API connection.')
        } else if (active) {
          setStartupError('Your admin session has expired. Sign in to continue.')
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
      window.removeEventListener('coreapex:auth-expired', handleExpired)
    }
  }, [])

  async function login(username, password) {
    setStartupError('')
    const { data } = await api.post('/auth/login/', { username, password })

    if (!data?.access || !data?.user) {
      throw new Error('The login response did not include the expected access token and user.')
    }

    localStorage.setItem(ACCESS_TOKEN_KEY, data.access)
    if (data.refresh) localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh)
    else localStorage.removeItem(REFRESH_TOKEN_KEY)
    setUser(data.user)
    return data.user
  }

  async function logout() {
    let errorMessage = ''
    const refresh = localStorage.getItem(REFRESH_TOKEN_KEY)

    try {
      await api.post('/auth/logout/', refresh ? { refresh } : {})
    } catch (error) {
      errorMessage = error.response?.data?.detail || 'The server could not confirm logout. This browser session was cleared.'
    } finally {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      setUser(null)
    }

    return errorMessage
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: Boolean(user && localStorage.getItem(ACCESS_TOKEN_KEY)),
      loading,
      startupError,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}