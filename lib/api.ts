import { Tour, News, VisaContinent, TourCategory, VisaDetail, NewsPreview, formContact, ApiResponse, VisaService, NavItem } from '@/types';
export type { News } from '@/types'; // Re-export the News type
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import { contactInfo, navigationLinks, siteConfig } from './mock-data';
import algoliasearch, { SearchClient } from 'algoliasearch/lite';

// Loading context integration
let loadingContext: {
  startLoading?: (message?: string) => void;
  stopLoading?: () => void;
  updateProgress?: (progress: number) => void;
  updateMessage?: (message: string) => void;
} = {};

export const setLoadingContext = (context: typeof loadingContext) => {
  loadingContext = context;
};


// Debug API URL
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
console.log('API Base URL:', apiUrl);

// Check if we should use mock server
const useMockServer = process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_API_URL;

const api: AxiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 10000,  // Increased timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        console.error('Response Interceptor Error:', error.message);
        return Promise.reject(error);
    }
);

export async function fetcher<T = any>(
    url: string,
    options?: AxiosRequestConfig,
    retries: number = 2,
    showLoading: boolean = true
): Promise<T> {
    let lastError: Error | null = null;

    // Start loading if context is available
    if (showLoading && loadingContext.startLoading) {
        loadingContext.startLoading('Đang tải dữ liệu...');
        loadingContext.updateProgress?.(10);
    }

    // Set timeout for loading to prevent stuck
    const loadingTimeout = setTimeout(() => {
        if (showLoading && loadingContext.stopLoading) {
            loadingContext.stopLoading();
        }
    }, 15000); // 15 seconds timeout

    try {
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                if (showLoading && loadingContext.updateProgress) {
                    loadingContext.updateProgress(20 + (attempt * 20));
                }

                // Handle absolute URLs for server-side requests
                // If URL is absolute, axios will ignore baseURL automatically
                const response: AxiosResponse<T> = await api.request<T>({ url, ...options });
                
                if (showLoading && loadingContext.updateProgress) {
                    loadingContext.updateProgress(80);
                }

                clearTimeout(loadingTimeout);
                return response.data;
            } catch (error) {
                const axiosError = error as AxiosError;
                lastError = axiosError;

                // Only retry on timeout or network errors, not on 4xx/5xx responses
                const isRetryable = !axiosError.response || axiosError.code === 'ECONNABORTED';

                if (!isRetryable || attempt === retries) {
                    console.error(`Fetcher Error (attempt ${attempt + 1}/${retries + 1}):`, axiosError.message);

                    if (showLoading && loadingContext.updateMessage) {
                        loadingContext.updateMessage('Có lỗi xảy ra!');
                    }

                    if (axiosError.response) {
                        const backendErrorMessage = (axiosError.response.data as any)?.message || `Lỗi từ server: Status ${axiosError.response.status}`;
                        throw new Error(backendErrorMessage);
                    } else if (axiosError.request) {
                        throw new Error('No response received from server. Please check network connection.');
                    } else {
                        throw new Error('Error setting up request: ' + axiosError.message);
                    }
                }

                // Wait before retrying (exponential backoff: 100ms, 200ms)
                await new Promise(resolve => setTimeout(resolve, 100 * (attempt + 1)));
            }
        }
    } finally {
        clearTimeout(loadingTimeout);
        if (showLoading && loadingContext.stopLoading) {
            loadingContext.stopLoading();
        }
    }

    throw lastError || new Error('Unknown error');
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
  isHot?: boolean;
  keyword?: string;
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
    const { page = 1, limit = 10, search, tags, keyword, status, sortBy, sortOrder = 'desc' } = params;
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

    // Support both 'tags' and 'keyword' parameters for filtering
    const filterKeywords = tags || keyword;
    if (filterKeywords) {
        const selectedTags = filterKeywords.split(',').map(t => normalizeVietnamese(t.trim()));
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
    try {
        const queryString = new URLSearchParams();
        if (params.page) queryString.append('page', params.page.toString());
        if (params.limit) queryString.append('limit', params.limit.toString());
        if (params.search) queryString.append('search', params.search);
        if (params.status) queryString.append('status', params.status);
        if (params.sortBy) queryString.append('sortBy', params.sortBy);
        if (params.sortOrder) queryString.append('sortOrder', params.sortOrder);

        // Use absolute URL for server-side requests
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
        const url = `${baseUrl}/api/news?${queryString.toString()}`;
        const response = await fetcher<any>(url, {}, 2, false);

        // Handle both response structures
        const newsData = response.data?.data || response.data || [];
        const pagination = response.data?.pagination || response.pagination;
        
        return {
            data: newsData,
            total: pagination?.total || newsData.length,
            page: pagination?.page || 1,
            limit: pagination?.limit || 10,
            totalPages: pagination?.totalPages || 1
        };
    } catch (error) {
        console.error('Error fetching news preview:', error);
        return { data: [], total: 0, page: params.page || 1, limit: params.limit || 10, totalPages: 1 };
    }
}

