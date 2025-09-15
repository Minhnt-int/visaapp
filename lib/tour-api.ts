// ==================== TOUR API TYPES ====================
export interface TourHighlight {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ItineraryActivity {
  time?: string;
  activity: string;
  description?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: ItineraryActivity[];
  accommodation?: string;
  meals?: string[];
  transportation?: string;
}

export interface TourServices {
  included: ServiceItem[];
  excluded: ServiceItem[];
}

export interface ServiceItem {
  id: string;
  name: string;
  description?: string;
}

export interface TourPolicyItem {
  title: string;
  description: string;
  details: string[];
}

export interface TourDetailData {
  id: string;
  name: string;
  slug: string;
  category: string;
  country: string;
  duration: string;
  price: string;
  originalPrice?: string;
  departure: string[];
  image: string;
  gallery?: string[];
  rating: number;
  reviewCount: number;
  groupSize: {
    min: number;
    max: number;
  };
  highlights: TourHighlight[];
  itinerary: ItineraryDay[];
  services: TourServices;
  terms: {
    registration: string[];
    cancellation: string[];
  };
  whyChooseUs: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
  priceIncludes: string[];
  priceExcludes: string[];
  createdAt: string;
  updatedAt: string;
}

// ==================== MOCK DATA ====================
const mockTourHighlights: TourHighlight[] = [
  {
    id: 'h1',
    title: 'Khám phá cung điện hoàng gia',
    description: 'Tham quan cung điện cổ kính với kiến trúc độc đáo và lịch sử hàng trăm năm'
  },
  {
    id: 'h2', 
    title: 'Trải nghiệm văn hóa bản địa',
    description: 'Thưởng thức ẩm thực truyền thống và tham gia các hoạt động văn hóa đặc sắc'
  },
  {
    id: 'h3',
    title: 'Cảnh quan thiên nhiên tuyệt đẹp',
    description: 'Ngắm nhìn những phong cảnh thiên nhiên hùng vĩ và chụp ảnh tại các điểm check-in nổi tiếng'
  },
  {
    id: 'h4',
    title: 'Shopping tại khu thương mại hiện đại',
    description: 'Mua sắm các sản phẩm thời trang, mỹ phẩm và đặc sản địa phương'
  },
  {
    id: 'h5',
    title: 'Hướng dẫn viên chuyên nghiệp',
    description: 'HDV địa phương kinh nghiệm, thành thạo tiếng Việt và hiểu biết sâu về văn hóa'
  },
  {
    id: 'h6',
    title: 'Khách sạn tiêu chuẩn 4-5 sao',
    description: 'Nghỉ ngơi tại các khách sạn cao cấp với đầy đủ tiện nghi hiện đại'
  }
];

const mockItinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Khởi Hành - Đến Nơi',
    description: 'Khởi hành từ sân bay Tân Sơn Nhất, bay thẳng đến điểm đến. Nhận phòng khách sạn, tự do khám phá thành phố.',
    activities: [
      { time: '06:00', activity: 'Tập trung tại sân bay Tân Sơn Nhất', description: 'Làm thủ tục check-in' },
      { time: '08:30', activity: 'Bay thẳng đến điểm đến', description: 'Chuyến bay khoảng 2-3 tiếng' },
      { time: '12:00', activity: 'Đến nơi, nhận phòng khách sạn' },
      { time: '14:00', activity: 'Ăn trưa tại nhà hàng địa phương' },
      { time: '16:00', activity: 'Tự do khám phá khu phố cổ' },
      { time: '19:00', activity: 'Ăn tối và nghỉ ngơi' }
    ],
    accommodation: 'Khách sạn 4 sao trung tâm thành phố',
    meals: ['Trưa', 'Tối'],
    transportation: 'Máy bay + xe du lịch'
  },
  {
    day: 2,
    title: 'Tham Quan Thành Phố',
    description: 'Tham quan các điểm du lịch nổi tiếng, trải nghiệm văn hóa bản địa và thưởng thức ẩm thực đặc sắc.',
    activities: [
      { time: '07:00', activity: 'Ăn sáng tại khách sạn' },
      { time: '08:30', activity: 'Tham quan cung điện hoàng gia', description: 'Khám phá kiến trúc cổ kính' },
      { time: '10:30', activity: 'Thăm bảo tàng lịch sử', description: 'Tìm hiểu văn hóa truyền thống' },
      { time: '12:00', activity: 'Ăn trưa món ăn đặc sản' },
      { time: '14:00', activity: 'Mua sắm tại khu phố cổ' },
      { time: '16:00', activity: 'Thưởng thức trà chiều truyền thống' },
      { time: '18:00', activity: 'Ăn tối buffet quốc tế' }
    ],
    accommodation: 'Khách sạn 4 sao',
    meals: ['Sáng', 'Trưa', 'Tối'],
    transportation: 'Xe du lịch đời mới'
  },
  {
    day: 3,
    title: 'Khám Phá Thiên Nhiên',
    description: 'Khám phá cảnh quan thiên nhiên tuyệt đẹp, chụp ảnh tại các điểm check-in nổi tiếng.',
    activities: [
      { time: '06:30', activity: 'Ăn sáng và chuẩn bị khởi hành' },
      { time: '08:00', activity: 'Tham quan vườn quốc gia', description: 'Ngắm cảnh thiên nhiên hùng vĩ' },
      { time: '10:00', activity: 'Leo lên điểm cao nhất', description: 'Chụp ảnh panorama toàn cảnh' },
      { time: '12:00', activity: 'Ăn trưa tại resort trong rừng' },
      { time: '14:00', activity: 'Nghỉ ngơi và tắm suối' },
      { time: '16:30', activity: 'Về lại thành phố' },
      { time: '19:00', activity: 'Ăn tối BBQ ngoài trời' }
    ],
    accommodation: 'Khách sạn 4 sao',
    meals: ['Sáng', 'Trưa', 'Tối'],
    transportation: 'Xe du lịch + walking'
  },
  {
    day: 4,
    title: 'Tự Do & Về Nước',
    description: 'Tự do mua sắm, chuẩn bị hành lý và khởi hành về Việt Nam.',
    activities: [
      { time: '08:00', activity: 'Ăn sáng và trả phòng khách sạn' },
      { time: '09:30', activity: 'Tự do mua sắm quà lưu niệm', description: 'Shopping tại trung tâm thương mại' },
      { time: '11:30', activity: 'Ăn trưa món ăn yêu thích' },
      { time: '13:00', activity: 'Chuẩn bị hành lý, ra sân bay' },
      { time: '15:00', activity: 'Làm thủ tục check-in bay về VN' },
      { time: '17:30', activity: 'Bay về Việt Nam' },
      { time: '21:00', activity: 'Đến Tân Sơn Nhất, kết thúc chuyến đi' }
    ],
    meals: ['Sáng', 'Trưa'],
    transportation: 'Xe du lịch + máy bay'
  }
];

