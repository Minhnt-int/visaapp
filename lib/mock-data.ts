
import {
    ContactInfo,
    NavItem,
    News,
    NewsPreview,
    RelatedArticle,
    Testimonial,
    Tour,
    TourCategory,
    VisaContinent,
    VisaDetail} from '@/types';
import { Award, FileText, MessageSquare, UserCheck } from 'lucide-react';

export function getCountriesByContinent() {
  const map: Record<string, { slug: string; name: string }[]> = {};
  for (const [slug, detail] of Object.entries(mockVisaPageData)) {
    if (!map[detail.continentSlug]) map[detail.continentSlug] = [];
    map[detail.continentSlug].push({ slug, name: detail.title.replace("Dịch Vụ Xin Visa ", "") });
  }
  return map;
}

// =========================================================================
// SITE CONFIGURATION
// =========================================================================

export const siteConfig = {
  name: "VISA5S",
  description: "Dịch vụ làm visa chuyên nghiệp, nhanh chóng và tin cậy. VISA5S cung cấp các giải pháp toàn diện cho visa du lịch, công tác, và thăm thân với tỷ lệ thành công cao.",
  url: "https://visa5s.com", // Replace with your actual domain
  ogImage: "https://visa5s.com/og-image.jpg", // Replace with your actual OG image URL
};

export const contactInfo : ContactInfo = {
  address: "Tầng 5, toà nhà APTEK, 77-79-81 Nguyễn Văn Linh, phường Nam Dương, quận Hải Châu, TP. Đà Nẵng",
  phone: "0911.909.686",
  email: "info@visa5s.com",
  website: "www.visa5s.com",
  facebook: "https://facebook.com/visa5s",
  zalo: "https://zalo.me/0911909686",
};

export const navigationLinks: NavItem[] = [
    { label: "Trang Chủ", href: "/" },
    { label: "Về Chúng Tôi", href: "/ve-chung-toi" },
    { 
        label: "Dịch Vụ Visa", 
        href: "/dich-vu",
        children: [
            { label: "Visa Châu Á", href: "/dich-vu/visa-chau-a" },
            { label: "Visa Châu Âu", href: "/dich-vu/visa-chau-au" },
            { label: "Visa Châu Mỹ", href: "/dich-vu/visa-chau-my" },
            { label: "Visa Châu Úc", href: "/dich-vu/visa-chau-uc" },
        ]
    },
    { label: "Tour Du Lịch", href: "/tour-du-lich" },
    { label: "Tin Tức", href: "/tin-tuc" },
    { label: "Liên Hệ", href: "/lien-he" },
];

export const mockTours: Tour[] = [
    {
      id: "da-nang-hoi-an-hue-4n3d",
      slug: "da-nang-hoi-an-hue-4n3d",
      name: "Tour Đà Nẵng - Hội An - Huế 4N3D",
      categorySlug: "tour-trong-nuoc",
      country: "Việt Nam",
      duration: "4 ngày 3 đêm",
      price: 5500000,
      originalPrice: 6500000,
      departure: ["Hà Nội", "TP. Hồ Chí Minh"],
      image: "https://images.unsplash.com/photo-1561053591-62d8c3b035f6?q=80&w=2070&auto=format&fit=crop",
      gallery: [],
      rating: 4.8,
      reviewCount: 120,
      isHot: true,
      groupSize: { min: 10, max: 25 },
      highlights: [
        { id: "hl1", title: "Bà Nà Hills", description: "Khám phá Cầu Vàng nổi tiếng thế giới và Làng Pháp cổ kính." },
        { id: "hl2", title: "Phố cổ Hội An", description: "Dạo bước trong khu phố đèn lồng lung linh về đêm." }
      ],
      itinerary: [
        { day: "1", title: "Đà Nẵng - Ngũ Hành Sơn", description: "Khởi hành tour.", activities: [{ activity: "Tham quan Ngũ Hành Sơn" }] }
      ],
      services: {
        included: [{ id: "inc1", name: "Xe đưa đón" }],
        excluded: [{ id: "exc1", name: "Chi phí cá nhân" }]
      },
      terms: {
        registration: ["Đặt cọc 50% khi đăng ký."],
        cancellation: ["Hủy tour trước 7 ngày, phí 30%."]
      },
      whyChooseUs: [
        { id: "wcu1", title: "Lịch trình đa dạng", description: "Thiết kế độc đáo, điểm đến hấp dẫn.", icon: "star" }
      ]
    },
    // ------------------------- Dữ liệu Mẫu Bổ sung -------------------------
    {
      id: "phu-quoc-nghi-duong-3n2d",
      slug: "phu-quoc-nghi-duong-3n2d",
      name: "Tour Phú Quốc Nghỉ Dưỡng 3N2D",
      categorySlug: "tour-trong-nuoc",
      country: "Việt Nam",
      duration: "3 ngày 2 đêm",
      price: 4200000,
      originalPrice: 5000000,
      departure: ["TP. Hồ Chí Minh"],
      image: "https://images.unsplash.com/photo-1574515513567-c052ed4c62c9?q=80&w=2070&auto=format&fit=crop",
      gallery: [],
      rating: 4.9,
      reviewCount: 250,
      isHot: true,
      groupSize: { min: 8, max: 20 },
      highlights: [
        { id: "hl3", title: "Bãi Sao", description: "Tắm biển và nghỉ dưỡng tại bãi biển đẹp nhất Phú Quốc." },
        { id: "hl4", title: "Cáp treo Hòn Thơm", description: "Trải nghiệm cáp treo vượt biển dài nhất thế giới." }
      ],
      itinerary: [
        { day: "1", title: "Phú Quốc - Check-in", description: "Đến Phú Quốc, nhận phòng, tự do tham quan.", activities: [{ activity: "Tham quan Chợ đêm" }] }
      ],
      services: {
        included: [{ id: "inc2", name: "Vé máy bay khứ hồi" }],
        excluded: [{ id: "exc2", name: "Vé vui chơi" }]
      },
      terms: {
        registration: ["Đặt cọc 40%."],
        cancellation: ["Hủy tour trước 10 ngày, phí 25%."]
      },
      whyChooseUs: [
        { id: "wcu2", title: "Resort 5 sao", description: "Trải nghiệm dịch vụ nghỉ dưỡng cao cấp.", icon: "sun" }
      ]
    },
    {
      id: "ha-giang-mua-hoa-tam-giac-mach-3n2d",
      slug: "ha-giang-mua-hoa-tam-giac-mach-3n2d",
      name: "Tour Hà Giang Mùa Hoa Tam Giác Mạch 3N2D",
      categorySlug: "tour-trong-nuoc",
      country: "Việt Nam",
      duration: "3 ngày 2 đêm",
      price: 3800000,
      originalPrice: 4500000,
      departure: ["Hà Nội"],
      image: "https://images.unsplash.com/photo-1594916895315-927d3c53c4c9?q=80&w=2070&auto=format&fit=crop",
      gallery: [],
      rating: 4.7,
      reviewCount: 85,
      isHot: true,
      groupSize: { min: 15, max: 30 },
      highlights: [
        { id: "hl5", title: "Đèo Mã Pí Lèng", description: "Ngắm nhìn một trong tứ đại đỉnh đèo của Việt Nam." },
        { id: "hl6", title: "Cột cờ Lũng Cú", description: "Điểm cực Bắc thiêng liêng của Tổ quốc." }
      ],
      itinerary: [
        { day: "1", title: "Hà Nội - Hà Giang", description: "Di chuyển lên Hà Giang, nhận phòng khách sạn.", activities: [{ activity: "Tham quan Cổng Trời Quản Bạ" }] }
      ],
      services: {
        included: [{ id: "inc3", name: "Ăn 6 bữa chính" }],
        excluded: [{ id: "exc3", name: "Tiền tip HDV" }]
      },
      terms: {
        registration: ["Đặt cọc 30%."],
        cancellation: ["Hủy tour trước 5 ngày, phí 50%."]
      },
      whyChooseUs: [
        { id: "wcu3", title: "Hướng dẫn viên địa phương", description: "Am hiểu văn hóa và phong tục tập quán.", icon: "map" }
      ]
    },
    {
      id: "campuchia-siam-reap-4n3d",
      slug: "campuchia-siam-reap-4n3d",
      name: "Khám phá Di sản Angkor Wat 4N3D",
      categorySlug: "tour-quoc-te",
      country: "Campuchia",
      duration: "4 ngày 3 đêm",
      price: 9800000,
      originalPrice: 11000000,
      departure: ["TP. Hồ Chí Minh"],
      image: "https://images.unsplash.com/photo-1596707372422-901b0b540192?q=80&w=2070&auto=format&fit=crop",
      gallery: [],
      rating: 4.6,
      reviewCount: 65,
      isHot: false,
      groupSize: { min: 12, max: 28 },
      highlights: [
        { id: "hl7", title: "Angkor Wat", description: "Chiêm ngưỡng kiến trúc đền thờ vĩ đại nhất thế giới." },
        { id: "hl8", title: "Bayon", description: "Khám phá đền Bayon với 216 khuôn mặt cười bí ẩn." }
      ],
      itinerary: [
        { day: "1", title: "TPHCM - Siem Reap", description: "Bay đến Siem Reap, tham quan đền Preah Khan.", activities: [{ activity: "Tham quan Preah Khan" }] }
      ],
      services: {
        included: [{ id: "inc4", name: "Visa nhập cảnh" }],
        excluded: [{ id: "exc4", name: "Bảo hiểm" }]
      },
      terms: {
        registration: ["Đặt cọc 60% khi đăng ký."],
        cancellation: ["Hủy tour trước 15 ngày, phí 40%."]
      },
      whyChooseUs: [
        { id: "wcu4", title: "Lịch trình sâu sắc", description: "Tập trung vào giá trị lịch sử và văn hóa.", icon: "book" }
      ]
    },
    {
      id: "thai-lan-bangkok-pattaya-5n4d",
      slug: "thai-lan-bangkok-pattaya-5n4d",
      name: "Tour Thái Lan: Bangkok - Pattaya 5N4D",
      categorySlug: "tour-quoc-te",
      country: "Thái Lan",
      duration: "5 ngày 4 đêm",
      price: 7990000,
      originalPrice: 9500000,
      departure: ["Hà Nội", "TP. Hồ Chí Minh"],
      image: "https://images.unsplash.com/photo-1549410141-f7617b07548b?q=80&w=2070&auto=format&fit=crop",
      gallery: [],
      rating: 4.7,
      reviewCount: 310,
      isHot: true,
      groupSize: { min: 20, max: 40 },
      highlights: [
        { id: "hl9", title: "Chùa Vàng", description: "Chiêm bái tượng Phật Vàng lớn nhất thế giới." },
        { id: "hl10", title: "Đảo Coral", description: "Tắm biển và lặn ngắm san hô tại hòn đảo nổi tiếng." }
      ],
      itinerary: [
        { day: "1", title: "Hà Nội/TPHCM - Bangkok", description: "Bay đến Bangkok, di chuyển về Pattaya.", activities: [{ activity: "Ăn tối buffet quốc tế" }] }
      ],
      services: {
        included: [{ id: "inc5", name: "Khách sạn 4 sao" }],
        excluded: [{ id: "exc5", name: "Visa (nếu có)" }]
      },
      terms: {
        registration: ["Đặt cọc 50%."],
        cancellation: ["Hủy tour trước 10 ngày, phí 30%."]
      },
      whyChooseUs: [
        { id: "wcu5", title: "Shopping thả ga", description: "Thỏa sức mua sắm tại các trung tâm thương mại lớn.", icon: "tag" }
      ]
    },
    {
      id: "nha-trang-doc-dao-3n2d",
      slug: "nha-trang-doc-dao-3n2d",
      name: "Tour Nha Trang Độc Đáo 3N2D",
      categorySlug: "tour-trong-nuoc",
      country: "Việt Nam",
      duration: "3 ngày 2 đêm",
      price: 3650000,
      originalPrice: 4300000,
      departure: ["Hà Nội", "TP. Hồ Chí Minh"],
      image: "https://images.unsplash.com/photo-1620023058814-1e0818d795b5?q=80&w=2070&auto=format&fit=crop",
      gallery: [],
      rating: 4.6,
      reviewCount: 190,
      isHot: true,
      groupSize: { min: 10, max: 25 },
      highlights: [
        { id: "hl11", title: "Vinpearl Land", description: "Tham gia các trò chơi cảm giác mạnh và giải trí." },
        { id: "hl12", title: "Tháp Bà Ponagar", description: "Khám phá kiến trúc Chăm cổ kính." }
      ],
      itinerary: [
        { day: "1", title: "Nha Trang - Biển đảo", description: "Khởi hành tham quan các đảo.", activities: [{ activity: "Lặn biển ngắm san hô" }] }
      ],
      services: {
        included: [{ id: "inc6", name: "Tàu tham quan đảo" }],
        excluded: [{ id: "exc6", name: "Thuê dụng cụ lặn" }]
      },
      terms: {
        registration: ["Đặt cọc 30%."],
        cancellation: ["Hủy tour trước 7 ngày, phí 40%."]
      },
      whyChooseUs: [
        { id: "wcu6", title: "Chủ đề Biển Đảo", description: "Tập trung vào trải nghiệm dưới nước và bãi biển.", icon: "anchor" }
      ]
    },
    {
      id: "singapore-malaysia-5n4d",
      slug: "singapore-malaysia-5n4d",
      name: "Tour Singapore - Malaysia (Liên tuyến) 5N4D",
      categorySlug: "tour-quoc-te",
      country: "Singapore, Malaysia",
      duration: "5 ngày 4 đêm",
      price: 13500000,
      originalPrice: 15500000,
      departure: ["TP. Hồ Chí Minh"],
      image: "https://images.unsplash.com/photo-1582239634220-3b2d131f6e21?q=80&w=2070&auto=format&fit=crop",
      gallery: [],
      rating: 4.8,
      reviewCount: 150,
      isHot: true,
      groupSize: { min: 15, max: 35 },
      highlights: [
        { id: "hl13", title: "Gardens by the Bay", description: "Chiêm ngưỡng 'Siêu cây' và nhà kính độc đáo." },
        { id: "hl14", title: "Tháp Đôi Petronas", description: "Check-in biểu tượng kiến trúc của Kuala Lumpur." }
      ],
      itinerary: [
        { day: "1", title: "Singapore - Công viên Sư Tử Biển", description: "Đến Singapore, tham quan công viên Merlion.", activities: [{ activity: "Thăm quan Đảo Sentosa" }] }
      ],
      services: {
        included: [{ id: "inc7", name: "Bảo hiểm du lịch" }],
        excluded: [{ id: "exc7", name: "Phụ phí phòng đơn" }]
      },
      terms: {
        registration: ["Đặt cọc 70% khi đăng ký."],
        cancellation: ["Hủy tour trước 20 ngày, phí 30%."]
      },
      whyChooseUs: [
        { id: "wcu7", title: "Tour liên tuyến", description: "Khám phá hai quốc gia Đông Nam Á chỉ trong một chuyến đi.", icon: "link" }
      ]
    },
    {
      id: "mien-tay-song-nuoc-3n2d",
      slug: "mien-tay-song-nuoc-3n2d",
      name: "Tour Miền Tây Sông Nước 3N2D",
      categorySlug: "tour-trong-nuoc",
      country: "Việt Nam",
      duration: "3 ngày 2 đêm",
      price: 2990000,
      originalPrice: 3500000,
      departure: ["TP. Hồ Chí Minh"],
      image: "https://images.unsplash.com/photo-1558239011-85f269a9dbd4?q=80&w=2070&auto=format&fit=crop",
      gallery: [],
      rating: 4.5,
      reviewCount: 95,
      isHot: false,
      groupSize: { min: 20, max: 40 },
      highlights: [
        { id: "hl15", title: "Chợ nổi Cái Răng", description: "Trải nghiệm văn hóa chợ nổi độc đáo của miền Tây." },
        { id: "hl16", title: "Miệt vườn trái cây", description: "Thưởng thức trái cây tươi tại vườn." }
      ],
      itinerary: [
        { day: "1", title: "TPHCM - Cần Thơ", description: "Di chuyển đến Cần Thơ.", activities: [{ activity: "Tham quan nhà cổ Bình Thủy" }] }
      ],
      services: {
        included: [{ id: "inc8", name: "Tàu du lịch" }],
        excluded: [{ id: "exc8", name: "Quà mua sắm" }]
      },
      terms: {
        registration: ["Đặt cọc 20%."],
        cancellation: ["Hủy tour trước 3 ngày, phí 60%."]
      },
      whyChooseUs: [
        { id: "wcu8", title: "Giá siêu tiết kiệm", description: "Chi phí hợp lý, phù hợp với mọi đối tượng.", icon: "money" }
      ]
    },
    {
      id: "han-quoc-seoul-jeju-5n4d",
      slug: "han-quoc-seoul-jeju-5n4d",
      name: "Tour Hàn Quốc: Seoul - Jeju 5N4D",
      categorySlug: "tour-quoc-te",
      country: "Hàn Quốc",
      duration: "5 ngày 4 đêm",
      price: 18900000,
      originalPrice: 21500000,
      departure: ["Hà Nội"],
      image: "https://images.unsplash.com/photo-1594248552192-3a3d5371f65d?q=80&w=2070&auto=format&fit=crop",
      gallery: [],
      rating: 4.9,
      reviewCount: 78,
      isHot: true,
      groupSize: { min: 10, max: 20 },
      highlights: [
        { id: "hl17", title: "Đảo Jeju", description: "Khám phá hòn đảo tình yêu và di sản UNESCO." },
        { id: "hl18", title: "Cung điện Gyeongbokgung", description: "Mặc Hanbok truyền thống check-in cung điện cổ." }
      ],
      itinerary: [
        { day: "1", title: "Hà Nội - Seoul", description: "Bay đến Seoul, nghỉ ngơi.", activities: [{ activity: "Tham quan tháp Namsan" }] }
      ],
      services: {
        included: [{ id: "inc9", name: "Vé tham quan" }],
        excluded: [{ id: "exc9", name: "Ăn uống tự túc" }]
      },
      terms: {
        registration: ["Đặt cọc 50%."],
        cancellation: ["Hủy tour trước 21 ngày, phí 25%."]
      },
      whyChooseUs: [
        { id: "wcu9", title: "Điểm đến theo mùa", description: "Lịch trình tối ưu cho trải nghiệm hoa anh đào/lá vàng.", icon: "leaf" }
      ]
    },
    {
      id: "vinh-ha-long-cat-ba-3n2d",
      slug: "vinh-ha-long-cat-ba-3n2d",
      name: "Tour Vịnh Hạ Long - Cát Bà 3N2D (Du thuyền)",
      categorySlug: "tour-trong-nuoc",
      country: "Việt Nam",
      duration: "3 ngày 2 đêm",
      price: 6500000,
      originalPrice: 7500000,
      departure: ["Hà Nội"],
      image: "https://images.unsplash.com/photo-1528659850125-e51c6c6b3e71?q=80&w=2070&auto=format&fit=crop",
      gallery: [],
      rating: 4.9,
      reviewCount: 155,
      isHot: false,
      groupSize: { min: 2, max: 15 },
      highlights: [
        { id: "hl19", title: "Du thuyền", description: "Nghỉ đêm trên du thuyền sang trọng tại Vịnh Hạ Long." },
        { id: "hl20", title: "Đảo Cát Bà", description: "Tắm biển và khám phá Vườn Quốc gia Cát Bà." }
      ],
      itinerary: [
        { day: "1", title: "Hà Nội - Du thuyền", description: "Di chuyển ra cảng, lên du thuyền.", activities: [{ activity: "Chèo thuyền Kayak" }] }
      ],
      services: {
        included: [{ id: "inc10", name: "Cabin trên du thuyền" }],
        excluded: [{ id: "exc10", name: "Đồ uống" }]
      },
      terms: {
        registration: ["Đặt cọc 80%."],
        cancellation: ["Hủy tour trước 14 ngày, phí 50%."]
      },
      whyChooseUs: [
        { id: "wcu10", title: "Trải nghiệm sang trọng", description: "Dịch vụ du thuyền cao cấp, không gian riêng tư.", icon: "ship" }
      ]
    },
    {
      id: "nhat-ban-mua-thu-vang-6n5d",
      slug: "nhat-ban-mua-thu-vang-6n5d",
      name: "Tour Nhật Bản Mùa Thu Lá Vàng 6N5D",
      categorySlug: "tour-quoc-te",
      country: "Nhật Bản",
      duration: "6 ngày 5 đêm",
      price: 32000000,
      originalPrice: 35000000,
      departure: ["Hà Nội", "TP. Hồ Chí Minh"],
      image: "https://images.unsplash.com/photo-154205184124cd?q=80&w=2070&auto=format&fit=crop",
      gallery: [],
      rating: 5.0,
      reviewCount: 45,
      isHot: true,
      groupSize: { min: 8, max: 18 },
      highlights: [
        { id: "hl21", title: "Kyoto", description: "Tham quan Chùa Vàng Kinkaku-ji." },
        { id: "hl22", title: "Núi Phú Sĩ", description: "Ngắm cảnh sắc núi Phú Sĩ tuyệt đẹp trong mùa thu." }
      ],
      itinerary: [
        { day: "1", title: "Việt Nam - Osaka", description: "Bay đến Osaka, nghỉ ngơi.", activities: [{ activity: "Tự do khám phá Dotonbori" }] }
      ],
      services: {
        included: [{ id: "inc11", name: "Bảo hiểm toàn cầu" }],
        excluded: [{ id: "exc11", name: "Chi phí mua sắm" }]
      },
      terms: {
        registration: ["Đặt cọc 40%."],
        cancellation: ["Hủy tour trước 30 ngày, phí 20%."]
      },
      whyChooseUs: [
        { id: "wcu11", title: "Trải nghiệm văn hóa", description: "Lịch trình tập trung vào văn hóa truyền thống Nhật Bản.", icon: "pagoda" }
      ]
    },
    {
      id: "da-lat-suong-mo-3n3d",
      slug: "da-lat-suong-mo-3n3d",
      name: "Tour Đà Lạt Ngắm Sương Mù 3N3D (Đêm đầu di chuyển)",
      categorySlug: "tour-trong-nuoc",
      country: "Việt Nam",
      duration: "3 ngày 3 đêm",
      price: 3200000,
      originalPrice: 3800000,
      departure: ["TP. Hồ Chí Minh"],
      image: "https://images.unsplash.com/photo-1628173439050-c6517e6e584d?q=80&w=2070&auto=format&fit=crop",
      gallery: [],
      rating: 4.7,
      reviewCount: 210,
      isHot: false,
      groupSize: { min: 18, max: 35 },
      highlights: [
        { id: "hl23", title: "Hồ Tuyền Lâm", description: "Khám phá vẻ đẹp yên bình của hồ và rừng thông." },
        { id: "hl24", title: "Quảng trường Lâm Viên", description: "Check-in Bông Hoa Dã Quỳ nổi tiếng." }
      ],
      itinerary: [
        { day: "1", title: "TPHCM - Đà Lạt (Đêm)", description: "Lên xe giường nằm chất lượng cao di chuyển.", activities: [{ activity: "Lên xe giường nằm" }] }
      ],
      services: {
        included: [{ id: "inc12", name: "Xe giường nằm khứ hồi" }],
        excluded: [{ id: "exc12", name: "Vé cáp treo" }]
      },
      terms: {
        registration: ["Đặt cọc 25%."],
        cancellation: ["Hủy tour trước 5 ngày, phí 30%."]
      },
      whyChooseUs: [
        { id: "wcu12", title: "Tối ưu thời gian", description: "Tận dụng đêm để di chuyển, tiết kiệm thời gian tham quan ban ngày.", icon: "clock" }
      ]
    },
    {
      id: "chau-au-4-nuoc-10n9d",
      slug: "chau-au-4-nuoc-10n9d",
      name: "Tour Châu Âu 4 Nước: Pháp - Bỉ - Hà Lan - Đức 10N9D",
      categorySlug: "tour-quoc-te",
      country: "Pháp, Bỉ, Hà Lan, Đức",
      duration: "10 ngày 9 đêm",
      price: 65000000,
      originalPrice: 70000000,
      departure: ["Hà Nội"],
      image: "https://images.unsplash.com/photo-1520263155700-1111628cc340?q=80&w=2070&auto=format&fit=crop",
      gallery: [],
      rating: 4.9,
      reviewCount: 30,
      isHot: true,
      groupSize: { min: 8, max: 15 },
      highlights: [
        { id: "hl25", title: "Tháp Eiffel", description: "Tham quan biểu tượng Paris và du thuyền sông Seine." },
        { id: "hl26", title: "Quảng trường Grand Place", description: "Khám phá quảng trường đẹp nhất châu Âu ở Brussels." }
      ],
      itinerary: [
        { day: "1", title: "Việt Nam - Paris (Pháp)", description: "Bay đến Paris, nhận phòng khách sạn.", activities: [{ activity: "Tham quan Tháp Eiffel" }] }
      ],
      services: {
        included: [{ id: "inc13", name: "Visa Schengen" }],
        excluded: [{ id: "exc13", name: "Mua sắm cá nhân" }]
      },
      terms: {
        registration: ["Đặt cọc 80%."],
        cancellation: ["Hủy tour trước 45 ngày, phí 20%."]
      },
      whyChooseUs: [
        { id: "wcu13", title: "Trải nghiệm Đa Quốc gia", description: "Khám phá những di sản văn hóa và kiến trúc nổi tiếng nhất châu Âu.", icon: "globe" }
      ]
    }
  ];

