export interface ProductItem {
  id: string;
  title: string;
  category: 'organic' | 'seeds' | 'irrigation' | 'consultancy' | 'equipment' | 'monitoring';
  categoryLabel: string;
  tagline: string;
  description: string;
  features: string[];
  specs: {
    label: string;
    value: string;
  }[];
  imageUrl: string;
  badge?: string;
  impactMetric: string;
}

export interface FarmingSolution {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bulletPoints: string[];
  iconName: string;
  imageUrl: string;
  metricBadge: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  farmName: string;
  location: string;
  acreage: string;
  quote: string;
  rating: number;
  avatarUrl: string;
  cropFocus: string;
  improvementHighlight: string;
}

export interface StatisticMetric {
  id: string;
  label: string;
  value: string;
  unit?: string;
  subtext: string;
  iconName: string;
}

export interface SustainabilityPillar {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  stat: string;
  statLabel: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  farmType: string;
  acreage: string;
  solution: string;
  message: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
}
