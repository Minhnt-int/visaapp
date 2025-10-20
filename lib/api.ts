import { Tour, News, VisaContinent, TourCategory, VisaDetail, NewsPreview, formContact, ApiResponse, VisaService, NavItem } from '@/types';
export type { News } from '@/types'; // Re-export the News type
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import { contactInfo, mockNews, mockTourCategories, mockTours, mockVisaContinents, mockVisaPageData, navigationLinks, newsPreview, siteConfig } from './mock-data';
import algoliasearch, { SearchClient } from 'algoliasearch/lite';


const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 5000,  // Reduced from 10s to 5s for faster failure
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
    retries: number = 2
): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response: AxiosResponse<T> = await api.request<T>({ url, ...options });
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            lastError = axiosError;

            // Only retry on timeout or network errors, not on 4xx/5xx responses
            const isRetryable = !axiosError.response || axiosError.code === 'ECONNABORTED';

            if (!isRetryable || attempt === retries) {
                console.error(`Fetcher Error (attempt ${attempt + 1}/${retries + 1}):`, axiosError.message);

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

        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/news?${queryString.toString()}`;
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
    try {
        const queryString = new URLSearchParams();
        if (params.page) queryString.append('page', params.page.toString());
        if (params.limit) queryString.append('limit', params.limit.toString());
        if (params.search) queryString.append('search', params.search);

        // Normalize keyword parameter to handle variations like "phong-van" vs "phong van"
        if (params.keyword && typeof params.keyword === 'string') {
            const normalizedKeywords = params.keyword
                .split(',')
                .map(k => normalizeVietnamese(k.trim()))
                .filter(k => k)
                .join(',');
            if (normalizedKeywords) {
                queryString.append('keyword', normalizedKeywords);
            }
        }

        if (params.status) queryString.append('status', params.status);
        if (params.sortBy) queryString.append('sortBy', params.sortBy);
        if (params.sortOrder) queryString.append('sortOrder', params.sortOrder);

        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/news?${queryString.toString()}`;
        const response = await fetcher<any>(url);

        // Backend returns: { status, message, data: { data: [...], total, page, limit, totalPages } }
        const responseData = response.data?.data || [];
        const paginationInfo = response.data || {};

        return {
            data: responseData,
            total: paginationInfo.total || 0,
            page: paginationInfo.page || 1,
            limit: paginationInfo.limit || 10,
            totalPages: paginationInfo.totalPages || 1
        };
    } catch (error) {
        console.error('Error fetching news:', error);
        // Fallback to mock data
        await delay(100);
        return queryData<News>(mockNews, params, ['title', 'content', 'excerpt'], 'metaKeywords');
    }
}

export async function getNewsBySlug(slug: string): Promise<News | undefined> {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/${slug}`;
        const response = await fetcher<any>(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching news by slug:', error);
        // Fallback to mock data
        return mockNews.find(news => news.slug === slug);
    }
}

export async function getNewsKeywords(): Promise<{ name: string; count: number }[]> {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/keywords`;
        const response = await fetcher<any>(url);

        // Handle both direct response and nested data response
        const keywords = response.data || response || [];

        return keywords;
    } catch (error) {
        console.error('Error fetching news keywords:', error);
        // Fallback to mock data if API fails
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
}

export async function getTours(params: FetchParams = {}): Promise<PaginatedResponse<Tour>> {
    try {
        const queryString = new URLSearchParams();
        if (params.page) queryString.append('page', params.page.toString());
        if (params.limit) queryString.append('limit', params.limit.toString());
        if (params.search) queryString.append('search', params.search);
        if (params.tags) queryString.append('tags', params.tags);
        if (params.status) queryString.append('status', params.status);
        if (params.sortBy) queryString.append('sortBy', params.sortBy);
        if (params.sortOrder) queryString.append('sortOrder', params.sortOrder);
        if (params.isHot !== undefined) queryString.append('isHot', params.isHot.toString());

        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tours?${queryString.toString()}`;
        const response = await fetcher<any>(url);

        return {
            data: response.data || [],
            total: response.pagination?.total || 0,
            page: response.pagination?.page || 1,
            limit: response.pagination?.limit || 10,
            totalPages: response.pagination?.totalPages || 1
        };
    } catch (error) {
        console.error('Error fetching tours:', error);
        // Fallback to mock data
        await delay(100);
        return queryData<Tour>(mockTours, params, ['name', 'country'], 'categorySlug');
    }
}

export async function getTourCategories(): Promise<TourCategory[]> {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tour-categories`;
        const response = await fetcher<any>(url);
        return response.data || [];
    } catch (error) {
        console.error('Error fetching tour categories:', error);
        // Fallback to mock data
        return mockTourCategories;
    }
}

