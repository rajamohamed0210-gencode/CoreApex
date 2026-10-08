import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import AdminLayout from '../layouts/AdminLayout.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Login from '../pages/Login.jsx'
import ResourcePage from '../pages/ResourcePage.jsx'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="team" element={<ResourcePage resource="team" />} />
            <Route path="services" element={<ResourcePage resource="services" />} />
            <Route path="projects" element={<ResourcePage resource="projects" />} />
            <Route path="contacts" element={<ResourcePage resource="contacts" />} />
            <Route path="testimonials" element={<ResourcePage resource="testimonials" />} />
            <Route path="users" element={<ResourcePage resource="users" />} />
            <Route path="settings" element={<ResourcePage resource="settings" />} />
          </Route>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function AppRouter() {
  useEffect(() => {
    document.title = 'Core Apex.dev Admin'
  }, [])

  return <AnimatedRoutes />
}