export const mockTourCategories: TourCategory[] = [
    { name: "Tour Trong Nước", slug: "tour-trong-nuoc", description: "Khám phá vẻ đẹp Việt Nam", imageUrl: "", tours: mockTours },
    { name: "Tour Châu Á", slug: "tour-chau-a", description: "Du lịch các nước Châu Á", imageUrl: "", tours: [] },
];

export const mockNews: News[] = [
  {
    id: 1,
    title: "Bí quyết phỏng vấn visa Mỹ",
    content: `
      <h2>1. Chuẩn bị Hồ sơ Tài chính Kỹ lưỡng</h2>
      <p>Phần lớn các hồ sơ bị từ chối đều liên quan đến việc không chứng minh được tài chính đủ mạnh và mối ràng buộc tại Việt Nam. Đảm bảo sao kê ngân hàng 6 tháng gần nhất có số dư ổn định, không có giao dịch bất thường.</p>
      <p><strong>Lưu ý:</strong> Sổ tiết kiệm nên được gửi trước ngày phỏng vấn ít nhất 3-6 tháng.</p>
      
      <h2>2. Tập trung vào Mục đích Chuyến đi</h2>
      <p>Hãy trả lời thẳng vào câu hỏi của viên chức lãnh sự. Nếu đi du lịch, hãy mô tả lịch trình chi tiết và hợp lý. Tránh trả lời chung chung về mục đích tham quan.</p>
      
      <h3>Sai lầm thường gặp:</h3>
      <ul>
        <li>Không nắm rõ thông tin về nơi lưu trú hoặc người bảo lãnh.</li>
        <li>Ăn mặc quá xuề xòa hoặc quá kiểu cách.</li>
      </ul>
    `,
    slug: "bi-quyet-phong-van-visa-my",
    keyword: ["visa", "hướng dẫn", "phỏng vấn", "Mỹ"],
    metaTitle: "Bí quyết phỏng vấn visa Mỹ",
    metaDescription: "Mẹo phỏng vấn visa Mỹ",
    metaKeywords: "visa my, phong van",
    author: "Chuyên gia Visa",
    publishedAt: "2024-07-29T10:00:00Z",
    viewCount: 1500,
    blogCategoryId: 1,
    avatarUrl: "/images/avatars/author.jpg",
    status: "published",
    createdAt: "2024-07-29T10:00:00Z",
    updatedAt: "2024-07-29T10:00:00Z",
    excerpt: "Phỏng vấn là bước quan trọng nhất...",
    date: "2024-07-29"
  },
  // --- Bắt đầu 10 dữ liệu mới ---
  {
    id: 2,
    title: "Chính sách visa mới của Canada: Cơ hội cho sinh viên quốc tế",
    content: `
      <p>Chính phủ Canada đã công bố các thay đổi mới nhằm đơn giản hóa quy trình xin giấy phép học tập và mở rộng cơ hội làm việc sau tốt nghiệp cho sinh viên quốc tế, đặc biệt trong các ngành thiếu hụt nhân lực.</p>
      
      <h2>Điểm mới nổi bật:</h2>
      <ol>
        <li><strong>Giảm yêu cầu tài chính chứng minh:</strong> Giảm nhẹ gánh nặng chứng minh số dư tài khoản ngân hàng.</li>
        <li><strong>Visa làm việc sau tốt nghiệp (PGWP):</strong> Quy định mới giúp sinh viên các khóa học ngắn hạn đủ điều kiện xin PGWP dễ dàng hơn.</li>
      </ol>
      
      <p>Các ứng viên nên tham khảo chi tiết trên website chính thức của IRCC để cập nhật thông tin kịp thời.</p>
    `,
    slug: "chinh-sach-visa-moi-cua-canada-co-hoi-cho-sinh-vien",
    keyword: ["visa", "du học", "Canada", "chính sách"],
    metaTitle: "Chính sách visa du học Canada mới nhất",
    metaDescription: "Phân tích những thay đổi có lợi cho sinh viên quốc tế tại Canada.",
    metaKeywords: "visa canada, du hoc, lam viec",
    author: "Tư vấn Di trú",
    publishedAt: "2024-09-27T08:30:00Z",
    viewCount: 3500,
    blogCategoryId: 1,
    avatarUrl: "/images/avatars/immigration_advisor.jpg",
    status: "published",
    createdAt: "2024-09-25T08:30:00Z",
    updatedAt: "2024-09-27T08:30:00Z",
    excerpt: "Canada nới lỏng quy định visa nhằm thu hút nhân tài.",
    date: "2024-09-27"
  },
  {
    id: 3,
    title: "10 địa điểm du lịch 'bị lãng quên' ở Đông Nam Á",
    content: `
      <p>Đông Nam Á không chỉ có Bali hay Bangkok. Có những hòn đảo và thành phố cổ vẫn giữ được vẻ đẹp hoang sơ và văn hóa bản địa độc đáo, hoàn hảo cho những ai tìm kiếm sự yên tĩnh.</p>
      
      <h2>Top 3 điểm đến cần khám phá:</h2>
      <ul>
        <li><strong>Koh Rong, Campuchia:</strong> Thiên đường biển ẩn mình, lý tưởng cho lặn biển.</li>
        <li><strong>Hà Giang, Việt Nam:</strong> Vùng đất của những cung đường đèo hùng vĩ và văn hóa dân tộc thiểu số.</li>
        <li><strong>Luang Prabang, Lào:</strong> Thành phố tâm linh với hàng ngàn ngôi chùa cổ kính, không khí thanh bình.</li>
      </ul>
      
      <p>Hãy chuẩn bị hành trang và khám phá những viên ngọc thô này trước khi chúng trở nên quá đông đúc.</p>
    `,
    slug: "10-dia-diem-du-lich-bi-lang-quen-dong-nam-a",
    keyword: ["du lịch", "Đông Nam Á", "bí mật", "khám phá"],
    metaTitle: "Khám phá 10 điểm du lịch bí mật ở Đông Nam Á",
    metaDescription: "Gợi ý những điểm đến ít người biết, lý tưởng cho kỳ nghỉ yên tĩnh.",
    metaKeywords: "du lich, dong nam a, hoang so, diem den",
    author: "Travel Blogger",
    publishedAt: "2024-09-20T14:45:00Z",
    viewCount: 4200,
    blogCategoryId: 3,
    avatarUrl: "/images/avatars/travel_blogger.jpg",
    status: "published",
    createdAt: "2024-09-18T14:45:00Z",
    updatedAt: "2024-09-20T14:45:00Z",
    excerpt: "Tránh xa đám đông tại các bãi biển và khu di tích nổi tiếng.",
    date: "2024-09-20"
  },
  {
    id: 4,
    title: "Bầu cử Mỹ: Tác động của cuộc tranh luận đầu tiên đến thị trường châu Á",
    content: `
      <p>Cuộc tranh luận tổng thống Mỹ vừa qua đã tạo ra làn sóng bất ổn, đặc biệt là tại các thị trường tài chính châu Á. Sự không chắc chắn về chính sách thương mại và đầu tư đã khiến nhà đầu tư thận trọng.</p>
      
      <p>Các chỉ số chứng khoán như Nikkei 225 (Nhật Bản) và KOSPI (Hàn Quốc) ghi nhận mức giảm nhẹ, trong khi đồng Nhân dân tệ (CNY) và Won (KRW) có xu hướng mất giá so với USD.</p>
      
      <h2>Dự báo Ngắn hạn:</h2>
      <p>Thị trường sẽ tiếp tục theo dõi sát sao các tuyên bố chính sách từ hai ứng viên. Các ngành xuất khẩu lớn sang Mỹ như dệt may và điện tử có thể chịu tác động tiêu cực nếu căng thẳng thương mại leo thang.</p>
    `,
    slug: "bau-cu-my-tac-dong-thi-truong-chau-a",
    keyword: ["tin tức nước ngoài", "kinh tế", "chính trị", "Mỹ"],
    metaTitle: "Ảnh hưởng của bầu cử Mỹ đến thị trường tài chính châu Á",
    metaDescription: "Phân tích chuyên sâu về sự liên kết giữa chính trị Mỹ và kinh tế châu Á.",
    metaKeywords: "bau cu my, tin tuc, kinh te, chau a",
    author: "Chuyên gia Kinh tế",
    publishedAt: "2024-09-29T09:00:00Z",
    viewCount: 1800,
    blogCategoryId: 2,
    avatarUrl: "/images/avatars/economy_expert.jpg",
    status: "published",
    createdAt: "2024-09-28T09:00:00Z",
    updatedAt: "2024-09-29T09:00:00Z",
    excerpt: "Thị trường châu Á phản ứng thận trọng trước kết quả tranh luận.",
    date: "2024-09-29"
  },
  {
    id: 5,
    title: "Quy trình xin visa Schengen (Châu Âu) chi tiết từ A đến Z",
    content: `
      <p>Để xin visa Schengen thành công, việc chuẩn bị hồ sơ phải đảm bảo tính logic và trung thực. Schengen yêu cầu bạn chứng minh rõ ràng mục đích chuyến đi và khả năng quay về nước.</p>
      
      <h2>Các Bước Quan trọng:</h2>
      <ol>
        <li><strong>Chọn quốc gia nộp hồ sơ:</strong> Phải là quốc gia lưu trú dài nhất hoặc là điểm đến đầu tiên.</li>
        <li><strong>Hồ sơ tài chính:</strong> Sao kê tài khoản, sổ tiết kiệm, và giấy tờ sở hữu tài sản (nhà đất, xe hơi).</li>
        <li><strong>Bảo hiểm du lịch:</strong> Bắt buộc, với mức bảo hiểm tối thiểu là 30.000 EUR.</li>
      </ol>
      
      <p>Hãy luôn nộp hồ sơ trước ngày khởi hành ít nhất 3 tuần.</p>
    `,
    slug: "quy-trinh-xin-visa-schengen-chi-tiet",
    keyword: ["visa", "Châu Âu", "Schengen", "hồ sơ"],
    metaTitle: "Hướng dẫn xin visa Schengen thành công",
    metaDescription: "Quy trình từng bước để hoàn tất hồ sơ visa du lịch Châu Âu.",
    metaKeywords: "visa schengen, chau au, ho so, huong dan",
    author: "Tư vấn Visa",
    publishedAt: "2024-09-15T16:00:00Z",
    viewCount: 5100,
    blogCategoryId: 1,
    avatarUrl: "/images/avatars/visa_expert.jpg",
    status: "published",
    createdAt: "2024-09-12T16:00:00Z",
    updatedAt: "2024-09-15T16:00:00Z",
    excerpt: "Hồ sơ tài chính và lịch trình du lịch là hai yếu tố quyết định.",
    date: "2024-09-15"
  },
  {
    id: 6,
    title: "Kinh nghiệm du lịch tự túc Nhật Bản: Tàu điện và chỗ ở giá rẻ",
    content: `
      <p>Hệ thống giao thông công cộng ở Nhật Bản là một thách thức, nhưng việc nắm vững cách sử dụng các loại thẻ tàu và JR Pass sẽ giúp bạn tiết kiệm hàng trăm đô la.</p>
      
      <h2>Di chuyển thông minh:</h2>
      <ul>
        <li><strong>JR Pass:</strong> Chỉ nên mua nếu bạn di chuyển giữa các thành phố lớn (Tokyo, Osaka, Kyoto).</li>
        <li><strong>Thẻ IC:</strong> Sử dụng thẻ Suica hoặc Pasmo cho các chuyến đi ngắn trong thành phố.</li>
      </ul>
      
      <p>Về chỗ ở, các khách sạn con nhộng (capsule hotel) không chỉ rẻ mà còn mang lại trải nghiệm độc đáo, sạch sẽ, đặc biệt tại các khu vực trung tâm như Shinjuku hay Shibuya.</p>
    `,
    slug: "kinh-nghiem-du-lich-tu-tuc-nhat-ban",
    keyword: ["du lịch", "Nhật Bản", "tự túc", "tiết kiệm"],
    metaTitle: "Du lịch Nhật Bản tự túc và tiết kiệm chi phí",
    metaDescription: "Cẩm nang di chuyển và chỗ ở dành cho du khách muốn khám phá Nhật Bản.",
    metaKeywords: "du lich nhat ban, tu tuc, jr pass",
    author: "Phượt Thủ Á-Âu",
    publishedAt: "2024-08-05T09:15:00Z",
    viewCount: 6800,
    blogCategoryId: 3,
    avatarUrl: "/images/avatars/traveller_asia.jpg",
    status: "published",
    createdAt: "2024-08-01T09:15:00Z",
    updatedAt: "2024-08-05T09:15:00Z",
    excerpt: "Hệ thống tàu điện Nhật Bản vô cùng phức tạp nhưng rất tiện lợi.",
    date: "2024-08-05"
  },
  {
    id: 7,
    title: "Diễn biến xung đột Nga-Ukraine: Cập nhật tình hình mới nhất từ tiền tuyến",
    content: `
      <p>Tình hình chiến sự tại Donbas và Crimea vẫn là trọng tâm của cuộc xung đột. Phía Ukraine tăng cường sử dụng máy bay không người lái tầm xa, trong khi Nga duy trì áp lực pháo binh và tên lửa vào các mục tiêu cơ sở hạ tầng.</p>
      
      <h2>Phân tích Chiến lược:</h2>
      <ul>
        <li><strong>Đông Ukraine:</strong> Cả hai bên đang tranh giành từng khu vực nhỏ, không có bước tiến đột phá lớn.</li>
        <li><strong>Hậu cần:</strong> Cả hai nước đều đang đối mặt với thách thức lớn về duy trì chuỗi cung ứng đạn dược và thiết bị quân sự.</li>
      </ul>
      
      <p>Cộng đồng quốc tế tiếp tục bày tỏ quan ngại về thiệt hại nhân mạng và khủng hoảng lương thực toàn cầu.</p>
    `,
    slug: "dien-bien-xung-dot-nga-ukraine-cap-nhat",
    keyword: ["tin tức nước ngoài", "quân sự", "Nga", "Ukraine"],
    metaTitle: "Tin tức chiến sự Nga-Ukraine: Cập nhật hàng ngày",
    metaDescription: "Phân tích sâu sắc về những diễn biến mới nhất của cuộc xung đột.",
    metaKeywords: "chien su, nga ukraine, tin the gioi",
    author: "Phân tích Quốc tế",
    publishedAt: "2024-09-29T11:30:00Z",
    viewCount: 8900,
    blogCategoryId: 2,
    avatarUrl: "/images/avatars/foreign_analyst.jpg",
    status: "published",
    createdAt: "2024-09-29T11:30:00Z",
    updatedAt: "2024-09-29T11:30:00Z",
    excerpt: "Cuộc chiến vẫn đang diễn ra căng thẳng tại các khu vực trọng điểm.",
    date: "2024-09-29"
  },
  {
    id: 8,
    title: "Điều kiện và thủ tục nhập cư diện tay nghề cao tại Úc",
    content: `
      <p>Úc đang tích cực thu hút lao động tay nghề cao thông qua hệ thống di trú dựa trên điểm (Points-Based System). Các ngành IT, Y tế và Xây dựng luôn nằm trong danh sách ưu tiên.</p>
      
      <h2>Quy trình cơ bản:</h2>
      <ol>
        <li>Đánh giá kỹ năng (Skill Assessment) bởi cơ quan chuyên môn Úc.</li>
        <li>Nộp thư bày tỏ nguyện vọng (Expression of Interest - EOI) qua SkillSelect.</li>
        <li>Nhận thư mời nộp hồ sơ (Invitation to Apply - ITA) cho loại visa (ví dụ: Visa 189, 190, 491).</li>
      </ol>
      
      <p>Để đạt điểm cao, ứng viên nên cải thiện trình độ tiếng Anh và kinh nghiệm làm việc liên quan.</p>
    `,
    slug: "thu-tuc-nhap-cu-dien-tay-nghe-cao-tai-uc",
    keyword: ["visa", "nhập cư", "Úc", "tay nghề", "di trú"],
    metaTitle: "Nhập cư Úc diện tay nghề: Hướng dẫn chi tiết",
    metaDescription: "Tìm hiểu về cơ hội định cư Úc dành cho lao động có kỹ năng cao.",
    metaKeywords: "nhap cu uc, visa tay nghe, skilled visa",
    author: "Luật sư Di trú",
    publishedAt: "2024-09-25T10:30:00Z",
    viewCount: 2900,
    blogCategoryId: 1,
    avatarUrl: "/images/avatars/lawyer.jpg",
    status: "published",
    createdAt: "2024-09-20T10:30:00Z",
    updatedAt: "2024-09-25T10:30:00Z",
    excerpt: "Úc tiếp tục ưu tiên các ngành nghề về IT và Y tế.",
    date: "2024-09-25"
  },
  {
    id: 9,
    title: "Khám phá Lễ hội Ánh sáng Vivid Sydney (Úc): Thời gian và hoạt động nổi bật",
    content: `
      <p>Vivid Sydney là sự kiện ánh sáng, âm nhạc và ý tưởng lớn nhất tại Nam Bán Cầu, biến thành phố Sydney thành một bảo tàng ngoài trời đầy màu sắc vào mùa Đông.</p>
      
      <h2>Các Địa điểm Không thể bỏ qua:</h2>
      <ul>
        <li><strong>Circular Quay:</strong> Nơi tập trung các tác phẩm chiếu sáng trên Nhà hát Opera Sydney và Cầu cảng Sydney.</li>
        <li><strong>The Rocks:</strong> Khu phố cổ kính trở nên sống động với nghệ thuật sắp đặt 3D.</li>
        <li><strong>Darling Harbour:</strong> Các màn trình diễn nhạc nước và pháo hoa ánh sáng.</li>
      </ul>
      
      <p>Lễ hội thường diễn ra vào cuối tháng 5 đến giữa tháng 6. Du khách nên đặt chỗ ở sớm.</p>
    `,
    slug: "kham-pha-le-hoi-anh-sang-vivid-sydney",
    keyword: ["du lịch", "Úc", "lễ hội", "Sydney"],
    metaTitle: "Vivid Sydney: Lễ hội ánh sáng lớn nhất thế giới",
    metaDescription: "Thông tin cần biết để trải nghiệm trọn vẹn lễ hội Vivid Sydney hàng năm.",
    metaKeywords: "du lich uc, sydney, le hoi anh sang",
    author: "Du lịch & Văn hóa",
    publishedAt: "2024-09-18T13:00:00Z",
    viewCount: 1600,
    blogCategoryId: 3,
    avatarUrl: "/images/avatars/culture_reporter.jpg",
    status: "published",
    createdAt: "2024-09-15T13:00:00Z",
    updatedAt: "2024-09-18T13:00:00Z",
    excerpt: "Hàng triệu du khách đổ về Sydney để chiêm ngưỡng ánh sáng nghệ thuật.",
    date: "2024-09-18"
  },
  {
    id: 10,
    title: "EU đề xuất quy định mới về AI: Cân bằng giữa đổi mới và an toàn",
    content: `
      <p>Đạo luật AI (AI Act) của Liên minh châu Âu là khung pháp lý toàn diện đầu tiên trên thế giới nhằm điều chỉnh Trí tuệ Nhân tạo dựa trên mức độ rủi ro.</p>
      
      <h2>Các Cấp độ Rủi ro:</h2>
      <ul>
        <li><strong>Rủi ro không thể chấp nhận được:</strong> Bị cấm (ví dụ: hệ thống chấm điểm xã hội của chính phủ).</li>
        <li><strong>Rủi ro cao:</strong> Phải tuân thủ các quy tắc nghiêm ngặt về minh bạch, giám sát và bảo mật (ví dụ: thiết bị y tế, hệ thống quản lý giao thông).</li>
        <li><strong>Rủi ro thấp/tối thiểu:</strong> Áp dụng các quy tắc về minh bạch nhẹ (ví dụ: chatbot).</li>
      </ul>
      
      <p>Đạo luật này sẽ có tác động sâu rộng đến các công ty công nghệ toàn cầu hoạt động tại thị trường châu Âu.</p>
    `,
    slug: "eu-de-xuat-quy-dinh-moi-ve-ai",
    keyword: ["tin tức nước ngoài", "AI", "EU", "công nghệ", "pháp luật"],
    metaTitle: "Đạo luật AI của EU: Điều chỉnh Trí tuệ Nhân tạo",
    metaDescription: "Tìm hiểu về những quy định chặt chẽ mà EU đặt ra cho các hệ thống AI rủi ro cao.",
    metaKeywords: "eu, ai act, tri tue nhan tao, quy dinh",
    author: "Bình luận Công nghệ",
    publishedAt: "2024-08-20T17:10:00Z",
    viewCount: 2200,
    blogCategoryId: 2,
    avatarUrl: "/images/avatars/tech_commentator.jpg",
    status: "published",
    createdAt: "2024-08-15T17:10:00Z",
    updatedAt: "2024-08-20T17:10:00Z",
    excerpt: "Châu Âu dẫn đầu thế giới trong việc pháp lý hóa AI.",
    date: "2024-08-20"
  },
  {
    id: 11,
    title: "5 điều cần chuẩn bị khi đi du lịch Hàn Quốc không cần visa (K-ETA)",
    content: `
      <p>Hệ thống K-ETA (Korea Electronic Travel Authorization) giúp du khách từ một số quốc gia được miễn visa khi nhập cảnh Hàn Quốc. Tuy nhiên, việc đăng ký thành công K-ETA không đảm bảo 100% được nhập cảnh.</p>
      
      <h2>Checklist K-ETA:</h2>
      <ul>
        <li><strong>Đăng ký online:</strong> Hoàn thành đơn K-ETA ít nhất 72 giờ trước chuyến bay.</li>
        <li><strong>Thông tin chuyến bay và khách sạn:</strong> Cần khai báo chính xác địa chỉ lưu trú và vé máy bay khứ hồi.</li>
        <li><strong>Tài chính:</strong> Chuẩn bị sẵn chứng từ chứng minh khả năng chi trả cho chuyến đi (nếu được yêu cầu kiểm tra tại cửa khẩu).</li>
      </ul>
      
      <p>Luôn giữ bản in K-ETA và vé khứ hồi để xuất trình khi cần thiết.</p>
    `,
    slug: "du-lich-han-quoc-khong-can-visa-keta",
    keyword: ["visa", "du lịch", "Hàn Quốc", "K-ETA", "hướng dẫn"],
    metaTitle: "Du lịch Hàn Quốc với K-ETA: Hướng dẫn từ A đến Z",
    metaDescription: "Tất cả những gì bạn cần biết về hệ thống K-ETA mới của Hàn Quốc.",
    metaKeywords: "du lich han quoc, k-eta, visa",
    author: "Korea Insight",
    publishedAt: "2024-09-01T15:00:00Z",
    viewCount: 4700,
    blogCategoryId: 1,
    avatarUrl: "/images/avatars/korea_expert.jpg",
    status: "published",
    createdAt: "2024-08-28T15:00:00Z",
    updatedAt: "2024-09-01T15:00:00Z",
    excerpt: "Hàn Quốc tạo điều kiện cho du khách quốc tế với hệ thống K-ETA mới.",
    date: "2024-09-01"
  }
];

