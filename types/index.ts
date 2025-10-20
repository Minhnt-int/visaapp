import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  image?: string;
  children?: NavItem[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface HomepageService {
  slug: string;
  title: string;
  description: string;
  image: string;
  continentSlug: string; 
}

export interface VisaContinent {
  name: string;
  slug: string;
  description?: string;
  countries: {
    slug: string;
    name: string;
  }[];
}

export interface VisaService {
  id: string;          
  slug: string;        
  title: string;       
  country: string;     
  continentSlug: string;
  image: string;       
  description: string;
  successRate: string;
  services: string[];
}

export interface VisaType {
  id: string;
  name: string;
  requirements: Requirements;
  pricing: Pricing[];
}
export interface Pricing {
  type: string;
  name: string;
  description?: string;
  prices: PricingEntry[];
}
export interface Requirements {
  personal: string[];
  work_individual: string[];
  work_enterprise: string[];
  financial: string[];
  travel: string[];
}

export interface PricingEntry {
  [key: string]: string;
}
export interface ProductMedia {
  id: number;
  url: string;
  type: 'image' | 'video';
  createdAt: string;
  updatedAt: string;
  productId: number;
  altText?: string;
  name?: string;
}

export interface VisaDetail {
  slug: string; 
  continentSlug: string;
  title: string;
  countryName: string;
  heroImage: string;
  successRate: string;
  processingTime: string;
  description: string;
  services: string[];
  visaTypes: VisaType[];
  media: ProductMedia[];
  status: 'published' | 'draft' | 'deleted';
  createdAt: string;
  updatedAt: string;
}



export interface Tour {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  country: string;
  duration: string;
  price: number;
  originalPrice?: number;
  departure: string[];
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  isHot?: boolean;
  groupSize: { min: number; max: number; };
  highlights: { id: string; title: string; description: string; }[];
  itinerary: {
    day: string;
    title: string;
    description: string;
    activities: { activity: string }[];
  }[];
  services: {
    included: { id: string; name: string; description?: string; }[];
    excluded: { id: string; name: string; description?: string; }[];
  };
  terms: {
    registration: string[];
    cancellation: string[];
  };
  whyChooseUs: { id: string; title: string; description: string; icon: "shield" | "star" | "check" | "globe" | "sun" | "map" | "tag" | "anchor" | "ship" | "leaf" | "clock" | "pagoda" | "money" | "link" | "book"; }[];
  tags?: string[];
}

export interface News {
  id: number;
  title: string;
  content: string;
  slug: string;
  keyword?: string[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  author: string;
  publishedAt: string;
  viewCount: number;
  blogCategoryId: number;
  avatarUrl: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  excerpt: string;
  date: string;
  imageUrl?: string;
  readTime?: string;
}



export interface TourCategory {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  tours: Tour[];
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export type LucideIconType = LucideIcon;

export interface Benefit {
  name: string;
  description: string;
  icon: LucideIconType;
}

export interface ProcessStep {
  name: string;
  description: string;
  icon: LucideIconType;
}

export interface NewsPreview {
  id: number;
  slug: string;
  imageUrl: string;
  title: string;
  category: string[];
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
}

export interface formContact {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export type ApiResponse<T = any> =
  {
    status: "success";
    message: string;
    data: T; 
    errors?: undefined;
  } |
  {
    status: "error" | "fail"; 
    message: string; 
    errors?: { 
      [key: string]: string | string[];
    } | string[];
    data?: undefined;
  };

  export interface ContactInfo {
    address: string;
    phone: string;
    email: string;
    website: string;
    facebook: string;
    zalo: string;
  };

  export interface FilterParams {
    search?: string;
    category?: string;
  }

  
export interface RelatedArticle {
  id: string;
  title: string;
  url: string;
  image: string;
}


export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  rating: number;
  image: string;
}
