// API Fallback System - Fallback to mock data when backend is not available
import { mockNews, mockTourCategories, mockTours, mockVisaContinents, mockVisaPageData, navigationLinks, newsPreview, siteConfig, contactInfo } from './mock-data'
import { News, Tour, VisaContinent, TourCategory, VisaDetail, NewsPreview, formContact, ApiResponse, VisaService, NavItem } from '@/types'

// Utility function for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class ApiFallback {
  // News fallbacks
  static async getNewsFallback(params: any = {}): Promise<any> {
    await delay(100)
    const { page = 1, limit = 10, search, keyword } = params
    
    let filteredNews = [...mockNews]
    
    if (search) {
      filteredNews = filteredNews.filter(news => 
        news.title.toLowerCase().includes(search.toLowerCase()) ||
        news.content.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    if (keyword) {
      filteredNews = filteredNews.filter(news => 
        news.keywords?.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
      )
    }
    
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedNews = filteredNews.slice(startIndex, endIndex)
    
    return {
      data: paginatedNews,
      total: filteredNews.length,
      page,
      limit,
      totalPages: Math.ceil(filteredNews.length / limit)
    }
  }

  // Tours fallbacks
  static async getToursFallback(params: any = {}): Promise<any> {
    await delay(100)
    const { limit = 100, isHot = false } = params
    
    let filteredTours = [...mockTours]
    
    if (isHot) {
      filteredTours = filteredTours.filter(tour => tour.isHot)
    }
    
    return {
      data: filteredTours.slice(0, limit),
      total: filteredTours.length
    }
  }

  // Services fallbacks
  static async getServicesFallback(params: any = {}): Promise<any> {
    await delay(100)
    const { limit = 1000 } = params
    
    // Generate services from mock data
    const services = mockVisaContinents.flatMap(continent => 
      continent.countries.map(country => ({
        id: `${continent.slug}-${country.slug}`,
        title: `Visa ${country.name}`,
        slug: country.slug,
        continent: continent.name,
        continentSlug: continent.slug,
        country: country.name,
        countrySlug: country.slug,
        description: `Dịch vụ xin visa ${country.name}`,
        price: Math.floor(Math.random() * 5000000) + 1000000,
        duration: '7-15 ngày',
        status: 'active',
        image: country.image,
        features: ['Hỗ trợ 24/7', 'Tỷ lệ thành công cao', 'Thủ tục đơn giản']
      }))
    )
    
    return services.slice(0, limit)
  }

  // Tour categories fallback
  static async getTourCategoriesFallback(): Promise<TourCategory[]> {
    await delay(100)
    return mockTourCategories
  }

  // Visa continents fallback
  static async getVisaContinentsFallback(): Promise<VisaContinent[]> {
    await delay(100)
    return mockVisaContinents
  }

  // Navigation links fallback
  static async getNavigationLinksFallback(): Promise<NavItem[]> {
    await delay(100)
    return navigationLinks
  }

  // Site config fallback
  static async getSiteConfigFallback(): Promise<any> {
    await delay(100)
    return siteConfig
  }

  // Contact info fallback
  static async getContactInfoFallback(): Promise<any> {
    await delay(100)
    return contactInfo
  }

  // Visa detail fallback
  static async getVisaDetailFallback(countrySlug: string): Promise<VisaDetail | undefined> {
    await delay(100)
    
    for (const continent of mockVisaContinents) {
      const country = continent.countries.find(c => c.slug === countrySlug)
      if (country) {
        return {
          id: country.slug,
          title: `Visa ${country.name}`,
          slug: country.slug,
          country: country.name,
          continent: continent.name,
          description: `Thông tin chi tiết về visa ${country.name}`,
          requirements: [
            'Hộ chiếu còn hạn ít nhất 6 tháng',
            'Ảnh 4x6 nền trắng',
            'Giấy chứng minh tài chính',
            'Vé máy bay khứ hồi'
          ],
          documents: [
            'Đơn xin visa',
            'Hộ chiếu bản gốc',
            'Ảnh thẻ',
            'Giấy chứng minh tài chính'
          ],
          process: [
            'Nộp hồ sơ',
            'Phỏng vấn (nếu cần)',
            'Nhận kết quả',
            'Nhận visa'
          ],
          price: Math.floor(Math.random() * 5000000) + 1000000,
          duration: '7-15 ngày',
          status: 'active',
          image: country.image
        }
      }
    }
    
    return undefined
  }
}
