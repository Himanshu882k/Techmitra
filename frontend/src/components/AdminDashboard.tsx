import React, { useEffect, useState } from 'react'
import type { Inquiry, InquiryStatus } from '../types'
import { storageService } from '../services/storageService'

interface AdminDashboardProps {
  onLogout: () => void
}

const statusLabel: Record<InquiryStatus, string> = {
  pending: 'Pending',
  in_progress: 'In progress',
  completed: 'Completed',
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [items, setItems] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await storageService.getInquiries()
      setItems(data)
    } catch (err: any) {
      setError(err?.message || 'Failed to load inquiries')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const changeStatus = async (id: string, status: InquiryStatus) => {
    try {
      await storageService.updateStatus(id, status)
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status } : i)),
      )
    } catch (err: any) {
      alert(err?.message || 'Failed to update status')
    }
  }

  const logout = () => {
    storageService.clearAdminToken()
    onLogout()
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="section-container flex items-center justify-between py-3">
          <h1 className="text-base font-semibold">TechMitra – Admin Panel</h1>
          <button
            onClick={logout}
            className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:border-red-500 hover:text-red-300"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="section-container py-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-200">
            Customer Inquiries
          </h2>
          <button
            onClick={load}
            className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:border-brand-accent hover:text-brand-accent"
          >
            Refresh
          </button>
        </div>

        {loading && (
          <p className="text-sm text-slate-400 mb-3">Loading inquiries...</p>
        )}
        {error && (
          <p className="text-sm text-red-400 mb-3">Error: {error}</p>
        )}
        {!loading && !error && items.length === 0 && (
          <p className="text-sm text-slate-400">
            No inquiries yet. When customers submit the booking form from the
            site, they will appear here.
          </p>
        )}

        <div className="space-y-3">
          {items.map((inq) => (
            <div
              key={inq.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div>
                  <p className="font-semibold text-slate-100">
                    {inq.customer_name}{' '}
                    <span className="text-slate-400">•</span>{' '}
                    <span className="text-slate-300">{inq.customer_phone}</span>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Service: {inq.service_name}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  {(['pending', 'in_progress', 'completed'] as InquiryStatus[]).map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() => changeStatus(inq.id, status)}
                        className={`rounded-full px-2 py-1 text-[10px] border ${
                          inq.status === status
                            ? status === 'completed'
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                              : status === 'in_progress'
                              ? 'border-sky-500 bg-sky-500/10 text-sky-300'
                              : 'border-amber-500 bg-amber-500/10 text-amber-300'
                            : 'border-slate-700 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        {statusLabel[status]}
                      </button>
                    ),
                  )}
                </div>
              </div>
              {inq.message && (
                <p className="mb-1 text-[11px] text-slate-300">
                  Notes: {inq.message}
                </p>
              )}
              <p className="text-[10px] text-slate-500">
                {new Date(inq.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
