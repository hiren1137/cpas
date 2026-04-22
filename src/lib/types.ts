// TypeScript interfaces for the CPA directory

export interface City {
  name: string;
  slug: string;
  population: number;
}

export interface State {
  name: string;
  code: string;
  slug: string;
  cities: City[];
}

export interface SeedData {
  states: State[];
}

export interface WorkingHours {
  Monday: string;
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
  Sunday: string;
  [key: string]: string;
}

export interface ReviewsPerScore {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
  [key: string]: number;
}

export interface Firm {
  slug: string;
  name: string;
  category: string;
  phone: string;
  site: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviews: number;
  logo: string;
  photo: string;
  working_hours: WorkingHours;
  reviews_per_score: ReviewsPerScore;
  business_status: string;
  is_verified: boolean;
  is_claimed: boolean;
}

export interface CityFirmsData {
  city: string;
  state: string;
  state_code: string;
  city_slug: string;
  state_slug: string;
  firm_count: number;
  firms: Firm[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  ogType?: string;
  ogImage?: string;
}

export interface SchemaOrgProps {
  type: 'home' | 'state' | 'city' | 'firm';
  data: Record<string, unknown>;
}