export async function getNews(params: FetchParams = {}): Promise<PaginatedResponse<News>> {
    
    try {
        // Try to call real API first
        const queryString = new URLSearchParams();
        if (params.page) queryString.append('page', params.page.toString());
        if (params.limit) queryString.append('limit', params.limit.toString());
        if (params.search) queryString.append('search', params.search);
        if (params.keyword) queryString.append('keyword', params.keyword);
        if (params.status) queryString.append('status', params.status);
        if (params.sortBy) queryString.append('sortBy', params.sortBy);
        if (params.sortOrder) queryString.append('sortOrder', params.sortOrder);

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
        const url = `${baseUrl}/api/news?${queryString.toString()}`;
        
        const response = await fetcher<any>(url);
        
        return {
            data: response.data?.data || [],
            total: response.data?.total || 0,
            page: response.data?.page || 1,
            limit: response.data?.limit || 10,
            totalPages: response.data?.totalPages || 1
        };
    } catch (error) {
        console.error('❌ getNews API error:', error);
        return { data: [], total: 0, page: params.page || 1, limit: params.limit || 10, totalPages: 1 };
    }
}

export async function getNewsBySlug(slug: string): Promise<News | undefined> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
        const url = `${baseUrl}/api/news/${encodeURIComponent(slug)}`;
        const response = await fetcher<any>(url, {}, 2, false);
        const d = response?.data;
        return (d?.data ?? d) as News | undefined;
    } catch (error) {
        console.error('Error fetching news by slug:', error);
        return undefined;
    }
}

// Cache for keywords to avoid unnecessary API calls
let keywordsCache: { name: string; count: number }[] | null = null;
let keywordsCacheTime: number = 0;
const KEYWORDS_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function getNewsKeywords(forceRefresh: boolean = false): Promise<{ name: string; count: number }[]> {
    // Return cached data if available and not expired
    if (!forceRefresh && keywordsCache && Date.now() - keywordsCacheTime < KEYWORDS_CACHE_TTL) {
        return keywordsCache;
    }
    
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
        const url = `${baseUrl}/api/news/keywords`;
        
        const response = await fetcher<any>(url);
        
        // Ensure we return the correct structure
        if (response && response.status === 'success') {
            let keywords: { name: string; count: number }[] = [];
            
            if (Array.isArray(response.data)) {
                keywords = response.data;
            } else if (response.data && Array.isArray(response.data.data)) {
                keywords = response.data.data;
            }
            
            // Cache the result
            keywordsCache = keywords;
            keywordsCacheTime = Date.now();
            
            return keywords;
        }
        
        console.warn('Invalid keywords response structure:', response);
        return keywordsCache || [];
    } catch (error) {
        console.error('Failed to fetch keywords:', error);
        // Return cached data if available, even if expired
        return keywordsCache || [];
    }
}

// Helper: unwrap list and pagination from various backend shapes
function unwrapList<T = any>(response: any): T[] {
    if (!response) return [];
    const d = response.data;
    if (Array.isArray(d)) return d as T[];
    if (Array.isArray(d?.data)) return d.data as T[];
    if (Array.isArray(response?.data?.items)) return response.data.items as T[];
    if (Array.isArray(response?.items)) return response.items as T[];
    return [] as T[];
}

