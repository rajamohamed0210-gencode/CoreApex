import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, ContactRound, FolderKanban, MessageSquareQuote, RefreshCw, UsersRound, Wrench } from 'lucide-react'
import api, { getApiErrorMessage } from '../services/api.js'
import AnimatedCounter from '../components/AnimatedCounter.jsx'
import ScrollTriggeredModules from '../components/dashboard/ScrollTriggeredModules.jsx'

const metrics = [
  { key: 'team_total', label: 'Team members', icon: UsersRound },
  { key: 'services_total', label: 'Services', icon: Wrench },
  { key: 'projects_total', label: 'Projects', icon: FolderKanban },
  { key: 'project_requests', label: 'Project requests', icon: FolderKanban },
  { key: 'new_contacts', label: 'New contacts', icon: ContactRound },
  { key: 'active_testimonials', label: 'Active testimonials', icon: MessageSquareQuote },
]

const recentSections = [
  { key: 'recent_projects', title: 'Recent projects', columns: [['title', 'Project'], ['category', 'Category'], ['is_published', 'Published'], ['created_at', 'Created']] },
  { key: 'recent_contacts', title: 'Recent contacts', columns: [['name', 'Name'], ['email', 'Email'], ['status_display', 'Status']] },
  { key: 'recent_testimonials', title: 'Recent testimonials', columns: [['client_name', 'Client'], ['company_name', 'Company'], ['rating', 'Rating']] },
  { key: 'recent_team', title: 'Team members', columns: [['name', 'Name'], ['role', 'Role'], ['is_active', 'Active']] },
]

function displayValue(value) {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (typeof value === 'string' && value.includes('T')) {
    const date = new Date(value)
    if (!Number.isNaN(date.getTime())) return date.toLocaleDateString()
  }
  return String(value)
}

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    api.get('/dashboard/')
      .then(({ data: dashboardData }) => {
        if (active) setData(dashboardData)
      })
      .catch((requestError) => {
        if (active) setError(getApiErrorMessage(requestError))
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  async function retryDashboard() {
    setLoading(true)
    setError('')
    try {
      const response = await api.get('/dashboard/')
      setData(response.data)
    } catch (requestError) {
      setError(getApiErrorMessage(requestError))
    } finally {
      setLoading(false)
    }
  }

  const availableMetrics = data
    ? metrics.filter(({ key }) => Object.prototype.hasOwnProperty.call(data, key))
    : []

  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your Core Apex.dev workspace.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="resource-action secondary"
          type="button"
          onClick={retryDashboard}
          disabled={loading}
          style={{ alignSelf: 'flex-start' }}
        >
          <RefreshCw size={14} className={loading ? 'spin-slow' : ''} /> Refresh
        </motion.button>
      </div>

      {error && (
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="page-alert" role="alert">
          <AlertCircle size={17} aria-hidden="true" />
          <span>{error}</span>
          <button className="retry-button" type="button" onClick={retryDashboard}>
            <RefreshCw size={14} /> Retry
          </button>
        </motion.div>
      )}

      {loading ? (
        <div aria-live="polite">
          <section className="dashboard-grid" aria-label="Loading dashboard">
            {metrics.map((m) => (
              <div className="metric-card" key={m.key}>
                <div className="metric-topline"><span className="skeleton skeleton-line" style={{ width: '70%' }} /> <span className="skeleton" style={{ width: 31, height: 31, borderRadius: 6 }} /></div>
                <div className="skeleton skeleton-line" style={{ width: '40%', height: 26, marginTop: 16 }} />
              </div>
            ))}
          </section>
          <div style={{ display: 'grid', gap: 16, marginTop: 29 }}>
            <div className="skeleton skeleton-block" />
            <div className="skeleton skeleton-block" />
          </div>
        </div>
      ) : !error && availableMetrics.length === 0 ? (
        <div className="empty-panel">The API did not return dashboard metrics.</div>
      ) : !error ? (
        <>
          <motion.section
            className="dashboard-grid"
            aria-label="Dashboard metrics"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {availableMetrics.map(({ key, label, icon: Icon }) => (
              <motion.article
                key={key}
                className="metric-card"
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="metric-topline">
                  <span className="metric-label">{label}</span>
                  <span className="metric-icon"><Icon size={16} aria-hidden="true" /></span>
                </div>
                <div className="metric-value"><AnimatedCounter value={data[key]} /></div>
              </motion.article>
            ))}
          </motion.section>

          <ScrollTriggeredModules />

          {recentSections.map(({ key, title, columns }) => {
            if (!Object.prototype.hasOwnProperty.call(data, key)) return null
            const rows = Array.isArray(data[key]) ? data[key] : []
            return (
              <motion.section
                key={key}
                className="dashboard-section"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="section-heading">
                  <h2>{title}</h2>
                  <span>{rows.length} records</span>
                </div>
                <div className="data-table-wrap">
                  <table className="data-table">
                    <thead><tr>{columns.map(([, label]) => <th key={label}>{label}</th>)}</tr></thead>
                    <tbody>
                      {rows.length ? rows.map((row, index) => (
                        <motion.tr
                          key={row.id ?? index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.03 }}
                        >
                          {columns.map(([field]) => <td key={field}>{displayValue(row[field])}</td>)}
                        </motion.tr>
                      )) : (
                        <tr><td className="data-table-empty" colSpan={columns.length}>No records found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.section>
            )
          })}
        </>
      ) : null}
    </>
  )
}