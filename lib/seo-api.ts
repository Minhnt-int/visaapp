/**
 * API Mock cho SEO Meta Data
 * Simulate calls để lấy meta data cho từng trang
 */

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    image: string;
    url: string;
    type: string;
    siteName: string;
  };
  twitter: {
    card: string;
    site: string;
    title: string;
    description: string;
    image: string;
  };
  canonical: string;
  robots: string;
  alternates?: {
    canonical: string;
    languages?: Record<string, string>;
  };
  schema?: any; // Schema.org structured data
}

export interface PageSEOParams {
  type: 'home' | 'visa-detail' | 'visa-category' | 'tour-detail' | 'tour-category' | 'news' | 'news-detail' | 'service';
  slug?: string;
  category?: string;
  country?: string;
}

/**
 * Mock SEO data cho các trang chính
 */
const mockSEOData: Record<string, SEOData> = {
  'home': {
    title: 'Kim Quy Travel - Dịch Vụ Visa & Tour Du Lịch Uy Tín | Tỷ Lệ Đậu 99%',
    description: 'Dịch vụ làm visa và tour du lịch chuyên nghiệp. 15+ năm kinh nghiệm, tỷ lệ đậu visa 99%, hỗ trợ 24/7. Visa Mỹ, Hàn Quốc, Nhật Bản, Châu Âu. Liên hệ 0911.909.686',
    keywords: [
      'làm visa', 'dịch vụ visa', 'tour du lịch', 'visa Mỹ', 'visa Hàn Quốc', 
      'visa Nhật Bản', 'visa châu Âu', 'Kim Quy Travel', 'làm visa uy tín', 
      'tỷ lệ đậu visa cao', 'tour nước ngoài', 'du lịch quốc tế'
    ],
    openGraph: {
      title: 'Kim Quy Travel - Dịch Vụ Visa & Tour Du Lịch Uy Tín #1 Việt Nam',
      description: 'Chuyên dịch vụ làm visa và tour du lịch quốc tế. Tỷ lệ đậu visa 99%, 15+ năm kinh nghiệm, 25,000+ khách hàng tin tưởng.',
      image: '/images/seo/Kim Quy Travel-og-home.jpg',
      url: 'https://kimquytravel.vn.vn',
      type: 'website',
      siteName: 'Kim Quy Travel'
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Kim Quy Travel_vn',
      title: 'Kim Quy Travel - Dịch Vụ Visa & Tour Du Lịch Uy Tín',
      description: 'Làm visa nhanh chóng, tỷ lệ đậu 99%. Tour du lịch chất lượng cao.',
      image: '/images/seo/Kim Quy Travel-twitter-home.jpg'
    },
    canonical: 'https://kimquytravel.vn.vn',
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    schema: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Kim Quy Travel - Asia Blue Sky",
      "url": "https://kimquytravel.vn.vn",
      "logo": "https://kimquytravel.vn.vn/images/logo.png",
      "description": "Công ty chuyên cung cấp dịch vụ làm visa và tour du lịch quốc tế",
      "telephone": "+84911909686",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "370 Đường 3/2, P.12, Q.10",
        "addressLocality": "TP. Hồ Chí Minh",
        "addressCountry": "VN"
      },
      "sameAs": [
        "https://www.facebook.com/Kim Quy Travel",
        "https://zalo.me/0911909686"
      ]
    }
  },

  // Visa Hàn Quốc Detail Page
  'visa-han-quoc': {
    title: 'Làm Visa Hàn Quốc 2024 | Tỷ Lệ Đậu 98% | Phí Dịch Vụ 1.2 Triệu | Kim Quy Travel',
    description: 'Dịch vụ làm visa Hàn Quốc chuyên nghiệp, tỷ lệ đậu 98%, thời gian 5-7 ngày làm việc. Hỗ trợ visa du lịch, công tác, thăm thân. Phí dịch vụ chỉ 1.2 triệu. Hotline 0911.909.686',
    keywords: [
      'làm visa Hàn Quốc', 'visa du lịch Hàn Quốc', 'visa công tác Hàn Quốc',
      'phí làm visa Hàn Quốc', 'thủ tục visa Hàn Quốc', 'hồ sơ visa Hàn Quốc',
      'visa Hàn Quốc 2024', 'làm visa Hàn nhanh', 'visa Hàn giá rẻ'
    ],
    openGraph: {
      title: 'Làm Visa Hàn Quốc Nhanh Chóng | Tỷ Lệ Đậu 98% | Kim Quy Travel',
      description: 'Chuyên làm visa Hàn Quốc với tỷ lệ thành công 98%. Hỗ trợ toàn bộ thủ tục, thời gian xử lý 5-7 ngày. Phí dịch vụ cạnh tranh.',
      image: '/images/seo/visa-han-quoc-og.jpg',
      url: 'https://kimquytravel.vn.vn/dich-vu/visa-chau-a/han-quoc',
      type: 'article',
      siteName: 'Kim Quy Travel'
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Kim Quy Travel_vn',
      title: 'Làm Visa Hàn Quốc - Tỷ Lệ Đậu 98%',
      description: 'Dịch vụ visa Hàn Quốc chuyên nghiệp, nhanh chóng, uy tín',
      image: '/images/seo/visa-han-quoc-twitter.jpg'
    },
    canonical: 'https://kimquytravel.vn.vn/dich-vu/visa-chau-a/han-quoc',
    robots: 'index, follow',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Dịch vụ làm Visa Hàn Quốc",
      "description": "Làm visa Hàn Quốc với tỷ lệ đậu 98%, thời gian xử lý 5-7 ngày",
      "provider": {
        "@type": "Organization",
        "name": "Kim Quy Travel"
      },
      "offers": {
        "@type": "Offer",
        "price": "1200000",
        "priceCurrency": "VND",
        "availability": "https://schema.org/InStock"
      }
    }
  },

  // Tour Nhật Bản Detail Page
  'tour-nhat-ban-tokyo': {
    title: 'Tour Nhật Bản Tokyo - Osaka 6N5Đ | Giá 28.9 Triệu | Khởi Hành Hàng Tuần',
    description: 'Tour Nhật Bản 6N5Đ khám phá Tokyo - Osaka. Tham quan Phú Sĩ, Kyoto, Nara. Khách sạn 4*, buffet sáng, HDV Việt Nam. Giá 28.9 triệu, khởi hành hàng tuần từ TP.HCM',
    keywords: [
      'tour Nhật Bản', 'du lịch Nhật Bản', 'tour Tokyo Osaka', 
      'tour Nhật Bản giá rẻ', 'tour Nhật Bản 2024', 'du lịch Tokyo',
      'tour phú sĩ', 'tour Kyoto', 'tour Nara', 'tour Nhật 6 ngày'
    ],
    openGraph: {
      title: 'Tour Nhật Bản Tokyo - Osaka 6N5Đ | Phú Sĩ - Kyoto - Nara',
      description: 'Khám phá xứ sở hoa anh đào với tour Nhật Bản 6N5Đ. Tham quan Tokyo hiện đại, Osaka sầm uất, núi Phú Sĩ hùng vĩ. Khởi hành hàng tuần.',
      image: '/images/seo/tour-nhat-ban-og.jpg',
      url: 'https://kimquytravel.vn.vn/tour-du-lich/chau-a/nhat-ban-tokyo',
      type: 'website',
      siteName: 'Kim Quy Travel'
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Kim Quy Travel_vn',
      title: 'Tour Nhật Bản Tokyo - Osaka 6N5Đ',
      description: 'Khám phá xứ sở hoa anh đào với giá ưu đãi',
      image: '/images/seo/tour-nhat-ban-twitter.jpg'
    },
    canonical: 'https://kimquytravel.vn.vn/tour-du-lich/chau-a/nhat-ban-tokyo',
    robots: 'index, follow',
    schema: {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": "Tour Nhật Bản Tokyo - Osaka 6N5Đ",
      "description": "Tour khám phá Tokyo, Osaka, Phú Sĩ, Kyoto với 6 ngày 5 đêm",
      "offers": {
        "@type": "Offer",
        "price": "28900000",
        "priceCurrency": "VND",
        "availability": "https://schema.org/InStock"
      },
      "touristType": "international",
      "duration": "P6D"
    }
  }
};