function unwrapObject<T = any>(response: any): T | undefined {
    if (!response) return undefined;
    const d = response.data;
    if (d && typeof d === 'object' && 'data' in d) return (d as any).data as T;
    return (d ?? response) as T;
}

function unwrapPagination(response: any): { total?: number; page?: number; limit?: number; totalPages?: number } {
    return response?.data?.pagination || response?.pagination || {};
}

// Mappers: backend snake_case -> frontend camelCase
function mapVisaDetailFromApi(raw: any): VisaDetail | undefined {
    if (!raw) return undefined;
    return {
        slug: raw.slug,
        continentSlug: raw.continent_slug,
        title: raw.title,
        countryName: raw.country_name,
        heroImage: raw.hero_image,
        successRate: raw.success_rate,
        processingTime: raw.processing_time,
        description: raw.description,
        services: raw.services || [],
        visaTypes: (raw.visa_types || []).map((t: any) => ({
            id: t.id,
            name: t.name,
            pricing: t.pricing,
            requirements: t.requirements,
        })),
        media: raw.media || [],
        status: raw.status || 'published',
        createdAt: raw.created_at || raw.createdAt,
        updatedAt: raw.updated_at || raw.updatedAt,
        metaTitle: raw.meta_title ?? raw.metaTitle,
        metaDescription: raw.meta_description ?? raw.metaDescription,
        metaKeywords: raw.meta_keywords ?? raw.metaKeywords,
    } as VisaDetail;
}

function mapVisaServiceFromApi(raw: any): VisaService | undefined {
    if (!raw) return undefined;
    return {
        id: String(raw.id ?? raw.slug),
        slug: raw.slug,
        title: raw.title,
        country: raw.country_name || raw.country,
        continentSlug: raw.continent_slug || raw.continentSlug,
        image: raw.hero_image || raw.image,
        description: raw.description || '',
        successRate: raw.success_rate || raw.successRate || '',
        services: raw.services || [],
    } as VisaService;
}

function mapTourFromApi(raw: any): Tour | undefined {
    if (!raw) return undefined;
    return {
        id: String(raw.id ?? raw.slug),
        slug: raw.slug,
        name: raw.name,
        categorySlug: raw.category?.slug || raw.categorySlug,
        country: raw.country,
        duration: raw.duration,
        price: raw.price,
        originalPrice: raw.originalPrice ?? raw.original_price,
        departure: raw.departure || [],
        image: raw.image,
        gallery: raw.gallery || [],
        rating: raw.rating ?? 0,
        reviewCount: raw.reviewCount ?? raw.review_count ?? 0,
        isHot: raw.isHot ?? raw.is_hot,
        groupSize: raw.groupSize || raw.group_size,
        highlights: raw.highlights || [],
        itinerary: raw.itinerary || [],
        services: raw.services || { included: [], excluded: [] },
        terms: raw.terms || { registration: [], cancellation: [] },
        whyChooseUs: raw.whyChooseUs || raw.why_choose_us || [],
        metaTitle: raw.meta_title ?? raw.metaTitle,
        metaDescription: raw.meta_description ?? raw.metaDescription,
        metaKeywords: raw.meta_keywords ?? raw.metaKeywords,
        tags: raw.tags || [],
    } as Tour;
}

export async function getTours(params: FetchParams = {}): Promise<PaginatedResponse<Tour>> {
    try {
        const queryString = new URLSearchParams();
        if (params.page) queryString.append('page', params.page.toString());
        if (params.limit) queryString.append('limit', params.limit.toString());
        if (params.search) queryString.append('search', params.search);
        if (params.tags) queryString.append('tags', params.tags);
        if ((params as any).category) queryString.append('categorySlug', (params as any).category);
        if ((params as any).country) queryString.append('country', (params as any).country);
        if (typeof params.isHot !== 'undefined') queryString.append('isHot', String(params.isHot));
        if (params.sortBy) queryString.append('sortBy', params.sortBy);
        if (params.sortOrder) queryString.append('sortOrder', params.sortOrder);

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
        const url = `${baseUrl}/api/tours?${queryString.toString()}`;

        const response = await fetcher<any>(url, {}, 2, false);
        const raw = unwrapList<any>(response);
        const data = raw.map(mapTourFromApi).filter(Boolean) as Tour[];
        const pagination = unwrapPagination(response);

        return {
            data,
            total: pagination.total || data.length || 0,
            page: pagination.page || 1,
            limit: pagination.limit || params.limit || 10,
            totalPages: pagination.totalPages || 1,
        };
    } catch (error) {
        console.error('Error fetching tours:', error);
        return { data: [], total: 0, page: 1, limit: params.limit || 10, totalPages: 1 };
    }
}

