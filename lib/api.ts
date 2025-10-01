import { Tour, News, VisaContinent, TourCategory, VisaDetail, NewsPreview, formContact, ApiResponse, VisaService, NavItem } from '@/types';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import { contactInfo, mockNews, mockTourCategories, mockTours, mockVisaContinents, mockVisaPageData, navigationLinks, newsPreview, siteConfig } from './mock-data';

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
  tags?: string; // UPDATE: Changed to 'tags' to accept a comma-separated string
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
    categoryField: keyof T = 'category' // Note: In mock data, 'category' field holds the tags.
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

    // UPDATE: Handle multi-tag filtering
    if (tags) {
        const selectedTags = tags.split(',').map(t => t.trim());
        if (selectedTags.length > 0) {
            processedData = processedData.filter(item => {
                const itemTags = item[categoryField];
                if (Array.isArray(itemTags)) {
                    const normalizedItemTags = itemTags.map((tag : any) => normalizeVietnamese(tag));
                    // Check if at least one of the item's tags is in the selectedTags list
                    return selectedTags.every(selectedTag => normalizedItemTags.includes(selectedTag));
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
    // The logic now correctly handles filtering by multiple tags on the 'category' field.
    return queryData<NewsPreview>(newsPreview, params, ['title'], 'category');
}

export async function getNews(params: FetchParams = {}): Promise<PaginatedResponse<News>> {
    await delay(100);
    return queryData<News>(mockNews, params, ['title', 'content', 'description'], 'keyword');
}

export async function getNewsBySlug(slug: string): Promise<News | undefined> {
    return mockNews.find(news => news.slug === slug);
}

export async function getNewsKeywords(): Promise<{ name: string; count: number }[]> {
    const tagCount: { [key: string]: number } = {};
    // Using newsPreview data as it's the source for the blog page
    newsPreview.forEach(item => {
        item.category?.forEach(tag => {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
    });
    return Object.entries(tagCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count); // Sort by count descending
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

async function transformVisaData(): Promise<VisaService[]> {
    return Object.keys(mockVisaPageData).map(countryKey => {
        const countryData = mockVisaPageData[countryKey];
        const countryName = countryKey.charAt(0).toUpperCase() + countryKey.slice(1);
        return { id: countryKey, slug: countryKey, title: countryData.title, country: countryName, continentSlug: countryData.continentSlug, image: countryData.heroImage, description: countryData.description, successRate: countryData.successRate, services: countryData.services };
    });
}

export async function getServices(params: FetchParams = {}): Promise<PaginatedResponse<VisaService>> {
    await delay(100);
    const allServices = await transformVisaData();
    return queryData<VisaService>(allServices, params, ['title', 'country', 'description'], 'continentSlug');
}

export async function getHomepageServices(): Promise<VisaService[]> {
    const response = await getServices({ page: 1, limit: 3, sortBy: 'country', sortOrder: 'asc' });
    return response.data;
}

export async function getVisaContinentsPreview(): Promise<VisaContinent[]> {
    return mockVisaContinents;
}

export async function getVisaContinentPreviewBySlug(slug: string): Promise<VisaContinent | undefined> {
    return mockVisaContinents.find(continent => continent.slug === slug);
}

export async function getVisaDetailById(id: string): Promise<VisaDetail | undefined> {
    await delay(100);
    return mockVisaPageData[id];
}

export async function getSiteConfig() {
    await delay(50); return siteConfig;
}

export async function getContactInfo() {
    await delay(50); return contactInfo;
}

export async function getNavigationLinks(): Promise<NavItem[]> {
    await delay(50); return navigationLinks;
}
