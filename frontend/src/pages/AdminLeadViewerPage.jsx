import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ExternalLink,
  Search,
  RefreshCw,
  Mail,
  Phone
} from 'lucide-react';
import { apiService } from '../services/api';
import SEO from '../components/SEO';

export default function AdminLeadViewerPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadLeads = async () => {
    setLoading(true);
    const data = await apiService.getLeads();
    setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const getStatusBadge = (status) => {
    const map = {
      new: { bg: 'bg-blue-50 text-[#2563EB] border-blue-200', label: 'New Lead' },
      contacted: { bg: 'bg-cyan-50 text-cyan-700 border-cyan-200', label: 'Contacted' },
      discussion: { bg: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Discussion' },
      proposal_sent: { bg: 'bg-purple-50 text-purple-700 border-purple-200', label: 'Proposal Sent' },
      won: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Closed-Won' },
      lost: { bg: 'bg-rose-50 text-rose-700 border-rose-200', label: 'Closed-Lost' },
    };
    const s = map[status] || map.new;
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold uppercase border ${s.bg}`}>
        {s.label}
      </span>
    );
  };

  const filtered = leads.filter((l) => {
    const matchesSearch =
      (l.name && l.name.toLowerCase().includes(search.toLowerCase())) ||
      (l.email && l.email.toLowerCase().includes(search.toLowerCase())) ||
      (l.company && l.company.toLowerCase().includes(search.toLowerCase())) ||
      (l.project_details && l.project_details.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <SEO
        title="CRM & Leads Pipeline — Core Apex.dev Control Center"
        description="Lead pipeline overview and direct Django Admin management portal for Core Apex.dev."
      />

      <div className="pt-28 pb-20 relative bg-[#F8FAFC] min-h-screen overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-mono font-semibold text-[#1D4ED8] uppercase mb-1.5">
                <ShieldCheck size={14} /> CRM Pipeline
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033]">
                Client Leads & Inquiries
              </h1>
              <p className="text-[#64748B] text-xs sm:text-sm mt-0.5">
                Real-time dashboard connected to Django REST API & PostgreSQL 18 backend.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={loadLeads}
                className="px-3 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#172033] border border-[#E2E8F0] transition-colors flex items-center gap-1.5 text-xs font-mono"
              >
                <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>

              <a
                href="http://127.0.0.1:8000/admin/contacts/contactlead/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-mono font-semibold uppercase tracking-wider shadow-button-glow transition-all"
              >
                <span>Open Django Admin</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
            <div className="p-4 rounded-xl light-card">
              <div className="text-xs text-[#64748B] font-mono">Total Leads</div>
              <div className="text-2xl font-black text-[#172033] mt-0.5">{leads.length}</div>
            </div>
            <div className="p-4 rounded-xl light-card">
              <div className="text-xs text-[#64748B] font-mono">New Inquiries</div>
              <div className="text-2xl font-black text-[#2563EB] mt-0.5">
                {leads.filter((l) => l.status === 'new').length}
              </div>
            </div>
            <div className="p-4 rounded-xl light-card">
              <div className="text-xs text-[#64748B] font-mono">In Discussion</div>
              <div className="text-2xl font-black text-amber-600 mt-0.5">
                {leads.filter((l) => l.status === 'discussion' || l.status === 'proposal_sent').length}
              </div>
            </div>
            <div className="p-4 rounded-xl light-card">
              <div className="text-xs text-[#64748B] font-mono">Won Deals</div>
              <div className="text-2xl font-black text-emerald-600 mt-0.5">
                {leads.filter((l) => l.status === 'won').length}
              </div>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="p-4 rounded-xl light-card mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search leads by name, email or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-[#172033] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {[
                { key: 'all', label: 'All' },
                { key: 'new', label: 'New' },
                { key: 'discussion', label: 'Discussion' },
                { key: 'proposal_sent', label: 'Proposal' },
                { key: 'won', label: 'Won' },
              ].map((st) => (
                <button
                  key={st.key}
                  onClick={() => setStatusFilter(st.key)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    statusFilter === st.key
                      ? 'bg-[#2563EB] text-white font-semibold'
                      : 'bg-white text-[#64748B] hover:text-[#172033] border border-[#E2E8F0]'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Leads Table */}
          <div className="rounded-xl light-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] text-[#64748B] uppercase font-mono border-b border-[#E2E8F0]">
                  <tr>
                    <th className="px-5 py-3.5">Client / Company</th>
                    <th className="px-5 py-3.5">Contact Details</th>
                    <th className="px-5 py-3.5">Service</th>
                    <th className="px-5 py-3.5">Budget</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] text-[#1E293B]">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-10 text-center text-[#94A3B8] font-mono">
                        No inquiries match the current filter.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((lead, idx) => (
                      <tr key={lead.id || idx} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="font-bold text-[#172033] text-sm">{lead.name}</div>
                          {lead.company && (
                            <div className="text-[#64748B] font-mono text-[11px]">{lead.company}</div>
                          )}
                        </td>

                        <td className="px-5 py-3.5 space-y-0.5 font-mono text-[11px]">
                          <div className="flex items-center gap-1.5 text-[#172033]">
                            <Mail size={12} className="text-[#2563EB]" />
                            <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>
                          </div>
                          {lead.phone && (
                            <div className="flex items-center gap-1.5 text-[#64748B]">
                              <Phone size={12} className="text-[#2563EB]" />
                              <span>{lead.phone}</span>
                            </div>
                          )}
                        </td>

                        <td className="px-5 py-3.5">
                          <span className="px-2 py-0.5 rounded-md bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] font-mono text-[11px]">
                            {lead.service_display || lead.service}
                          </span>
                          {lead.project_details && (
                            <p className="text-[#64748B] text-[11px] line-clamp-1 mt-1 max-w-xs">
                              {lead.project_details}
                            </p>
                          )}
                        </td>

                        <td className="px-5 py-3.5 font-mono text-[#64748B]">
                          {lead.budget || 'Flexible'}
                        </td>

                        <td className="px-5 py-3.5">
                          {getStatusBadge(lead.status)}
                        </td>

                        <td className="px-5 py-3.5 font-mono text-[#94A3B8] text-[11px]">
                          {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : 'Recent'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="mt-6 p-3.5 rounded-xl bg-white border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B] font-mono">
            <span>
              💡 Lead statuses and CRM lifecycle can be updated from Django Admin.
            </span>
            <a
              href="http://127.0.0.1:8000/admin/"
              target="_blank"
              rel="noreferrer"
              className="text-[#2563EB] hover:underline flex items-center gap-1"
            >
              <span>Login to Django Admin Control Center</span>
              <ExternalLink size={12} />
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
