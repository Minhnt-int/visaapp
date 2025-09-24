import { Tour, News, Service, VisaCategory, TourCategory, VisaDetail, newsPreview, formContact, ApiResponse } from '@/types';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';
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
  return fetcher<News[]>('/api/news');
}
export async function getNewsPreview(): Promise<newsPreview[]> {
  return fetcher<newsPreview[]>('/api/news/preview');
}

export async function getServices(): Promise<Service[]> {
  return fetcher<Service[]>('/api/services');
}

export async function getTours(): Promise<Tour[]> {
  return fetcher<Tour[]>('/api/tours');
}

export async function getTourCategories(): Promise<TourCategory[]> {
  const result = await fetcher<{ success: boolean; data: TourCategory[] }>('/api/tour-categories');
  return result.data;
}

export async function getVisaCategories(): Promise<VisaCategory[]> {
  const result = await fetcher<{ success: boolean; data: VisaCategory[] }>('/api/visa-categories');
  return result.data;
}

export async function getVisaDetail(id: string): Promise<VisaDetail | null> {
  if (!id) return null;
  // Không cần truyền method: 'GET'
  try {
    return fetcher<VisaDetail>(`/api/visa-details/${id}`);
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
export async function getServicesByCategorySlug(categorySlug: string): Promise<Service[]> {
  // Lọc mockServices theo categorySlug
  let services = await getServices()
  return services.filter(service => service.categorySlug === categorySlug);
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