export async function getTourBySlug(slug: string): Promise<Tour | undefined> {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tours/${slug}`;
        const response = await fetcher<any>(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching tour by slug:', error);
        // Fallback to mock data
        return mockTours.find(tour => tour.slug === slug);
    }
}

export async function getAllServices(): Promise<VisaService[]> {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/services?limit=1000`;
        const response = await fetcher<any>(url);
        // Handle both direct array response and paginated response
        const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);
        return data;
    } catch (error) {
        console.error('Error fetching all services:', error);
        // Fallback to mock data
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
}

export async function getServices(params: FetchParams = {}): Promise<PaginatedResponse<VisaService>> {
    try {
        const queryString = new URLSearchParams();
        if (params.page) queryString.append('page', params.page.toString());
        if (params.limit) queryString.append('limit', params.limit.toString());
        if (params.search) queryString.append('search', params.search);
        if (params.tags) queryString.append('tags', params.tags);
        if (params.status) queryString.append('status', params.status);
        if (params.sortBy) queryString.append('sortBy', params.sortBy);
        if (params.sortOrder) queryString.append('sortOrder', params.sortOrder);

        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/services?${queryString.toString()}`;
        const response = await fetcher<any>(url);

        // Handle both direct response and nested data response
        const responseData = response.data?.data || response.data || [];
        const pagination = response.data?.pagination || response.pagination || {};

        return {
            data: responseData,
            total: pagination.total || response.total || 0,
            page: pagination.page || response.page || 1,
            limit: pagination.limit || response.limit || 10,
            totalPages: pagination.totalPages || response.totalPages || 1
        };
    } catch (error) {
        console.error('Error fetching services:', error);
        // Fallback to mock data
        await delay(100);
        const allServices = mockVisaPageData.map(detail => ({
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
        return queryData<VisaService>(allServices, params, ['title', 'country', 'description'], 'continentSlug');
    }
}

export async function getHomepageServices(): Promise<VisaService[]> {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/services?limit=3`;
        const response = await fetcher<any>(url);
        // Handle both direct array response and nested data response
        const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);
        return data;
    } catch (error) {
        console.error('Error fetching homepage services:', error);
        // Fallback to mock data
        const allServices = await getAllServices();
        return allServices.slice(0, 3);
    }
}

export async function getVisaContinents(): Promise<VisaContinent[]> {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/continents`;
        const response = await fetcher<any>(url);
        return response.data || [];
    } catch (error) {
        console.error('Error fetching visa continents:', error);
        // Fallback to mock data
        return mockVisaContinents;
    }
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
    try {
        // Use /api/services endpoint to get visa service detail
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/${id}`;
        const response = await fetcher<any>(url);

        // Transform backend response to match VisaDetail interface
        const serviceData = response.data || response;
        if (serviceData) {
            return {
                slug: serviceData.slug,
                continentSlug: serviceData.continent_slug || serviceData.continentSlug,
                title: serviceData.title,
                countryName: serviceData.country_name || serviceData.countryName,
                heroImage: serviceData.hero_image || serviceData.heroImage,
                successRate: serviceData.success_rate || serviceData.successRate,
                processingTime: serviceData.processing_time || serviceData.processingTime,
                description: serviceData.description,
                services: serviceData.services || [],
                visaTypes: serviceData.visa_types || serviceData.visaTypes || [],
                media: serviceData.media || [], // Media from visa_service_media join table
                status: serviceData.status || 'published',
                createdAt: serviceData.created_at || serviceData.createdAt,
                updatedAt: serviceData.updated_at || serviceData.updatedAt,
            };
        }
        return undefined;
    } catch (error) {
        console.error('Error fetching visa detail:', error);
        // Fallback to mock data
        await delay(100);
        const mockDetail = mockVisaPageData.find(detail => detail.slug === id);
        if (mockDetail) {
            // Mock data doesn't have media field, so return empty array
            return {
                ...mockDetail,
                media: [],
            };
        }
        return undefined;
    }
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
        console.error("FATAL: Error fetching navigation from Algolia:", error);
        // Re-throw the error to ensure the application fails loudly instead of showing stale/mock data.
        throw new Error(`Failed to fetch navigation links from Algolia. Please check API keys and index status. Details: ${(error as Error).message}`);
    }
}
