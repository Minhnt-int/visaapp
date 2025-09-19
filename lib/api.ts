import { Tour, News, Service, VisaCategory, TourCategory, VisaDetail } from '@/types';

// Determine the base URL based on environment
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use relative path for API routes
    return ''; 
  } else {
    // Server-side: use absolute URL for API routes
    // Ensure NEXT_PUBLIC_SITE_URL is set in your .env file (e.g., http://localhost:3000)
    return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'; 
  }
};

async function fetcher<T>(url: string, tags?: string[]): Promise<T> {
  try {
    const baseUrl = getBaseUrl();
    // Construct the full URL, ensuring it's correctly formed for both client and server
    const apiPrefix = '/api'; // All API routes start with /api
    const finalUrl = `${baseUrl}${apiPrefix}${url.startsWith('/') ? url : '/' + url}`;
    
    const res = await fetch(finalUrl, {
      next: { tags },
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`API call failed for ${finalUrl} with status ${res.status}: ${errorBody}`);
      if (url.includes('detail')) return null as T;
      return [] as T;
    }
    return res.json();
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error);
    if (url.includes('detail')) return null as T;
    return [] as T;
  }
}

// =========================================================================
// FETCH FUNCTIONS
// =========================================================================

export async function getNews(): Promise<News[]> {
  return fetcher<News[]>('/news', ['news']);
}

export async function getServices(): Promise<Service[]> {
  return fetcher<Service[]>('/services', ['services']);
}

export async function getTours(): Promise<Tour[]> {
  return fetcher<Tour[]>('/tours', ['tours']);
}

export async function getTourCategories(): Promise<TourCategory[]> {
  return fetcher<TourCategory[]>('/tour-categories', ['tours', 'categories']);
}

export async function getVisaCategories(): Promise<VisaCategory[]> {
  return fetcher<VisaCategory[]>('/visa-categories', ['visas', 'categories']);
}

export async function getVisaDetail(id: string): Promise<VisaDetail | null> {
    if (!id) return null;
    return fetcher<VisaDetail>(`/visa-details/${id}`, [`visa-detail-${id}`]);
}

// =========================================================================
// DERIVED/HELPER FUNCTIONS (Client-side processing)
// =========================================================================

/**
 * Gets a specific tour by its slug from the list of all tours.
 * @param slug - The slug of the tour to find.
 * @returns The tour object or undefined if not found.
 */
export async function getTourBySlug(slug: string): Promise<Tour | undefined> {
    const tours = await getTours();
    return tours.find(tour => tour.slug === slug);
}

/**
 * Gets a specific news article by its slug.
 * @param slug - The slug of the news article.
 * @returns The news article object or undefined if not found.
 */
export async function getNewsBySlug(slug: string): Promise<News | undefined> {
    const news = await getNews();
    return news.find(article => article.slug === slug);
}

/**
 * Gets a specific visa service by its ID/slug.
 * @param slug - The slug of the visa service.
 * @returns The service object or undefined if not found.
 */
export async function getVisaServiceBySlug(slug: string): Promise<Service | undefined> {
    const services = await getServices();
    return services.find(service => service.id === slug);
}