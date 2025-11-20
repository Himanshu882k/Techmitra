import React, { useEffect, useState } from 'react'
import { X, Flame, ArrowRight, Gift } from 'lucide-react'
import { OFFERS } from '../constants'

interface FloatingOfferProps {
  onClaim: () => void
}

export const FloatingOffer: React.FC<FloatingOfferProps> = ({ onClaim }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const offer = OFFERS[0]
  if (!offer || !visible) return null

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-xs sm:max-w-sm">
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-slate-950/95 shadow-2xl shadow-amber-500/30">
        <button
          onClick={() => setVisible(false)}
          className="absolute right-2 top-2 rounded-full bg-black/40 p-1 text-amber-100/70 hover:text-amber-50"
        >
          <X size={14} />
        </button>

        <div className="flex gap-3 p-3 sm:p-4">
          <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10">
            <Flame className="text-amber-400" size={20} />
          </div>
          <div className="space-y-1">
            <p className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-amber-300">
              <Gift size={13} />
              Launch Special
            </p>
            <p className="text-xs font-semibold text-amber-50">
              Flat ₹1000 OFF on every Lenovo device purchase
            </p>
            <p className="text-[10px] text-amber-200/80">
              Through TechMitra Solutions – no hidden terms, no coupons.
            </p>
            <button
              onClick={onClaim}
              className="mt-1 inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1.5 text-[11px] font-semibold text-black hover:bg-amber-300"
            >
              Claim offer
              <ArrowRight size={14} />
            </button>
            <p className="text-[9px] text-amber-200/70">
              Limited launch period • T&amp;C apply
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
