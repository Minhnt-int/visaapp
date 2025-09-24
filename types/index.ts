import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
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
  categorySlug: string; // Added to resolve the error
}

// CORRECTED: Redefined the Service interface to match the new, dynamic data structure.
export interface Service {
  id: string;          // e.g., 'my'
  slug: string;        // e.g., 'my'
  title: string;       // e.g., 'Visa Mỹ (Du lịch, Công tác, Thăm thân)'
  country: string;     // e.g., 'Mỹ'
  categorySlug: string;// e.g., 'visa-chau-my'
  image: string;       // URL to hero image
  description: string;
  successRate?: string;
  services?: string[];
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
  whyChooseUs: { id: string; title: string; description: string; icon: 'shield' | 'star' | 'check'; }[];
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
  description: string;
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
}

export interface VisaCategory {
  name: string;
  slug: string;
  description?: string;
  countries: {
    slug: string;
    name: string;
  }[];
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

// --- NEW INTERFACES FOR VISA DETAIL PAGE --- 

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

export interface VisaRequirementDocType {
  type: string;
  docs: string[];
}

export interface VisaRequirements {
  personal: string[];
  work: VisaRequirementDocType[];
  financial: string[];
  travel: string[];
}

export interface VisaPageVisaType {
  id: string;
  name: string;
  requirements: VisaRequirements;
}

export interface PricingDetails {
  group?: string;
  adult: string;
  child_6_12: string;
  child_under_6: string;
  consularFee?: string;
  serviceFee?: string;
  note?: string;
}

export interface PricingTypeItem {
  type: string;
  name: string;
  description?: string;
  validity?: string;
  stayDuration?: string;
  processingTime?: string;
  prices: PricingDetails[];
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  rating: number;
  image: string;
}

export interface RelatedArticle {
  id: string;
  title: string;
  url: string;
  image: string;
}

export interface VisaImage {
  type: string;
  url: string;
  description: string;
}

// This is the primary data structure for a single visa detail page.
export interface VisaDetail {
  title: string;
  heroImage: string;
  successRate: string;
  processingTime: string;
  visaImages?: VisaImage[];
  description: string;
  services: string[];
  visaTypes: VisaPageVisaType[];
  pricing: PricingTypeItem[];
  testimonials: Testimonial[];
  relatedArticles: RelatedArticle[];
  icon?: string;
  benefits?: Benefit[];
  process?: ProcessStep[];
  continentSlug: string;
  popularPlaces?: string[];
}

export interface newsPreview {
  id: number;
  slug: string;
  imageUrl: string;
  title: string;
  category: string;
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
  // Trạng thái Thành công
  {
    status: "success";
    message: string;
    data: T; // Dữ liệu thực tế. Kiểu T phụ thuộc vào endpoint cụ thể
    // Các trường của trạng thái lỗi sẽ không tồn tại ở đây
    errors?: undefined;
    // Các trường khác chỉ có khi thành công có thể thêm vào đây
  } |
  // Trạng thái Thất bại (fail hoặc error)
  {
    status: "error" | "fail"; // "error" cho lỗi server, "fail" cho lỗi client (validation,...)
    message: string; // Thông báo lỗi ngắn gọn
    errors?: { // Trường errors tùy chọn
      [key: string]: string | string[];
    } | string[];
    // Trường data sẽ không tồn tại ở đây
    data?: undefined;
    // Các trường khác chỉ có khi thất bại có thể thêm vào đây (ví dụ: code lỗi)
    // code?: number | string;
  };

  export interface ContactInfo {
    address: string;
    phone: string;
    email: string;
    website: string;
    facebook: string;
    zalo: string;
  };