/**
 * Simulate API call để lấy SEO data
 * @param params - Parameters để identify page cần lấy SEO
 * @returns Promise<SEOData>
 */
export async function getSEOData(params: PageSEOParams): Promise<SEOData> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  try {
    console.log('🔍 Fetching SEO data for:', params);
    
    let seoKey = '';
    
    // Generate SEO key based on page type
    switch (params.type) {
      case 'home':
        seoKey = 'home';
        break;
      case 'visa-detail':
        seoKey = `visa-${params.country}`;
        break;
      case 'tour-detail':
        seoKey = `tour-${params.slug}`;
        break;
      case 'visa-category':
        seoKey = `visa-category-${params.category}`;
        break;
      case 'tour-category':
        seoKey = `tour-category-${params.category}`;
        break;
      default:
        seoKey = 'home';
    }
    
    // Get specific SEO data or generate dynamic one
    const seoData = mockSEOData[seoKey] || await generateDynamicSEO(params);
    
    console.log('✅ SEO data fetched successfully');
    return seoData;
    
  } catch (error) {
    console.error('❌ Error fetching SEO data:', error);
    
    // Fallback SEO data
    return {
      title: 'Kim Quy Travel - Dịch Vụ Visa & Tour Du Lịch',
      description: 'Dịch vụ làm visa và tour du lịch chuyên nghiệp tại Kim Quy Travel',
      keywords: ['visa', 'tour du lịch', 'Kim Quy Travel'],
      openGraph: {
        title: 'Kim Quy Travel - Dịch Vụ Visa & Tour Du Lịch',
        description: 'Dịch vụ làm visa và tour du lịch chuyên nghiệp',
        image: '/images/seo/default-og.jpg',
        url: 'https://kimquytravel.vn.vn',
        type: 'website',
        siteName: 'Kim Quy Travel'
      },
      twitter: {
        card: 'summary_large_image',
        site: '@Kim Quy Travel_vn',
        title: 'Kim Quy Travel',
        description: 'Dịch vụ visa và tour du lịch',
        image: '/images/seo/default-twitter.jpg'
      },
      canonical: 'https://kimquytravel.vn.vn',
      robots: 'index, follow'
    };
  }
}

