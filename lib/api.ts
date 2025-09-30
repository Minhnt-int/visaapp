import { Tour, News, VisaContinent, TourCategory, VisaDetail, NewsPreview, formContact, ApiResponse, VisaService, FilterParams, NavItem } from '@/types';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import { contactInfo, mockNews, mockTourCategories, mockTours, mockVisaContinents, mockVisaPageData, navigationLinks, newsPreview, siteConfig } from './mock-data';
// Import any necessary types if you have them
// import { SomeApiDataType } from '@/lib/types'; // Giả định bạn có định nghĩa kiểu dữ liệu



// =========================================================================
// HELPER FUNCTIONS
// =========================================================================

/**
 * Normalizes a Vietnamese string for searching.
 * - Converts to lowercase.
 * - Removes diacritics (e.g., "mỹ" -> "my").
 * - Handles special characters like "đ".
 * - Removes non-alphanumeric characters.
 */
const normalizeVietnamese = (str: string): string => {
    if (!str) return '';

    // The implementation is confirmed to be correct.
    return str.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};


// =========================================================================
// PUBLIC API FUNCTIONS
// =========================================================================

// --- Functions for News ---

/**
 * Fetches a filtered list of news previews.
 * This is the core filtering logic.
 */
export async function getNewsPreview(params: FilterParams = {}): Promise<NewsPreview[]> {
    // CRITICAL DIAGNOSTIC: Log the exact parameters received by the function.
    console.log(`[getNewsPreview] Received params: ${JSON.stringify(params)}`);

    const { search, category } = params;
    let filteredData = [...newsPreview]; // Use the imported 'newsPreview' data as the source.

    // Filter by search term (in title)
    if (search) {
        const normalizedSearch = normalizeVietnamese(search);
        filteredData = filteredData.filter(item => {
            const normalizedTitle = normalizeVietnamese(item.title);
            return normalizedTitle.includes(normalizedSearch);
        });
    }

    // Filter by category
    if (category) {
        const normalizedCategory = normalizeVietnamese(category);
        console.log(`DEBUG: Normalized Category for filtering: '${normalizedCategory}'`);

        filteredData = filteredData.filter(item =>
            item.category.some(cat => {
                const normalizedItemCat = normalizeVietnamese(cat);
                return normalizedItemCat.includes(normalizedCategory);
            })
        );
    }

    return filteredData;
}


/**
 * Fetches the full list of news articles.
 */
export async function getNews(params: FilterParams = {}): Promise<News[]> {
    const previews = await getNewsPreview(params);
    const filteredNews = mockNews.filter(fullNews =>
        previews.some(preview => preview.id === fullNews.id)
    );
    return filteredNews;
}

/**
 * Fetches a single news article by its slug.
 */
export async function getNewsBySlug(slug: string): Promise<News | undefined> {
    return mockNews.find(news => news.slug === slug);
}

/**
 * Fetches all unique categories and their counts from the news data.
 */
export async function getNewsKeywords(): Promise<{ name: string; count: number }[]> {
    const categoryCount: { [key: string]: number } = {};

    mockNews.forEach(item => {
        item.keyword?.forEach(cat => {
            categoryCount[cat] = (categoryCount[cat] || 0) + 1;
        });
    });

    return Object.entries(categoryCount).map(([name, count]) => ({ name, count }));
}

// --- Functions for Tours (RESTORED) ---

/**
 * Fetches all tour categories.
 */
export async function getTourCategories(): Promise<TourCategory[]> {
    return mockTourCategories;
}

// --- Functions for Visas (RESTORED) ---

/**
 * Fetches all visa categories (continents).
 */
export async function getVisaCategories(): Promise<VisaContinent[]> {
    return mockVisaContinents;
}

export async function getServicesByContinentSlug(continentSlug: string): Promise<VisaService[]> {
    // Lọc mockServices theo continentSlug
    let services = await getVisaContinents()
    return services.filter(service => service.continentSlug === continentSlug);
}
export async function getVisaContinents(): Promise<VisaService[]> {
    // return fetcher<VisaService[]>('/api/visa-continents');
    const transformedData = Object.keys(mockVisaPageData).map(countryKey => {
        const countryData = mockVisaPageData[countryKey];

        // Lấy tên quốc gia từ key và viết hoa chữ cái đầu
        const countryName = countryKey.charAt(0).toUpperCase() + countryKey.slice(1);

        return {
            id: `${countryKey}`,
            slug: `${countryKey}`,
            title: countryData.title,
            country: countryName,
            continentSlug: countryData.continentSlug,
            image: countryData.heroImage,
            description: countryData.description,
            successRate: countryData.successRate,
            services: countryData.services,
        };
    });
    return transformedData;
}

export async function getVisaContinentPreview(): Promise<VisaService[]> {
    // return fetcher<VisaService[]>('/api/visa-continents/preview');
    return getAllServices();
}

export async function getAllServices(): Promise<VisaService[]> {
    const transformedData = Object.keys(mockVisaPageData).map(countryKey => {
        const countryData = mockVisaPageData[countryKey];

        // Lấy tên quốc gia từ key và viết hoa chữ cái đầu
        const countryName = countryKey.charAt(0).toUpperCase() + countryKey.slice(1);

        return {
            id: `${countryKey}`,
            slug: `${countryKey}`,
            title: countryData.title,
            country: countryName,
            continentSlug: countryData.continentSlug,
            image: countryData.heroImage,
            description: countryData.description,
            successRate: countryData.successRate,
            services: countryData.services,
        };
    });
    return transformedData;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Site Config and Contact Info ---

export async function getSiteConfig() {
    await delay(50); // Simulate network delay
    return siteConfig;
}

export async function getContactInfo() {
    await delay(50);
    return contactInfo;
}

export async function getNavigationLinks(): Promise<NavItem[]> {
    await delay(50);
    return navigationLinks;
}

// --- Service and Visa Data Functions ---


// CORRECT: Add the missing function
export async function getHomepageServices(): Promise<VisaService[]> {
    await delay(100);
    let services = await getAllServices();
    // Return only the first 3 services for the homepage
    return services.slice(0, 3);
}

export async function getVisaDetailById(id: string): Promise<VisaDetail | undefined> {
  await delay(100);
  return mockVisaPageData[id];
}

export async function getVisaContinentBySlug(slug: string): Promise<VisaService | undefined> {
    await delay(100);
    const continents = await getVisaContinents();
    return continents.find((c : any) => c.slug === slug);
}


// --- Tour Data Functions ---

export async function getAllTours(): Promise<Tour[]> {
  await delay(100);
  return mockTours;
}

export async function getTourBySlug(slug: string): Promise<Tour | undefined> {
  await delay(100);
  const tours = await getAllTours();
  return tours.find(tour => tour.slug === slug);
}


// --- News Data Functions ---

export async function getAllNews(): Promise<News[]> {
  await delay(100);
  return mockNews;
}