// API Mock functions để simulate việc gọi database

export interface VisaCountryItem {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  flag: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface VisaCategory {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  order: number;
}

// Mock data cho các danh mục visa (cố định)
const mockVisaCategories: VisaCategory[] = [
  {
    id: "cat-001",
    name: "Visa Châu Á",
    slug: "visa-chau-a",
    isActive: true,
    order: 1
  },
  {
    id: "cat-002", 
    name: "Visa Châu Âu",
    slug: "visa-chau-au",
    isActive: true,
    order: 2
  },
  {
    id: "cat-003",
    name: "Visa Châu Mỹ", 
    slug: "visa-chau-my",
    isActive: true,
    order: 3
  },
  {
    id: "cat-004",
    name: "Visa Châu Úc",
    slug: "visa-chau-uc",
    isActive: true,
    order: 4
  }
];

// Mock data cho các nước visa (sẽ được gọi từ API)
const mockVisaCountries: VisaCountryItem[] = [
  // Châu Á
  {
    id: "country-001",
    name: "Hàn Quốc",
    slug: "han-quoc",
    categoryId: "cat-001",
    categoryName: "Visa Châu Á",
    categorySlug: "visa-chau-a", 
    flag: "🇰🇷",
    isActive: true,
    order: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "country-002",
    name: "Nhật Bản", 
    slug: "nhat-ban",
    categoryId: "cat-001",
    categoryName: "Visa Châu Á",
    categorySlug: "visa-chau-a",
    flag: "🇯🇵", 
    isActive: true,
    order: 2,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "country-003",
    name: "Trung Quốc",
    slug: "trung-quoc", 
    categoryId: "cat-001",
    categoryName: "Visa Châu Á",
    categorySlug: "visa-chau-a",
    flag: "🇨🇳",
    isActive: true,
    order: 3,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "country-004",
    name: "Singapore",
    slug: "singapore",
    categoryId: "cat-001", 
    categoryName: "Visa Châu Á",
    categorySlug: "visa-chau-a",
    flag: "🇸🇬",
    isActive: true,
    order: 4,
    createdAt: "2024-01-01T00:00:00Z", 
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "country-005",
    name: "Thái Lan",
    slug: "thai-lan",
    categoryId: "cat-001",
    categoryName: "Visa Châu Á", 
    categorySlug: "visa-chau-a",
    flag: "🇹🇭",
    isActive: true,
    order: 5,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  // Châu Âu
  {
    id: "country-006",
    name: "Anh Quốc",
    slug: "anh-quoc",
    categoryId: "cat-002",
    categoryName: "Visa Châu Âu",
    categorySlug: "visa-chau-au",
    flag: "🇬🇧",
    isActive: true,
    order: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "country-007", 
    name: "Đức",
    slug: "duc",
    categoryId: "cat-002",
    categoryName: "Visa Châu Âu",
    categorySlug: "visa-chau-au",
    flag: "🇩🇪",
    isActive: true,
    order: 2,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "country-008",
    name: "Pháp", 
    slug: "phap",
    categoryId: "cat-002",
    categoryName: "Visa Châu Âu",
    categorySlug: "visa-chau-au",
    flag: "🇫🇷",
    isActive: true,
    order: 3,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "country-009",
    name: "Áo",
    slug: "ao",
    categoryId: "cat-002", 
    categoryName: "Visa Châu Âu",
    categorySlug: "visa-chau-au",
    flag: "🇦🇹",
    isActive: true,
    order: 4,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "country-010",
    name: "Ý",
    slug: "y", 
    categoryId: "cat-002",
    categoryName: "Visa Châu Âu",
    categorySlug: "visa-chau-au",
    flag: "🇮🇹",
    isActive: true,
    order: 5,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  // Châu Mỹ
  {
    id: "country-011",
    name: "Mỹ",
    slug: "my",
    categoryId: "cat-003",
    categoryName: "Visa Châu Mỹ",
    categorySlug: "visa-chau-my", 
    flag: "🇺🇸",
    isActive: true,
    order: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "country-012",
    name: "Canada",
    slug: "canada",
    categoryId: "cat-003",
    categoryName: "Visa Châu Mỹ", 
    categorySlug: "visa-chau-my",
    flag: "🇨🇦",
    isActive: true,
    order: 2,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  // Châu Úc
  {
    id: "country-013",
    name: "Úc",
    slug: "uc", 
    categoryId: "cat-004",
    categoryName: "Visa Châu Úc",
    categorySlug: "visa-chau-uc",
    flag: "🇦🇺",
    isActive: true,
    order: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "country-014",
    name: "New Zealand", 
    slug: "new-zealand",
    categoryId: "cat-004",
    categoryName: "Visa Châu Úc", 
    categorySlug: "visa-chau-uc",
    flag: "🇳🇿",
    isActive: true,
    order: 2,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  }
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * API để lấy tất cả danh mục visa (cố định)
 */
export async function getVisaCategories(): Promise<VisaCategory[]> {
  await delay(300); // Simulate network delay
  return mockVisaCategories.filter(cat => cat.isActive).sort((a, b) => a.order - b.order);
}

/**
 * API để lấy tất cả visa countries kèm thông tin category
 * Đây là API chính sẽ được gọi ở layout để pre-load data
 */
export async function getAllVisaCountries(): Promise<VisaCountryItem[]> {
  await delay(800); // Simulate API call delay
  
  return mockVisaCountries
    .filter(country => country.isActive)
    .sort((a, b) => {
      // Sort by category order first, then by country order
      if (a.categorySlug !== b.categorySlug) {
        const categoryA = mockVisaCategories.find(cat => cat.slug === a.categorySlug);
        const categoryB = mockVisaCategories.find(cat => cat.slug === b.categorySlug);
        return (categoryA?.order || 0) - (categoryB?.order || 0);
      }
      return a.order - b.order;
    });
}

/**
 * API để lấy visa countries theo category
 */
export async function getVisaCountriesByCategory(categorySlug: string): Promise<VisaCountryItem[]> {
  await delay(400); // Simulate network delay
  
  return mockVisaCountries
    .filter(country => country.categorySlug === categorySlug && country.isActive)
    .sort((a, b) => a.order - b.order);
}

/**
 * API để lấy thông tin chi tiết một country
 */
export async function getVisaCountryBySlug(categorySlug: string, countrySlug: string): Promise<VisaCountryItem | null> {
  await delay(200); // Simulate network delay
  
  const country = mockVisaCountries.find(
    country => country.categorySlug === categorySlug && 
               country.slug === countrySlug && 
               country.isActive
  );
  
  return country || null;
}

/**
 * Utility function để group countries theo category
 */
export function groupCountriesByCategory(countries: VisaCountryItem[]): Record<string, VisaCountryItem[]> {
  return countries.reduce((acc, country) => {
    if (!acc[country.categorySlug]) {
      acc[country.categorySlug] = [];
    }
    acc[country.categorySlug].push(country);
    return acc;
  }, {} as Record<string, VisaCountryItem[]>);
}

/**
 * API search function (có thể dùng sau này)
 */
export async function searchVisaCountries(query: string): Promise<VisaCountryItem[]> {
  await delay(600);
  
  const lowerQuery = query.toLowerCase();
  return mockVisaCountries
    .filter(country => 
      country.isActive && (
        country.name.toLowerCase().includes(lowerQuery) ||
        country.categoryName.toLowerCase().includes(lowerQuery)
      )
    )
    .sort((a, b) => a.name.localeCompare(b.name));
}
