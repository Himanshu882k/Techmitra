import type { ServiceItem } from './types'

export const COMPANY_INFO = {
  name: 'TechMitra Solutions',
  tagline: 'Your Trusted Tech Partner',
  address: 'Near Mahalaxmi Mandir, Katrang Khopoli',
  location: 'Khopoli & Nearby Areas',
  contacts: ['+91 78879 72649', '+91 89833 08695'],
  owners: ['Himanshu Sachan', 'Sagar Sarkar'],
  email: 'contact@techmitra.com',
}

export const SERVICES: ServiceItem[] = [
  {
    category: 'laptop-pc',
    title: 'New Laptops & PCs',
    short: 'Lenovo devices for students, gamers & professionals',
    bullets: [
      'Genuine Lenovo warranty & billing',
      'Perfect configuration guidance for your budget',
      'Setup, updates & basic training included',
    ],
  },
  {
    category: 'repair',
    title: 'Laptop & Desktop Repair',
    short: 'Fast, honest diagnosis & repair',
    bullets: [
      'No fake parts, no fake promises',
      'Windows not starting, slow system, random shutdowns',
      'On-site pickup available in Khopoli & nearby',
    ],
  },
  {
    category: 'cleaning',
    title: 'Deep Cleaning & Thermal Service',
    short: 'Cooling & performance boost',
    bullets: [
      'Dust removal, fresh thermal paste',
      'Fan & vent cleaning for better airflow',
      'Ideal for old, heating laptops',
    ],
  },
  {
    category: 'software',
    title: 'Software Setup & Troubleshooting',
    short: 'Office, antivirus, drivers & more',
    bullets: [
      'Genuine software guidance',
      'Smooth installation & configuration',
      'Fix crashes, errors & update issues',
    ],
  },
  {
    category: 'custom-build',
    title: 'Custom PC Builds',
    short: 'Gaming, editing, business rigs',
    bullets: [
      'Parts selection as per exact need',
      'Balanced performance & budget',
      'Full build, cable management & testing',
    ],
  },
  {
    category: 'consulting',
    title: 'Personal Tech Consultancy',
    short: 'Confused what to buy? Call us first.',
    bullets: [
      'Honest suggestion – not brand-biased',
      'Device comparison & recommendation',
      'Perfect for students & parents',
    ],
  },
]

export const OFFERS = [
  {
    id: 'launch-offer',
    title: 'LAUNCH SPECIAL OFFER',
    description: 'Flat ₹1000 OFF on every Lenovo device purchase through TechMitra Solutions.',
    expiry: 'Limited time – while launch offer lasts.',
  },
]
