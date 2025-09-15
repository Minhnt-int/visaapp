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

// ==================== MOCK DATA HELPERS ====================

const dynamicHighlights = {
  "tokyo-fuji-kyoto-6n5d": [
    { id: "h1", title: "Chiêm ngưỡng Núi Phú Sĩ", description: "Biểu tượng hùng vĩ của Nhật Bản, ngắm nhìn vẻ đẹp tuyệt mỹ từ trạm 5." },
    { id: "h2", title: "Khám phá Tokyo hiện đại", description: "Ghé thăm các địa danh nổi tiếng như Tháp Tokyo, Shibuya Crossing và đền Asakusa Kannon." },
    { id: "h3", title: "Trải nghiệm Tàu Shinkansen", description: "Di chuyển với tốc độ cao trên tàu cao tốc hình viên đạn, một trải nghiệm không thể bỏ lỡ." },
    { id: "h4", title: "Lạc bước ở Kyoto cổ kính", description: "Thăm Chùa Vàng Kinkaku-ji, Rừng tre Arashiyama và phố Geisha Gion." },
    { id: "h5", title: "Thưởng thức ẩm thực Nhật Bản", description: "Ăn sushi, sashimi tươi ngon, mì ramen nóng hổi và các món ăn địa phương đặc sắc." },
    { id: "h6", title: "Mua sắm thỏa thích", description: "Tự do mua sắm tại các khu phố sầm uất như Shinjuku (Tokyo) và Shijo (Kyoto)." }
  ]
};

const dynamicItineraries = {
  "tokyo-fuji-kyoto-6n5d": [
    {
      day: 1, title: "TP.HCM/Hà Nội – Tokyo: Chào mừng đến Nhật Bản",
      description: "Quý khách tập trung tại sân bay, làm thủ tục đáp chuyến bay đến Sân bay Narita (NRT), Tokyo. Xe và HDV đón đoàn về khách sạn nhận phòng và nghỉ ngơi.",
      activities: [
        { activity: "Tập trung tại sân bay quốc tế." },
        { activity: "Đáp chuyến bay đêm đến Tokyo." },
        { activity: "Nghỉ đêm trên máy bay." }
      ],
      meals: ["Trên máy bay"]
    },
    {
      day: 2, title: "Khám phá Thủ đô Tokyo",
      description: "Bắt đầu hành trình khám phá thủ đô sôi động của Nhật Bản với các địa danh lịch sử và hiện đại xen kẽ.",
      activities: [
        { activity: "Tham quan Đền Asakusa Kannon (Senso-ji), ngôi đền cổ nhất Tokyo." },
        { activity: "Chụp hình với Tháp truyền hình Tokyo Skytree (không lên tháp)." },
        { activity: "Tham quan và mua sắm tại khu phố điện tử Akihabara." },
        { activity: "Ăn tối và nhận phòng khách sạn tại Tokyo." }
      ],
      meals: ["Sáng", "Trưa", "Tối"]
    },
    {
      day: 3, title: "Núi Phú Sĩ – Hakone",
      description: "Hành trình đến với biểu tượng của đất nước mặt trời mọc - Núi Phú Sĩ. Trải nghiệm khung cảnh thiên nhiên hùng vĩ và không khí trong lành.",
      activities: [
        { activity: "Di chuyển đến khu vực Hakone." },
        { activity: "Tham quan Núi Phú Sĩ (lên đến trạm 5 nếu thời tiết cho phép)." },
        { activity: "Du thuyền trên Hồ Ashi thơ mộng." },
        { activity: "Thưởng thức trứng đen luộc tại thung lũng Owakudani (tùy tình hình)." },
        { activity: "Trải nghiệm tắm Onsen truyền thống tại khách sạn." }
      ],
      meals: ["Sáng", "Trưa", "Tối"]
    },
    {
      day: 4, title: "Di chuyển đến Kyoto – Cố đô ngàn năm",
      description: "Trải nghiệm tàu cao tốc Shinkansen và bắt đầu khám phá cố đô Kyoto với những di sản văn hóa thế giới.",
      activities: [
        { activity: "Trải nghiệm Tàu cao tốc Shinkansen từ Odawara đến Kyoto." },
        { activity: "Tham quan Chùa Vàng Kinkaku-ji lộng lẫy." },
        { activity: "Ghé thăm 'Rừng Kimono' tại ga Arashiyama." },
        { activity: "Ăn tối và nhận phòng khách sạn tại Kyoto." }
      ],
      meals: ["Sáng", "Trưa", "Tối"]
    },
    {
      day: 5, title: "Khám phá Kyoto – Osaka",
      description: "Tiếp tục khám phá Kyoto và di chuyển đến thành phố Osaka năng động, trung tâm ẩm thực của Nhật Bản.",
      activities: [
        { activity: "Tham quan Chùa Thanh Thủy (Kiyomizu-dera) với kiến trúc gỗ độc đáo." },
        { activity: "Dạo bước trên phố cổ Sannenzaka và Ninenzaka." },
        { activity: "Di chuyển đến Osaka, tham quan Lâu đài Osaka (chụp hình bên ngoài)." },
        { activity: "Tự do mua sắm và ăn tối tại khu phố Dotonbori sầm uất." }
      ],
      meals: ["Sáng", "Trưa", "Tối"]
    },
    {
      day: 6, title: "Osaka – Tạm biệt Nhật Bản",
      description: "Quý khách tự do mua sắm đến giờ ra sân bay, làm thủ tục đáp chuyến bay về lại Việt Nam. Kết thúc tốt đẹp chuyến đi.",
      activities: [
        { activity: "Ăn sáng tại khách sạn, làm thủ tục trả phòng." },
        { activity: "Tự do mua sắm tại trung tâm thương mại (nếu thời gian cho phép)." },
        { activity: "Di chuyển ra Sân bay Kansai (KIX)." },
        { activity: "Đáp chuyến bay về lại Việt Nam." }
      ],
      meals: ["Sáng"]
    }
  ]
};

