import React, { useState } from 'react'
import { X } from 'lucide-react'
import type { ServiceItem } from '../types'
import { storageService } from '../services/storageService'

interface BookingModalProps {
  service: ServiceItem | null
  isOpen: boolean
  onClose: () => void
}

export const BookingModal: React.FC<BookingModalProps> = ({
  service,
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen || !service) return null

  const reset = () => {
    setName('')
    setPhone('')
    setNotes('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) {
      alert('Please enter your name and phone number.')
      return
    }
    try {
      setLoading(true)
      await storageService.saveInquiry({
        name: name.trim(),
        phone: phone.trim(),
        serviceName: service.title,
        notes: notes.trim() || undefined,
      })
      alert('Thank you! Your request has been sent. We will call you shortly.')
      reset()
      onClose()
    } catch (err: any) {
      alert(err?.message || 'Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-xl"
      >
        <button
          type="button"
          onClick={() => {
            reset()
            onClose()
          }}
          className="absolute right-3 top-3 rounded-full bg-slate-900 p-1 text-slate-400 hover:text-slate-100"
        >
          <X size={16} />
        </button>

        <h2 className="mb-1 text-lg font-semibold text-slate-50">
          Book / Ask about: {service.title}
        </h2>
        <p className="mb-4 text-xs text-slate-300">
          Share your details and we&apos;ll reach out with options and pricing.
        </p>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-200">
              Your Name
            </label>
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-brand-accent outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-200">
              Phone Number
            </label>
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-brand-accent outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              maxLength={15}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-200">
              Notes (Optional)
            </label>
            <textarea
              className="min-h-[70px] w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-brand-accent outline-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us what issue you are facing or what configuration you are looking for."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-xl bg-brand-accent px-3 py-2.5 text-sm font-semibold text-slate-950 hover:bg-brand-accent/90 disabled:opacity-60"
        >
          {loading ? 'Sending...' : 'Submit request'}
        </button>

        <p className="mt-2 text-[10px] text-slate-400">
          By submitting, you agree to be contacted on phone/WhatsApp by
          TechMitra Solutions for this inquiry.
        </p>
      </form>
    </div>
  )
}
