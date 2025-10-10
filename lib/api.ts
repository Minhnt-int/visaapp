import { Tour, News, VisaContinent, TourCategory, VisaDetail, NewsPreview, formContact, ApiResponse, VisaService, NavItem } from '@/types';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import { contactInfo, mockNews, mockTourCategories, mockTours, mockVisaContinents, mockVisaPageData, navigationLinks, newsPreview, siteConfig } from './mock-data';
import algoliasearch, { SearchClient } from 'algoliasearch/lite';


const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

async function getIdentityToken(audience: string): Promise<string | null> {
  if (typeof window !== 'undefined') return null;
  try {
    const response = await fetch(
      `http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=${audience}`,
      {
        headers: { 'Metadata-Flavor': 'Google' },
        cache: 'no-store', 
      }
    );
    if (!response.ok) {
      console.error('Failed to fetch Google identity token:', response.status, response.statusText);
      return null;
    }
    return await response.text();
  } catch (error) {
    return null;
  }
}

api.interceptors.request.use(
    async (config) => {
        if (typeof window === 'undefined') {
            const audience = process.env.NEXT_PUBLIC_BASE_URL;
            if (audience) {
                const token = await getIdentityToken(audience);
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        console.error('Response Interceptor Error:', error.message);
        return Promise.reject(error);
    }
);

export async function fetcher<T = any>(
    url: string,
    options?: AxiosRequestConfig
): Promise<T> {
    try {
        const response: AxiosResponse<T> = await api.request<T>({ url, ...options });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error('Fetcher Error:', axiosError.message);
        if (axiosError.response) {
            const backendErrorMessage = (axiosError.response.data as any)?.message || `Lỗi từ server: Status ${axiosError.response.status}`;
            throw new Error(backendErrorMessage);
        } else if (axiosError.request) {
            throw new Error('No response received from server. Please check network connection.');
        } else {
            throw new Error('Error setting up request: ' + axiosError.message);
        }
    }
}

export const normalizeVietnamese = (str: string): string => {
    if (!str) return '';
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, '-').trim();
};

export interface FetchParams {
  page?: number;
  limit?: number;
  search?: string;
  tags?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

function queryData<T extends Record<string, any>>(
    sourceData: T[],
    params: FetchParams = {},
    searchableFields: (keyof T)[] = ['title', 'name', 'description'],
    categoryField: keyof T = 'category'
): PaginatedResponse<T> {
    const { page = 1, limit = 10, search, tags, status, sortBy, sortOrder = 'desc' } = params;
    let processedData = [...sourceData];

    if (search) {
        const normalizedSearch = normalizeVietnamese(search);
        processedData = processedData.filter(item =>
            searchableFields.some(field => {
                const value = item[field];
                return typeof value === 'string' && normalizeVietnamese(value).includes(normalizedSearch);
            })
        );
    }

    if (tags) {
        const selectedTags = tags.split(',').map(t => normalizeVietnamese(t.trim()));
        if (selectedTags.length > 0) {
            processedData = processedData.filter(item => {
                const fieldValue = item[categoryField];
                if (Array.isArray(fieldValue)) {
                    const normalizedItemTags = fieldValue.map((tag : any) => normalizeVietnamese(tag));
                    return normalizedItemTags.some((tag : any) => selectedTags.includes(tag));
                } else if (typeof fieldValue === 'string') {
                    const normalizedFieldValue = normalizeVietnamese(fieldValue);
                    return selectedTags.includes(normalizedFieldValue);
                }
                return false;
            });
        }
    }

    if (status) {
        processedData = processedData.filter(item => item.status === status);
    }

    if (sortBy) {
        processedData.sort((a, b) => {
            const valA = a[sortBy];
            const valB = b[sortBy];
            if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }

    const total = processedData.length;
    const totalPages = Math.ceil(total / limit);
    const paginatedData = processedData.slice((page - 1) * limit, page * limit);

    return { data: paginatedData, total, page, limit, totalPages };
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getNewsPreview(params: FetchParams = {}): Promise<PaginatedResponse<NewsPreview>> {
    await delay(100);
    return queryData<NewsPreview>(newsPreview, params, ['title'], 'category');
}

export async function getNews(params: FetchParams = {}): Promise<PaginatedResponse<News>> {
    await delay(100);
    return queryData<News>(mockNews, params, ['title', 'content'], 'keyword');
}

export async function getNewsBySlug(slug: string): Promise<News | undefined> {
    return mockNews.find(news => news.slug === slug);
}

export async function getNewsKeywords(): Promise<{ name: string; count: number }[]> {
    const tagCount: { [key: string]: number } = {};
    newsPreview.forEach(item => {
        item.category?.forEach(tag => {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
    });
    return Object.entries(tagCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
}

export async function getTours(params: FetchParams = {}): Promise<PaginatedResponse<Tour>> {
    await delay(100);
    return queryData<Tour>(mockTours, params, ['name', 'country'], 'categorySlug');
}

export async function getTourCategories(): Promise<TourCategory[]> {
    return mockTourCategories;
}

export async function getTourBySlug(slug: string): Promise<Tour | undefined> {
    return mockTours.find(tour => tour.slug === slug);
}

export async function getAllServices(): Promise<VisaService[]> {
    await delay(50);
    return mockVisaPageData.map(detail => ({
        id: detail.slug,
        slug: detail.slug,
        title: detail.title,
        country: detail.countryName,
        continentSlug: detail.continentSlug,
        image: detail.heroImage,
        description: detail.description,
        successRate: detail.successRate,
        services: detail.services,
    }));
}

export async function getServices(params: FetchParams = {}): Promise<PaginatedResponse<VisaService>> {
    await delay(100);
    const allServices = await getAllServices();
    return queryData<VisaService>(allServices, params, ['title', 'country', 'description'], 'continentSlug');
}

export async function getHomepageServices(): Promise<VisaService[]> {
    const allServices = await getAllServices();
    return allServices.slice(0, 3);
}

export async function getVisaContinents(): Promise<VisaContinent[]> {
    return mockVisaContinents;
}

export async function getVisaContinentBySlug(slug: string): Promise<VisaContinent | undefined> {
    return mockVisaContinents.find(continent => continent.slug === slug);
}

export async function getVisaDetailById(id: string): Promise<VisaDetail | undefined> {
    await delay(100);
    return mockVisaPageData.find(detail => detail.slug === id);
}

export async function getSiteConfig() {
    await delay(50); return siteConfig;
}

export async function getContactInfo() {
    await delay(50); return contactInfo;
}

// UPDATED: This function now STRICTLY fetches from Algolia and will throw an error if it fails.
// The fallback to mock data has been removed to ensure data consistency.
export async function getNavigationLinks(): Promise<NavItem[]> {
    // Ensure all required Algolia environment variables are present.
    if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || !process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY || !process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME) {
        throw new Error('Algolia environment variables are missing. Please check your .env.local file.');
    }

    const algoliaClient: SearchClient = algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
        process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
    );
    
    const algoliaIndex = algoliaClient.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME); 

    try {
        const [visaResponse, tourResponse] = await Promise.all([
            algoliaIndex.search('', { // Query for visa data
                facetFilters: ['type:visa'],
                attributesToRetrieve: ['path', 'country', 'continent', 'image'],
                hitsPerPage: 100 // Adjust as needed
            }),
            algoliaIndex.search('', { // Query for tour data
                facetFilters: ['type:tour'],
                attributesToRetrieve: ['path', 'continent'],
                hitsPerPage: 100 // Adjust as needed
            })
        ]);
        console.log("visaResponse", visaResponse);
        
        const visaHits = visaResponse.hits;
        const tourHits = tourResponse.hits;

        // Process visa data into a nested structure (Continent -> Country)
        const visaContinents: { [key: string]: NavItem } = {};
        visaHits.forEach((hit: any) => {
            const continentName = hit.continent;
            const continentSlug = hit.path.split('/')[2];

            if (!continentName) return; // Skip if continent is not defined

            // Create continent item if it doesn't exist
            if (!visaContinents[continentName]) {
                visaContinents[continentName] = {
                    label: continentName,
                    href: `/dich-vu/${continentSlug}`,
                    children: []
                };
            }
            console.log( "test api", visaContinents,continentSlug);
            
            // Add country to the continent's children array
            visaContinents[continentName].children?.push({
                label: hit.country,
                href: hit.path,
                image: hit.image
            });
        });

        // Process tour data to create a flat list of tour categories
        const tourCategoryItems: NavItem[] = [];
        const uniqueTourCategories = new Set<string>();
        tourHits.forEach((hit: any) => {
            const categoryName = hit.continent; 
            if (categoryName && !uniqueTourCategories.has(categoryName)) {
                const categorySlug = hit.path.split('/')[2];
                uniqueTourCategories.add(categoryName);
                tourCategoryItems.push({
                    label: categoryName,
                    href: `/tour-du-lich/${categorySlug}`,
                });
            }
        });

        // Assemble the final navigation structure
        const finalNavLinks: NavItem[] = [
            { label: 'Trang chủ', href: '/' },
            {
                label: 'Dịch Vụ Visa',
                href: '/dich-vu',
                children: Object.values(visaContinents)
            },
            {
                label: 'Tour Du Lịch',
                href: '/tour-du-lich',
                children: tourCategoryItems
            },
            { label: 'Tin Tức', href: '/tin-tuc' },
            { label: 'Về chúng tôi', href: '/ve-chung-toi' },
            { label: 'Liên hệ', href: '/lien-he' },
        ];

        return finalNavLinks;

    } catch (error) {
        console.error("FATAL: Error fetching navigation from Algolia:", error);
        // Re-throw the error to ensure the application fails loudly instead of showing stale/mock data.
        throw new Error(`Failed to fetch navigation links from Algolia. Please check API keys and index status. Details: ${(error as Error).message}`);
    }
}