function generateServices(): TourServices {
  return {
    included: [
        { id: "s1", name: "Vé máy bay khứ hồi", description: "Hạng phổ thông, bao gồm 20kg hành lý ký gửi." },
        { id: "s2", name: "Khách sạn 3-4 sao", description: "Tiêu chuẩn 2 người/phòng. Phụ thu phòng đơn nếu có yêu cầu." },
        { id: "s3", name: "Các bữa ăn theo chương trình", description: "Bao gồm các bữa ăn đặc sắc của ẩm thực Nhật Bản." },
        { id: "s4", name: "Xe du lịch đời mới", description: "Di chuyển theo suốt tuyến hành trình tại Nhật Bản." },
        { id: "s5", name: "Vé tàu Shinkansen", description: "1 chặng như trong lịch trình." },
        { id: "s6", name: "Hướng dẫn viên tiếng Việt", description: "Nhiệt tình, kinh nghiệm theo suốt tuyến." },
        { id: "s7", name: "Vé tham quan một lần", description: "Tại tất cả các điểm trong chương trình." },
        { id: "s8", name: "Bảo hiểm du lịch quốc tế", description: "Mức bồi thường tối đa 1.000.000.000 VNĐ/vụ." }
    ],
    excluded: [
        { id: "s9", name: "Phí làm hộ chiếu.", description: "Hộ chiếu phải còn hạn trên 6 tháng." },
        { id: "s10", name: "Phí visa Nhật Bản", description: "Chi phí dịch thuật, công chứng và phí visa (nếu có)." },
        { id: "s11", name: "Tiền bồi dưỡng (tip)", description: "Cho hướng dẫn viên và tài xế địa phương (thông lệ ~7 USD/khách/ngày)." },
        { id: "s12", name: "Chi phí cá nhân", description: "Giặt ủi, điện thoại, ăn uống ngoài chương trình." },
        { id: "s13", name: "Phụ thu phòng đơn", description: "Nếu quý khách có nhu cầu ngủ riêng một phòng." }
    ]
  };
}

function generateTerms() {
  return {
    registration: [
      "Đặt cọc 50% giá trị tour ngay khi đăng ký.",
      "Thanh toán toàn bộ số tiền còn lại trước ngày khởi hành 15 ngày.",
      "Nộp đầy đủ hồ sơ xin visa (nếu cần) theo yêu cầu của đại sứ quán.",
      "Visa5s không chịu trách nhiệm nếu quý khách bị từ chối cấp visa."
    ],
    cancellation: [
      "Hủy sau khi đăng ký: mất 50% tiền cọc.",
      "Hủy trước ngày khởi hành 20-30 ngày: 50% giá trị tour.", 
      "Hủy trước ngày khởi hành 10-19 ngày: 75% giá trị tour.",
      "Hủy trong vòng 10 ngày trước khởi hành: 100% giá trị tour."
    ]
  };
}

