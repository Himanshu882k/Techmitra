import React from 'react'
import type { ServiceItem } from '../types'

interface ServiceCardProps {
  service: ServiceItem
  onBook: (service: ServiceItem) => void
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  const emoji =
    service.category === 'laptop-pc'
      ? '💻'
      : service.category === 'repair'
      ? '🛠️'
      : service.category === 'cleaning'
      ? '🧹'
      : service.category === 'custom-build'
      ? '🧩'
      : service.category === 'consulting'
      ? '👨‍🏫'
      : '⚙️'

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm hover:border-brand-accent/60 hover:shadow-glow/40 transition">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xl">{emoji}</span>
        <h3 className="text-base font-semibold text-slate-50">
          {service.title}
        </h3>
      </div>
      <p className="text-xs text-slate-300 mb-3">{service.short}</p>
      <ul className="mb-4 space-y-1.5 text-[11px] text-slate-300">
        {service.bullets.map((line) => (
          <li key={line} className="flex gap-1.5">
            <span className="mt-[6px] h-1 w-1 rounded-full bg-brand-accent" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <button
          onClick={() => onBook(service)}
          className="w-full rounded-xl bg-brand-accent px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-brand-accent/90"
        >
          Book / Ask about this
        </button>
      </div>
    </div>
  )
}