export async function getTourCategories(): Promise<TourCategory[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
        const url = `${baseUrl}/api/tour-categories`;
        const response = await fetcher<any>(url, {}, 2, false);
        return unwrapList<TourCategory>(response);
    } catch (error) {
        console.error('Error fetching tour categories:', error);
        return [];
    }
}

export async function getTourBySlug(slug: string): Promise<Tour | undefined> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
        const url = `${baseUrl}/api/tours/${encodeURIComponent(slug)}`;
        const response = await fetcher<any>(url, {}, 2, false);
        const raw = unwrapObject<any>(response);
        return mapTourFromApi(raw);
    } catch (error) {
        console.error('Error fetching tour by slug:', error);
        return undefined;
    }
}

export async function getAllServices(): Promise<VisaService[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
        const url = `${baseUrl}/api/services?limit=1000`;
        const response = await fetcher<any>(url, {}, 2, false);
        const raw = unwrapList<any>(response);
        return raw.map(mapVisaServiceFromApi).filter(Boolean) as VisaService[];
    } catch (error) {
        console.error('Error fetching all services:', error);
        return [];
    }
}

export async function getServices(params: FetchParams = {}): Promise<PaginatedResponse<VisaService>> {
    try {
        const queryString = new URLSearchParams();
        if (params.page) queryString.append('page', params.page.toString());
        if (params.limit) queryString.append('limit', params.limit.toString());
        if (params.search) queryString.append('search', params.search);
        if ((params as any).continentSlug) queryString.append('continentSlug', (params as any).continentSlug);
        if (params.tags) queryString.append('tags', params.tags);
        if (params.status) queryString.append('status', params.status);
        if (params.sortBy) queryString.append('sortBy', params.sortBy);
        if (params.sortOrder) queryString.append('sortOrder', params.sortOrder);

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
        const url = `${baseUrl}/api/services?${queryString.toString()}`;
        const response = await fetcher<any>(url, {}, 2, false);

        const raw = unwrapList<any>(response);
        const items = raw.map(mapVisaServiceFromApi).filter(Boolean) as VisaService[];
        const pagination = unwrapPagination(response);

        return {
            data: items,
            total: pagination.total || items.length || 0,
            page: pagination.page || 1,
            limit: pagination.limit || params.limit || 10,
            totalPages: pagination.totalPages || 1
        };
    } catch (error) {
        console.error('Error fetching services:', error);
        return { data: [], total: 0, page: 1, limit: params.limit || 10, totalPages: 1 };
    }
}

export async function getHomepageServices(): Promise<VisaService[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
        const url = `${baseUrl}/api/services?limit=3`;
        const response = await fetcher<any>(url, {}, 1, false);
        const raw = unwrapList<any>(response);
        return raw.map(mapVisaServiceFromApi).filter(Boolean) as VisaService[];
    } catch (error) {
        console.error('Error fetching homepage services:', error);
        return [];
    }
}

export async function getVisaContinents(): Promise<VisaContinent[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
        const url = `${baseUrl}/api/continents`;
        const response = await fetcher<any>(url, {}, 1, false);
        return unwrapList<VisaContinent>(response);
    } catch (error) {
        console.error('Error fetching visa continents:', error);
        return [];
    }
}

export async function getVisaContinentBySlug(slug: string): Promise<VisaContinent | undefined> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
        const url = `${baseUrl}/api/continents/${encodeURIComponent(slug)}`;
        const response = await fetcher<any>(url);
        return response.data?.data ?? response.data;
    } catch (error) {
        console.error('Error fetching visa continent by slug:', error);
        return undefined;
    }
}

