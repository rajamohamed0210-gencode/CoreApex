import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Pencil, Plus, RefreshCw, Save, Search, Trash2, X } from 'lucide-react'
import api, { getApiErrorMessage } from '../services/api.js'
import { useToast } from '../components/Toast.jsx'

const contactStatusOptions = [
  ['new', 'New'],
  ['contacted', 'Contacted'],
  ['discussion', 'In discussion'],
  ['proposal_sent', 'Proposal sent'],
  ['won', 'Won'],
  ['lost', 'Lost'],
]

const resourceConfig = {
  team: {
    title: 'Team',
    description: 'Manage the team shown on the public website.',
    endpoint: '/team/',
    columns: [['name', 'Name'], ['role', 'Role'], ['is_active', 'Active'], ['order', 'Order']],
    fields: [
      { name: 'name', label: 'Name', required: true },
      { name: 'role', label: 'Role', required: true },
      { name: 'bio', label: 'Biography', type: 'textarea', wide: true, required: true },
      { name: 'avatar_file', label: 'Avatar image', type: 'file' },
      { name: 'avatar_url', label: 'Avatar URL', type: 'url' },
      { name: 'linkedin_url', label: 'LinkedIn URL', type: 'url' },
      { name: 'github_url', label: 'GitHub URL', type: 'url' },
      { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
      { name: 'is_active', label: 'Active', type: 'boolean', defaultValue: true },
    ],
  },
  services: {
    title: 'Services',
    description: 'Manage the same services used by the public website.',
    endpoint: '/services/',
    columns: [['title', 'Service'], ['tagline', 'Tagline'], ['is_featured', 'Featured'], ['order', 'Order']],
    fields: [
      { name: 'title', label: 'Title', required: true },
      { name: 'slug', label: 'Slug' },
      { name: 'tagline', label: 'Tagline' },
      { name: 'icon_name', label: 'Icon name', defaultValue: 'Code' },
      { name: 'short_description', label: 'Short description', type: 'textarea', wide: true, required: true },
      { name: 'full_description', label: 'Full description', type: 'textarea', wide: true, required: true },
      { name: 'features', label: 'Features (JSON array)', type: 'json', defaultValue: [] },
      { name: 'deliverables', label: 'Deliverables (JSON array)', type: 'json', defaultValue: [] },
      { name: 'tech_stack', label: 'Tech stack (JSON array)', type: 'json', defaultValue: [] },
      { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
      { name: 'is_featured', label: 'Featured on public site', type: 'boolean', defaultValue: true },
    ],
  },
  projects: {
    title: 'Projects',
    description: 'Manage portfolio projects shown by the public API.',
    endpoint: '/projects/',
    columns: [['title', 'Project'], ['category', 'Category'], ['is_published', 'Published'], ['created_at', 'Created']],
    fields: [
      { name: 'title', label: 'Title', required: true },
      { name: 'client', label: 'Client' },
      { name: 'industry', label: 'Industry' },
      { name: 'category', label: 'Category', type: 'select', options: [['web', 'Web'], ['mobile', 'Mobile'], ['cloud', 'Cloud'], ['software', 'Software'], ['api', 'API']] },
      { name: 'tagline', label: 'Tagline' },
      { name: 'short_description', label: 'Short description', type: 'textarea', wide: true, required: true },
      { name: 'challenge', label: 'Challenge', type: 'textarea', wide: true },
      { name: 'solution', label: 'Solution', type: 'textarea', wide: true },
      { name: 'results_summary', label: 'Results summary', type: 'textarea', wide: true },
      { name: 'technologies', label: 'Technologies (JSON array)', type: 'json', defaultValue: [] },
      { name: 'metrics', label: 'Metrics (JSON array)', type: 'json', defaultValue: [] },
      { name: 'featured_image', label: 'Featured image URL' },
      { name: 'gallery_images', label: 'Gallery images (JSON array)', type: 'json', defaultValue: [] },
      { name: 'website_url', label: 'Website URL', type: 'url' },
      { name: 'github_url', label: 'GitHub URL', type: 'url' },
      { name: 'is_featured', label: 'Featured', type: 'boolean', defaultValue: true },
      { name: 'is_published', label: 'Published', type: 'boolean', defaultValue: true },
      { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
    ],
  },
  contacts: {
    title: 'Contacts',
    description: 'Review real submissions from the public contact form.',
    endpoint: '/contacts/',
    readOnlyFields: ['name', 'email', 'phone', 'company', 'service', 'budget', 'project_details'],
    columns: [['name', 'Name'], ['email', 'Email'], ['company', 'Company'], ['status_display', 'Status'], ['created_at', 'Received']],
    fields: [
      { name: 'name', label: 'Name', readOnly: true },
      { name: 'email', label: 'Email', readOnly: true },
      { name: 'phone', label: 'Phone', readOnly: true },
      { name: 'company', label: 'Company', readOnly: true },
      { name: 'service_display', label: 'Service', readOnly: true },
      { name: 'budget_display', label: 'Budget', readOnly: true },
      { name: 'project_details', label: 'Project request', type: 'textarea', wide: true, readOnly: true },
      { name: 'status', label: 'Lead status', type: 'select', options: contactStatusOptions },
      { name: 'admin_notes', label: 'Internal notes', type: 'textarea', wide: true },
    ],
  },
  testimonials: {
    title: 'Testimonials',
    description: 'Manage testimonials used by the public website.',
    endpoint: '/testimonials/',
    columns: [['client_name', 'Client'], ['client_role', 'Role'], ['company_name', 'Company'], ['rating', 'Rating'], ['is_featured', 'Featured']],
    fields: [
      { name: 'client_name', label: 'Client name', required: true },
      { name: 'client_role', label: 'Client role', required: true },
      { name: 'company_name', label: 'Company', required: true },
      { name: 'avatar_url', label: 'Avatar URL', type: 'url' },
      { name: 'content', label: 'Testimonial', type: 'textarea', wide: true, required: true },
      { name: 'rating', label: 'Rating (1-5)', type: 'number', defaultValue: 5 },
      { name: 'project_title', label: 'Project title' },
      { name: 'is_featured', label: 'Published on public site', type: 'boolean', defaultValue: true },
      { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
    ],
  },
  users: {
    title: 'Users',
    description: 'Accounts with access to this admin workspace.',
    endpoint: '/users/',
    readOnly: true,
    columns: [['username', 'Username'], ['email', 'Email'], ['full_name', 'Name'], ['role', 'Role'], ['is_active', 'Active']],
    fields: [],
  },
  settings: {
    title: 'Site settings',
    description: 'Edit the existing site settings used by the public API.',
    endpoint: '/settings/',
    singleton: true,
    columns: [['site_name', 'Site name'], ['email', 'Email'], ['phone', 'Phone'], ['updated_at', 'Updated']],
    fields: [
      { name: 'site_name', label: 'Site name', required: true },
      { name: 'tagline', label: 'Tagline' },
      { name: 'hero_headline', label: 'Hero headline' },
      { name: 'hero_subheading', label: 'Hero subheading', type: 'textarea', wide: true },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'phone', label: 'Phone' },
      { name: 'address', label: 'Address', type: 'textarea', wide: true },
      { name: 'whatsapp_url', label: 'WhatsApp URL', type: 'url' },
      { name: 'founder_name', label: 'Founder name' },
      { name: 'founder_role', label: 'Founder role' },
      { name: 'founder_bio', label: 'Founder biography', type: 'textarea', wide: true },
      { name: 'github_url', label: 'GitHub URL', type: 'url' },
      { name: 'linkedin_url', label: 'LinkedIn URL', type: 'url' },
      { name: 'twitter_url', label: 'X URL', type: 'url' },
    ],
  },
}

function toDraft(row, fields) {
  return Object.fromEntries(fields.map(({ name, type, defaultValue }) => {
    const value = row?.[name] ?? defaultValue ?? (type === 'boolean' ? false : '')
    return [name, type === 'json' ? JSON.stringify(value, null, 2) : value]
  }))
}

function formatValue(value) {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (Array.isArray(value)) return value.join(', ')
  if (typeof value === 'object') return JSON.stringify(value)
  if (typeof value === 'string' && value.includes('T')) {
    const date = new Date(value)
    if (!Number.isNaN(date.getTime())) return date.toLocaleString()
  }
  return String(value)
}

function makePayload(draft, fields) {
  const payload = {}
  for (const field of fields) {
    if (field.readOnly || field.type === 'file' || draft[field.name] === undefined) continue
    const value = draft[field.name]
    if (field.type === 'json') {
      payload[field.name] = value.trim() ? JSON.parse(value) : []
    } else if (field.type === 'number') {
      payload[field.name] = value === '' ? null : Number(value)
    } else {
      payload[field.name] = value
    }
  }
  return payload
}

async function fetchRows(endpoint, singleton) {
  const { data } = await api.get(endpoint)
  const items = singleton ? (data ? [data] : []) : Array.isArray(data) ? data : data?.results
  if (!Array.isArray(items)) throw new Error('The API returned an unexpected response format.')
  return items
}

export default function ResourcePage({ resource }) {
  const config = resourceConfig[resource]
  const [rows, setRows] = useState([])
  const [loadedResource, setLoadedResource] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [editor, setEditor] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    let active = true
    fetchRows(config.endpoint, config.singleton)
      .then((items) => {
        if (active) {
          setRows(items)
          setError('')
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.message === 'The API returned an unexpected response format.'
            ? requestError.message
            : getApiErrorMessage(requestError))
        }
      })
      .finally(() => {
        if (active) setLoadedResource(resource)
      })

    return () => {
      active = false
    }
  }, [config.endpoint, config.singleton, resource])

  async function loadRows() {
    setLoadedResource('')
    setError('')
    try {
      setRows(await fetchRows(config.endpoint, config.singleton))
    } catch (requestError) {
      setError(requestError.message === 'The API returned an unexpected response format.'
        ? requestError.message
        : getApiErrorMessage(requestError))
    } finally {
      setLoadedResource(resource)
    }
  }

  function startCreate() {
    setError('')
    setEditor({ id: null, draft: toDraft(null, config.fields) })
  }

  function startEdit(row) {
    setError('')
    setEditor({ id: row.id, draft: toDraft(row, config.fields) })
  }

  function updateField(name, value) {
    setEditor((current) => ({ ...current, draft: { ...current.draft, [name]: value } }))
  }

  async function save(event) {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = makePayload(editor.draft, config.fields)
      const file = config.fields.find(({ type }) => type === 'file')
      const fileValue = file && editor.draft[file.name]
      let body = payload
      if (fileValue) {
        body = new FormData()
        Object.entries(payload).forEach(([name, value]) => {
          body.append(name, typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value ?? ''))
        })
        body.append(file.name, fileValue)
      }

      if (config.singleton) {
        await api.patch(config.endpoint, payload)
      } else if (editor.id) {
        await api.patch(`${config.endpoint}${editor.id}/`, body)
      } else {
        await api.post(config.endpoint, body)
      }
      setEditor(null)
      await loadRows()
      toast(editor.id ? `${config.title.replace(/s$/, '')} updated successfully.` : `${config.title.replace(/s$/, '')} created successfully.`, 'success')
    } catch (requestError) {
      setError(requestError instanceof SyntaxError
        ? 'JSON fields must contain valid JSON.'
        : getApiErrorMessage(requestError))
      toast('The resource could not be saved.', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function remove(row) {
    if (!window.confirm(`Delete ${row.name || row.title || row.client_name || 'this record'}? This changes the live public-site data.`)) return
    setError('')
    try {
      await api.delete(`${config.endpoint}${row.id}/`)
      setRows((current) => current.filter((item) => item.id !== row.id))
      toast(`${config.title.replace(/s$/, '')} deleted successfully.`, 'success')
    } catch (requestError) {
      setError(getApiErrorMessage(requestError))
      toast('The item could not be deleted.', 'error')
    }
  }

  if (!config) return null
  const loading = loadedResource !== resource

  return (
    <>
      <div className="page-heading">
        <div>
          <h1>{config.title}</h1>
          <p>{config.description}</p>
        </div>
      </div>

      {error && (
        <div className="page-alert" role="alert">
          <AlertCircle size={17} aria-hidden="true" />
          <span>{error}</span>
          <button className="retry-button" type="button" onClick={loadRows}>
            <RefreshCw size={14} /> Retry
          </button>
        </div>
      )}

      {!config.readOnly && (
        <div className="resource-toolbar">
          {config.singleton ? rows.length > 0 && !editor && (
            <button className="resource-action" type="button" onClick={() => startEdit(rows[0])}>
              <Pencil size={14} /> Edit settings
            </button>
          ) : !editor && (
            <button className="resource-action" type="button" onClick={startCreate}>
              <Plus size={15} /> Add {config.title.toLowerCase().replace(/s$/, '')}
            </button>
          )}
        </div>
      )}

      {editor && (
        <section className="resource-editor">
          <h2>{editor.id ? `Edit ${config.title.toLowerCase().replace(/s$/, '')}` : `Add ${config.title.toLowerCase().replace(/s$/, '')}`}</h2>
          <form onSubmit={save}>
            <div className="resource-form-grid">
              {config.fields.map((field) => (
                <label className={`resource-field${field.wide ? ' wide' : ''}`} key={field.name}>
                  <span>{field.label}</span>
                  {field.type === 'boolean' ? (
                    <span className="resource-check">
                      <input
                        type="checkbox"
                        checked={Boolean(editor.draft[field.name])}
                        onChange={(event) => updateField(field.name, event.target.checked)}
                      />
                      {field.label}
                    </span>
                  ) : field.type === 'select' ? (
                    <select value={editor.draft[field.name] ?? ''} onChange={(event) => updateField(field.name, event.target.value)}>
                      {field.options.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                    </select>
                  ) : field.type === 'textarea' || field.type === 'json' ? (
                    <textarea
                      value={editor.draft[field.name] ?? ''}
                      onChange={(event) => updateField(field.name, event.target.value)}
                      required={field.required}
                      readOnly={field.readOnly}
                      spellCheck={field.type !== 'json'}
                    />
                  ) : field.type === 'file' ? (
                    <input type="file" accept="image/*" onChange={(event) => updateField(field.name, event.target.files?.[0] || null)} />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      value={editor.draft[field.name] ?? ''}
                      onChange={(event) => updateField(field.name, field.type === 'number' ? event.target.value : event.target.value)}
                      required={field.required}
                      readOnly={field.readOnly}
                    />
                  )}
                </label>
              ))}
            </div>
            <div className="resource-form-actions">
              <button className="resource-action secondary" type="button" onClick={() => setEditor(null)} disabled={saving}>
                <X size={14} /> Cancel
              </button>
              <button className="resource-action" type="submit" disabled={saving}>
                {saving ? <span className="spinner" /> : <Save size={14} />} Save
              </button>
            </div>
          </form>
        </section>
      )}

      {loading ? (
        <div className="loading-panel" aria-live="polite"><span className="loading-inline"><span className="spinner" /> Loading {config.title.toLowerCase()}</span></div>
      ) : !error && rows.length === 0 && !editor ? (
        <div className="empty-panel">No records found.</div>
      ) : !error ? (
        <section className="dashboard-section">
          <div className="section-heading">
            <h2>{config.title}</h2>
            <span className="resource-count">{rows.length} records</span>
          </div>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  {config.columns.map(([, label]) => <th key={label}>{label}</th>)}
                  {!config.readOnly && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    {config.columns.map(([field]) => <td key={field}>{formatValue(row[field])}</td>)}
                    {!config.readOnly && (
                      <td>
                        <div className="resource-row-actions">
                          <button className="resource-icon-button" type="button" title="Edit" aria-label={`Edit ${row.name || row.title || row.client_name || 'record'}`} onClick={() => startEdit(row)}>
                            <Pencil size={14} />
                          </button>
                          {!config.singleton && (
                            <button className="resource-icon-button danger" type="button" title="Delete" aria-label={`Delete ${row.name || row.title || row.client_name || 'record'}`} onClick={() => remove(row)}>
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </>
  )
}