export const mockVisaContinents: VisaContinent[] = [
    {
        name: "Visa Châu Á",
        slug: "visa-chau-a",
        description: "Xin visa các nước Châu Á nhanh chóng.",
        countries: [
            { name: "Nhật Bản", slug: "nhat-ban" },
            { name: "Hàn Quốc", slug: "han-quoc" },
        ]
    },
    {
        name: "Visa Châu Âu",
        slug: "visa-chau-au",
        description: "Du lịch khám phá châu Âu.",
        countries: [
            { name: "Pháp", slug: "phap" },
            { name: "Đức", slug: "duc" },
            { name: "Ý", slug: "y" },
            { name: "Tây Ban Nha", slug: "tay-ban-nha" },
        ]
    },
    {
        name: "Visa Châu Mỹ",
        slug: "visa-chau-my",
        description: "Chinh phục giấc mơ Mỹ.",
        countries: [
            { name: "Hoa Kỳ (Mỹ)", slug: "hoa-ky" },
            { name: "Canada", slug: "canada" },
            { name: "Mexico", slug: "mexico" },
            { name: "Brazil", slug: "brazil" },
            { name: "Argentina", slug: "argentina" },
        ]
    },
    {
        name: "Visa Châu Úc",
        slug: "visa-chau-uc",
        description: "Khám phá các quốc gia Châu Đại Dương.",
        countries: [
            { name: "Úc", slug: "uc" },
            { name: "New Zealand", slug: "new-zealand" },
            { name: "Fiji", slug: "fiji" },
            { name: "Samoa", slug: "samoa" },
        ]
    }
];

