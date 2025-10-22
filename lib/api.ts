import { Tour, News, VisaContinent, TourCategory, VisaDetail, NewsPreview, formContact, ApiResponse, VisaService, NavItem } from '@/types';
export type { News } from '@/types'; // Re-export the News type
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import { contactInfo, mockNews, mockTourCategories, mockTours, mockVisaContinents, mockVisaPageData, navigationLinks, newsPreview, siteConfig } from './mock-data';
import algoliasearch, { SearchClient } from 'algoliasearch/lite';
import { ApiFallback } from './api-fallback';

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
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
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

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const url = `${baseUrl}/api/news?${queryString.toString()}`;
        const response = await fetcher<any>(url);

        return {
            data: response.data || [],
            total: response.pagination?.total || 0,
            page: response.pagination?.page || 1,
            limit: response.pagination?.limit || 10,
            totalPages: response.pagination?.totalPages || 1
        };
    } catch (error) {
        console.error('Error fetching news preview:', error);
        // Fallback to mock data
        await delay(100);
        return queryData<NewsPreview>(newsPreview, params, ['title'], 'category');
    }
}

export async function getNews(params: FetchParams = {}): Promise<PaginatedResponse<News>> {
    console.log('🔍 getNews called with params:', params);
    
    // Always use fallback system - no API calls
    console.log('📦 Using fallback system for news');
    const result = await ApiFallback.getNewsFallback(params);
    console.log('✅ getNews result:', result);
    return result;
}

export async function getNewsBySlug(slug: string): Promise<News | undefined> {
    console.log('🔍 getNewsBySlug called with slug:', slug);
    
    // Always use fallback system - no API calls
    console.log('📦 Using fallback system for news by slug');
    const result = mockNews.find(news => news.slug === slug);
    console.log('✅ getNewsBySlug result:', result);
    return result;
}

export async function getNewsKeywords(): Promise<{ name: string; count: number }[]> {
    console.log('🔍 getNewsKeywords called');
    
    // Always use fallback system - no API calls
    console.log('📦 Using fallback system for news keywords');
    const tagCount: { [key: string]: number } = {};
    newsPreview.forEach(item => {
        item.category?.forEach(tag => {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
    });
    const result = Object.entries(tagCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
    console.log('✅ getNewsKeywords result:', result);
    return result;
}

export async function getTours(params: FetchParams = {}): Promise<PaginatedResponse<Tour>> {
    console.log('🔍 getTours called with params:', params);
    
    // Always use fallback system - no API calls
    console.log('📦 Using fallback system for tours');
    await delay(100);
    const result = queryData<Tour>(mockTours, params, ['name', 'country'], 'categorySlug');
    console.log('✅ getTours result:', result);
    return result;
}

export async function getTourCategories(): Promise<TourCategory[]> {
    console.log('🔍 getTourCategories called');
    
    // Always use fallback system - no API calls
    console.log('📦 Using fallback system for tour categories');
    const result = mockTourCategories;
    console.log('✅ getTourCategories result:', result);
    return result;
}

export async function getTourBySlug(slug: string): Promise<Tour | undefined> {
    console.log('🔍 getTourBySlug called with slug:', slug);
    
    // Always use fallback system - no API calls
    console.log('📦 Using fallback system for tour by slug');
    const result = mockTours.find(tour => tour.slug === slug);
    console.log('✅ getTourBySlug result:', result);
    return result;
}

export async function getAllServices(): Promise<VisaService[]> {
    console.log('🔍 getAllServices called');
    
    // Always use fallback system - no API calls
    console.log('📦 Using fallback system for all services');
    const result = await ApiFallback.getServicesFallback({ limit: 1000 });
    console.log('✅ getAllServices result:', result);
    return result;
}

export async function getServices(params: FetchParams = {}): Promise<PaginatedResponse<VisaService>> {
    console.log('🔍 getServices called with params:', params);
    
    // Always use fallback system - no API calls
    console.log('📦 Using fallback system for services');
    const allServices = await ApiFallback.getServicesFallback({ limit: 1000 });
    const result = queryData<VisaService>(allServices, params, ['title', 'country', 'description'], 'continentSlug');
    console.log('✅ getServices result:', result);
    return result;
}

export async function getHomepageServices(): Promise<VisaService[]> {
    console.log('🔍 getHomepageServices called');
    
    // Always use fallback system - no API calls
    console.log('📦 Using fallback system for homepage services');
    const result = await ApiFallback.getServicesFallback({ limit: 3 });
    console.log('✅ getHomepageServices result:', result);
    return result;
}

export async function getVisaContinents(): Promise<VisaContinent[]> {
    console.log('🔍 getVisaContinents called');
    
    // Always use fallback system - no API calls
    console.log('📦 Using fallback system for visa continents');
    const result = await ApiFallback.getVisaContinentsFallback();
    console.log('✅ getVisaContinents result:', result);
    return result;
}

export async function getVisaContinentBySlug(slug: string): Promise<VisaContinent | undefined> {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/continents/${slug}`;
        const response = await fetcher<any>(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching visa continent by slug:', error);
        // Fallback to mock data
        return mockVisaContinents.find(continent => continent.slug === slug);
    }
}

export async function getVisaDetailById(id: string): Promise<VisaDetail | undefined> {
    console.log('🔍 getVisaDetailById called with id:', id);
    
    // Always use fallback system - no API calls
    console.log('📦 Using fallback system for visa detail');
    const result = await ApiFallback.getVisaDetailFallback(id);
    console.log('✅ getVisaDetailById result:', result);
    return result;
}

export async function getVisaDetailBySlug(slug: string): Promise<VisaDetail | undefined> {
    console.log('🔍 getVisaDetailBySlug called with slug:', slug);
    
    try {
        const response = await fetcher(`/api/services/${slug}`);
        console.log('✅ getVisaDetailBySlug API response:', response);
        
        if (response.status === 'success' && response.data) {
            return response.data as VisaDetail;
        }
        
        console.log('⚠️ No data found for slug:', slug);
        return undefined;
    } catch (error) {
        console.error('❌ getVisaDetailBySlug API error:', error);
        
        // Fallback to mock data
        console.log('📦 Using fallback system for visa detail by slug');
        const result = await ApiFallback.getVisaDetailFallback(slug);
        console.log('✅ getVisaDetailBySlug fallback result:', result);
        return result;
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
        console.warn('Algolia not configured, using mock navigation data');
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
        console.warn('Falling back to mock navigation data');
        return navigationLinks;
    }
}
