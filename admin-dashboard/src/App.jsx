import AppRouter from './router/AppRouter.jsx'
import { ToastProvider } from './components/Toast.jsx'

export default function App() {
  return (
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
  )
}
