import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(1)
  const timersRef = useRef(new Map())

  useEffect(() => () => {
    timersRef.current.forEach((timerId) => clearTimeout(timerId))
    timersRef.current.clear()
  }, [])

  const toast = useCallback((message, variant = 'success') => {
    const id = idRef.current++
    setToasts((current) => [...current, { id, message, variant }])

    const timeoutId = setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id))
      timersRef.current.delete(id)
    }, 3200)

    timersRef.current.set(id, timeoutId)
  }, [])

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-stack" aria-live="polite" aria-atomic="true">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.variant}`} role="status">
            <span className="toast-icon" aria-hidden="true">
              {t.variant === 'success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
            </span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}
