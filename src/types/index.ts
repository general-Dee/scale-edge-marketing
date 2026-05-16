export interface Appointment {
  id?: string
  created_at?: string
  full_name: string
  email: string
  phone: string
  company: string
  preferred_office: string
  business_state: string
  industry: string
  ad_budget: string
  goal: string
  preferred_date: string
  preferred_time: string
  heard_from: string
  notes?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  status?: "pending" | "confirmed" | "completed"
}

export interface Contact {
  id?: string
  created_at?: string
  name: string
  email: string
  phone?: string
  message: string
}

export interface UTMParams {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
}

export interface OfficeLocation {
  name: string
  address: string
  city: string
  phone: string
}