/**
 * Generate dynamic SEO data cho các trang không có trong mock data
 */
async function generateDynamicSEO(params: PageSEOParams): Promise<SEOData> {
  const baseUrl = 'https://kimquytravel.vn.vn';
  
  switch (params.type) {
    case 'visa-detail':
      return {
        title: `Làm Visa ${params.country} | Tỷ Lệ Đậu Cao | Kim Quy Travel`,
        description: `Dịch vụ làm visa ${params.country} chuyên nghiệp, tỷ lệ đậu cao, thời gian nhanh chóng. Hỗ trợ 24/7.`,
        keywords: [`làm visa ${params.country}`, `visa ${params.country}`, 'dịch vụ visa'],
        openGraph: {
          title: `Làm Visa ${params.country} Chuyên Nghiệp | Kim Quy Travel`,
          description: `Dịch vụ visa ${params.country} uy tín, tỷ lệ thành công cao`,
          image: `/images/seo/visa-${params.country?.toLowerCase()}-og.jpg`,
          url: `${baseUrl}/dich-vu/${params.category}/${params.country}`,
          type: 'article',
          siteName: 'Kim Quy Travel'
        },
        twitter: {
          card: 'summary_large_image',
          site: '@Kim Quy Travel_vn',
          title: `Visa ${params.country} | Kim Quy Travel`,
          description: `Làm visa ${params.country} nhanh chóng`,
          image: `/images/seo/visa-${params.country?.toLowerCase()}-twitter.jpg`
        },
        canonical: `${baseUrl}/dich-vu/${params.category}/${params.country}`,
        robots: 'index, follow'
      };
      
    case 'tour-detail':
      return {
        title: `Tour ${params.slug} | Du Lịch Chất Lượng | Kim Quy Travel`,
        description: `Tour ${params.slug} với chất lượng cao, giá cả hợp lý. Khởi hành hàng tuần từ TP.HCM và Hà Nội.`,
        keywords: [`tour ${params.slug}`, `du lịch ${params.slug}`, 'tour chất lượng'],
        openGraph: {
          title: `Tour ${params.slug} | Du Lịch Chất Lượng`,
          description: `Khám phá ${params.slug} với tour chất lượng cao`,
          image: `/images/seo/tour-${params.slug}-og.jpg`,
          url: `${baseUrl}/tour-du-lich/${params.category}/${params.slug}`,
          type: 'website',
          siteName: 'Kim Quy Travel'
        },
        twitter: {
          card: 'summary_large_image',
          site: '@Kim Quy Travel_vn',
          title: `Tour ${params.slug}`,
          description: `Du lịch ${params.slug} chất lượng cao`,
          image: `/images/seo/tour-${params.slug}-twitter.jpg`
        },
        canonical: `${baseUrl}/tour-du-lich/${params.category}/${params.slug}`,
        robots: 'index, follow'
      };
      
    default:
      return mockSEOData['home'];
  }
}

/**
 * Get breadcrumb data for SEO
 */
export async function getBreadcrumbData(params: PageSEOParams): Promise<any> {
  const baseUrl = 'https://kimquytravel.vn.vn';
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Trang chủ",
        "item": baseUrl
      }
    ]
  };
  
  if (params.type === 'visa-detail') {
    breadcrumbSchema.itemListElement.push(
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Dịch vụ Visa",
        "item": `${baseUrl}/dich-vu`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `Visa ${params.country}`,
        "item": `${baseUrl}/dich-vu/${params.category}/${params.country}`
      }
    );
  }
  
  return breadcrumbSchema;
}

/**
 * Generate sitemap data (for future use)
 */
export async function getSitemapData(): Promise<any[]> {
  // This would fetch all pages for sitemap generation
  return [
    { url: 'https://kimquytravel.vn.vn', lastModified: new Date() },
    // ... more URLs
  ];
}