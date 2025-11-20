import React, { useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { FloatingOffer } from './components/FloatingOffer'
import { OfferModal } from './components/OfferModal'
import { AdminDashboard } from './components/AdminDashboard'
import { ServiceCard } from './components/ServiceCard'
import type { ServiceItem } from './types'
import { SERVICES, COMPANY_INFO } from './constants'
import { storageService } from './services/storageService'
import { BookingModal } from './components/BookingModal'

const App: React.FC = () => {
  const [offerOpen, setOfferOpen] = useState(false)
  const [admin, setAdmin] = useState(storageService.isAdminLoggedIn())
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null,
  )

  const loginAdmin = async () => {
    const pass = window.prompt('Enter Partner Password:')
    if (!pass) return
    try {
      const ok = await storageService.verifyAdmin(pass)
      if (ok) {
        setAdmin(true)
        alert('Partner login successful')
      } else {
        alert('Incorrect password')
      }
    } catch (err: any) {
      alert(err?.message || 'Login failed')
    }
  }

  if (admin) {
    return (
      <AdminDashboard
        onLogout={() => {
          setAdmin(false)
        }}
      />
    )
  }

  return (
    <>
      <Header onAdminClick={loginAdmin} />
      <Hero />

      <section id="services" className="section-container py-10">
        <h2 className="mb-2 text-center text-2xl font-semibold text-slate-50">
          Our Services
        </h2>
        <p className="mb-8 text-center text-sm text-slate-300">
          From new devices to deep cleaning, repairs &amp; consulting – TechMitra
          handles it all for you.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.title}
              service={service}
              onBook={(s) => setSelectedService(s)}
            />
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="bg-slate-950 border-t border-slate-800 py-10"
      >
        <div className="section-container text-center space-y-4">
          <h2 className="text-2xl font-semibold text-slate-50">Contact Us</h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            {COMPANY_INFO.name}, {COMPANY_INFO.address}. We proudly serve{' '}
            {COMPANY_INFO.location}. Call or email us for any tech requirement.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <a
              href="tel:+917887972649"
              className="rounded-full bg-brand-accent px-4 py-2 font-semibold text-slate-950 hover:bg-brand-accent/90"
            >
              Call: 78879 72649
            </a>
            <a
              href="tel:+918983308695"
              className="rounded-full border border-slate-600 px-4 py-2 font-semibold text-slate-100 hover:border-brand-accent hover:text-brand-accent"
            >
              Call: 89833 08695
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="rounded-full border border-slate-600 px-4 py-2 font-semibold text-slate-100 hover:border-brand-accent hover:text-brand-accent"
            >
              Email: {COMPANY_INFO.email}
            </a>
          </div>

          <p className="text-[11px] text-slate-500 mt-4">
            Props: {COMPANY_INFO.owners.join(' • ')}
          </p>
        </div>
      </section>

      <FloatingOffer onClaim={() => setOfferOpen(true)} />

      <OfferModal
        isOpen={offerOpen}
        onClose={() => setOfferOpen(false)}
        onClaim={() => setOfferOpen(false)}
      />

      <BookingModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </>
  )
}

export default App
