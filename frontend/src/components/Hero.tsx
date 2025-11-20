import React from 'react'
import { COMPANY_INFO } from '../constants'

export const Hero: React.FC = () => {
  return (
    <section
      id="top"
      className="section-container pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-20 lg:pb-20"
    >
      <div className="grid lg:grid-cols-[3fr,2fr] gap-10 items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/40 text-brand-accent mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse" />
            Now serving {COMPANY_INFO.location}
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-50 mb-3">
            Tech problems? <span className="text-brand-accent">TechMitra</span>{' '}
            is here.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mb-6">
            From new Lenovo laptops and custom PCs to fast repairs and honest
            tech advice – get everything locally in{' '}
            <span className="font-semibold">Khopoli</span>, without travelling
            to big-city stores.
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href="tel:+917887972649"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold bg-brand-accent text-slate-950 shadow-glow hover:shadow-none transition"
            >
              Call Now: 78879 72649
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-medium border border-slate-700 text-slate-200 hover:border-brand-accent/70 hover:text-brand-accent transition"
            >
              View Services
            </a>
          </div>

          <p className="text-[11px] sm:text-xs text-slate-400">
            Props:{' '}
            <span className="font-medium text-slate-200">
              {COMPANY_INFO.owners.join(' • ')}
            </span>
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-brand-accent/10 blur-3xl rounded-full" />
          <div className="relative rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-4 sm:p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-300">
                Why TechMitra?
              </span>
              <span className="text-[11px] text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-full border border-brand-accent/40">
                Local • Trusted • Nearby
              </span>
            </div>

            <ul className="space-y-2 text-[11px] sm:text-xs text-slate-300">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>
                  <span className="font-semibold">Doorstep help</span> in
                  Khopoli & nearby areas for many services.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                <span>
                  <span className="font-semibold">Honest guidance</span> – we
                  help you pick what you need, not what is expensive.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400" />
                <span>
                  <span className="font-semibold">Full support</span> – from
                  purchase to setup to future troubleshooting.
                </span>
              </li>
            </ul>

            <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] sm:text-[11px]">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <p className="text-slate-400 mb-1">Service areas</p>
                <p className="font-semibold text-slate-100">
                  {COMPANY_INFO.location}
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <p className="text-slate-400 mb-1">Contact</p>
                <p className="font-semibold text-slate-100">
                  {COMPANY_INFO.contacts[0]}
                </p>
                <p className="text-slate-400 text-[10px]">
                  {COMPANY_INFO.contacts[1]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