const mockServices: ServiceItem[] = [
  // Included services
  { id: 's1', name: 'Vé máy bay khứ hồi', description: 'Hạng phổ thông, hãng hàng không uy tín' },
  { id: 's2', name: 'Khách sạn 4 sao (2 khách/phòng)', description: 'Phòng tiêu chuẩn, đầy đủ tiện nghi' },
  { id: 's3', name: 'Bữa ăn theo chương trình', description: 'Buffet sáng + set menu trưa, tối' },
  { id: 's4', name: 'Xe du lịch đời mới có máy lạnh', description: 'Xe từ 16-45 chỗ tùy số khách' },
  { id: 's5', name: 'Hướng dẫn viên nhiệt tình', description: 'HDV địa phương, thành thạo tiếng Việt' },
  { id: 's6', name: 'Vé tham quan theo chương trình', description: 'Tất cả điểm tham quan trong lịch trình' },
  { id: 's7', name: 'Bảo hiểm du lịch', description: 'Bảo hiểm tai nạn 24/24h' },
  { id: 's8', name: 'Nước uống trên xe', description: '2 chai nước/ngày/khách' },
  
  // Excluded services  
  { id: 's9', name: 'Visa (hỗ trợ làm visa)', description: 'Chi phí làm visa khoảng 1.5-2 triệu' },
  { id: 's10', name: 'Chi phí cá nhân', description: 'Mua sắm, điện thoại, giặt ủi' },
  { id: 's11', name: 'Tiền bo HDV và tài xế', description: 'Khoảng 3-5 USD/ngày/khách' },
  { id: 's12', name: 'Phụ thu phòng đơn', description: 'Thêm 50% giá tour nếu ở phòng đơn' },
  { id: 's13', name: 'Đồ uống có cồn', description: 'Bia, rượu tại nhà hàng' },
  { id: 's14', name: 'Bữa ăn ngoài chương trình', description: 'Ăn vặt, ăn thêm theo sở thích' },
  { id: 's15', name: 'Chi phí phát sinh khác', description: 'Chưa được nêu trong chương trình' }
];

// ==================== API FUNCTIONS ====================

/**
 * Mock function để lấy thông tin chi tiết tour
 */
