import { Tour, News, VisaContinent, TourCategory, VisaDetail, NewsPreview, formContact, ApiResponse, VisaService } from '@/types';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import { mockNews, mockTourCategories, mockTours, mockVisaContinents, mockVisaPageData, newsPreview } from './mock-data';
// Import any necessary types if you have them
// import { SomeApiDataType } from '@/lib/types'; // Giả định bạn có định nghĩa kiểu dữ liệu



const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // Sử dụng biến môi trường cho base URL
  timeout: 10000, // Timeout requests after 10 seconds
  headers: {
    'Content-Type': 'application/json',
    // Thêm các headers mặc định khác nếu cần (ví dụ: Authorization)
    // 'Authorization': `Bearer ${yourAuthToken}`
  },
});

// =========================================================================
// AXIOS INTERCEPTORS (Optional but Recommended)
// =========================================================================

// Request Interceptor (Ví dụ: thêm token auth)
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('authToken'); // Ví dụ lấy token từ localStorage (Client-side)
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    // console.log('Request Interceptor:', config); // Logging request
    return config;
  },
  (error) => {
    // console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor (Ví dụ: xử lý lỗi tập trung, refresh token)
api.interceptors.response.use(
  (response) => {
    // console.log('Response Interceptor:', response); // Logging response
    return response;
  },
  async (error: AxiosError) => {
    console.error('Response Interceptor Error:', error.message);

    // Ví dụ: Xử lý lỗi Unauthorized (401) - Cần cấu hình backend trả về 401 khi token hết hạn/không hợp lệ
    // const originalRequest = error.config;
    // if (error.response?.status === 401 && !originalRequest?.['__isRetry']) {
    //   originalRequest['__isRetry'] = true;
    //   try {
    //     // Logic refresh token
    //     // const newToken = await refreshToken();
    //     // api.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
    //     // originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
    //     // return api(originalRequest); // Retry the original request with new token
    //   } catch (refreshError) {
    //     // Log out user if refresh fails
    //     // console.error('Failed to refresh token:', refreshError);
    //     // logoutUser();
    //     // return Promise.reject(refreshError);
    //   }
    // }

    // Ném lại lỗi để có thể bắt ở nơi gọi API
    return Promise.reject(error);
  }
);

// Hàm fetcher linh hoạt cho các yêu cầu HTTP
export async function fetcher<T = any>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  try {
    // Sử dụng api instance để request
    const response: AxiosResponse<T> = await api.request<T>({
      url: url,
      ...options, // Truyền các tùy chọn (method, headers, data, etc.)
    });

    // Axios tự động return response.data khi thành công
    // và throw error cho status 4xx/5xx, nên không cần kiểm tra response.ok
    return response.data;

  } catch (error) {
    const axiosError = error as AxiosError; // Ép kiểu sang AxiosError

    console.error('Fetcher Error:', axiosError.message);
    if (axiosError.response) {
      console.error('Fetcher Error Response Data:', axiosError.response.data);
      console.error('Fetcher Error Status:', axiosError.response.status);

      // Cố gắng lấy message từ response body (mong đợi là object)
      const backendErrorMessage = (axiosError.response.data as any)?.message || `Lỗi từ server: Status ${axiosError.response.status}`;
      throw new Error(backendErrorMessage); // Ném ra Error mới với message từ backend

    } else if (axiosError.request) {
      throw new Error('No response received from server. Please check network connection.');
    } else {
      throw new Error('Error setting up request: ' + axiosError.message);
    }
  }
}

// =========================================================================
// FETCH FUNCTIONS
// =========================================================================

export async function getNews(): Promise<News[]> {
  // return fetcher<News[]>('/api/news');
  return mockNews;
}

interface FilterParams {
  search?: string;
  category?: string;
}


const normalizeVietnamese = (str: string): string => {
  if (!str) return '';

  // === DEBUG BLOCK MỚI: KIỂM TRA MÃ KÝ TỰ ===
  console.log(`[DEBUG 0] Raw input: "${str}" | Codes: ${str.split('').map(c => c.charCodeAt(0).toString(16))}`);
  // ==========================================

  let tempStr = str.toLowerCase();
  console.log(`[DEBUG 1] After toLowerCase: "${tempStr}"`);

  let nfdStr = tempStr.normalize("NFD");
  console.log(`[DEBUG 2] After normalize("NFD"): "${nfdStr}"`);

  let replacedStr = nfdStr.replace(/[\u0300-\u036f]/g, "");
  console.log(`[DEBUG 3] After replace diacritics: "${replacedStr}"`);
  
  let finalStr = replacedStr.replace(/đ/g, "d")
                            .replace(/[^a-z0-9\s]/g, ' ')
                            .replace(/\s+/g, ' ')
                            .trim();
  
  console.log(`[DEBUG 4] Final output: "${finalStr}"`);

  return finalStr; 
};


