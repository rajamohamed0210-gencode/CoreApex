import axios from 'axios'

export const ACCESS_TOKEN_KEY = 'coreapex_admin_access'
export const REFRESH_TOKEN_KEY = 'coreapex_admin_refresh'

const baseURL = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1/admin-dashboard').replace(/\/$/, '')

const api = axios.create({
  baseURL,
  headers: { Accept: 'application/json' },
})

let refreshPromise

function clearStoredTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  window.dispatchEvent(new Event('coreapex:auth-expired'))
}

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config
    const isAuthEndpoint = /\/auth\/(login|refresh|logout)\//.test(request?.url || '')

    if (error.response?.status !== 401 || !request || request._retry || isAuthEndpoint) {
      return Promise.reject(error)
    }

    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
    if (!refreshToken) {
      clearStoredTokens()
      return Promise.reject(error)
    }

    request._retry = true

    try {
      if (!refreshPromise) {
        refreshPromise = api.post('/auth/refresh/', { refresh: refreshToken })
          .then(({ data }) => {
            if (!data?.access) throw new Error('The refresh response did not include an access token.')
            localStorage.setItem(ACCESS_TOKEN_KEY, data.access)
            if (data.refresh) localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh)
            return data.access
          })
          .finally(() => {
            refreshPromise = undefined
          })
      }

      const accessToken = await refreshPromise
      request.headers.Authorization = `Bearer ${accessToken}`
      return api(request)
    } catch (refreshError) {
      clearStoredTokens()
      return Promise.reject(refreshError)
    }
  },
)

export default api

export function getApiErrorMessage(error) {
  if (!error.response) {
    return 'Unable to reach the admin API. Check that the backend is running and the API URL is correct.'
  }

  if (error.response.status === 401) return 'Authentication expired. Please sign in again.'
  if (error.response.status === 403) return 'Your account does not have permission to perform this action.'
  if (error.response.status === 404) return 'The requested admin API resource was not found.'
  if (error.response.status >= 500) return 'The server could not complete this request. Please try again later.'

  const { data } = error.response
  if (typeof data?.detail === 'string') return data.detail
  if (typeof data?.message === 'string') return data.message
  if (typeof data === 'string') return data

  const fieldError = data && Object.values(data).flat().find((value) => typeof value === 'string')
  return fieldError || 'The request could not be completed. Please try again.'
}