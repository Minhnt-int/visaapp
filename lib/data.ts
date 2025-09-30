
import { VisaService, VisaDetail, Tour, News, VisaContinent, TourCategory, NavItem } from '@/types';
import { 
    mockVisaPageData, 
    mockTours, 
    mockNews, 
    mockVisaContinents, 
    mockTourCategories,
    siteConfig, // Import siteConfig
    contactInfo, // Import contactInfo
    navigationLinks // Import navigationLinks
} from './mock-data';

// Simulate async data fetching
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

export async function getAllServices(): Promise<VisaService[]> {
  await delay(100);
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

export async function getVisaContinents(): Promise<VisaContinent[]> {
    await delay(100);
    return mockVisaContinents;
}

export async function getVisaContinentBySlug(slug: string): Promise<VisaContinent | undefined> {
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

export async function getTourCategories(): Promise<TourCategory[]> {
    await delay(100);
    return mockTourCategories;
}


// --- News Data Functions ---

export async function getAllNews(): Promise<News[]> {
  await delay(100);
  return mockNews;
}

export async function getNewsBySlug(slug: string): Promise<News | undefined> {
    await delay(100);
    const allNews = await getAllNews();
    return allNews.find(news => news.slug === slug);
}