export async function getNewsPreview(params : FilterParams): Promise<NewsPreview[]> {
  let newPreviewData = newsPreview;
  const { search, category } = params;

  // Lọc theo SEARCH (Tiêu đề)
  if (search) {
      const normalizedSearch = normalizeVietnamese(search);
      
      newPreviewData = newPreviewData.filter(item => {
          const normalizedTitle = normalizeVietnamese(item.title);
          return normalizedTitle.includes(normalizedSearch);
      });
      // Log để xác nhận: 'my'
      console.log('newPreviewData1: ', newPreviewData, normalizedSearch); 
  }
  
  // Lọc theo CATEGORY (Mảng Category)
  if (category) {
    const normalizedCategory = normalizeVietnamese(category); 
    
    console.log('DEBUG: Normalized Category:', normalizedCategory); // PHẢI LÀ 'my'

    newPreviewData = newPreviewData.filter(item => {
        return item.category.some(cat => {
            const normalizedItemCat = normalizeVietnamese(cat); 
            
            // 💡 CHỈ SỬ DỤNG INCLUDES SAU KHI CHUẨN HÓA
            // Đây là phương pháp ít gây lỗi nhất khi chuỗi đã được làm sạch
            return normalizedItemCat.includes(normalizedCategory);
        });
    });
    
    console.log('newPreviewData2: ', newPreviewData, normalizedCategory); 
}

  return newPreviewData;
}


export async function getNewsKeywords() {
  // try {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`); // Gọi API
  //   if (!res.ok) {
  //     // This will activate the closest `error.js` Error Boundary
  //     throw new Error('Failed to fetch keywords');
  //   }
  //   return res.json();
  // } catch (error) {
  //   console.error("Error fetching keywords:", error);
  //   return []; // Trả về mảng rỗng nếu có lỗi
  // }
  const keywordCounts: { [key: string]: number } = {};

  // Assuming each news item has a 'keyword' property which is an array of strings
  mockNews.forEach((newsItem) => {
    if (newsItem.keyword && Array.isArray(newsItem.keyword)) {
      newsItem.keyword.forEach((keyword) => {
        if (keyword) {
          keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
        }
      });
    }
  });

  // Format the keywords data
  const keywords = Object.keys(keywordCounts).map((keywordName) => ({
    name: keywordName,
    count: keywordCounts[keywordName],
  }));
  return keywords;
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

export async function getVisaContinentPreview(): Promise<VisaContinent[]> {
  // return fetcher<VisaService[]>('/api/visa-continents/preview');
  return mockVisaContinents;
}

export async function getTours(): Promise<Tour[]> {
  // return fetcher<Tour[]>('/api/tours');
  return mockTours;
}

export async function getTourCategories(): Promise<TourCategory[]> {
  // const result = await fetcher<{ success: boolean; data: TourCategory[] }>('/api/tour-categories');
  // return result.data;
  return mockTourCategories;
}

export async function getVisaCategories(): Promise<VisaContinent[]> {
  // const result = await fetcher<{ success: boolean; data: VisaContinent[] }>('/api/visa-continents');
  // return result.data;
  return mockVisaContinents;
}

export async function getVisaDetail(id: string): Promise<VisaDetail | null> {
  if (!id) return null;
  // Không cần truyền method: 'GET'
  try {
    // return fetcher<VisaDetail>(`/api/visa-details/${id}`);
    return mockVisaPageData[id];
  } catch (error: any) {
    // Nếu API trả về 404 khi không tìm thấy chi tiết
    if (error.response?.status === 404) {
      return null; // Trả về null nếu không tìm thấy
    }
    throw error; // Ném lại lỗi nếu là lỗi khác
  }
}

export async function postFormContact(formData: formContact): Promise<ApiResponse> { // Sử dụng type trả về mong muốn
  // Không kiểm tra formData === null ở đây, để fetcher xử lý lỗi nếu body là null/undefined
  // Nếu API /api/contact mong đợi formContactResponse, hãy khai báo Promise<formContactResponse>
  // Nếu API chỉ trả về message string khi thành công, có thể dùng Promise<string> hoặc Promise<{ message: string }>

  // Axios sử dụng 'data' cho body của POST/PUT/PATCH requests
  const result = await fetcher<ApiResponse>('/api/contact', {
    method: 'POST',
    data: formData,
    // Axios tự động set Content-Type: application/json nếu data là object
  });

  return result; // Trả về kết quả từ API (ví dụ: { message: "..." })
}


// Fake API call mới để lấy dịch vụ theo category slug
export async function getServicesByContinentSlug(continentSlug: string): Promise<VisaService[]> {
  // Lọc mockServices theo continentSlug
  let services = await getVisaContinents()
  return services.filter(service => service.continentSlug === continentSlug);
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
  // return tours.find(tour => tour.slug === slug);
  return mockTours.find(tour => tour.slug === slug);
}

/**
 * Gets a specific news article by its slug.
 * @param slug - The slug of the news article.
 * @returns The news article object or undefined if not found.
 */
export async function getNewsBySlug(slug: string): Promise<News | undefined> {
  const news = await getNews();
  // return news.find(article => article.slug === slug);
  return mockNews.find(article => article.slug === slug);
}

/**
 * Gets a specific visa service by its ID/slug.
 * @param slug - The slug of the visa service.
 * @returns The service object or undefined if not found.
 */
export async function getVisaServiceBySlug(slug: string): Promise<VisaService | undefined> {
  const services = await getVisaContinents();
  // return services.find(service => service.id === slug);
  return services.find(service => service.id === slug);
}