export async function getVisaDetailById(id: string): Promise<VisaDetail | undefined> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
        const url = `${baseUrl}/api/services/${encodeURIComponent(id)}`;
        const response = await fetcher<any>(url, {}, 2, false);
        const raw = unwrapObject<any>(response);
        return mapVisaDetailFromApi(raw);
    } catch (error) {
        console.error('Error fetching visa detail by id:', error);
        return undefined;
    }
}

export async function getVisaDetailBySlug(slug: string): Promise<VisaDetail | undefined> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
        const url = `${baseUrl}/api/services/${encodeURIComponent(slug)}`;
        const response = await fetcher<any>(url, {}, 2, false);
        const raw = unwrapObject<any>(response);
        return mapVisaDetailFromApi(raw);
    } catch (error) {
        console.error('❌ getVisaDetailBySlug API error:', error);
        return undefined;
    }
}

export async function getSiteConfig() {
    await delay(50); return siteConfig;
}

export async function getContactInfo() {
    await delay(50); return contactInfo;
}

// UPDATED: This function now has fallback to mock data when Algolia is not configured.
export async function getNavigationLinks(): Promise<NavItem[]> {
    // Check if Algolia is configured, if not use mock data
    if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || !process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY || !process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME) {
        return navigationLinks;
    }

    try {
        const algoliaClient: SearchClient = algoliasearch(
            process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
            process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
        );
        
        const algoliaIndex = algoliaClient.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME);
        const [visaResponse] = await Promise.all([
            algoliaIndex.search('', { // Query for visa data
                facetFilters: ['type:visa'],
                attributesToRetrieve: ['path', 'country', 'continent', 'image'],
                hitsPerPage: 100 // Adjust as needed
            }),
        ]);
        
        const visaHits = visaResponse.hits;

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
            
            // Add country to the continent's children array
            visaContinents[continentName].children?.push({
                label: hit.country,
                href: hit.path,
                image: hit.image
            });
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
                href: '/tour-du-lich'
            },
            { label: 'Tin Tức', href: '/tin-tuc' },
            { label: 'Liên hệ', href: '/lien-he' },
        ];

        return finalNavLinks;

    } catch (error) {
        console.error("Error fetching navigation from Algolia:", error);
        // Fallback to mock data when Algolia fails
        return navigationLinks;
    }
}

export interface HeroBannerData {
    backgroundImage: string;
    title: {
        primary: string;
        secondary: string;
        subtitle: string;
    };
    description: string;
    ctaButtons: Array<{
        text: string;
        href: string;
        variant: 'primary' | 'secondary';
    }>;
}

// Mock data for hero banner (temporary until backend has data)
const mockHeroBannerData: HeroBannerData = {
    backgroundImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1920',
    title: {
        primary: 'Dịch vụ',
        secondary: 'Visa & Tour',
        subtitle: 'Uy tín - Nhanh chóng - Hiệu quả'
    },
    description: '15+ năm kinh nghiệm, tỷ lệ đậu visa 99%',
    ctaButtons: [
        {
            text: 'Dịch Vụ Visa',
            href: '/dich-vu',
            variant: 'secondary'
        },
        {
            text: 'Tour Du Lịch',
            href: '/tour-du-lich',
            variant: 'primary'
        }
    ]
};

export async function getHeroBannerData(): Promise<HeroBannerData> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
        const url = `${baseUrl}/api/meta?key=heroBanner`;
        
        const response = await fetcher<any>(url, {}, 2, false);
        
        if (response && response.status === 'success' && response.data) {
            return response.data as HeroBannerData;
        }
        
        // Fallback to mock data
        return mockHeroBannerData;
    } catch (error) {
        console.error('Error fetching hero banner data:', error);
        // Fallback to mock data
        return mockHeroBannerData;
    }
}

// Generic meta reader
export async function getMetaJson<T = any>(key: string): Promise<T | undefined> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
        const url = `${baseUrl}/api/meta-json?pageKey=${encodeURIComponent(key)}`;
        const response = await fetcher<any>(url, {}, 1, false);
        if (response && (response.status === 'success' || response.ok) && response.data) {
            return response.data as T;
        }
        return undefined;
    } catch (error) {
        console.error('Error fetching meta:', key, error);
        return undefined;
    }
}