function generateWhyChooseUs() {
  return [
    {
      id: 'experience',
      title: 'Uy Tín & Kinh Nghiệm',
      description: 'Chuyên gia tour Nhật với hơn 10 năm kinh nghiệm tổ chức.',
      icon: 'shield'
    },
    {
      id: 'service', 
      title: 'Dịch Vụ Chất Lượng Cao',
      description: 'Lịch trình tối ưu, khách sạn và nhà hàng chọn lọc kỹ lưỡng.',
      icon: 'star'
    },
    {
      id: 'quality',
      title: 'Cam Kết Tỷ Lệ Visa', 
      description: 'Hỗ trợ tư vấn hồ sơ chuyên nghiệp, tăng tỷ lệ đậu visa.',
      icon: 'check'
    }
  ];
}

// ==================== TOUR DETAIL MOCK DATA ====================
const mockTourDetails: Record<string, TourDetailData> = {
  "tokyo-fuji-kyoto-6n5d": {
    id: "tour-jp-tfk-6n5d",
    name: "Hành Trình Vàng: Tokyo - Fuji - Kyoto",
    slug: "tokyo-fuji-kyoto-6n5d",
    category: "chau-a",
    country: "Nhật Bản",
    duration: "6 ngày 5 đêm",
    price: "29990000",
    originalPrice: "32000000",
    departure: ["Hà Nội", "Đà Nẵng"],
    image: "/images/tours/nhat-ban-1.jpg",
    gallery: [
      "/images/tours/nhat-ban-gallery-1.jpg",
      "/images/tours/nhat-ban-gallery-2.jpg",
      "/images/tours/nhat-ban-gallery-3.jpg",
      "/images/tours/nhat-ban-gallery-4.jpg",
      "/images/tours/nhat-ban-gallery-5.jpg",
      "/images/tours/nhat-ban-gallery-6.jpg"
    ],
    rating: 4.8,
    reviewCount: 215,
    groupSize: { min: 15, max: 25 },
    highlights: dynamicHighlights["tokyo-fuji-kyoto-6n5d"],
    itinerary: dynamicItineraries["tokyo-fuji-kyoto-6n5d"],
    services: generateServices(),
    terms: generateTerms(),
    whyChooseUs: generateWhyChooseUs(),
    priceIncludes: [], // Sẽ được điền bởi services.included
    priceExcludes: [], // Sẽ được điền bởi services.excluded
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
    gallery: [],
    rating: 4.7,
    reviewCount: 95,
    groupSize: { min: 10, max: 15 },
    highlights: [],
    itinerary: [],
    services: generateServices(),
    terms: generateTerms(),
    whyChooseUs: generateWhyChooseUs(),
    priceIncludes: [],
    priceExcludes: [],
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
    gallery: [],
    groupSize: { min: 8, max: 12 },
    highlights: [],
    itinerary: [],
    services: generateServices(),
    terms: generateTerms(),
    whyChooseUs: generateWhyChooseUs(),
    priceIncludes: [],
    priceExcludes: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
};

// ==================== API FUNCTIONS ====================

/**
 * Mock function để lấy thông tin chi tiết tour
 */
export async function getTourDetails(category: string, slug: string): Promise<TourDetailData | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Find tour in mock data
  const tourData = mockTourDetails[slug];

  if (tourData) {
    return tourData;
  }

  return null;
}

// Các hàm khác không thay đổi...

/**
 * Lấy danh sách tour highlights
 */
export async function getTourHighlights(tourId: string): Promise<TourHighlight[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [];
}

/**
 * Lấy lịch trình tour
 */
export async function getTourItinerary(tourId: string): Promise<ItineraryDay[]> {
  await new Promise(resolve => setTimeout(resolve, 400));
  return [];
}

/**
 * Lấy danh sách dịch vụ
 */
export async function getTourServices(tourId: string): Promise<ServiceItem[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return [];
}