export const mockTestimonials: Testimonial[] = [
    { id: "test1", name: "Nguyễn Văn A", quote: "Dịch vụ tuyệt vời!", rating: 5, image: "/images/testimonials/avatar1.jpg" }
];

export const mockRelatedArticles: RelatedArticle[] = [
    { id: "ra1", title: "Kinh nghiệm du lịch Mỹ tự túc", url: "/tin-tuc/kinh-nghiem-du-lich-my", image: "/images/articles/related1.jpg" }
];


export const mockVisaPageData: VisaDetail[] = [
    // Châu Á - Trung Quốc (Đã có)
    {
        slug: "china",
        continentSlug: "visa-chau-a",
        title: "Dịch Vụ Xin Visa Trung Quốc",
        countryName: "Trung Quốc",
        heroImage: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b",
        successRate: "94%",
        processingTime: "7-10 ngày làm việc",
        description: "Dịch vụ xin visa Trung Quốc chuyên nghiệp, phù hợp cho du lịch, công tác và thương mại.",
        services: ["Tư vấn hồ sơ", "Đặt lịch LSQ", "Dịch thuật công chứng", "Bảo hiểm du lịch"],
        visaTypes: [
            {
                id: "china-tourist",
                name: "Du lịch",
                pricing:[
                    {
                        type: "Trọn gói",
                        name: "Gói cơ bản",
                        prices: [
                            {
                                adult: "3,900,000 VNĐ",
                                child_6_12: "2,900,000 VNĐ",
                                child_under_6: "1,900,000 VNĐ",
                                consularFee: "140 USD",
                                serviceFee: "Từ 1,900,000 VNĐ",
                                note: "Giá có thể thay đổi theo tỷ giá USD"
                            }
                        ],
                        description: "Bao gồm xử lý hồ sơ, đặt lịch hẹn, dịch thuật, bảo hiểm cơ bản."
                    }
                ],
                requirements: {
                    personal: [
                        "Hộ chiếu còn hạn trên 6 tháng",
                        "Ảnh 4.8x3.3 nền trắng",
                        "CMND/CCCD công chứng",
                        "Sổ hộ khẩu công chứng",
                        "Form xin visa mới nhất"
                    ],
                    work_individual: [
                        "Hợp đồng lao động",
                        "Xác nhận công tác",
                        "Đơn xin nghỉ phép",
                        "Bảng lương 3 tháng"
                    ],
                    work_enterprise: [],
                    financial: [
                        "Sao kê ngân hàng 3 tháng",
                        "Sổ tiết kiệm tối thiểu 100 triệu",
                        "Giấy tờ sở hữu tài sản (nếu có)",
                        "Thẻ tín dụng quốc tế (nếu có)"
                    ],
                    travel: [
                        "Vé máy bay khứ hồi",
                        "Booking khách sạn",
                        "Bảo hiểm du lịch",
                        "Lịch trình chi tiết",
                        "Thư mời du lịch (nếu có)"
                    ]
                }
            }
        ],
        media: [
            {
                id: 145,
                name: "china_great_wall.jpg",
                url: "/images/mock/china_great_wall.jpg",
                type: "image",
                altText: "Vạn Lý Trường Thành",
                 createdAt: "2025-09-11T08:52:14.000Z",
                updatedAt: "2025-09-11T08:52:14.000Z",
                productId: 1 // Hoặc visaServiceId
            },
            {
                id: 146,
                name: "china_shanghai.jpg",
                url: "/images/mock/china_shanghai.jpg",
                type: "image",
                altText: "Thượng Hải hiện đại",
                 createdAt: "2025-09-11T08:52:14.000Z",
                updatedAt: "2025-09-11T08:52:14.000Z",
                productId: 1 // Hoặc visaServiceId
            }
        ],
         status: 'published',
         createdAt: "2025-09-11T08:52:14.000Z",
         updatedAt: "2025-09-11T08:52:14.000Z"
    },
    {
        slug: "usa",
        continentSlug: "visa-chau-my",
        title: "Dịch Vụ Xin Visa Mỹ (Hoa Kỳ)",
        countryName: "Hoa Kỳ",
        heroImage: "https://images.unsplash.com/photo-1594950853828-569a7c385b03",
        successRate: "88%",
        processingTime: "15-30 ngày (chờ phỏng vấn)",
        description: "Hỗ trợ xin các loại visa không định cư B1/B2 (Du lịch/Công tác) với quy trình phỏng vấn chuyên nghiệp.",
        services: ["Điền đơn DS-160", "Đặt lịch phỏng vấn", "Luyện phỏng vấn 1-1", "Tư vấn chứng minh tài chính"],
        status: "published",
        createdAt: "2025-09-01T10:00:00Z",
        updatedAt: "2025-09-25T14:00:00Z",
        visaTypes: [
          {
            id: "usa-b1-b2",
            name: "Du lịch/Công tác (B1/B2)",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Phỏng vấn Vàng",
                prices: [
                  {
                    adult: "7,500,000 VNĐ",
                    child_6_12: "7,500,000 VNĐ",
                    child_under_6: "Miễn phí (phỏng vấn chung)",
                    consularFee: "185 USD",
                    serviceFee: "Từ 5,000,000 VNĐ",
                    note: "Phí LSQ không hoàn lại kể cả khi trượt"
                  }
                ],
                description: "Bao gồm xử lý hồ sơ, điền đơn DS-160, đặt lịch, luyện phỏng vấn chuyên sâu."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu còn hạn trên 6 tháng", "Ảnh 5x5 nền trắng", "Form DS-160", "Xác nhận đóng phí LSQ"],
              work_individual: ["Hợp đồng lao động/Quyết định bổ nhiệm", "Thư xác nhận lương (nếu có)", "Giấy phép kinh doanh (nếu tự kinh doanh)"],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng cá nhân/doanh nghiệp 6 tháng", "Sổ tiết kiệm (khuyến nghị trên 200 triệu)", "Giấy tờ sở hữu tài sản (nhà đất, ô tô)"],
              travel: ["Lịch trình dự kiến (không bắt buộc vé máy bay/khách sạn)"]
            }
          }
        ],
        media: []
      },
      {
        slug: "canada",
        continentSlug: "visa-chau-my",
        title: "Dịch Vụ Xin Visa Canada",
        countryName: "Canada",
        heroImage: "https://images.unsplash.com/photo-1502604815183-b3c0765d70f6",
        successRate: "90%",
        processingTime: "30-60 ngày làm việc (chưa tính thời gian sinh trắc học)",
        description: "Xin visa du lịch, công tác Canada multiple-entry 10 năm với tỷ lệ đậu cao.",
        services: ["Tư vấn hồ sơ online", "Hỗ trợ dịch thuật", "Hoàn tất các Form IMM", "Đặt lịch lấy dấu vân tay"],
        status: "published",
        createdAt: "2025-09-05T09:30:00Z",
        updatedAt: "2025-09-28T11:00:00Z",
        visaTypes: [
          {
            id: "canada-visitor",
            name: "Du lịch/Thăm thân (Visitor)",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Toàn diện",
                prices: [
                  {
                    adult: "6,500,000 VNĐ",
                    child_6_12: "6,500,000 VNĐ",
                    child_under_6: "4,500,000 VNĐ",
                    consularFee: "100 CAD (phí visa) + 85 CAD (phí sinh trắc)",
                    serviceFee: "Từ 4,500,000 VNĐ",
                    note: "Phí dịch thuật công chứng có thể phát sinh"
                  }
                ],
                description: "Bao gồm xử lý hồ sơ, dịch thuật, điền form, và sắp xếp hồ sơ chứng minh tài chính."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 3.5x4.5 nền trắng", "Form IMM 5257", "Giấy tờ tùy thân (CCCD/CMND)"],
              work_individual: ["Hợp đồng lao động/Quyết định bổ nhiệm", "Xác nhận công tác/Đơn xin nghỉ phép"],
              work_enterprise: [],
              financial: ["Sổ tiết kiệm tối thiểu 150 triệu", "Sao kê tài khoản 4-6 tháng gần nhất", "Bằng chứng thu nhập/Sở hữu tài sản"],
              travel: ["Booking máy bay khứ hồi", "Booking khách sạn/Thư mời từ Canada"]
            }
          }
        ],
        media: []
      },
      {
        slug: "japan",
        continentSlug: "visa-chau-a",
        title: "Dịch Vụ Xin Visa Nhật Bản",
        countryName: "Nhật Bản",
        heroImage: "https://images.unsplash.com/photo-1540959733332-eab4deecc6b4",
        successRate: "97%",
        processingTime: "5-7 ngày làm việc",
        description: "Xin visa du lịch (single/multiple) Nhật Bản nhanh chóng, hỗ trợ tối đa cho các trường hợp khó.",
        services: ["Kiểm tra và hoàn thiện hồ sơ", "Dịch thuật công chứng", "Nộp hồ sơ ủy thác tại LSQ"],
        status: "published",
        createdAt: "2025-09-10T08:00:00Z",
        updatedAt: "2025-10-01T15:30:00Z",
        visaTypes: [
          {
            id: "japan-tourist",
            name: "Du lịch (Single/Multiple)",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Chuẩn",
                prices: [
                  {
                    adult: "3,500,000 VNĐ",
                    child_6_12: "2,500,000 VNĐ",
                    child_under_6: "1,500,000 VNĐ",
                    consularFee: "Khoảng 630,000 VNĐ (tùy tỷ giá)",
                    serviceFee: "Từ 1,900,000 VNĐ",
                    note: "Phí lãnh sự chỉ thu khi có kết quả visa"
                  }
                ],
                description: "Xử lý hồ sơ, dịch thuật, điền đơn, nộp/nhận hồ sơ tại Lãnh sự quán."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu gốc", "Ảnh 4.5x3.5 nền trắng", "Tờ khai xin visa", "Giấy tờ tùy thân"],
              work_individual: ["Hợp đồng lao động", "Giấy xác nhận đang làm việc", "Đơn xin nghỉ phép"],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng 6 tháng", "Sổ tiết kiệm (khuyến nghị trên 100 triệu)"],
              travel: ["Vé máy bay khứ hồi", "Xác nhận đặt phòng khách sạn", "Lịch trình du lịch chi tiết"]
            }
          }
        ],
        media: []
      },
      {
        slug: "schengen-france",
        continentSlug: "visa-chau-au",
        title: "Dịch Vụ Xin Visa Schengen (Pháp)",
        countryName: "Khối Schengen (Pháp)",
        heroImage: "https://images.unsplash.com/photo-1502602898624-ad818816c498",
        successRate: "93%",
        processingTime: "15-20 ngày làm việc",
        description: "Xin visa Schengen qua Đại sứ quán Pháp, sử dụng cho chuyến đi du lịch Châu Âu.",
        services: ["Tư vấn chọn nước nộp", "Hoàn thiện hồ sơ theo chuẩn châu Âu", "Đặt lịch hẹn VFS", "Mua bảo hiểm du lịch"],
        status: "published",
        createdAt: "2025-09-15T11:20:00Z",
        updatedAt: "2025-10-05T10:00:00Z",
        visaTypes: [
          {
            id: "schengen-tourist",
            name: "Du lịch (Type C)",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Đặc biệt",
                prices: [
                  {
                    adult: "7,900,000 VNĐ",
                    child_6_12: "5,900,000 VNĐ",
                    child_under_6: "4,900,00Đ",
                    consularFee: "80 EURO + Phí dịch vụ VFS",
                    serviceFee: "Từ 4,500,000 VNĐ",
                    note: "Giá chưa bao gồm bảo hiểm du lịch"
                  }
                ],
                description: "Hỗ trợ trọn gói hồ sơ, dịch thuật, điền form, luyện phỏng vấn (nếu có)."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu còn hạn trên 3 tháng sau ngày về", "Ảnh 3.5x4.5 nền trắng", "Tờ khai xin visa"],
              work_individual: ["Hợp đồng lao động", "Xác nhận công tác/Đơn nghỉ phép"],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng 6 tháng", "Sổ tiết kiệm tối thiểu 120 triệu", "Thẻ tín dụng (nếu có)"],
              travel: ["Bảo hiểm du lịch (mức 30.000 Euro)", "Vé máy bay khứ hồi", "Booking khách sạn/Kế hoạch du lịch"]
            }
          }
        ],
        media: []
      },
      {
        slug: "australia",
        continentSlug: "visa-chau-dai-duong",
        title: "Dịch Vụ Xin Visa Úc (Australia)",
        countryName: "Úc",
        heroImage: "https://images.unsplash.com/photo-1540700547798-251c8a169b14",
        successRate: "91%",
        processingTime: "25-45 ngày làm việc",
        description: "Xin visa 600 (Visitor Visa) du lịch, thăm thân online, hồ sơ kỹ lưỡng, hỗ trợ chứng minh mối ràng buộc.",
        services: ["Nộp hồ sơ online ImmiAccount", "Tư vấn hồ sơ công tác/thăm thân", "Hỗ trợ khám sức khỏe (nếu cần)"],
        status: "published",
        createdAt: "2025-09-20T14:30:00Z",
        updatedAt: "2025-10-07T09:15:00Z",
        visaTypes: [
          {
            id: "australia-600",
            name: "Du lịch (Visitor Visa 600)",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Cao cấp",
                prices: [
                  {
                    adult: "6,900,000 VNĐ",
                    child_6_12: "6,900,000 VNĐ",
                    child_under_6: "3,900,000 VNĐ",
                    consularFee: "190 AUD",
                    serviceFee: "Từ 4,000,000 VNĐ",
                    note: "Chỉ nhận hồ sơ có mục đích du lịch rõ ràng"
                  }
                ],
                description: "Hỗ trợ trọn gói hồ sơ, dịch thuật, nộp hồ sơ online, theo dõi tiến trình và bổ sung giấy tờ."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 4.5x3.5 nền trắng (scan)", "Form 1419", "Giấy khai sinh/Kết hôn"],
              work_individual: ["Hợp đồng lao động", "Xác nhận công tác/Nghỉ phép", "Giấy phép kinh doanh (nếu có)"],
              work_enterprise: [],
              financial: ["Bảng lương 3 tháng", "Sao kê tài khoản 3 tháng", "Sổ tiết kiệm (khuyến nghị trên 150 triệu)"],
              travel: ["Lịch trình du lịch chi tiết", "Booking máy bay (dự kiến)", "Booking khách sạn/Thư mời"]
            }
          }
        ],
        media: []
      },
      {
        slug: "south-korea",
        continentSlug: "visa-chau-a",
        title: "Dịch Vụ Xin Visa Hàn Quốc",
        countryName: "Hàn Quốc",
        heroImage: "https://images.unsplash.com/photo-1588725175317-1f481358d7c4",
        successRate: "96%",
        processingTime: "12-15 ngày làm việc",
        description: "Xin visa du lịch C-3-9, hỗ trợ visa thăm thân, hỗ trợ miễn chứng minh tài chính cho trường hợp đặc biệt.",
        services: ["Tư vấn hồ sơ miễn chứng minh tài chính", "Sắp xếp hồ sơ nộp tại KVAC", "Dịch thuật công chứng"],
        status: "published",
        createdAt: "2025-09-22T10:00:00Z",
        updatedAt: "2025-10-07T12:00:00Z",
        visaTypes: [
          {
            id: "korea-tourist",
            name: "Du lịch (C-3-9)",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Phổ thông",
                prices: [
                  {
                    adult: "3,000,000 VNĐ",
                    child_6_12: "2,000,000 VNĐ",
                    child_under_6: "1,000,000 VNĐ",
                    consularFee: "40 USD (single) - 60 USD (multiple)",
                    serviceFee: "Từ 1,500,000 VNĐ",
                    note: "Chi phí không bao gồm phí KVAC"
                  }
                ],
                description: "Xử lý hồ sơ, dịch thuật, điền đơn, đặt lịch hẹn nộp hồ sơ."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 3.5x4.5 nền trắng", "Đơn xin visa", "Giấy tờ tùy thân"],
              work_individual: ["Hợp đồng lao động", "Xác nhận công tác", "Đơn xin nghỉ phép"],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng 6 tháng", "Sổ tiết kiệm tối thiểu 5.000 USD", "Giấy tờ nhà đất"],
              travel: ["Vé máy bay khứ hồi", "Xác nhận đặt phòng khách sạn", "Lịch trình chi tiết"]
            }
          }
        ],
        media: []
      },
      {
        slug: "uk",
        continentSlug: "visa-chau-au",
        title: "Dịch Vụ Xin Visa Anh Quốc (UK)",
        countryName: "Vương Quốc Anh",
        heroImage: "https://images.unsplash.com/photo-1533929736458-ca588523c8c7",
        successRate: "89%",
        processingTime: "15-25 ngày làm việc",
        description: "Hỗ trợ xin Standard Visitor Visa cho du lịch, công tác, thăm thân tại Anh.",
        services: ["Điền đơn online", "Dịch thuật công chứng", "Đặt lịch hẹn VFS", "Luyện phỏng vấn (nếu có yêu cầu)"],
        status: "published",
        createdAt: "2025-09-25T15:00:00Z",
        updatedAt: "2025-10-07T14:30:00Z",
        visaTypes: [
          {
            id: "uk-standard-visitor",
            name: "Du lịch (Standard Visitor)",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Tiêu chuẩn",
                prices: [
                  {
                    adult: "8,500,000 VNĐ",
                    child_6_12: "8,500,000 VNĐ",
                    child_under_6: "4,500,000 VNĐ",
                    consularFee: "135 USD (6 tháng)",
                    serviceFee: "Từ 5,500,000 VNĐ",
                    note: "Phí lãnh sự có thể thay đổi tùy loại visa (2 năm, 5 năm, 10 năm)"
                  }
                ],
                description: "Bao gồm xử lý hồ sơ, dịch thuật, điền đơn online, nộp sinh trắc học."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 3.5x4.5 (chụp tại VFS)", "Đơn online", "Giấy tờ cá nhân khác"],
              work_individual: ["Thư xác nhận từ công ty", "Hợp đồng lao động", "Bảng lương 6 tháng"],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng 6 tháng", "Sổ tiết kiệm (min 150 triệu, gửi trên 1 tháng)", "Giấy tờ sở hữu tài sản"],
              travel: ["Booking máy bay", "Booking khách sạn/Địa chỉ lưu trú"]
            }
          }
        ],
        media: []
      },
      {
        slug: "taiwan",
        continentSlug: "visa-chau-a",
        title: "Dịch Vụ Xin Visa Đài Loan",
        countryName: "Đài Loan",
        heroImage: "https://images.unsplash.com/photo-1579268616140-ff8f830d9354",
        successRate: "98%",
        processingTime: "5-8 ngày làm việc",
        description: "Hỗ trợ xin visa du lịch, công tác Đài Loan, bao gồm cả visa dán và E-visa (Quan Hồng).",
        services: ["Kiểm tra hồ sơ online/trực tiếp", "Dịch thuật", "Nộp/nhận hồ sơ tại Văn phòng Kinh tế và Văn hóa Đài Bắc"],
        status: "published",
        createdAt: "2025-09-28T09:45:00Z",
        updatedAt: "2025-10-07T16:00:00Z",
        visaTypes: [
          {
            id: "taiwan-tourist",
            name: "Du lịch cá nhân",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Khởi hành",
                prices: [
                  {
                    adult: "3,200,000 VNĐ",
                    child_6_12: "2,200,000 VNĐ",
                    child_under_6: "1,200,000 VNĐ",
                    consularFee: "50 USD (single) - 100 USD (multiple)",
                    serviceFee: "Từ 1,800,000 VNĐ",
                    note: "Giá có thể thay đổi tùy loại visa"
                  }
                ],
                description: "Bao gồm xử lý hồ sơ, điền form, đặt lịch hẹn nộp/nhận hồ sơ."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 4x6 nền trắng", "Tờ khai xin visa", "Giấy tờ tùy thân"],
              work_individual: ["Hợp đồng lao động", "Xác nhận chức vụ/Lương 3 tháng gần nhất"],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng 3 tháng", "Sổ tiết kiệm tối thiểu 100 triệu"],
              travel: ["Vé máy bay khứ hồi", "Xác nhận đặt phòng khách sạn"]
            }
          }
        ],
        media: []
      },
      {
        slug: "india",
        continentSlug: "visa-chau-a",
        title: "Dịch Vụ Xin Visa Ấn Độ (India)",
        countryName: "Ấn Độ",
        heroImage: "https://images.unsplash.com/photo-1564507548766-261561f3244b",
        successRate: "99%",
        processingTime: "3-5 ngày làm việc (E-visa)",
        description: "Hỗ trợ xin E-visa du lịch, công tác Ấn Độ nhanh chóng và tiện lợi.",
        services: ["Điền đơn E-visa", "Kiểm tra và chuẩn hóa ảnh/hộ chiếu", "Theo dõi và thông báo kết quả"],
        status: "published",
        createdAt: "2025-09-30T11:00:00Z",
        updatedAt: "2025-10-06T09:00:00Z",
        visaTypes: [
          {
            id: "india-e-visa",
            name: "E-Visa Du lịch",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Du lịch",
                prices: [
                  {
                    adult: "2,500,000 VNĐ",
                    child_6_12: "2,500,000 VNĐ",
                    child_under_6: "1,500,000 VNĐ",
                    consularFee: "10 USD - 80 USD (tùy thời hạn)",
                    serviceFee: "Từ 1,000,000 VNĐ",
                    note: "Chỉ áp dụng cho E-visa"
                  }
                ],
                description: "Bao gồm xử lý hồ sơ online, điền đơn, nộp phí LSQ và nhận E-visa."
              }
            ],
            requirements: {
              personal: ["Scan Hộ chiếu còn hạn trên 6 tháng", "Ảnh 5x5 nền trắng (scan)"],
              work_individual: [],
              work_enterprise: [],
              financial: [],
              travel: ["Vé máy bay khứ hồi", "Booking khách sạn"]
            }
          }
        ],
        media: []
      },
      {
        slug: "south-africa",
        continentSlug: "visa-chau-phi",
        title: "Dịch Vụ Xin Visa Nam Phi",
        countryName: "Nam Phi",
        heroImage: "https://images.unsplash.com/photo-1547477521-789f21d3f2a8",
        successRate: "92%",
        processingTime: "10-15 ngày làm việc",
        description: "Xin visa du lịch, công tác Nam Phi, thủ tục đơn giản, hỗ trợ nộp hồ sơ tại Đại sứ quán.",
        services: ["Tư vấn hồ sơ", "Dịch thuật công chứng", "Nộp hồ sơ trực tiếp tại Đại sứ quán"],
        status: "published",
        createdAt: "2025-10-01T14:00:00Z",
        updatedAt: "2025-10-07T10:30:00Z",
        visaTypes: [
          {
            id: "south-africa-tourist",
            name: "Du lịch",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Safari",
                prices: [
                  {
                    adult: "5,000,000 VNĐ",
                    child_6_12: "4,000,000 VNĐ",
                    child_under_6: "2,000,000 VNĐ",
                    consularFee: "Khoảng 1,000,000 VNĐ (tùy tỷ giá)",
                    serviceFee: "Từ 3,000,000 VNĐ",
                    note: "Giá không bao gồm phí chuyển phát nhanh"
                  }
                ],
                description: "Xử lý hồ sơ, dịch thuật, điền form, sắp xếp hồ sơ nộp LSQ."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 3.5x4.5 nền trắng", "Mẫu đơn DHA-84", "Giấy tờ cá nhân công chứng"],
              work_individual: ["Thư xác nhận công việc/học tập"],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng 3 tháng", "Chứng minh đủ khả năng chi trả cho chuyến đi"],
              travel: ["Vé máy bay khứ hồi", "Booking khách sạn/Thư mời từ Nam Phi"]
            }
          }
        ],
        media: []
      },
      {
        slug: "thailand",
        continentSlug: "visa-chau-a",
        title: "Dịch Vụ Xin Visa Thái Lan (Lao động/Định cư)",
        countryName: "Thái Lan",
        heroImage: "https://images.unsplash.com/photo-1518548419972-78ffb36a117b",
        successRate: "98%",
        processingTime: "7-10 ngày làm việc (trừ Miễn thị thực)",
        description: "Hỗ trợ xin các loại visa Non-Immigrant (B, O, ED) cho mục đích công tác, học tập, hoặc kết hôn.",
        services: ["Tư vấn visa Non-B/Non-O", "Hỗ trợ chuẩn bị giấy tờ từ Thái Lan", "Nộp hồ sơ tại LSQ"],
        status: "published",
        createdAt: "2025-10-02T08:30:00Z",
        updatedAt: "2025-10-07T18:00:00Z",
        visaTypes: [
          {
            id: "thailand-non-b",
            name: "Non-Immigrant B (Công tác)",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Công tác",
                prices: [
                  {
                    adult: "3,500,000 VNĐ",
                    child_6_12: "3,500,000 VNĐ",
                    child_under_6: "1,500,000 VNĐ",
                    consularFee: "80 USD (single) - 200 USD (multiple)",
                    serviceFee: "Từ 2,000,000 VNĐ",
                    note: "Phí dịch vụ chưa bao gồm phí xin Giấy phép lao động (Work Permit)"
                  }
                ],
                description: "Xử lý hồ sơ, thư mời, giấy tờ công ty phía Thái Lan."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 4x6 nền trắng", "Đơn xin visa", "Bản sao đăng ký kết hôn (nếu đi cùng vợ/chồng)"],
              work_individual: ["Hợp đồng lao động", "Quyết định cử đi công tác"],
              work_enterprise: ["Thư mời từ công ty Thái Lan", "Giấy phép đăng ký kinh doanh của công ty Thái Lan"],
              financial: ["Bảng lương 6 tháng", "Sao kê tài khoản cá nhân"],
              travel: ["Vé máy bay khứ hồi (hoặc một chiều)", "Booking khách sạn/Hợp đồng thuê nhà"]
            }
          }
        ],
        media: []
      },
      {
        slug: "dubai",
        continentSlug: "visa-chau-a",
        title: "Dịch Vụ Xin Visa Dubai (UAE)",
        countryName: "Các Tiểu Vương Quốc Ả Rập Thống Nhất",
        heroImage: "https://images.unsplash.com/photo-1512495159081-3315a6b10766",
        successRate: "99%",
        processingTime: "2-4 ngày làm việc",
        description: "Xin E-visa du lịch, công tác Dubai 30 ngày/60 ngày, thủ tục nhanh, đơn giản.",
        services: ["Nộp hồ sơ E-visa", "Tư vấn hồ sơ khó (single female travel)", "Theo dõi tiến độ visa"],
        status: "published",
        createdAt: "2025-10-03T10:00:00Z",
        updatedAt: "2025-10-07T19:30:00Z",
        visaTypes: [
          {
            id: "dubai-tourist",
            name: "E-Visa Du lịch 30 ngày",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Du lịch",
                prices: [
                  {
                    adult: "4,500,000 VNĐ",
                    child_6_12: "4,500,000 VNĐ",
                    child_under_6: "3,500,000 VNĐ",
                    consularFee: "Khoảng 100 USD (bao gồm bảo hiểm)",
                    serviceFee: "Từ 2,500,000 VNĐ",
                    note: "Giá visa có thể thay đổi tùy thuộc vào hãng hàng không bảo lãnh"
                  }
                ],
                description: "Xử lý hồ sơ online, nộp phí chính phủ và nhận E-visa."
              }
            ],
            requirements: {
              personal: ["Scan Hộ chiếu còn hạn trên 6 tháng", "Ảnh thẻ 4x6 nền trắng (scan)"],
              work_individual: [],
              work_enterprise: [],
              financial: [],
              travel: ["Vé máy bay khứ hồi (hoặc thông tin booking)"]
            }
          }
        ],
        media: []
      },
      {
        slug: "new-zealand",
        continentSlug: "visa-chau-dai-duong",
        title: "Dịch Vụ Xin Visa New Zealand",
        countryName: "New Zealand",
        heroImage: "https://images.unsplash.com/photo-1510414169724-4f93427181f2",
        successRate: "90%",
        processingTime: "20-40 ngày làm việc",
        description: "Hỗ trợ xin visa du lịch, thăm thân (Visitor Visa) New Zealand online, hồ sơ kỹ lưỡng.",
        services: ["Nộp hồ sơ online", "Tư vấn chứng minh mối ràng buộc", "Dịch thuật công chứng"],
        status: "published",
        createdAt: "2025-10-04T12:00:00Z",
        updatedAt: "2025-10-07T20:00:00Z",
        visaTypes: [
          {
            id: "nz-visitor",
            name: "Visitor Visa (Du lịch/Thăm thân)",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Premium",
                prices: [
                  {
                    adult: "7,200,000 VNĐ",
                    child_6_12: "7,200,000 VNĐ",
                    child_under_6: "4,000,000 VNĐ",
                    consularFee: "246 NZD (Phí chính phủ + Phí IVL)",
                    serviceFee: "Từ 4,500,000 VNĐ",
                    note: "Chi phí chưa bao gồm phí dịch thuật và phí sinh trắc học"
                  }
                ],
                description: "Bao gồm xử lý hồ sơ, điền form, nộp hồ sơ online, và theo dõi tiến trình."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 4.5x3.5 nền trắng (scan)", "Giấy khai sinh/Kết hôn"],
              work_individual: ["Hợp đồng lao động", "Thư xác nhận công tác/nghỉ phép"],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng 6 tháng", "Sổ tiết kiệm (min 150 triệu VNĐ)", "Bằng chứng sở hữu tài sản"],
              travel: ["Vé máy bay khứ hồi (dự kiến)", "Booking khách sạn/Thư mời"]
            }
          }
        ],
        media: []
      },
      {
        slug: "germany",
        continentSlug: "visa-chau-au",
        title: "Dịch Vụ Xin Visa Đức (Schengen)",
        countryName: "Đức",
        heroImage: "https://images.unsplash.com/photo-1542466500-dcc217983059",
        successRate: "95%",
        processingTime: "15-20 ngày làm việc",
        description: "Xin visa Schengen qua Đại sứ quán Đức, thích hợp cho du lịch và công tác Châu Âu.",
        services: ["Điền đơn Videx", "Đặt lịch hẹn VFS", "Mua bảo hiểm du lịch", "Tư vấn hồ sơ công tác"],
        status: "published",
        createdAt: "2025-10-05T09:00:00Z",
        updatedAt: "2025-10-07T21:15:00Z",
        visaTypes: [
          {
            id: "germany-schengen",
            name: "Du lịch (Type C)",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Cơ bản",
                prices: [
                  {
                    adult: "6,800,000 VNĐ",
                    child_6_12: "4,800,000 VNĐ",
                    child_under_6: "3,800,000 VNĐ",
                    consularFee: "80 EURO + Phí dịch vụ VFS",
                    serviceFee: "Từ 4,000,000 VNĐ",
                    note: "Giá có thể thay đổi tùy tỷ giá Euro"
                  }
                ],
                description: "Hỗ trợ trọn gói hồ sơ, dịch thuật, điền đơn Videx, sắp xếp hồ sơ tại VFS."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 3.5x4.5 nền trắng", "Tờ khai xin visa Videx", "Bảo hiểm du lịch"],
              work_individual: ["Hợp đồng lao động", "Xác nhận công tác/Nghỉ phép"],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng 3-6 tháng", "Sổ tiết kiệm tối thiểu 100 triệu"],
              travel: ["Vé máy bay khứ hồi", "Booking khách sạn", "Lịch trình chi tiết"]
            }
          }
        ],
        media: []
      },
      {
        slug: "turkey",
        continentSlug: "visa-chau-au",
        title: "Dịch Vụ Xin Visa Thổ Nhĩ Kỳ (Turkey)",
        countryName: "Thổ Nhĩ Kỳ",
        heroImage: "https://images.unsplash.com/photo-1524388836267-27b9a528f110",
        successRate: "97%",
        processingTime: "7-10 ngày làm việc",
        description: "Hỗ trợ xin E-visa (nếu đủ điều kiện) và visa dán du lịch Thổ Nhĩ Kỳ.",
        services: ["Tư vấn E-visa và Visa dán", "Hoàn thiện hồ sơ theo yêu cầu LSQ", "Đặt lịch hẹn VFS"],
        status: "published",
        createdAt: "2025-10-06T14:30:00Z",
        updatedAt: "2025-10-07T21:30:00Z",
        visaTypes: [
          {
            id: "turkey-tourist",
            name: "Du lịch (Visa dán)",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Phổ thông",
                prices: [
                  {
                    adult: "3,800,000 VNĐ",
                    child_6_12: "2,800,000 VNĐ",
                    child_under_6: "1,800,000 VNĐ",
                    consularFee: "Khoảng 60 USD (single) - 100 USD (multiple)",
                    serviceFee: "Từ 2,000,000 VNĐ",
                    note: "Phí dịch vụ chưa bao gồm phí nộp VFS"
                  }
                ],
                description: "Bao gồm xử lý hồ sơ, dịch thuật (nếu cần), điền đơn, đặt lịch hẹn nộp hồ sơ."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 5x6 nền trắng", "Đơn xin visa online", "Giấy tờ tùy thân"],
              work_individual: ["Hợp đồng lao động", "Xác nhận công tác/Nghỉ phép"],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng 3 tháng", "Sổ tiết kiệm tối thiểu 100 triệu"],
              travel: ["Vé máy bay khứ hồi", "Booking khách sạn", "Bảo hiểm du lịch"]
            }
          }
        ],
        media: []
      },
      {
        slug: "singapore",
        continentSlug: "visa-chau-a",
        title: "Dịch Vụ Xin Visa Singapore (Đối với nữ)",
        countryName: "Singapore",
        heroImage: "https://images.unsplash.com/photo-1541014526284-469b85c1893c",
        successRate: "99%",
        processingTime: "3-7 ngày làm việc",
        description: "Hỗ trợ xin E-visa cho công dân Việt Nam, đặc biệt là phụ nữ trẻ đi một mình.",
        services: ["Nộp hồ sơ E-visa (via đối tác/agency)", "Tư vấn chứng minh nghề nghiệp", "Theo dõi kết quả visa"],
        status: "published",
        createdAt: "2025-10-07T08:00:00Z",
        updatedAt: "2025-10-07T22:00:00Z",
        visaTypes: [
          {
            id: "singapore-tourist",
            name: "E-Visa Du lịch",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Cơ bản",
                prices: [
                  {
                    adult: "1,800,000 VNĐ",
                    child_6_12: "1,800,000 VNĐ",
                    child_under_6: "1,000,000 VNĐ",
                    consularFee: "30 SGD",
                    serviceFee: "Từ 1,000,000 VNĐ",
                    note: "Giá cao hơn đối với nữ giới trẻ đi một mình"
                  }
                ],
                description: "Xử lý hồ sơ, điền form online, nộp qua đối tác được cấp phép."
              }
            ],
            requirements: {
              personal: ["Scan Hộ chiếu còn hạn trên 6 tháng", "Ảnh 4x6 nền trắng (scan)"],
              work_individual: ["Hợp đồng lao động/Thẻ nhân viên (nếu có)"],
              work_enterprise: [],
              financial: [],
              travel: ["Vé máy bay khứ hồi", "Booking khách sạn"]
            }
          }
        ],
        media: []
      },
      {
        slug: "netherlands",
        continentSlug: "visa-chau-au",
        title: "Dịch Vụ Xin Visa Hà Lan (Schengen)",
        countryName: "Hà Lan",
        heroImage: "https://images.unsplash.com/photo-1507548598851-91a62961d36c",
        successRate: "93%",
        processingTime: "15-20 ngày làm việc",
        description: "Xin visa Schengen qua VFS Hà Lan, thủ tục nghiêm ngặt, chuyên nghiệp.",
        services: ["Tư vấn hồ sơ", "Hoàn thiện hồ sơ theo checklist", "Đặt lịch hẹn VFS"],
        status: "published",
        createdAt: "2025-10-08T10:00:00Z",
        updatedAt: "2025-10-08T10:00:00Z",
        visaTypes: [
          {
            id: "netherlands-schengen",
            name: "Du lịch (Type C)",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Hoàn thiện",
                prices: [
                  {
                    adult: "7,500,000 VNĐ",
                    child_6_12: "5,500,000 VNĐ",
                    child_under_6: "4,500,000 VNĐ",
                    consularFee: "80 EURO + Phí VFS",
                    serviceFee: "Từ 4,500,000 VNĐ",
                    note: "Yêu cầu cung cấp giấy tờ trung thực tuyệt đối"
                  }
                ],
                description: "Hỗ trợ trọn gói hồ sơ, dịch thuật, điền đơn, sắp xếp hồ sơ chứng minh tài chính."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 3.5x4.5 nền trắng", "Tờ khai xin visa", "Bảo hiểm du lịch 30.000 Euro"],
              work_individual: ["Hợp đồng lao động/Quyết định bổ nhiệm", "Xác nhận công tác/Đơn nghỉ phép"],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng 6 tháng", "Sổ tiết kiệm tối thiểu 120 triệu"],
              travel: ["Vé máy bay khứ hồi", "Booking khách sạn", "Lịch trình chi tiết"]
            }
          }
        ],
        media: []
      },
      {
        slug: "mexico",
        continentSlug: "visa-chau-my",
        title: "Dịch Vụ Xin Visa Mexico",
        countryName: "Mexico",
        heroImage: "https://images.unsplash.com/photo-1517424911762-c0733a1f81d5",
        successRate: "85%",
        processingTime: "10-15 ngày (chờ phỏng vấn)",
        description: "Hỗ trợ xin visa du lịch, công tác Mexico, tư vấn miễn visa cho người có visa Mỹ/Schengen.",
        services: ["Tư vấn miễn visa", "Điền đơn xin visa", "Luyện phỏng vấn 1-1", "Đặt lịch hẹn LSQ"],
        status: "published",
        createdAt: "2025-10-09T14:00:00Z",
        updatedAt: "2025-10-09T14:00:00Z",
        visaTypes: [
          {
            id: "mexico-visitor",
            name: "Du lịch/Thăm thân",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Phỏng vấn",
                prices: [
                  {
                    adult: "5,500,000 VNĐ",
                    child_6_12: "5,500,000 VNĐ",
                    child_under_6: "3,000,000 VNĐ",
                    consularFee: "51 USD",
                    serviceFee: "Từ 3,500,000 VNĐ",
                    note: "Chi phí chưa bao gồm phí dịch thuật công chứng"
                  }
                ],
                description: "Xử lý hồ sơ, dịch thuật, điền đơn, luyện phỏng vấn tập trung."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 3.5x4.4 nền trắng", "Đơn xin visa", "Giấy tờ tùy thân"],
              work_individual: ["Hợp đồng lao động", "Xác nhận công tác"],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng 12 tháng (tối thiểu 15 triệu VNĐ/tháng)", "Sổ tiết kiệm (min 100 triệu, gửi trên 1 năm)"],
              travel: ["Vé máy bay khứ hồi (đã mua)", "Booking khách sạn", "Lịch trình chi tiết"]
            }
          }
        ],
        media: []
      },
      {
        slug: "south-korea-multiple",
        continentSlug: "visa-chau-a",
        title: "Dịch Vụ Xin Visa Hàn Quốc (Multiple 5 năm)",
        countryName: "Hàn Quốc (Multiple)",
        heroImage: "https://images.unsplash.com/photo-1619864239828-91217c46c07a",
        successRate: "90%",
        processingTime: "15-20 ngày làm việc",
        description: "Chuyên xin visa nhập cảnh nhiều lần (C-3-91) 5 năm, tư vấn điều kiện nộp hồ sơ.",
        services: ["Tư vấn điều kiện nộp multiple", "Kiểm tra hồ sơ nâng cao", "Nộp hồ sơ tại KVAC"],
        status: "published",
        createdAt: "2025-10-10T08:00:00Z",
        updatedAt: "2025-10-10T08:00:00Z",
        visaTypes: [
          {
            id: "korea-multiple",
            name: "Du lịch Multiple (5 năm)",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Đặc quyền",
                prices: [
                  {
                    adult: "5,000,000 VNĐ",
                    child_6_12: "5,000,000 VNĐ",
                    child_under_6: "3,000,000 VNĐ",
                    consularFee: "80 USD",
                    serviceFee: "Từ 3,500,000 VNĐ",
                    note: "Áp dụng cho người có hộ khẩu Hà Nội/HCM hoặc đã từng có visa châu Âu/Mỹ/Canada"
                  }
                ],
                description: "Hỗ trợ chứng minh điều kiện và nộp hồ sơ xin visa multiple."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 3.5x4.5 nền trắng", "Đơn xin visa", "Hộ khẩu (chứng minh điều kiện)"],
              work_individual: ["Giấy tờ chứng minh thu nhập cao/chức vụ cao (nếu nộp theo điều kiện thu nhập)"],
              work_enterprise: [],
              financial: ["Giấy tờ nhà đất/Sở hữu ô tô"],
              travel: ["Vé máy bay khứ hồi", "Xác nhận đặt phòng khách sạn"]
            }
          }
        ],
        media: []
      },
      {
        slug: "qatar",
        continentSlug: "visa-chau-a",
        title: "Dịch Vụ Xin Visa Qatar",
        countryName: "Qatar",
        heroImage: "https://images.unsplash.com/photo-1549487922-80718526a540",
        successRate: "99%",
        processingTime: "5-7 ngày làm việc",
        description: "Hỗ trợ xin E-visa du lịch, quá cảnh, công tác Qatar, thủ tục đơn giản.",
        services: ["Điền đơn E-visa", "Tư vấn hồ sơ", "Theo dõi và thông báo kết quả"],
        status: "published",
        createdAt: "2025-10-11T12:00:00Z",
        updatedAt: "2025-10-11T12:00:00Z",
        visaTypes: [
          {
            id: "qatar-e-visa",
            name: "E-Visa Du lịch",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Phổ thông",
                prices: [
                  {
                    adult: "3,000,000 VNĐ",
                    child_6_12: "3,000,000 VNĐ",
                    child_under_6: "2,000,000 VNĐ",
                    consularFee: "Khoảng 100 QAR",
                    serviceFee: "Từ 1,500,000 VNĐ",
                    note: "Visa được nộp qua hệ thống của Bộ Nội vụ Qatar"
                  }
                ],
                description: "Bao gồm xử lý hồ sơ online và nộp phí chính phủ."
              }
            ],
            requirements: {
              personal: ["Scan Hộ chiếu còn hạn trên 6 tháng", "Ảnh 4x6 nền trắng (scan)"],
              work_individual: [],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng (nếu cần)"],
              travel: ["Vé máy bay khứ hồi (có thể yêu cầu vé Qatar Airways)"]
            }
          }
        ],
        media: []
      },
      {
        slug: "greece",
        continentSlug: "visa-chau-au",
        title: "Dịch Vụ Xin Visa Hy Lạp (Schengen)",
        countryName: "Hy Lạp",
        heroImage: "https://images.unsplash.com/photo-1530990426861-12c1b18d2f7b",
        successRate: "94%",
        processingTime: "15-20 ngày làm việc",
        description: "Xin visa Schengen qua Đại sứ quán Hy Lạp, khám phá lịch sử và đảo Santorini.",
        services: ["Tư vấn hồ sơ", "Dịch thuật công chứng", "Đặt lịch hẹn VFS"],
        status: "published",
        createdAt: "2025-10-12T09:30:00Z",
        updatedAt: "2025-10-12T09:30:00Z",
        visaTypes: [
          {
            id: "greece-schengen",
            name: "Du lịch (Type C)",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Địa Trung Hải",
                prices: [
                  {
                    adult: "7,000,000 VNĐ",
                    child_6_12: "5,000,000 VNĐ",
                    child_under_6: "4,000,000 VNĐ",
                    consularFee: "80 EURO + Phí VFS",
                    serviceFee: "Từ 4,000,000 VNĐ",
                    note: "Yêu cầu bảo hiểm du lịch có mức bồi thường cao"
                  }
                ],
                description: "Hỗ trợ trọn gói hồ sơ, dịch thuật, điền đơn, sắp xếp hồ sơ tại VFS."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 3.5x4.5 nền trắng", "Tờ khai xin visa", "Bảo hiểm du lịch"],
              work_individual: ["Hợp đồng lao động", "Xác nhận công tác/Nghỉ phép"],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng 6 tháng", "Sổ tiết kiệm tối thiểu 120 triệu"],
              travel: ["Vé máy bay khứ hồi", "Booking khách sạn", "Lịch trình chi tiết"]
            }
          }
        ],
        media: []
      },
      {
        slug: "south-america-general",
        continentSlug: "visa-chau-my",
        title: "Dịch Vụ Xin Visa Brazil & Argentina",
        countryName: "Brazil & Argentina",
        heroImage: "https://images.unsplash.com/photo-1549557929-e58f000302b1",
        successRate: "80%",
        processingTime: "20-30 ngày làm việc",
        description: "Hỗ trợ xin visa du lịch Nam Mỹ, tư vấn thủ tục khó đối với các nước khu vực này.",
        services: ["Tư vấn hồ sơ", "Dịch thuật", "Đặt lịch hẹn LSQ"],
        status: "draft",
        createdAt: "2025-10-13T10:00:00Z",
        updatedAt: "2025-10-13T10:00:00Z",
        visaTypes: [
          {
            id: "brazil-tourist",
            name: "Du lịch Brazil",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Nam Mỹ",
                prices: [
                  {
                    adult: "8,000,000 VNĐ",
                    child_6_12: "6,000,000 VNĐ",
                    child_under_6: "4,000,000 VNĐ",
                    consularFee: "Khoảng 120 USD",
                    serviceFee: "Từ 5,000,000 VNĐ",
                    note: "Yêu cầu tiêm chủng Sốt Vàng Da (tùy thời điểm)"
                  }
                ],
                description: "Xử lý hồ sơ, dịch thuật, điền form, nộp/nhận hồ sơ tại Lãnh sự quán."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 3x4 nền trắng", "Tờ khai xin visa", "Giấy chứng nhận tiêm chủng"],
              work_individual: ["Chứng minh nghề nghiệp"],
              work_enterprise: [],
              financial: ["Sao kê tài khoản 6 tháng", "Sổ tiết kiệm"],
              travel: ["Vé máy bay khứ hồi", "Booking khách sạn"]
            }
          }
        ],
        media: []
      },
      {
        slug: "italy",
        continentSlug: "visa-chau-au",
        title: "Dịch Vụ Xin Visa Ý (Schengen)",
        countryName: "Ý (Italia)",
        heroImage: "https://images.unsplash.com/photo-1552832230-14cd3b92200d",
        successRate: "95%",
        processingTime: "15-20 ngày làm việc",
        description: "Xin visa Schengen qua Đại sứ quán Ý, khám phá vẻ đẹp cổ kính và thời trang của châu Âu.",
        services: ["Điền đơn online", "Đặt lịch hẹn VFS", "Hỗ trợ mua bảo hiểm du lịch", "Tư vấn hồ sơ công tác"],
        status: "published",
        createdAt: "2025-10-14T08:00:00Z",
        updatedAt: "2025-10-14T08:00:00Z",
        visaTypes: [
          {
            id: "italy-schengen",
            name: "Du lịch (Type C)",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Renaissance",
                prices: [
                  {
                    adult: "7,000,000 VNĐ",
                    child_6_12: "5,000,000 VNĐ",
                    child_under_6: "4,000,000 VNĐ",
                    consularFee: "80 EURO + Phí dịch vụ VFS",
                    serviceFee: "Từ 4,000,000 VNĐ",
                    note: "Giá chưa bao gồm phí dịch thuật công chứng"
                  }
                ],
                description: "Hỗ trợ trọn gói hồ sơ, dịch thuật, điền đơn, sắp xếp hồ sơ tài chính."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 3.5x4.5 nền trắng", "Tờ khai xin visa", "Bảo hiểm du lịch"],
              work_individual: ["Hợp đồng lao động", "Xác nhận công tác/Nghỉ phép"],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng 6 tháng", "Sổ tiết kiệm tối thiểu 100 triệu"],
              travel: ["Vé máy bay khứ hồi", "Booking khách sạn/Thư mời", "Lịch trình chi tiết"]
            }
          }
        ],
        media: []
      },
      {
        slug: "spain",
        continentSlug: "visa-chau-au",
        title: "Dịch Vụ Xin Visa Tây Ban Nha (Schengen)",
        countryName: "Tây Ban Nha",
        heroImage: "https://images.unsplash.com/photo-1560960012-32a76f2357a8",
        successRate: "93%",
        processingTime: "15-25 ngày làm việc",
        description: "Xin visa Schengen qua Đại sứ quán Tây Ban Nha, khám phá văn hóa La-tin sôi động.",
        services: ["Điền đơn online", "Đặt lịch hẹn BLS/VFS", "Tư vấn chứng minh chỗ ở"],
        status: "published",
        createdAt: "2025-10-15T09:30:00Z",
        updatedAt: "2025-10-15T09:30:00Z",
        visaTypes: [
          {
            id: "spain-schengen",
            name: "Du lịch (Type C)",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói La-tin",
                prices: [
                  {
                    adult: "7,200,000 VNĐ",
                    child_6_12: "5,200,000 VNĐ",
                    child_under_6: "4,200,000 VNĐ",
                    consularFee: "80 EURO + Phí dịch vụ BLS",
                    serviceFee: "Từ 4,200,000 VNĐ",
                    note: "Cần công chứng tất cả hồ sơ dịch thuật"
                  }
                ],
                description: "Hỗ trợ trọn gói hồ sơ, dịch thuật công chứng, điền đơn, sắp xếp hồ sơ."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 3.5x4.5 nền trắng", "Tờ khai xin visa", "Bảo hiểm du lịch"],
              work_individual: ["Hợp đồng lao động", "Xác nhận công tác/Nghỉ phép"],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng 6 tháng", "Sổ tiết kiệm tối thiểu 120 triệu"],
              travel: ["Vé máy bay khứ hồi", "Booking khách sạn/Hợp đồng thuê nhà", "Lịch trình chi tiết"]
            }
          }
        ],
        media: []
      },
      {
        slug: "switzerland",
        continentSlug: "visa-chau-au",
        title: "Dịch Vụ Xin Visa Thụy Sĩ (Schengen)",
        countryName: "Thụy Sĩ",
        heroImage: "https://images.unsplash.com/photo-1550218765-a84976766444",
        successRate: "96%",
        processingTime: "15-20 ngày làm việc",
        description: "Xin visa Schengen qua Đại sứ quán Thụy Sĩ, nổi tiếng về độ khó và yêu cầu cao về tài chính.",
        services: ["Tư vấn hồ sơ kỹ lưỡng", "Hoàn thiện hồ sơ chứng minh tài chính", "Đặt lịch hẹn VFS"],
        status: "published",
        createdAt: "2025-10-16T11:00:00Z",
        updatedAt: "2025-10-16T11:00:00Z",
        visaTypes: [
          {
            id: "switzerland-schengen",
            name: "Du lịch (Type C)",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Alpine",
                prices: [
                  {
                    adult: "8,500,000 VNĐ",
                    child_6_12: "6,500,000 VNĐ",
                    child_under_6: "5,500,000 VNĐ",
                    consularFee: "80 EURO + Phí dịch vụ VFS",
                    serviceFee: "Từ 5,000,000 VNĐ",
                    note: "Yêu cầu nghiêm ngặt về chứng minh tài chính và công việc"
                  }
                ],
                description: "Xử lý hồ sơ, dịch thuật, điền đơn, tập trung vào tính logic của chuyến đi và hồ sơ tài chính."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 3.5x4.5 nền trắng", "Tờ khai xin visa", "Bảo hiểm du lịch"],
              work_individual: ["Hợp đồng lao động", "Xác nhận công tác/Nghỉ phép", "Bảng lương 6 tháng"],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng 6 tháng", "Sổ tiết kiệm tối thiểu 150 triệu", "Giấy tờ nhà đất"],
              travel: ["Vé máy bay khứ hồi", "Booking khách sạn", "Lịch trình chi tiết và hợp lý"]
            }
          }
        ],
        media: []
      },
      {
        slug: "denmark",
        continentSlug: "visa-chau-au",
        title: "Dịch Vụ Xin Visa Đan Mạch (Schengen)",
        countryName: "Đan Mạch",
        heroImage: "https://images.unsplash.com/photo-1552520697-76b4a3a30368",
        successRate: "92%",
        processingTime: "15-20 ngày làm việc",
        description: "Xin visa Schengen qua Đại sứ quán Đan Mạch, thủ tục nộp tại VFS.",
        services: ["Tư vấn hồ sơ", "Dịch thuật công chứng", "Đặt lịch hẹn VFS"],
        status: "published",
        createdAt: "2025-10-17T09:00:00Z",
        updatedAt: "2025-10-17T09:00:00Z",
        visaTypes: [
          {
            id: "denmark-schengen",
            name: "Du lịch (Type C)",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Viking",
                prices: [
                  {
                    adult: "6,500,000 VNĐ",
                    child_6_12: "4,500,000 VNĐ",
                    child_under_6: "3,500,000 VNĐ",
                    consularFee: "80 EURO + Phí VFS",
                    serviceFee: "Từ 3,800,000 VNĐ",
                    note: "Hồ sơ công tác yêu cầu thêm thư mời và giấy tờ công ty"
                  }
                ],
                description: "Xử lý hồ sơ, dịch thuật, điền đơn, sắp xếp hồ sơ."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 3.5x4.5 nền trắng", "Tờ khai xin visa", "Bảo hiểm du lịch"],
              work_individual: ["Hợp đồng lao động", "Xác nhận công tác/Nghỉ phép"],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng 3 tháng", "Sổ tiết kiệm tối thiểu 100 triệu"],
              travel: ["Vé máy bay khứ hồi", "Booking khách sạn", "Lịch trình chi tiết"]
            }
          }
        ],
        media: []
      },
      {
        slug: "ireland",
        continentSlug: "visa-chau-au",
        title: "Dịch Vụ Xin Visa Ireland (Ailen)",
        countryName: "Ireland",
        heroImage: "https://images.unsplash.com/photo-1536417769911-37d3ff53ed5b",
        successRate: "85%",
        processingTime: "15-25 ngày làm việc",
        description: "Xin visa du lịch, công tác Ireland (không thuộc khối Schengen), thủ tục riêng biệt.",
        services: ["Tư vấn hồ sơ Ireland", "Dịch thuật công chứng", "Nộp hồ sơ VFS"],
        status: "published",
        createdAt: "2025-10-18T10:00:00Z",
        updatedAt: "2025-10-18T10:00:00Z",
        visaTypes: [
          {
            id: "ireland-tourist",
            name: "Du lịch (Short Stay 'C')",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Đảo Xanh",
                prices: [
                  {
                    adult: "7,500,000 VNĐ",
                    child_6_12: "7,500,000 VNĐ",
                    child_under_6: "4,500,000 VNĐ",
                    consularFee: "60 EUR (single) - 100 EUR (multiple)",
                    serviceFee: "Từ 4,500,000 VNĐ",
                    note: "Yêu cầu chứng minh tài chính tương đối cao"
                  }
                ],
                description: "Hỗ trợ trọn gói hồ sơ, điền đơn online, dịch thuật, sắp xếp hồ sơ."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 3.5x4.5 nền trắng", "Tờ khai xin visa online", "Giấy tờ tùy thân"],
              work_individual: ["Hợp đồng lao động", "Xác nhận công tác/Nghỉ phép", "Bảng lương 6 tháng"],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng 6 tháng", "Sổ tiết kiệm (min 150 triệu, gửi trên 1 tháng)"],
              travel: ["Vé máy bay khứ hồi", "Booking khách sạn/Thư mời", "Bảo hiểm du lịch"]
            }
          }
        ],
        media: []
      },
      {
        slug: "japan-business",
        continentSlug: "visa-chau-a",
        title: "Dịch Vụ Xin Visa Nhật Bản (Công tác)",
        countryName: "Nhật Bản (Công tác)",
        heroImage: "https://images.unsplash.com/photo-1542407513-882410a69333",
        successRate: "98%",
        processingTime: "5-7 ngày làm việc",
        description: "Chuyên xin visa công tác Nhật Bản (Business Visa), hỗ trợ thư mời và hồ sơ từ phía Nhật.",
        services: ["Tư vấn visa công tác", "Kiểm tra hồ sơ công ty", "Nộp hồ sơ ủy thác tại LSQ"],
        status: "published",
        createdAt: "2025-10-19T08:30:00Z",
        updatedAt: "2025-10-19T08:30:00Z",
        visaTypes: [
          {
            id: "japan-business",
            name: "Công tác (Business)",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Doanh nghiệp",
                prices: [
                  {
                    adult: "4,500,000 VNĐ",
                    child_6_12: "4,500,000 VNĐ",
                    child_under_6: "2,500,000 VNĐ",
                    consularFee: "Khoảng 630,000 VNĐ",
                    serviceFee: "Từ 2,500,000 VNĐ",
                    note: "Giá có thể điều chỉnh nếu cần giấy tờ gấp"
                  }
                ],
                description: "Xử lý hồ sơ cá nhân và công ty, dịch thuật, điền đơn, nộp/nhận hồ sơ."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 4.5x3.5 nền trắng", "Tờ khai xin visa"],
              work_individual: ["Hợp đồng lao động", "Quyết định cử đi công tác"],
              work_enterprise: ["Thư mời từ Nhật Bản", "Giấy phép đăng ký kinh doanh công ty Việt Nam/Nhật Bản"],
              financial: ["Sao kê ngân hàng công ty/cá nhân"],
              travel: ["Vé máy bay khứ hồi", "Lịch trình công tác chi tiết"]
            }
          }
        ],
        media: []
      },
      {
        slug: "philippines",
        continentSlug: "visa-chau-a",
        title: "Dịch Vụ Xin Visa Philippines (Lao động/Du học)",
        countryName: "Philippines",
        heroImage: "https://images.unsplash.com/photo-1579974261623-1d0b5e2978d2",
        successRate: "99%",
        processingTime: "7-10 ngày làm việc (trừ Miễn thị thực)",
        description: "Hỗ trợ xin các loại visa Non-Immigrant cho mục đích lao động, du học tại Philippines.",
        services: ["Tư vấn visa du học/lao động", "Hoàn thiện hồ sơ theo yêu cầu Đại sứ quán"],
        status: "published",
        createdAt: "2025-10-20T11:00:00Z",
        updatedAt: "2025-10-20T11:00:00Z",
        visaTypes: [
          {
            id: "philippines-student",
            name: "Visa Du học (9f)",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Học tập",
                prices: [
                  {
                    adult: "3,500,000 VNĐ",
                    child_6_12: "3,500,000 VNĐ",
                    child_under_6: "2,500,000 VNĐ",
                    consularFee: "Khoảng 60 USD",
                    serviceFee: "Từ 2,000,000 VNĐ",
                    note: "Chi phí không bao gồm phí ghi danh trường học"
                  }
                ],
                description: "Xử lý hồ sơ cá nhân, thư chấp nhận của trường, chứng minh tài chính."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 4.5x3.5 nền trắng", "Đơn xin visa", "Giấy khai sinh"],
              work_individual: [],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng 3 tháng", "Sổ tiết kiệm (min 100 triệu)"],
              travel: ["Thư chấp nhận từ trường học", "Vé máy bay một chiều (hoặc khứ hồi)"]
            }
          }
        ],
        media: []
      },
      {
        slug: "south-america-peru",
        continentSlug: "visa-chau-my",
        title: "Dịch Vụ Xin Visa Peru",
        countryName: "Peru",
        heroImage: "https://images.unsplash.com/photo-1555620241-e94589d14660",
        successRate: "82%",
        processingTime: "15-25 ngày làm việc",
        description: "Hỗ trợ xin visa du lịch, công tác Peru, tư vấn miễn visa cho người có visa Mỹ/Schengen.",
        services: ["Tư vấn miễn visa", "Điền đơn xin visa", "Đặt lịch hẹn LSQ"],
        status: "draft",
        createdAt: "2025-10-21T10:00:00Z",
        updatedAt: "2025-10-21T10:00:00Z",
        visaTypes: [
          {
            id: "peru-tourist",
            name: "Du lịch",
            pricing: [
              {
                type: "Trọn gói",
                name: "Gói Inca",
                prices: [
                  {
                    adult: "7,000,000 VNĐ",
                    child_6_12: "5,000,000 VNĐ",
                    child_under_6: "4,000,000 VNĐ",
                    consularFee: "Khoảng 30 USD",
                    serviceFee: "Từ 4,500,000 VNĐ",
                    note: "Yêu cầu chứng minh tài chính ổn định và đủ mạnh"
                  }
                ],
                description: "Xử lý hồ sơ, dịch thuật, điền form, sắp xếp hồ sơ nộp Lãnh sự quán."
              }
            ],
            requirements: {
              personal: ["Hộ chiếu", "Ảnh 3.5x4.5 nền trắng", "Tờ khai xin visa", "Giấy tờ tùy thân"],
              work_individual: ["Chứng minh nghề nghiệp"],
              work_enterprise: [],
              financial: ["Sao kê ngân hàng 6 tháng", "Sổ tiết kiệm"],
              travel: ["Vé máy bay khứ hồi", "Booking khách sạn", "Lịch trình chi tiết"]
            }
          }
        ],
        media: []
      }
];