export async function getTourDetails(category: string, slug: string): Promise<TourDetailData | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

  // Find tour in mock data
  const tourData = mockTourDetails[slug];

  if (tourData) {
    return tourData;
  }

  return null;
}

/**
 * Lấy danh sách tour highlights
 */
export async function getTourHighlights(tourId: string): Promise<TourHighlight[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockTourHighlights.slice(0, 4 + Math.floor(Math.random() * 3));
}

/**
 * Lấy lịch trình tour
 */
export async function getTourItinerary(tourId: string): Promise<ItineraryDay[]> {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockItinerary;
}

/**
 * Lấy danh sách dịch vụ
 */
export async function getTourServices(tourId: string): Promise<ServiceItem[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockServices;
}

// ==================== HELPER FUNCTIONS ====================

function generateTourName(category: string, slug: string): string {
  const names: Record<string, Record<string, string>> = {
    'chau-a': {
      'han-quoc-seoul': 'Du lịch Hàn Quốc - Seoul Romantic',
      'nhat-ban-tokyo': 'Du lịch Nhật Bản - Tokyo Hiện Đại',
      'thai-lan-bangkok': 'Du lịch Thái Lan - Bangkok Sôi Động',
      'singapore': 'Du lịch Singapore - Lion City'
    },
    'chau-au': {
      'phap-paris': 'Du lịch Pháp - Paris Lãng Mạn',
      'duc-berlin': 'Du lịch Đức - Berlin Lịch Sử',
      'y-rome': 'Du lịch Ý - Rome Cổ Kính'
    }
  };
  
  return names[category]?.[slug] || `Du lịch ${category} - ${slug} tuyệt vời`;
}

function generateCountryName(category: string): string {
  const countries = {
    'chau-a': ['Hàn Quốc', 'Nhật Bản', 'Thái Lan', 'Singapore', 'Malaysia'],
    'chau-au': ['Pháp', 'Đức', 'Ý', 'Tây Ban Nha', 'Anh'],
    'chau-my': ['Mỹ', 'Canada', 'Mexico', 'Brazil'],
    'chau-uc': ['Úc', 'New Zealand']
  };
  
  const categoryCountries = countries[category as keyof typeof countries] || ['Quốc gia'];
  return categoryCountries[Math.floor(Math.random() * categoryCountries.length)];
}

function generateDuration(): string {
  const durations = ['4 ngày 3 đêm', '5 ngày 4 đêm', '6 ngày 5 đêm', '7 ngày 6 đêm'];
  return durations[Math.floor(Math.random() * durations.length)];
}

function generatePrice(): string {
  const prices = ['15990000', '18990000', '22990000', '25990000', '29990000'];
  return prices[Math.floor(Math.random() * prices.length)];
}

function generateOriginalPrice(): string {
  const prices = ['19990000', '24990000', '28990000', '32990000', '35990000'];
  return prices[Math.floor(Math.random() * prices.length)];
}

function generateGallery(category: string, slug: string): string[] {
  return Array.from({ length: 6 }, (_, i) => 
    `/images/tours/${category}/${slug}/gallery-${i + 1}.jpg`
  );
}

function generateHighlights(category: string): TourHighlight[] {
  // Randomly select 4-6 highlights
  const shuffled = [...mockTourHighlights].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4 + Math.floor(Math.random() * 3));
}

function generateItinerary(category: string): ItineraryDay[] {
  // Return mock itinerary with possible variations
  return mockItinerary.map(day => ({
    ...day,
    activities: day.activities.map(activity => ({
      ...activity,
      description: activity.description || `Hoạt động thú vị tại ${category}`
    }))
  }));
}

function generateServices(): TourServices {
  return {
    included: mockServices.slice(0, 8),
    excluded: mockServices.slice(8)
  };
}

function generateTerms() {
  return {
    registration: [
      'Passport còn hạn tối thiểu 6 tháng',
      'Hồ sơ xin visa hoàn chỉnh (nếu cần)',
      'Đóng tiền cọc 50% khi đăng ký',
      'Thanh toán đầy đủ trước 7 ngày khởi hành'
    ],
    cancellation: [
      'Trước 30 ngày: hoàn 90% tiền tour',
      'Trước 15 ngày: hoàn 70% tiền tour', 
      'Trước 7 ngày: hoàn 50% tiền tour',
      'Sau 7 ngày: không hoàn tiền'
    ]
  };
}

