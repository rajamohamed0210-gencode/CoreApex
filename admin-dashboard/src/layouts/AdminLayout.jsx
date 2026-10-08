import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  Bell,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  ContactRound,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  Search,
  Settings,
  Sparkles,
  UsersRound,
  Wrench,
  X,
} from 'lucide-react'
import { useAuth } from '../context/useAuth.js'

const navigation = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Team', path: '/admin/team', icon: UsersRound },
  { label: 'Services', path: '/admin/services', icon: Wrench },
  { label: 'Projects', path: '/admin/projects', icon: FolderKanban },
  { label: 'Contacts', path: '/admin/contacts', icon: ContactRound },
  { label: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
  { label: 'Users', path: '/admin/users', icon: BriefcaseBusiness },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
]

const notifications = [
  { title: 'New lead assigned', detail: 'Northstar Labs is waiting for a proposal review.', time: '2m ago' },
  { title: 'Project status updated', detail: 'Atlas Commerce moved to implementation.', time: '17m ago' },
  { title: 'Founder profile refreshed', detail: 'Public site image sync completed successfully.', time: '1h ago' },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const pageName = navigation.find((item) => item.path === location.pathname)?.label || 'Dashboard'

  async function handleLogout() {
    const message = await logout()
    navigate('/login', { replace: true, state: message ? { message } : undefined })
  }

  const initials = (user?.full_name || user?.username || 'Admin')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="admin-shell">
      <button
        className={`mobile-overlay${menuOpen ? ' is-open' : ''}`}
        type="button"
        aria-label="Close navigation"
        onClick={() => setMenuOpen(false)}
      />

      <aside className={`sidebar${menuOpen ? ' is-open' : ''}${sidebarCollapsed ? ' is-collapsed' : ''}`} aria-label="Admin navigation">
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <a className="brand" href="/admin/dashboard" onClick={() => setMenuOpen(false)}>
              <span className="brand-mark" aria-hidden="true">CA</span>
              {!sidebarCollapsed && <span>Core Apex.dev</span>}
            </a>
          </div>
          <button
            type="button"
            className="collapse-toggle"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
          >
            {sidebarCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>

        <div className="sidebar-label">Workspace</div>
        <motion.nav className="sidebar-nav" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}>
          {navigation.map(({ label, path, icon: Icon }) => (
            <motion.div key={path} variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}>
              <NavLink
                to={path}
                end={path === '/admin/dashboard'}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    {isActive && <motion.span className="nav-indicator" layoutId="nav-indicator" transition={{ type: 'spring', stiffness: 320, damping: 30 }} />}
                    <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                    {!sidebarCollapsed && <span>{label}</span>}
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </motion.nav>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <span className="user-avatar" aria-hidden="true">{initials}</span>
            {!sidebarCollapsed && (
              <div className="user-details">
                <div className="user-name">{user?.full_name || user?.username || 'Admin'}</div>
                <div className="user-role">{user?.role || 'Administrator'}</div>
              </div>
            )}
          </div>
          <button className="logout-button" type="button" onClick={handleLogout}>
            <LogOut size={17} strokeWidth={1.8} aria-hidden="true" />
            {!sidebarCollapsed && <span>Log out</span>}
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu-button"
              type="button"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
            <div className="topbar-title-wrap">
              <span className="topbar-breadcrumb">Workspace /</span>
              <div className="topbar-title">{pageName}</div>
            </div>
          </div>

          <div className="topbar-actions">
            <label className="search-box" aria-label="Search">
              <Search size={15} aria-hidden="true" />
              <input type="search" placeholder="Quick search" />
            </label>

            <div className="utility-menu">
              <button
                type="button"
                className="icon-button"
                aria-label="Notifications"
                onClick={() => {
                  setNotificationsOpen((open) => !open)
                  setProfileOpen(false)
                }}
              >
                <Bell size={16} />
                <span className="notification-badge">3</span>
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    className="dropdown-menu"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <div className="dropdown-header">
                      <span>Notifications</span>
                      <Sparkles size={13} />
                    </div>
                    {notifications.map((item) => (
                      <button key={item.title} type="button" className="dropdown-item notification-item">
                        <div>
                          <strong>{item.title}</strong>
                          <small>{item.detail}</small>
                        </div>
                        <span>{item.time}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="utility-menu profile-menu">
              <button
                type="button"
                className="profile-trigger"
                onClick={() => {
                  setProfileOpen((open) => !open)
                  setNotificationsOpen(false)
                }}
              >
                <span className="user-avatar small" aria-hidden="true">{initials}</span>
                <span className="profile-meta">
                  <strong>{user?.full_name || user?.username || 'Admin'}</strong>
                  <small>{user?.role || 'Administrator'}</small>
                </span>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    className="dropdown-menu"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <button type="button" className="dropdown-item">Profile</button>
                    <button type="button" className="dropdown-item">Settings</button>
                    <button type="button" className="dropdown-item danger" onClick={handleLogout}>Logout</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}