export const newsPreview : NewsPreview[] = [
    {
      id: 1,
      slug: 'bi-quyet-phong-van-visa-my',
      imageUrl: '/images/news/news-1.jpg',
      title: 'Bí quyết phỏng vấn visa Mỹ',
      category: [ 'visa', 'hướng dẫn', 'phỏng vấn', 'Mỹ' ],
      excerpt: 'Phỏng vấn là bước quan trọng nhất...',
      author: 'Chuyên gia Visa',
      date: '2024-07-29',
      readTime: '2 phút đọc',
    },
    {
      id: 2,
      slug: 'chinh-sach-visa-moi-cua-canada-co-hoi-cho-sinh-vien',
      imageUrl: '/images/news/news-2.jpg',
      title: 'Chính sách visa mới của Canada: Cơ hội cho sinh viên quốc tế',
      category: [ 'visa', 'du học', 'Canada', 'chính sách' ],
      excerpt: 'Canada nới lỏng quy định visa nhằm thu hút nhân tài.',
      author: 'Tư vấn Di trú',
      date: '2024-09-27',
      readTime: '3 phút đọc',
    },
    {
      id: 3,
      slug: '10-dia-diem-du-lich-bi-lang-quen-dong-nam-a',
      imageUrl: '/images/news/news-3.jpg',
      title: '10 địa điểm du lịch \'bị lãng quên\' ở Đông Nam Á',
      category: [ 'du lịch', 'Đông Nam Á', 'bí mật', 'khám phá' ],
      excerpt: 'Tránh xa đám đông tại các bãi biển và khu di tích nổi tiếng.',
      author: 'Travel Blogger',
      date: '2024-09-20',
      readTime: '4 phút đọc',
    },
    {
      id: 4,
      slug: 'bau-cu-my-tac-dong-thi-truong-chau-a',
      imageUrl: '/images/news/news-4.jpg',
      title: 'Bầu cử Mỹ: Tác động của cuộc tranh luận đầu tiên đến thị trường châu Á',
      category: [ 'tin tức nước ngoài', 'kinh tế', 'chính trị', 'Mỹ' ],
      excerpt: 'Thị trường châu Á phản ứng thận trọng trước kết quả tranh luận.',
      author: 'Chuyên gia Kinh tế',
      date: '2024-09-29',
      readTime: '2 phút đọc',
    },
    {
      id: 5,
      slug: 'quy-trinh-xin-visa-schengen-chi-tiet',
      imageUrl: '/images/news/news-1.jpg',
      title: 'Quy trình xin visa Schengen (Châu Âu) chi tiết từ A đến Z',
      category: [ 'visa', 'Châu Âu', 'Schengen', 'hồ sơ' ],
      excerpt: 'Hồ sơ tài chính và lịch trình du lịch là hai yếu tố quyết định.',
      author: 'Tư vấn Visa',
      date: '2024-09-15',
      readTime: '4 phút đọc',
    },
    {
      id: 6,
      slug: 'kinh-nghiem-du-lich-tu-tuc-nhat-ban',
      imageUrl: '/images/news/news-2.jpg',
      title: 'Kinh nghiệm du lịch tự túc Nhật Bản: Tàu điện và chỗ ở giá rẻ',
      category: [ 'du lịch', 'Nhật Bản', 'tự túc', 'tiết kiệm' ],
      excerpt: 'Hệ thống tàu điện Nhật Bản vô cùng phức tạp nhưng rất tiện lợi.',
      author: 'Phượt Thủ Á-Âu',
      date: '2024-08-05',
      readTime: '5 phút đọc',
    },
    {
      id: 7,
      slug: 'dien-bien-xung-dot-nga-ukraine-cap-nhat',
      imageUrl: '/images/news/news-3.jpg',
      title: 'Diễn biến xung đột Nga-Ukraine: Cập nhật tình hình mới nhất từ tiền tuyến',
      category: [ 'tin tức nước ngoài', 'quân sự', 'Nga', 'Ukraine' ],
      excerpt: 'Cuộc chiến vẫn đang diễn ra căng thẳng tại các khu vực trọng điểm.',
      author: 'Phân tích Quốc tế',
      date: '2024-09-29',
      readTime: '7 phút đọc',
    },
    {
      id: 8,
      slug: 'thu-tuc-nhap-cu-dien-tay-nghe-cao-tai-uc',
      imageUrl: '/images/news/news-4.jpg',
      title: 'Điều kiện và thủ tục nhập cư diện tay nghề cao tại Úc',
      category: [ 'visa', 'nhập cư', 'Úc', 'tay nghề', 'di trú' ],
      excerpt: 'Úc tiếp tục ưu tiên các ngành nghề về IT và Y tế.',
      author: 'Luật sư Di trú',
      date: '2024-09-25',
      readTime: '3 phút đọc',
    },
    {
      id: 9,
      slug: 'kham-pha-le-hoi-anh-sang-vivid-sydney',
      imageUrl: '/images/news/news-1.jpg',
      title: 'Khám phá Lễ hội Ánh sáng Vivid Sydney (Úc): Thời gian và hoạt động nổi bật',
      category: [ 'du lịch', 'Úc', 'lễ hội', 'Sydney' ],
      excerpt: 'Hàng triệu du khách đổ về Sydney để chiêm ngưỡng ánh sáng nghệ thuật.',
      author: 'Du lịch & Văn hóa',
      date: '2024-09-18',
      readTime: '2 phút đọc',
    },
    {
      id: 10,
      slug: 'eu-de-xuat-quy-dinh-moi-ve-ai',
      imageUrl: '/images/news/news-2.jpg',
      title: 'EU đề xuất quy định mới về AI: Cân bằng giữa đổi mới và an toàn',
      category: [ 'tin tức nước ngoài', 'AI', 'EU', 'công nghệ', 'pháp luật' ],
      excerpt: 'Châu Âu dẫn đầu thế giới trong việc pháp lý hóa AI.',
      author: 'Bình luận Công nghệ',
      date: '2024-08-20',
      readTime: '3 phút đọc',
    },
    {
      id: 11,
      slug: 'du-lich-han-quoc-khong-can-visa-keta',
      imageUrl: '/images/news/news-3.jpg',
      title: '5 điều cần chuẩn bị khi đi du lịch Hàn Quốc không cần visa (K-ETA)',
      category: [ 'visa', 'du lịch', 'Hàn Quốc', 'K-ETA', 'hướng dẫn' ],
      excerpt: 'Hàn Quốc tạo điều kiện cho du khách quốc tế với hệ thống K-ETA mới.',
      author: 'Korea Insight',
      date: '2024-09-01',
      readTime: '4 phút đọc',
    },
];
  