function generateWhyChooseUs() {
  return [
    {
      id: 'experience',
      title: 'Uy Tín 15+ Năm',
      description: 'Hơn 25,000+ khách hàng tin tường',
      icon: 'shield'
    },
    {
      id: 'service', 
      title: 'Dịch Vụ 5 Sao',
      description: 'Hỗ trợ 24/7, tận tâm chu đáo',
      icon: 'star'
    },
    {
      id: 'quality',
      title: 'Cam Kết Chất Lượng', 
      description: 'Hoàn tiền 100% nếu không hài lòng',
      icon: 'check'
    }
  ];
}

function generatePriceIncludes(): string[] {
  return [
    'Vé máy bay khứ hồi hạng phổ thông',
    'Khách sạn 4 sao tiêu chuẩn (2 khách/phòng)',
    'Bữa ăn theo chương trình tour',
    'Xe du lịch đời mới có máy lạnh',
    'Hướng dẫn viên nhiệt tình, kinh nghiệm',
    'Vé tham quan các điểm theo chương trình',
    'Bảo hiểm du lịch 24/24h',
    'Nước uống miễn phí trên xe'
  ];
}

function generatePriceExcludes(): string[] {
  return [
    'Chi phí làm visa (nếu cần)',
    'Chi phí cá nhân: mua sắm, điện thoại',
    'Tiền bo cho HDV và tài xế',
    'Phụ thu phòng đơn (50% giá tour)',
    'Đồ uống có cồn tại nhà hàng',
    'Bữa ăn ngoài chương trình',
    'Chi phí phát sinh ngoài chương trình'
  ];
}

// ==================== TOUR DETAIL MOCK DATA ====================
const mockTourDetails: Record<string, TourDetailData> = {
  "nhat-ban-tokyo": {
    id: "tour-nhat-ban-tokyo",
    name: "Du lịch Nhật Bản - Tokyo Hiện Đại",
    slug: "nhat-ban-tokyo",
    category: "chau-a",
    country: "Nhật Bản",
    duration: "5 ngày 4 đêm",
    price: "18990000",
    originalPrice: "24990000",
    departure: ["Hồ Chí Minh", "Hà Nội"],
    image: "/images/tours/chau-a/nhat-ban-tokyo/main.jpg",
    gallery: generateGallery("chau-a", "nhat-ban-tokyo"),
    rating: 4.5,
    reviewCount: 120,
    groupSize: {
      min: 10,
      max: 15
    },
    highlights: generateHighlights("chau-a"),
    itinerary: generateItinerary("chau-a"),
    services: generateServices(),
    terms: generateTerms(),
    whyChooseUs: generateWhyChooseUs(),
    priceIncludes: generatePriceIncludes(),
    priceExcludes: generatePriceExcludes(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  
  "han-quoc-seoul": {
    id: "han-quoc-seoul",
    name: "Tour Hàn Quốc: Seoul - Busan - Jeju 6N7Đ",
    slug: "han-quoc-seoul",
    category: "chau-a",
    country: "Hàn Quốc",
    duration: "6 ngày 5 đêm",
    price: "22990000",
    originalPrice: "28990000",
    departure: ["Hồ Chí Minh", "Hà Nội"],
    image: "/images/tours/chau-a/han-quoc-seoul/main.jpg",
    gallery: generateGallery("chau-a", "han-quoc-seoul"),
    rating: 4.7,
    reviewCount: 95,
    groupSize: {
      min: 10,
      max: 15
    },
    highlights: generateHighlights("chau-a"),
    itinerary: generateItinerary("chau-a"),
    services: generateServices(),
    terms: generateTerms(),
    whyChooseUs: generateWhyChooseUs(),
    priceIncludes: generatePriceIncludes(),
    priceExcludes: generatePriceExcludes(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  
  "my-new-york": {
    id: "my-new-york", 
    name: "Tour Mỹ: New York - Washington - Philadelphia 7N6Đ",
    slug: "my-new-york",
    category: "chau-my",
    country: "Hoa Kỳ",
    duration: "7 ngày 6 đêm",
    price: "45000000",
    originalPrice: "52000000", 
    image: "/images/tours/chau-my/my-new-york/main.jpg",
    rating: 4.7,
    reviewCount: 89,
    departure: ["TP.HCM", "Hà Nội"],
    gallery: generateGallery("chau-my", "my-new-york"),
    groupSize: {
      min: 8,
      max: 12,
    },
    highlights: generateHighlights("chau-my"),
    itinerary: generateItinerary("chau-my"),
    services: generateServices(),
    terms: generateTerms(),
    whyChooseUs: generateWhyChooseUs(),
    priceIncludes: generatePriceIncludes(),
    priceExcludes: generatePriceExcludes(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
};
