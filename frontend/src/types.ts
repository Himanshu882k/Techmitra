export type ServiceCategory =
  | 'laptop-pc'
  | 'repair'
  | 'cleaning'
  | 'consulting'
  | 'software'
  | 'custom-build'

export interface ServiceItem {
  category: ServiceCategory
  title: string
  short: string
  bullets: string[]
}

export type InquiryStatus = 'pending' | 'in_progress' | 'completed'

export interface Inquiry {
  id: string
  service_name: string
  customer_name: string
  customer_phone: string
  message: string | null
  timestamp: string
  status: InquiryStatus
}
