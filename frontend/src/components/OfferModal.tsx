import React from 'react'
import { X, BadgeCheck, Phone } from 'lucide-react'

interface OfferModalProps {
  isOpen: boolean
  onClose: () => void
  onClaim: () => void
}

export const OfferModal: React.FC<OfferModalProps> = ({
  isOpen,
  onClose,
  onClaim,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full bg-slate-900 p-1 text-slate-400 hover:text-slate-100"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <BadgeCheck className="text-emerald-400" />
          <h2 className="text-lg font-semibold text-slate-50">
            Launch Offer Activated
          </h2>
        </div>

        <p className="text-sm text-slate-300 mb-3">
          You&apos;ll get <span className="font-semibold">₹1000 OFF</span> on
          any Lenovo device purchased through TechMitra Solutions (billed with
          us).
        </p>

        <ul className="mb-4 space-y-1.5 text-xs text-slate-300">
          <li>• Valid only on Lenovo devices billed via TechMitra.</li>
          <li>• Discount is applied directly on the final invoice amount.</li>
          <li>• Offer period is limited – confirm stock &amp; pricing with us.</li>
        </ul>

        <div className="flex flex-col sm:flex-row gap-2">
          <a
            href="tel:+917887972649"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
          >
            <Phone size={16} />
            Call now to book device
          </a>
          <button
            onClick={onClaim}
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:border-slate-500"
          >
            Okay, got it
          </button>
        </div>
      </div>
    </div>
  )
}
