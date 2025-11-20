import React from 'react'
import { COMPANY_INFO } from '../constants'
import logo from '../assets/logo.png'

interface HeaderProps {
  onAdminClick: () => void
}

export const Header: React.FC<HeaderProps> = ({ onAdminClick }) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <div className="section-container flex items-center justify-between py-3">
        <a href="#top" className="flex items-center gap-2">
          <img
            src={logo}
            alt="TechMitra Solutions Logo"
            className="h-9 w-9 rounded-xl object-contain border border-brand-accent/40 bg-brand-accent/10 p-1"
          />

          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-sm sm:text-base">
              {COMPANY_INFO.name}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400">
              {COMPANY_INFO.tagline}
            </span>
          </div>
        </a>

        <nav className="flex items-center gap-3 sm:gap-4">
          <a
            href="#services"
            className="hidden sm:inline text-xs sm:text-sm text-slate-300 hover:text-brand-accent"
          >
            Services
          </a>
          <a
            href="#contact"
            className="hidden sm:inline text-xs sm:text-sm text-slate-300 hover:text-brand-accent"
          >
            Contact
          </a>
          <button
            onClick={onAdminClick}
            className="text-[10px] sm:text-xs px-3 py-1.5 rounded-full border border-brand-accent/60 text-brand-accent hover:bg-brand-accent/10 transition"
          >
            Partner Login
          </button>
        </nav>
      </div>
    </header>
  )
}
