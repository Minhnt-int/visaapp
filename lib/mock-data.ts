
import { 
    VisaService,
    HomepageService, 
    Tour, 
    News, 
    VisaContinent, 
    TourCategory, 
    VisaDetail,
    Testimonial,
    RelatedArticle,
    NavItem,
    NewsPreview,
    ContactInfo
} from '@/types';
import { Briefcase, UserCheck, Award, ClipboardCheck, MessageSquare, FileText, CalendarCheck, CheckCircle, Shield, Star } from 'lucide-react';

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
      { day: "1", title: "Đà Nẵng - Ngũ Hành Sơn", description: "...", activities: [{ activity: "Tham quan Ngũ Hành Sơn" }] }
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
      content: "Nội dung chi tiết...",
      slug: "bi-quyet-phong-van-visa-my",
      keyword: ["visa", "hướng dẫn", "phỏng vấn", "Mỹ"],
      metaTitle: "Bí quyết phỏng vấn visa Mỹ",
      metaDescription: "Mẹo phỏng vấn visa Mỹ",
      metaKeywords: "visa my, phong van",
      description: "Mẹo phỏng vấn visa Mỹ",
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
      content: "Chi tiết về những thay đổi gần đây trong quy định cấp phép học tập và làm việc sau tốt nghiệp.",
      slug: "chinh-sach-visa-moi-cua-canada-co-hoi-cho-sinh-vien",
      keyword: ["visa", "du học", "Canada", "chính sách"],
      metaTitle: "Chính sách visa du học Canada mới nhất",
      metaDescription: "Phân tích những thay đổi có lợi cho sinh viên quốc tế tại Canada.",
      metaKeywords: "visa canada, du hoc, lam viec",
      description: "Phân tích những thay đổi có lợi cho sinh viên quốc tế tại Canada.",
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
      content: "Những viên ngọc thô chưa được khai thác, mang vẻ đẹp hoang sơ và văn hóa độc đáo.",
      slug: "10-dia-diem-du-lich-bi-lang-quen-dong-nam-a",
      keyword: ["du lịch", "Đông Nam Á", "bí mật", "khám phá"],
      metaTitle: "Khám phá 10 điểm du lịch bí mật ở Đông Nam Á",
      metaDescription: "Gợi ý những điểm đến ít người biết, lý tưởng cho kỳ nghỉ yên tĩnh.",
      metaKeywords: "du lich, dong nam a, hoang so, diem den",
      description: "Gợi ý những điểm đến ít người biết, lý tưởng cho kỳ nghỉ yên tĩnh.",
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
      content: "Phân tích sự biến động của chỉ số chứng khoán và đồng tiền các nước châu Á sau cuộc đối đầu chính trị.",
      slug: "bau-cu-my-tac-dong-thi-truong-chau-a",
      keyword: ["tin tức nước ngoài", "kinh tế", "chính trị", "Mỹ"],
      metaTitle: "Ảnh hưởng của bầu cử Mỹ đến thị trường tài chính châu Á",
      metaDescription: "Phân tích chuyên sâu về sự liên kết giữa chính trị Mỹ và kinh tế châu Á.",
      metaKeywords: "bau cu my, tin tuc, kinh te, chau a",
      description: "Phân tích chuyên sâu về sự liên kết giữa chính trị Mỹ và kinh tế châu Á.",
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
      content: "Các bước chuẩn bị hồ sơ, lịch hẹn và những sai lầm cần tránh khi xin visa khối Schengen.",
      slug: "quy-trinh-xin-visa-schengen-chi-tiet",
      keyword: ["visa", "Châu Âu", "Schengen", "hồ sơ"],
      metaTitle: "Hướng dẫn xin visa Schengen thành công",
      metaDescription: "Quy trình từng bước để hoàn tất hồ sơ visa du lịch Châu Âu.",
      metaKeywords: "visa schengen, chau au, ho so, huong dan",
      description: "Quy trình từng bước để hoàn tất hồ sơ visa du lịch Châu Âu.",
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
      content: "Mẹo sử dụng JR Pass hiệu quả và tìm kiếm khách sạn con nhộng (capsule hotel) tiết kiệm.",
      slug: "kinh-nghiem-du-lich-tu-tuc-nhat-ban",
      keyword: ["du lịch", "Nhật Bản", "tự túc", "tiết kiệm"],
      metaTitle: "Du lịch Nhật Bản tự túc và tiết kiệm chi phí",
      metaDescription: "Cẩm nang di chuyển và chỗ ở dành cho du khách muốn khám phá Nhật Bản.",
      metaKeywords: "du lich nhat ban, tu tuc, jr pass",
      description: "Cẩm nang di chuyển và chỗ ở dành cho du khách muốn khám phá Nhật Bản.",
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
      content: "Phân tích các báo cáo tình báo và đánh giá về chiến lược quân sự gần đây của cả hai bên.",
      slug: "dien-bien-xung-dot-nga-ukraine-cap-nhat",
      keyword: ["tin tức nước ngoài", "quân sự", "Nga", "Ukraine"],
      metaTitle: "Tin tức chiến sự Nga-Ukraine: Cập nhật hàng ngày",
      metaDescription: "Phân tích sâu sắc về những diễn biến mới nhất của cuộc xung đột.",
      metaKeywords: "chien su, nga ukraine, tin the gioi",
      description: "Phân tích sâu sắc về những diễn biến mới nhất của cuộc xung đột.",
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
      content: "Hướng dẫn chi tiết về các loại visa định cư diện tay nghề, hệ thống tính điểm và danh sách ngành nghề ưu tiên (Skilled Visa).",
      slug: "thu-tuc-nhap-cu-dien-tay-nghe-cao-tai-uc",
      keyword: ["visa", "nhập cư", "Úc", "tay nghề", "di trú"],
      metaTitle: "Nhập cư Úc diện tay nghề: Hướng dẫn chi tiết",
      metaDescription: "Tìm hiểu về cơ hội định cư Úc dành cho lao động có kỹ năng cao.",
      metaKeywords: "nhap cu uc, visa tay nghe, skilled visa",
      description: "Tìm hiểu về cơ hội định cư Úc dành cho lao động có kỹ năng cao.",
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
      content: "Tổng hợp những tác phẩm ánh sáng, nghệ thuật sắp đặt và sự kiện âm nhạc lớn nhất năm.",
      slug: "kham-pha-le-hoi-anh-sang-vivid-sydney",
      keyword: ["du lịch", "Úc", "lễ hội", "Sydney"],
      metaTitle: "Vivid Sydney: Lễ hội ánh sáng lớn nhất thế giới",
      metaDescription: "Thông tin cần biết để trải nghiệm trọn vẹn lễ hội Vivid Sydney hàng năm.",
      metaKeywords: "du lich uc, sydney, le hoi anh sang",
      description: "Thông tin cần biết để trải nghiệm trọn vẹn lễ hội Vivid Sydney hàng năm.",
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
      content: "Phân tích sâu về Đạo luật AI (AI Act) của Liên minh châu Âu và tác động toàn cầu của nó.",
      slug: "eu-de-xuat-quy-dinh-moi-ve-ai",
      keyword: ["tin tức nước ngoài", "AI", "EU", "công nghệ", "pháp luật"],
      metaTitle: "Đạo luật AI của EU: Điều chỉnh Trí tuệ Nhân tạo",
      metaDescription: "Tìm hiểu về những quy định chặt chẽ mà EU đặt ra cho các hệ thống AI rủi ro cao.",
      metaKeywords: "eu, ai act, tri tue nhan tao, quy dinh",
      description: "Tìm hiểu về những quy định chặt chẽ mà EU đặt ra cho các hệ thống AI rủi ro cao.",
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
      content: "Các bước đăng ký K-ETA, quy định nhập cảnh và mẹo vặt cần thiết cho chuyến đi của bạn.",
      slug: "du-lich-han-quoc-khong-can-visa-keta",
      keyword: ["visa", "du lịch", "Hàn Quốc", "K-ETA", "hướng dẫn"],
      metaTitle: "Du lịch Hàn Quốc với K-ETA: Hướng dẫn từ A đến Z",
      metaDescription: "Tất cả những gì bạn cần biết về hệ thống K-ETA mới của Hàn Quốc.",
      metaKeywords: "du lich han quoc, k-eta, visa",
      description: "Tất cả những gì bạn cần biết về hệ thống K-ETA mới của Hàn Quốc.",
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

export const mockVisaPageData: Record<string, VisaDetail> = {
    // Châu Á
    "china": {
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
                requirements: {
                    personal: [
                        "Hộ chiếu còn hạn trên 6 tháng",
                        "Ảnh 4.8x3.3 nền trắng",
                        "CMND/CCCD công chứng",
                        "Sổ hộ khẩu công chứng",
                        "Form xin visa mới nhất"
                    ],
                    work: [
                        {
                            type: "Người đi làm",
                            docs: [
                                "Hợp đồng lao động",
                                "Xác nhận công tác",
                                "Đơn xin nghỉ phép",
                                "Bảng lương 3 tháng"
                            ]
                        },
                        {
                            type: "Chủ doanh nghiệp",
                            docs: [
                                "Giấy phép kinh doanh",
                                "Báo cáo thuế",
                                "Đăng ký MST",
                                "Báo cáo tài chính"
                            ]
                        }
                    ],
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
        pricing: [
            {
                type: "standard",
                name: "Gói Thường",
                description: "Dành cho khách du lịch và công tác ngắn hạn",
                validity: "3 tháng",
                stayDuration: "Tối đa 30 ngày",
                processingTime: "7-10 ngày làm việc",
                prices: [
                    {
                        adult: "3,900,000 VNĐ",
                        child_6_12: "2,900,000 VNĐ",
                        child_under_6: "1,900,000 VNĐ",
                        consularFee: "140 USD",
                        serviceFee: "Từ 1,900,000 VNĐ",
                        note: "Giá có thể thay đổi theo tỷ giá USD"
                    }
                ]
            }
        ],
        testimonials: [
            {
                id: "cn-test-1",
                name: "Trương Văn M",
                quote: "Dịch vụ rất tốt, được hướng dẫn chi tiết về cách điền form và chuẩn bị hồ sơ.",
                rating: 5,
                image: "https://i.pravatar.cc/150?img=11"
            },
            {
                id: "cn-test-2",
                name: "Lý Thị N",
                quote: "Thủ tục nhanh gọn, nhân viên chuyên nghiệp. Đã nhận được visa đúng hẹn.",
                rating: 5,
                image: "https://i.pravatar.cc/150?img=12"
            }
        ],
        relatedArticles: [
            {
                id: "cn-art-1",
                title: "Hướng dẫn xin visa Trung Quốc 2025",
                url: "/tin-tuc/huong-dan-xin-visa-trung-quoc-2025",
                image: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b"
            },
            {
                id: "cn-art-2",
                title: "Kinh nghiệm du lịch Trung Quốc tự túc",
                url: "/tin-tuc/kinh-nghiem-du-lich-trung-quoc-tu-tuc",
                image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d"
            }
        ],
        visaImages: [
            {
                type: "Visa Trung Quốc",
                url: "https://images.unsplash.com/photo-1590674899484-d5640e854abe",
                description: "Mẫu visa Trung Quốc"
            },
            {
                type: "Great Wall",
                url: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b",
                description: "Vạn Lý Trường Thành"
            },
            {
                type: "Shanghai",
                url: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d",
                description: "Thượng Hải hiện đại"
            },
            {
                type: "Forbidden City",
                url: "https://images.unsplash.com/photo-1584646098378-0874589d76b1",
                description: "Tử Cấm Thành - Bắc Kinh"
            },
            {
                type: "Terracotta Army",
                url: "https://images.unsplash.com/photo-1591014007443-536cd5984d2c",
                description: "Đội quân đất nung - Tây An"
            }
        ]
    },

    "thai-lan": {
        continentSlug: "visa-chau-a",
        title: "Dịch Vụ Xin Visa Thái Lan",
        countryName: "Thái Lan",
        heroImage: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
        successRate: "95%",
        processingTime: "3-5 ngày làm việc",
        description: "Dịch vụ xin visa Thái Lan nhanh chóng, thủ tục đơn giản.",
        services: ["Tư vấn hồ sơ", "Dịch thuật", "Book lịch hẹn", "Theo dõi kết quả"],
        visaImages: [
            {
                type: "Visa Thái Lan",
                url: "https://images.unsplash.com/photo-1527631120902-378417754324",
                description: "Mẫu visa Thái Lan mới nhất"
            },
            {
                type: "Wat Phra Kaew",
                url: "https://images.unsplash.com/photo-1563492065599-3520f775eeed",
                description: "Chùa Phật Ngọc - Bangkok"
            },
            {
                type: "Phố Khaosan",
                url: "https://images.unsplash.com/photo-1508009603885-50cf7c579365",
                description: "Con phố nổi tiếng của Bangkok"
            },
            {
                type: "Biển Phuket",
                url: "https://images.unsplash.com/photo-1537956965359-7573183d1f57",
                description: "Thiên đường biển đảo Thái Lan"
            },
            {
                type: "Chiang Mai",
                url: "https://images.unsplash.com/photo-1598935888738-cd2957d157c8",
                description: "Thành phố văn hóa phía Bắc"
            }
        ],
        visaTypes: [
            {
                id: "tourist",
                name: "Visa Du lịch",
                requirements: {
                    personal: ["Hộ chiếu", "Ảnh 4x6", "CMND/CCCD"],
                    work: [{ type: "Nghề nghiệp", docs: ["Xác nhận công tác", "Đơn xin nghỉ phép"] }],
                    financial: ["Sao kê 3 tháng", "Sổ tiết kiệm"],
                    travel: ["Vé máy bay khứ hồi", "Book khách sạn", "Lịch trình du lịch"]
                }
            }
        ],
        pricing: [
            {
                type: "Trọn gói",
                name: "Dịch vụ visa du lịch",
                prices: [{
                    adult: "800.000 VNĐ",
                    child_6_12: "800.000 VNĐ",
                    child_under_6: "800.000 VNĐ",
                    note: "Đã bao gồm phí LSQ"
                }]
            }
        ],
        testimonials: mockTestimonials,
        relatedArticles: mockRelatedArticles,
        benefits: [
            { name: "Nhanh chóng", description: "Xử lý trong 3-5 ngày làm việc.", icon: Award },
            { name: "Đơn giản", description: "Thủ tục đơn giản, tỷ lệ đậu cao.", icon: UserCheck }
        ],
        process: [
            { name: "Tư vấn & Chuẩn bị", description: "Kiểm tra và tư vấn hồ sơ.", icon: MessageSquare },
            { name: "Nộp hồ sơ", description: "Nộp và theo dõi kết quả.", icon: FileText }
        ]
    },
    "singapore": {
        continentSlug: "visa-chau-a",
        title: "Dịch Vụ Xin Visa Singapore",
        countryName: "Singapore",
        heroImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd",
        successRate: "92%",
        processingTime: "3-4 ngày làm việc",
        description: "Dịch vụ xin visa Singapore chuyên nghiệp, nhanh chóng với tỷ lệ đậu cao.",
        services: ["Tư vấn hồ sơ", "Điền form online", "Dịch thuật công chứng", "Đặt lịch nộp", "Bảo hiểm du lịch"],
        visaTypes: [
            {
                id: "sg-tourist",
                name: "Du lịch",
                requirements: {
                    personal: [
                        "Hộ chiếu còn hạn trên 6 tháng",
                        "Ảnh 4x6 nền trắng",
                        "CMND/CCCD công chứng",
                        "Sổ hộ khẩu công chứng",
                        "Form visa điện tử (e-Form 14A)"
                    ],
                    work: [
                        {
                            type: "Người đi làm",
                            docs: [
                                "Hợp đồng lao động",
                                "Xác nhận công tác",
                                "Đơn xin nghỉ phép",
                                "Bảng lương 3 tháng gần nhất"
                            ]
                        },
                        {
                            type: "Chủ doanh nghiệp",
                            docs: [
                                "Giấy phép kinh doanh",
                                "Báo cáo thuế",
                                "Đăng ký MST",
                                "Báo cáo tài chính"
                            ]
                        }
                    ],
                    financial: [
                        "Sao kê ngân hàng 3 tháng",
                        "Sổ tiết kiệm tối thiểu 100 triệu",
                        "Thẻ tín dụng quốc tế",
                        "Giấy tờ sở hữu tài sản (nếu có)"
                    ],
                    travel: [
                        "Vé máy bay khứ hồi",
                        "Booking khách sạn",
                        "Bảo hiểm du lịch",
                        "Lịch trình chi tiết",
                        "Chứng minh thu nhập"
                    ]
                }
            }
        ],
        pricing: [
            {
                type: "standard",
                name: "Gói Tiêu chuẩn",
                description: "Dành cho khách du lịch tự túc",
                validity: "30-90 ngày",
                stayDuration: "Tối đa 30 ngày",
                processingTime: "3-4 ngày làm việc",
                prices: [
                    {
                        adult: "2,900,000 VNĐ",
                        child_6_12: "1,900,000 VNĐ",
                        child_under_6: "1,500,000 VNĐ",
                        consularFee: "30 SGD",
                        serviceFee: "Từ 1,500,000 VNĐ",
                        note: "Giá có thể thay đổi theo tỷ giá SGD"
                    }
                ]
            }
        ],
        testimonials: [
            {
                id: "sg-test-1",
                name: "Nguyễn Văn P",
                quote: "Dịch vụ nhanh gọn, chuyên nghiệp. Visa được duyệt trong 3 ngày.",
                rating: 5,
                image: "https://i.pravatar.cc/150?img=13"
            },
            {
                id: "sg-test-2",
                name: "Trần Thị Q",
                quote: "Thủ tục đơn giản, nhân viên nhiệt tình. Rất hài lòng với dịch vụ.",
                rating: 5,
                image: "https://i.pravatar.cc/150?img=14"
            }
        ],
        relatedArticles: [
            {
                id: "sg-art-1",
                title: "Kinh nghiệm xin visa Singapore 2025",
                url: "/tin-tuc/kinh-nghiem-xin-visa-singapore-2025",
                image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd"
            },
            {
                id: "sg-art-2",
                title: "Top 10 địa điểm must-visit ở Singapore",
                url: "/tin-tuc/top-10-dia-diem-must-visit-o-singapore",
                image: "https://images.unsplash.com/photo-1506351421178-63b52a2d2562"
            }
        ],
        visaImages: [
            {
                type: "Visa Singapore",
                url: "https://images.unsplash.com/photo-1590674899484-d5640e854abe",
                description: "Mẫu visa Singapore"
            },
            {
                type: "Marina Bay Sands",
                url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd",
                description: "Khách sạn Marina Bay Sands"
            },
            {
                type: "Gardens by the Bay",
                url: "https://images.unsplash.com/photo-1506351421178-63b52a2d2562",
                description: "Khu vườn Gardens by the Bay"
            },
            {
                type: "Merlion Park",
                url: "https://images.unsplash.com/photo-1496939376851-89342e90adcd",
                description: "Công viên Merlion biểu tượng"
            },
            {
                type: "Sentosa",
                url: "https://images.unsplash.com/photo-1565967511849-76a60a516170",
                description: "Đảo Sentosa giải trí"
            }
        ],
        benefits: [
            { name: "Chuyên nghiệp", description: "Tỷ lệ đậu visa cao.", icon: Award },
            { name: "Nhanh chóng", description: "Xử lý trong 3-4 ngày làm việc.", icon: UserCheck }
        ],
        process: [
            { name: "Tư vấn & Chuẩn bị", description: "Đánh giá và chuẩn bị hồ sơ.", icon: MessageSquare },
            { name: "Nộp hồ sơ", description: "Nộp và theo dõi kết quả.", icon: FileText }
        ]
    },
    "an-do": {
        continentSlug: "visa-chau-a",
        title: "Dịch Vụ Xin Visa Ấn Độ",
        countryName: "Ấn Độ",
        heroImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
        successRate: "90%",
        processingTime: "5-7 ngày làm việc",
        description: "Dịch vụ xin visa Ấn Độ (e-Visa) nhanh chóng, thủ tục trực tuyến.",
        services: ["Tư vấn hồ sơ", "Hướng dẫn điền form e-Visa", "Kiểm tra hồ sơ", "Theo dõi kết quả"],
        visaImages: [
            {
                type: "Visa Ấn Độ",
                url: "https://images.unsplash.com/photo-1597058712635-3182d1eacc1e",
                description: "Mẫu e-Visa Ấn Độ"
            },
            {
                type: "Đền Taj Mahal",
                url: "https://images.unsplash.com/photo-1548013146-72479768bada",
                description: "Kỳ quan thế giới tại Agra"
            },
            {
                type: "Sông Hằng",
                url: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc",
                description: "Dòng sông thiêng của Ấn Độ"
            },
            {
                type: "Jaipur",
                url: "https://images.unsplash.com/photo-1477587458883-47145ed94245",
                description: "Thành phố hồng của Ấn Độ"
            },
            {
                type: "Mumbai Gateway",
                url: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7",
                description: "Cổng India tại Mumbai"
            }
        ],
        visaTypes: [
            {
                id: "evisa",
                name: "e-Visa Du lịch",
                requirements: {
                    personal: ["Hộ chiếu", "Ảnh 4x6 nền trắng", "CMND/CCCD"],
                    work: [{ type: "Nghề nghiệp", docs: ["Xác nhận công tác"] }],
                    financial: ["Sao kê ngân hàng"],
                    travel: ["Vé máy bay", "Đặt phòng khách sạn"]
                }
            }
        ],
        pricing: [
            {
                type: "Trọn gói",
                name: "Dịch vụ e-Visa",
                prices: [{
                    adult: "900.000 VNĐ",
                    child_6_12: "900.000 VNĐ",
                    child_under_6: "900.000 VNĐ",
                    note: "Chưa bao gồm phí LSQ"
                }]
            }
        ],
        testimonials: mockTestimonials,
        relatedArticles: mockRelatedArticles,
        benefits: [
            { name: "Tiện lợi", description: "Thủ tục trực tuyến đơn giản.", icon: Award },
            { name: "Nhanh chóng", description: "Xử lý trong 5-7 ngày làm việc.", icon: UserCheck }
        ],
        process: [
            { name: "Tư vấn & Chuẩn bị", description: "Kiểm tra điều kiện và chuẩn bị hồ sơ.", icon: MessageSquare },
            { name: "Nộp hồ sơ", description: "Nộp trực tuyến và theo dõi.", icon: FileText }
        ]
    },
    "han-quoc": {
        continentSlug: "visa-chau-a",
        title: "Dịch Vụ Xin Visa Hàn Quốc",
        countryName: "Hàn Quốc",
        heroImage: "https://images.unsplash.com/photo-1538485399081-7191377e8241",
        successRate: "95%",
        processingTime: "5-7 ngày làm việc",
        description: "Dịch vụ xin visa Hàn Quốc trọn gói, tỷ lệ đậu cao, thủ tục nhanh gọn.",
        services: ["Tư vấn hồ sơ", "Book lịch đăng ký", "Dịch thuật công chứng", "Hướng dẫn phỏng vấn"],
        visaImages: [
            {
                type: "Visa Hàn Quốc",
                url: "https://images.unsplash.com/photo-1535189043414-47a3c49a0bed",
                description: "Mẫu visa Hàn Quốc mới nhất"
            },
            {
                type: "Cung điện Gyeongbokgung",
                url: "https://images.unsplash.com/photo-1578637387939-43c525550085",
                description: "Cung điện hoàng gia lớn nhất Seoul"
            },
            {
                type: "Đảo Jeju",
                url: "https://images.unsplash.com/photo-1601585574224-68488a1cbb4b",
                description: "Điểm du lịch nổi tiếng của Hàn Quốc"
            },
            {
                type: "Phố Myeongdong",
                url: "https://images.unsplash.com/photo-1585023525555-c0c499d08b78",
                description: "Khu mua sắm sầm uất ở Seoul"
            },
            {
                type: "Namsan Seoul Tower",
                url: "https://images.unsplash.com/photo-1617440168937-c6497eaa8db5",
                description: "Tháp truyền hình biểu tượng của Seoul"
            }
        ],
        visaTypes: [
            {
                id: "c3",
                name: "Visa C-3 (Du lịch)",
                requirements: {
                    personal: ["Hộ chiếu còn hạn", "Ảnh 3.5x4.5"],
                    work: [{ type: "Công việc ổn định", docs: ["Hợp đồng lao động", "Xác nhận công tác"] }],
                    financial: ["Sổ tiết kiệm", "Sao kê 3 tháng"],
                    travel: ["Lịch trình du lịch", "Đặt phòng khách sạn", "Vé máy bay"]
                }
            }
        ],
        pricing: [
            {
                type: "Trọn gói",
                name: "Dịch vụ visa du lịch",
                prices: [{
                    adult: "1.500.000 VNĐ",
                    child_6_12: "1.500.000 VNĐ",
                    child_under_6: "1.500.000 VNĐ",
                    note: "Đã bao gồm phí LSQ"
                }]
            }
        ],
        testimonials: mockTestimonials,
        relatedArticles: mockRelatedArticles,
        benefits: [
            { name: "Tỷ lệ đậu cao", description: "95% khách hàng được duyệt visa.", icon: Award },
            { name: "Tư vấn chuyên sâu", description: "Đội ngũ có kinh nghiệm với visa Hàn Quốc.", icon: UserCheck }
        ],
        process: [
            { name: "Tư vấn & Chuẩn bị", description: "Đánh giá hồ sơ, tư vấn giải pháp.", icon: MessageSquare },
            { name: "Hoàn thiện hồ sơ", description: "Chuẩn bị và nộp hồ sơ xin visa.", icon: FileText }
        ]
    },
    "nhat-ban": {
        continentSlug: "visa-chau-a",
        title: "Dịch Vụ Xin Visa Nhật Bản",
        countryName: "Nhật Bản",
        heroImage: "https://images.unsplash.com/photo-1542051841857-5f90071e7989",
        successRate: "93%",
        processingTime: "5-7 ngày làm việc",
        description: "Dịch vụ xin visa Nhật Bản chuyên nghiệp, uy tín với tỷ lệ đậu cao. Hỗ trợ visa du lịch, thăm thân và công tác.",
        services: ["Tư vấn hồ sơ chi tiết", "Dịch thuật công chứng", "Đặt lịch LSQ", "Theo dõi kết quả", "Bảo hiểm du lịch"],
        visaTypes: [
            {
                id: "jp-tourist",
                name: "Du lịch",
                requirements: {
                    personal: [
                        "Hộ chiếu còn hạn trên 6 tháng",
                        "Ảnh 4.5x4.5 nền trắng",
                        "CMND/CCCD công chứng",
                        "Sổ hộ khẩu công chứng",
                        "Form xin visa theo mẫu mới 2025"
                    ],
                    work: [
                        {
                            type: "Người đi làm",
                            docs: [
                                "Hợp đồng lao động",
                                "Xác nhận công tác song ngữ",
                                "Đơn xin nghỉ phép",
                                "Bảng lương 6 tháng gần nhất",
                                "Quyết định bổ nhiệm (nếu có)"
                            ]
                        },
                        {
                            type: "Chủ doanh nghiệp",
                            docs: [
                                "Giấy phép kinh doanh",
                                "Báo cáo thuế năm gần nhất",
                                "Đăng ký MST",
                                "Báo cáo tài chính kiểm toán",
                                "Biên lai nộp thuế"
                            ]
                        }
                    ],
                    financial: [
                        "Sao kê ngân hàng 6 tháng",
                        "Sổ tiết kiệm tối thiểu 200 triệu",
                        "Giấy tờ sở hữu bất động sản",
                        "Hợp đồng cho thuê (nếu có)",
                        "Thẻ tín dụng quốc tế"
                    ],
                    travel: [
                        "Vé máy bay khứ hồi",
                        "Booking khách sạn toàn bộ hành trình",
                        "Bảo hiểm du lịch",
                        "Lịch trình chi tiết từng ngày",
                        "JR Pass (nếu di chuyển nhiều)"
                    ]
                }
            }
        ],
        pricing: [
            {
                type: "standard",
                name: "Gói Cao cấp",
                description: "Dịch vụ trọn gói với tỷ lệ đậu visa cao",
                validity: "3 tháng",
                stayDuration: "15-90 ngày",
                processingTime: "5-7 ngày làm việc",
                prices: [
                    {
                        adult: "4,900,000 VNĐ",
                        child_6_12: "3,900,000 VNĐ",
                        child_under_6: "2,900,000 VNĐ",
                        consularFee: "3,000 JPY",
                        serviceFee: "Từ 2,900,000 VNĐ",
                        note: "Giá có thể thay đổi theo tỷ giá JPY"
                    }
                ]
            }
        ],
        testimonials: [
            {
                id: "jp-test-1",
                name: "Vũ Văn R",
                quote: "Dịch vụ rất chuyên nghiệp, được tư vấn chi tiết về cách chuẩn bị hồ sơ. Visa được duyệt đúng hẹn.",
                rating: 5,
                image: "https://i.pravatar.cc/150?img=15"
            },
            {
                id: "jp-test-2",
                name: "Đặng Thị S",
                quote: "Thủ tục nhanh gọn, nhân viên nhiệt tình, chu đáo. Sẽ giới thiệu cho người thân.",
                rating: 5,
                image: "https://i.pravatar.cc/150?img=16"
            }
        ],
        relatedArticles: [
            {
                id: "jp-art-1",
                title: "Hướng dẫn xin visa Nhật Bản 2025",
                url: "/tin-tuc/huong-dan-xin-visa-nhat-ban-2025",
                image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989"
            },
            {
                id: "jp-art-2",
                title: "Kinh nghiệm du lịch Nhật Bản tự túc",
                url: "/tin-tuc/kinh-nghiem-du-lich-nhat-ban-tu-tuc",
                image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e"
            }
        ],
        visaImages: [
            {
                type: "Visa Nhật Bản",
                url: "https://images.unsplash.com/photo-1590674899484-d5640e854abe",
                description: "Mẫu visa Nhật Bản"
            },
            {
                type: "Mount Fuji",
                url: "https://images.unsplash.com/photo-1542051841857-5f90071e7989",
                description: "Núi Phú Sĩ biểu tượng"
            },
            {
                type: "Tokyo Tower",
                url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
                description: "Tháp Tokyo về đêm"
            },
            {
                type: "Kyoto Temple",
                url: "https://images.unsplash.com/photo-1493997181344-712f2f19d87a",
                description: "Đền chùa cổ kính ở Kyoto"
            },
            {
                type: "Osaka Castle",
                url: "https://images.unsplash.com/photo-1590253230532-a67f6bc61c9e",
                description: "Lâu đài Osaka tráng lệ"
            }
        ],
        benefits: [
            { name: "Chuyên nghiệp", description: "Đội ngũ có kinh nghiệm làm việc với LSQ Nhật.", icon: Award },
            { name: "Hỗ trợ tận tâm", description: "Tư vấn chi tiết từng bước trong quy trình.", icon: UserCheck }
        ],
        process: [
            { name: "Tư vấn & Chuẩn bị", description: "Kiểm tra và tư vấn hồ sơ.", icon: MessageSquare },
            { name: "Dịch thuật & Nộp", description: "Dịch thuật và nộp hồ sơ LSQ.", icon: FileText }
        ]
    },

    // Châu Âu (Schengen)
    "italy": {
        continentSlug: "visa-chau-au",
        title: "Dịch Vụ Xin Visa Ý (Schengen)",
        countryName: "Ý",
        heroImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
        successRate: "89%",
        processingTime: "15-20 ngày làm việc",
        description: "Dịch vụ xin visa Schengen qua Ý, phù hợp du lịch và công tác trong khối Schengen.",
        services: ["Tư vấn hồ sơ", "Đặt lịch VFS", "Dịch thuật", "Bảo hiểm du lịch"],
        visaTypes: [
            {
                id: "italy-tourist",
                name: "Du lịch",
                requirements: {
                    personal: [
                        "Hộ chiếu còn hạn trên 6 tháng",
                        "Ảnh thẻ 4x6 nền trắng",
                        "CMND/CCCD công chứng",
                        "Sổ hộ khẩu công chứng"
                    ],
                    work: [
                        {
                            type: "Người đi làm",
                            docs: [
                                "Hợp đồng lao động",
                                "Xác nhận công tác",
                                "Đơn xin nghỉ phép"
                            ]
                        },
                        {
                            type: "Chủ doanh nghiệp",
                            docs: [
                                "Giấy phép kinh doanh",
                                "Biên lai thuế 3 tháng gần nhất"
                            ]
                        }
                    ],
                    financial: [
                        "Sao kê tài khoản ngân hàng 3 tháng gần nhất",
                        "Sổ tiết kiệm",
                        "Giấy tờ sở hữu bất động sản (nếu có)"
                    ],
                    travel: [
                        "Vé máy bay khứ hồi",
                        "Booking khách sạn",
                        "Bảo hiểm du lịch",
                        "Lịch trình du lịch chi tiết"
                    ]
                }
            }
        ],
        pricing: [
            {
                type: "standard",
                name: "Gói cơ bản", 
                description: "Phù hợp cho người có kinh nghiệm xin visa",
                validity: "3 tháng",
                stayDuration: "Tối đa 30 ngày",
                processingTime: "15-20 ngày làm việc",
                prices: [
                    {
                        adult: "5,900,000 VNĐ",
                        child_6_12: "4,900,000 VNĐ",
                        child_under_6: "2,900,000 VNĐ",
                        consularFee: "80 EUR",
                        serviceFee: "Từ 2,900,000 VNĐ",
                        note: "Giá có thể thay đổi tùy theo tỷ giá"
                    }
                ]
            }
        ],
        testimonials: [
            {
                id: "it-test-1",
                name: "Nguyễn Văn A",
                quote: "Dịch vụ rất tốt, được tư vấn đầy đủ và chi tiết. Đã được cấp visa thành công.",
                rating: 5,
                image: "https://i.pravatar.cc/150?img=1"
            },
            {
                id: "it-test-2",
                name: "Trần Thị B",
                quote: "Thủ tục nhanh gọn, nhân viên nhiệt tình. Rất hài lòng với dịch vụ.",
                rating: 5,
                image: "https://i.pravatar.cc/150?img=2"
            }
        ],
        relatedArticles: [
            {
                id: "it-art-1",
                title: "Kinh nghiệm xin visa Ý năm 2025",
                url: "/tin-tuc/kinh-nghiem-xin-visa-y-2025",
                image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5"
            },
            {
                id: "it-art-2",
                title: "Du lịch Ý cần chuẩn bị những gì?",
                url: "/tin-tuc/du-lich-y-can-chuan-bi-nhung-gi",
                image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0"
            }
        ],
        visaImages: [
            {
                type: "Visa Schengen Ý",
                url: "https://images.unsplash.com/photo-1623345805784-8f648fead225",
                description: "Mẫu visa Schengen do Ý cấp"
            },
            {
                type: "Colosseum",
                url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
                description: "Đấu trường La Mã - biểu tượng của Rome"
            },
            {
                type: "Venice",
                url: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0",
                description: "Thành phố Venice lãng mạn với các kênh đào"
            },
            {
                type: "Florence",
                url: "https://images.unsplash.com/photo-1543429257-3eb0b65d9c58",
                description: "Nhà thờ Santa Maria del Fiore ở Florence"
            },
            {
                type: "Pisa Tower",
                url: "https://images.unsplash.com/photo-1516286282392-6b186adfa05c",
                description: "Tháp nghiêng Pisa nổi tiếng"
            }
        ],
    },

    "germany": {
        continentSlug: "visa-chau-au",
        title: "Dịch Vụ Xin Visa Đức (Schengen)",
        countryName: "Đức",
        heroImage: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc",
        successRate: "92%",
        processingTime: "15-20 ngày làm việc",
        description: "Dịch vụ xin visa Schengen qua Đức, phù hợp cho du lịch, công tác và du học.",
        services: ["Tư vấn hồ sơ", "Đặt lịch LSQ", "Dịch thuật", "Bảo hiểm du lịch"],
        visaTypes: [
            {
                id: "germany-tourist",
                name: "Du lịch",
                requirements: {
                    personal: [
                        "Hộ chiếu còn hạn trên 6 tháng",
                        "Ảnh thẻ 3.5x4.5 nền trắng",
                        "CMND/CCCD công chứng",
                        "Sổ hộ khẩu công chứng"
                    ],
                    work: [
                        {
                            type: "Người đi làm",
                            docs: [
                                "Hợp đồng lao động",
                                "Xác nhận công tác",
                                "Đơn xin nghỉ phép",
                                "Bảng lương 3 tháng gần nhất"
                            ]
                        },
                        {
                            type: "Chủ doanh nghiệp",
                            docs: [
                                "Giấy phép kinh doanh",
                                "Báo cáo thuế",
                                "Đăng ký MST"
                            ]
                        }
                    ],
                    financial: [
                        "Sao kê tài khoản 3 tháng",
                        "Sổ tiết kiệm tối thiểu 150 triệu",
                        "Giấy tờ sở hữu tài sản (nếu có)"
                    ],
                    travel: [
                        "Vé máy bay khứ hồi",
                        "Booking khách sạn",
                        "Bảo hiểm du lịch",
                        "Lịch trình chi tiết",
                        "Thư mời (nếu có)"
                    ]
                }
            }
        ],
        pricing: [
            {
                type: "standard",
                name: "Gói tiêu chuẩn", 
                description: "Phù hợp cho khách hàng lần đầu xin visa Schengen",
                validity: "3 tháng",
                stayDuration: "Tối đa 30 ngày",
                processingTime: "15-20 ngày làm việc",
                prices: [
                    {
                        adult: "6,500,000 VNĐ",
                        child_6_12: "5,500,000 VNĐ",
                        child_under_6: "3,500,000 VNĐ",
                        consularFee: "80 EUR",
                        serviceFee: "Từ 3,500,000 VNĐ",
                        note: "Giá có thể thay đổi theo tỷ giá EUR"
                    }
                ]
            }
        ],
        testimonials: [
            {
                id: "de-test-1",
                name: "Lê Văn C",
                quote: "Thủ tục nhanh gọn, được hướng dẫn rất kỹ. Visa được duyệt đúng hẹn.",
                rating: 5,
                image: "https://i.pravatar.cc/150?img=3"
            },
            {
                id: "de-test-2",
                name: "Phạm Thị D",
                quote: "Dịch vụ chuyên nghiệp, nhân viên tận tình. Sẽ giới thiệu cho bạn bè.",
                rating: 5,
                image: "https://i.pravatar.cc/150?img=4"
            }
        ],
        relatedArticles: [
            {
                id: "de-art-1",
                title: "Hướng dẫn xin visa Đức 2025",
                url: "/tin-tuc/huong-dan-xin-visa-duc-2025",
                image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc"
            },
            {
                id: "de-art-2",
                title: "Top 10 địa điểm du lịch tại Đức",
                url: "/tin-tuc/top-10-dia-diem-du-lich-tai-duc",
                image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b"
            }
        ],
        visaImages: [
            {
                type: "Visa Schengen Đức",
                url: "https://images.unsplash.com/photo-1590674899484-d5640e854abe",
                description: "Mẫu visa Schengen do Đức cấp"
            },
            {
                type: "Brandenburg Gate",
                url: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc",
                description: "Cổng Brandenburg - biểu tượng của Berlin"
            },
            {
                type: "Neuschwanstein Castle",
                url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
                description: "Lâu đài Neuschwanstein cổ tích"
            },
            {
                type: "Munich",
                url: "https://images.unsplash.com/photo-1595867818082-083862f3d630",
                description: "Quảng trường Marienplatz ở Munich"
            },
            {
                type: "Berlin Wall",
                url: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b",
                description: "Bức tường Berlin lịch sử"
            }
        ]
    },

    "uk": {
        continentSlug: "visa-chau-au",
        title: "Dịch Vụ Xin Visa Anh Quốc",
        countryName: "Anh",
        heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
        successRate: "90%",
        processingTime: "25-30 ngày làm việc",
        description: "Dịch vụ xin visa Anh chuyên nghiệp, tỉ lệ đậu cao, thủ tục nhanh gọn.",
        services: ["Tư vấn hồ sơ", "Đặt lịch VFS", "Dịch thuật", "Bảo hiểm du lịch", "Book vé máy bay"],
        visaTypes: [
            {
                id: "uk-tourist",
                name: "Du lịch",
                requirements: {
                    personal: [
                        "Hộ chiếu còn hạn trên 6 tháng",
                        "Ảnh 4.5x3.5 nền trắng",
                        "CMND/CCCD công chứng",
                        "Sổ hộ khẩu công chứng",
                        "Form khai online"
                    ],
                    work: [
                        {
                            type: "Người đi làm",
                            docs: [
                                "Hợp đồng lao động",
                                "Quyết định bổ nhiệm",
                                "Xác nhận công tác",
                                "Đơn xin nghỉ phép",
                                "Bảng lương 6 tháng"
                            ]
                        },
                        {
                            type: "Chủ doanh nghiệp",
                            docs: [
                                "Giấy phép kinh doanh",
                                "Báo cáo thuế năm gần nhất",
                                "Bảng lương giám đốc",
                                "Báo cáo tài chính"
                            ]
                        }
                    ],
                    financial: [
                        "Sao kê ngân hàng 6 tháng",
                        "Sổ tiết kiệm tối thiểu 200 triệu",
                        "Giấy tờ nhà đất (nếu có)",
                        "Hợp đồng cho thuê (nếu có)"
                    ],
                    travel: [
                        "Đặt vé máy bay khứ hồi",
                        "Booking khách sạn toàn bộ hành trình",
                        "Bảo hiểm du lịch",
                        "Lịch trình chi tiết",
                        "Thư mời từ Anh (nếu có)"
                    ]
                }
            }
        ],
        pricing: [
            {
                type: "standard",
                name: "Gói Standard",
                description: "Dành cho khách hàng lần đầu xin visa Anh",
                validity: "6 tháng",
                stayDuration: "Tối đa 180 ngày",
                processingTime: "25-30 ngày làm việc",
                prices: [
                    {
                        adult: "8,900,000 VNĐ",
                        child_6_12: "7,900,000 VNĐ",
                        child_under_6: "4,900,000 VNĐ",
                        consularFee: "120 GBP",
                        serviceFee: "Từ 4,900,000 VNĐ",
                        note: "Phí có thể thay đổi theo tỷ giá GBP"
                    }
                ]
            }
        ],
        testimonials: [
            {
                id: "uk-test-1",
                name: "Hoàng Văn E",
                quote: "Được tư vấn rất tận tình, hồ sơ chuẩn bị kỹ nên visa được duyệt nhanh.",
                rating: 5,
                image: "https://i.pravatar.cc/150?img=5"
            },
            {
                id: "uk-test-2",
                name: "Nguyễn Thị F",
                quote: "Dịch vụ chuyên nghiệp, được hướng dẫn chi tiết từng bước. Rất hài lòng!",
                rating: 5,
                image: "https://i.pravatar.cc/150?img=6"
            }
        ],
        relatedArticles: [
            {
                id: "uk-art-1",
                title: "Cập nhật thủ tục xin visa Anh 2025",
                url: "/tin-tuc/cap-nhat-thu-tuc-xin-visa-anh-2025",
                image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad"
            },
            {
                id: "uk-art-2",
                title: "Kinh nghiệm du lịch Anh tự túc",
                url: "/tin-tuc/kinh-nghiem-du-lich-anh-tu-tuc",
                image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd"
            }
        ],
        visaImages: [
            {
                type: "Visa Anh",
                url: "https://images.unsplash.com/photo-1589784355692-68785b19738d",
                description: "Mẫu visa Anh Quốc"
            },
            {
                type: "Big Ben",
                url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
                description: "Tháp đồng hồ Big Ben - London"
            },
            {
                type: "London Eye",
                url: "https://images.unsplash.com/photo-1486299267070-83823f5448dd",
                description: "Vòng quay London Eye"
            },
            {
                type: "Tower Bridge",
                url: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be",
                description: "Cầu Tháp biểu tượng của London"
            },
            {
                type: "Buckingham Palace",
                url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
                description: "Cung điện Buckingham"
            }
        ]
    },

    "spain": {
        continentSlug: "visa-chau-au",
        title: "Dịch Vụ Xin Visa Tây Ban Nha (Schengen)",
        countryName: "Tây Ban Nha",
        heroImage: "https://images.unsplash.com/photo-1558642084-fd07fae5282e",
        successRate: "88%",
        processingTime: "15-20 ngày làm việc",
        description: "Dịch vụ xin visa Schengen qua Tây Ban Nha, phù hợp cho du lịch, công tác và thăm thân.",
        services: ["Tư vấn hồ sơ", "Đặt lịch BLS", "Dịch thuật", "Bảo hiểm du lịch", "Book vé máy bay"],
        visaTypes: [
            {
                id: "spain-tourist",
                name: "Du lịch",
                requirements: {
                    personal: [
                        "Hộ chiếu còn hạn trên 6 tháng",
                        "Ảnh 4x6 nền trắng",
                        "CMND/CCCD công chứng",
                        "Sổ hộ khẩu công chứng",
                        "Form xin visa điền đầy đủ"
                    ],
                    work: [
                        {
                            type: "Người đi làm",
                            docs: [
                                "Hợp đồng lao động",
                                "Xác nhận công tác",
                                "Đơn xin nghỉ phép",
                                "Bảng lương 3 tháng"
                            ]
                        },
                        {
                            type: "Chủ doanh nghiệp",
                            docs: [
                                "Giấy phép kinh doanh",
                                "Báo cáo thuế",
                                "Đăng ký MST",
                                "Bảng cân đối kế toán"
                            ]
                        }
                    ],
                    financial: [
                        "Sao kê ngân hàng 3 tháng",
                        "Sổ tiết kiệm tối thiểu 150 triệu",
                        "Giấy tờ nhà đất (nếu có)",
                        "Thẻ tín dụng quốc tế (nếu có)"
                    ],
                    travel: [
                        "Vé máy bay khứ hồi",
                        "Booking khách sạn",
                        "Bảo hiểm du lịch",
                        "Lịch trình chi tiết",
                        "Voucher tour (nếu đi theo tour)"
                    ]
                }
            }
        ],
        pricing: [
            {
                type: "standard",
                name: "Gói Tiêu chuẩn",
                description: "Dành cho khách hàng du lịch tự túc",
                validity: "3 tháng",
                stayDuration: "Tối đa 30 ngày",
                processingTime: "15-20 ngày làm việc",
                prices: [
                    {
                        adult: "5,900,000 VNĐ",
                        child_6_12: "4,900,000 VNĐ",
                        child_under_6: "2,900,000 VNĐ",
                        consularFee: "80 EUR",
                        serviceFee: "Từ 2,900,000 VNĐ",
                        note: "Giá có thể thay đổi theo tỷ giá EUR"
                    }
                ]
            }
        ],
        testimonials: [
            {
                id: "es-test-1",
                name: "Trần Văn G",
                quote: "Dịch vụ tốt, được tư vấn nhiệt tình. Visa được duyệt nhanh hơn dự kiến.",
                rating: 5,
                image: "https://i.pravatar.cc/150?img=7"
            },
            {
                id: "es-test-2",
                name: "Nguyễn Thị H",
                quote: "Thủ tục đơn giản, nhân viên hỗ trợ tận tình. Chắc chắn sẽ quay lại!",
                rating: 5,
                image: "https://i.pravatar.cc/150?img=8"
            }
        ],
        relatedArticles: [
            {
                id: "es-art-1",
                title: "Kinh nghiệm xin visa Tây Ban Nha 2025",
                url: "/tin-tuc/kinh-nghiem-xin-visa-tay-ban-nha-2025",
                image: "https://images.unsplash.com/photo-1558642084-fd07fae5282e"
            },
            {
                id: "es-art-2",
                title: "Top 10 địa điểm must-visit ở Tây Ban Nha",
                url: "/tin-tuc/top-10-dia-diem-must-visit-o-tay-ban-nha",
                image: "https://images.unsplash.com/photo-1551863863-e01bbf274ef6"
            }
        ],
        visaImages: [
            {
                type: "Visa Schengen Tây Ban Nha",
                url: "https://images.unsplash.com/photo-1590674899484-d5640e854abe",
                description: "Mẫu visa Schengen do Tây Ban Nha cấp"
            },
            {
                type: "Sagrada Familia",
                url: "https://images.unsplash.com/photo-1558642084-fd07fae5282e",
                description: "Nhà thờ Sagrada Familia - Barcelona"
            },
            {
                type: "Plaza Mayor",
                url: "https://images.unsplash.com/photo-1551863863-e01bbf274ef6",
                description: "Quảng trường Plaza Mayor - Madrid"
            },
            {
                type: "Alhambra Palace",
                url: "https://images.unsplash.com/photo-1591291621060-69c8973801ba",
                description: "Cung điện Alhambra - Granada"
            },
            {
                type: "Park Güell",
                url: "https://images.unsplash.com/photo-1583779457094-ab6f0d218d87",
                description: "Công viên Güell độc đáo ở Barcelona"
            }
        ]
    },

    "switzerland": {
        continentSlug: "visa-chau-au",
        title: "Dịch Vụ Xin Visa Thụy Sĩ (Schengen)",
        countryName: "Thụy Sĩ",
        heroImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99",
        successRate: "93%",
        processingTime: "15-20 ngày làm việc",
        description: "Dịch vụ xin visa Thụy Sĩ chuyên nghiệp, phù hợp cho du lịch, công tác và thăm thân.",
        services: ["Tư vấn hồ sơ", "Đặt lịch LSQ", "Dịch thuật", "Bảo hiểm du lịch", "Book vé máy bay"],
        visaTypes: [
            {
                id: "swiss-tourist",
                name: "Du lịch",
                requirements: {
                    personal: [
                        "Hộ chiếu còn hạn trên 6 tháng",
                        "Ảnh 3.5x4.5 nền trắng",
                        "CMND/CCCD công chứng",
                        "Sổ hộ khẩu công chứng",
                        "Form xin visa theo mẫu mới nhất"
                    ],
                    work: [
                        {
                            type: "Người đi làm",
                            docs: [
                                "Hợp đồng lao động",
                                "Xác nhận công tác song ngữ",
                                "Đơn xin nghỉ phép",
                                "Bảng lương 6 tháng gần nhất"
                            ]
                        },
                        {
                            type: "Chủ doanh nghiệp",
                            docs: [
                                "Giấy phép kinh doanh",
                                "Báo cáo thuế năm gần nhất",
                                "Đăng ký MST",
                                "Báo cáo tài chính có kiểm toán"
                            ]
                        }
                    ],
                    financial: [
                        "Sao kê ngân hàng 6 tháng",
                        "Sổ tiết kiệm tối thiểu 200 triệu",
                        "Giấy tờ sở hữu bất động sản",
                        "Hợp đồng cho thuê (nếu có)"
                    ],
                    travel: [
                        "Vé máy bay khứ hồi",
                        "Booking khách sạn toàn bộ hành trình",
                        "Bảo hiểm du lịch phạm vi Schengen",
                        "Lịch trình chi tiết từng ngày",
                        "Thư mời từ Thụy Sĩ (nếu có)"
                    ]
                }
            }
        ],
        pricing: [
            {
                type: "standard",
                name: "Gói Premium",
                description: "Dịch vụ trọn gói cao cấp với tỷ lệ đậu visa cao",
                validity: "3 tháng",
                stayDuration: "Tối đa 90 ngày",
                processingTime: "15-20 ngày làm việc",
                prices: [
                    {
                        adult: "7,900,000 VNĐ",
                        child_6_12: "6,900,000 VNĐ",
                        child_under_6: "3,900,000 VNĐ",
                        consularFee: "80 CHF",
                        serviceFee: "Từ 3,900,000 VNĐ",
                        note: "Giá có thể thay đổi theo tỷ giá CHF"
                    }
                ]
            }
        ],
        testimonials: [
            {
                id: "ch-test-1",
                name: "Lê Văn K",
                quote: "Được tư vấn rất chuyên nghiệp, hồ sơ chuẩn bị kỹ càng nên visa được duyệt nhanh chóng.",
                rating: 5,
                image: "https://i.pravatar.cc/150?img=9"
            },
            {
                id: "ch-test-2",
                name: "Phạm Thị L",
                quote: "Dịch vụ tốt, nhân viên nhiệt tình. Đặc biệt ấn tượng với sự theo dõi hồ sơ liên tục.",
                rating: 5,
                image: "https://i.pravatar.cc/150?img=10"
            }
        ],
        relatedArticles: [
            {
                id: "ch-art-1",
                title: "Hướng dẫn xin visa Thụy Sĩ 2025",
                url: "/tin-tuc/huong-dan-xin-visa-thuy-si-2025",
                image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99"
            },
            {
                id: "ch-art-2",
                title: "Khám phá Thụy Sĩ - Thiên đường du lịch châu Âu",
                url: "/tin-tuc/kham-pha-thuy-si-thien-duong-du-lich",
                image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95"
            }
        ],
        visaImages: [
            {
                type: "Visa Schengen Thụy Sĩ",
                url: "https://images.unsplash.com/photo-1590674899484-d5640e854abe",
                description: "Mẫu visa Schengen do Thụy Sĩ cấp"
            },
            {
                type: "Matterhorn",
                url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99",
                description: "Đỉnh Matterhorn hùng vĩ"
            },
            {
                type: "Lake Geneva",
                url: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95",
                description: "Hồ Geneva thơ mộng"
            },
            {
                type: "Lucerne",
                url: "https://images.unsplash.com/photo-1549877452-9c387954fbc2",
                description: "Thành phố Lucerne cổ kính"
            },
            {
                type: "Swiss Alps",
                url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
                description: "Dãy Alps hùng vĩ của Thụy Sĩ"
            }
        ]
    },
    
    "phap": {
        continentSlug: "visa-chau-au",
        title: "Dịch Vụ Xin Visa Pháp (Schengen)",
        countryName: "Pháp",
        heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        successRate: "91%",
        processingTime: "15-20 ngày",
        description: "Dịch vụ xin visa Schengen qua Pháp, phù hợp du lịch và công tác trong khối Schengen.",
        services: ["Tư vấn hồ sơ", "Đặt lịch VFS", "Dịch thuật", "Bảo hiểm du lịch"],
        visaImages: [
            {
                type: "Hộ chiếu với visa Pháp",
                url: "https://images.unsplash.com/photo-1544112851-42d8f3b7f07c",
                description: "Mẫu visa Schengen được cấp bởi Đại sứ quán Pháp"
            },
            {
                type: "Tháp Eiffel - Pháp",
                url: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f",
                description: "Biểu tượng nổi tiếng của Pháp"
            },
            {
                type: "Cung điện Versailles",
                url: "https://images.unsplash.com/photo-1526816229784-65d5d54ac8bc",
                description: "Di sản văn hóa thế giới tại Pháp"
            },
            {
                type: "Đại lộ Champs-Élysées",
                url: "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b",
                description: "Con đường nổi tiếng nhất Paris"
            },
            {
                type: "Nhà thờ Đức Bà Paris",
                url: "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94",
                description: "Kiến trúc Gothic tiêu biểu của Pháp"
            }
        ],
        visaTypes: [
            {
                id: "schengen",
                name: "Visa Schengen (Du lịch)",
                requirements: {
                    personal: ["Hộ chiếu", "Ảnh 4x6", "Form xin visa"],
                    work: [{ type: "Nghề nghiệp", docs: ["Hợp đồng lao động", "Quyết định bổ nhiệm"] }],
                    financial: ["Sao kê 6 tháng", "Sổ tiết kiệm"],
                    travel: ["Bảo hiểm du lịch", "Đặt khách sạn", "Vé máy bay"]
                }
            }
        ],
        pricing: [
            {
                type: "Trọn gói",
                name: "Dịch vụ visa Schengen",
                prices: [{
                    adult: "2.500.000 VNĐ",
                    child_6_12: "2.500.000 VNĐ",
                    child_under_6: "2.500.000 VNĐ",
                    note: "Chưa bao gồm phí LSQ"
                }]
            }
        ],
        testimonials: mockTestimonials,
        relatedArticles: mockRelatedArticles,
        benefits: [
            { name: "Kinh nghiệm", description: "Chuyên visa Schengen nhiều năm.", icon: Award },
            { name: "Tư vấn tận tình", description: "Hỗ trợ 24/7 trong quá trình làm visa.", icon: UserCheck }
        ],
        process: [
            { name: "Tư vấn & Chuẩn bị", description: "Tư vấn và lập kế hoạch hồ sơ.", icon: MessageSquare },
            { name: "Hoàn thiện & Nộp", description: "Hoàn thiện và nộp hồ sơ tại VFS.", icon: FileText }
        ]
    },

    // Châu Mỹ
    "canada": {
        continentSlug: "visa-chau-my",
        title: "Dịch Vụ Xin Visa Canada",
        countryName: "Canada",
        heroImage: "https://images.unsplash.com/photo-1517935706615-2717063c2225",
        successRate: "85%",
        processingTime: "20-25 ngày làm việc",
        description: "Dịch vụ xin visa Canada cho du lịch, thăm thân và định cư.",
        services: ["Tư vấn hồ sơ", "Dịch thuật", "Book lịch nộp", "Bảo hiểm du lịch"],
        visaImages: [
            {
                type: "Visa Canada",
                url: "https://images.unsplash.com/photo-1551651653-c5186a1fbba2",
                description: "Mẫu visa Canada"
            },
            {
                type: "CN Tower",
                url: "https://images.unsplash.com/photo-1486325212027-8081e485255e",
                description: "Tháp CN - biểu tượng của Toronto"
            },
            {
                type: "Banff National Park",
                url: "https://images.unsplash.com/photo-1609825488888-3a766db05542",
                description: "Công viên quốc gia Banff tuyệt đẹp"
            },
            {
                type: "Niagara Falls",
                url: "https://images.unsplash.com/photo-1489447068241-b3490214e879",
                description: "Thác Niagara hùng vĩ"
            },
            {
                type: "Old Quebec",
                url: "https://images.unsplash.com/photo-1519832979-6fa011b87667",
                description: "Phố cổ Quebec với kiến trúc Pháp"
            }
        ],
        visaTypes: [
            {
                id: "visitor",
                name: "Visitor Visa",
                requirements: {
                    personal: ["Hộ chiếu", "Ảnh sinh trắc học", "Form IMM"],
                    work: [{ type: "Nghề nghiệp", docs: ["Hợp đồng lao động", "Quyết định bổ nhiệm"] }],
                    financial: ["Sao kê 6 tháng", "Sổ tiết kiệm", "Chứng minh tài sản"],
                    travel: ["Bảo hiểm du lịch", "Lịch trình", "Book khách sạn"]
                }
            }
        ],
        pricing: [
            {
                type: "Trọn gói",
                name: "Dịch vụ visa du lịch",
                prices: [{
                    adult: "4.200.000 VNĐ",
                    child_6_12: "4.200.000 VNĐ",
                    child_under_6: "4.200.000 VNĐ",
                    note: "Chưa bao gồm phí LSQ"
                }]
            }
        ],
        testimonials: mockTestimonials,
        relatedArticles: mockRelatedArticles,
        benefits: [
            { name: "Chuyên nghiệp", description: "Đội ngũ có chứng chỉ ICCRC.", icon: Award },
            { name: "Tư vấn chi tiết", description: "Hướng dẫn từng bước làm visa.", icon: UserCheck }
        ],
        process: [
            { name: "Tư vấn & Chuẩn bị", description: "Đánh giá và lập kế hoạch.", icon: MessageSquare },
            { name: "Hoàn thiện & Nộp", description: "Nộp hồ sơ và theo dõi.", icon: FileText }
        ]
    },
    "mexico": {
        continentSlug: "visa-chau-my",
        title: "Dịch Vụ Xin Visa Mexico",
        countryName: "Mexico",
        heroImage: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a",
        successRate: "92%",
        processingTime: "7-10 ngày làm việc",
        description: "Dịch vụ xin visa Mexico cho du lịch và công tác ngắn hạn.",
        services: ["Tư vấn hồ sơ", "Dịch thuật", "Book lịch hẹn", "Theo dõi kết quả"],
        visaTypes: [
            {
                id: "tourist",
                name: "Visa Du lịch",
                requirements: {
                    personal: ["Hộ chiếu", "Ảnh 4x6", "Form xin visa"],
                    work: [{ type: "Nghề nghiệp", docs: ["Xác nhận công tác"] }],
                    financial: ["Sao kê 3 tháng"],
                    travel: ["Vé máy bay khứ hồi", "Book khách sạn"]
                }
            }
        ],
        pricing: [
            {
                type: "Trọn gói",
                name: "Dịch vụ visa du lịch",
                prices: [{
                    adult: "900.000 VNĐ",
                    child_6_12: "900.000 VNĐ",
                    child_under_6: "900.000 VNĐ",
                    note: "Chưa bao gồm phí LSQ"
                }]
            }
        ],
        testimonials: mockTestimonials,
        relatedArticles: mockRelatedArticles,
        benefits: [
            { name: "Nhanh chóng", description: "Xử lý trong 7-10 ngày làm việc.", icon: Award },
            { name: "Đơn giản", description: "Thủ tục đơn giản, dễ dàng.", icon: UserCheck }
        ],
        process: [
            { name: "Tư vấn & Chuẩn bị", description: "Kiểm tra và tư vấn hồ sơ.", icon: MessageSquare },
            { name: "Nộp hồ sơ", description: "Nộp và theo dõi kết quả.", icon: FileText }
        ]
    },
    "brazil": {
        continentSlug: "visa-chau-my",
        title: "Dịch Vụ Xin Visa Brazil",
        countryName: "Brazil",
        heroImage: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325",
        successRate: "90%",
        processingTime: "10-15 ngày làm việc",
        description: "Dịch vụ xin visa Brazil cho du lịch và công tác.",
        services: ["Tư vấn hồ sơ", "Dịch thuật", "Book lịch hẹn", "Theo dõi kết quả"],
        visaTypes: [
            {
                id: "tourist",
                name: "Visa Du lịch",
                requirements: {
                    personal: ["Hộ chiếu", "Ảnh 4x6", "Form xin visa"],
                    work: [{ type: "Nghề nghiệp", docs: ["Xác nhận công tác"] }],
                    financial: ["Sao kê ngân hàng"],
                    travel: ["Vé máy bay", "Book khách sạn"]
                }
            }
        ],
        pricing: [
            {
                type: "Trọn gói",
                name: "Dịch vụ visa du lịch",
                prices: [{
                    adult: "1.200.000 VNĐ",
                    child_6_12: "1.200.000 VNĐ",
                    child_under_6: "1.200.000 VNĐ",
                    note: "Chưa bao gồm phí LSQ"
                }]
            }
        ],
        testimonials: mockTestimonials,
        relatedArticles: mockRelatedArticles,
        benefits: [
            { name: "Chuyên nghiệp", description: "Đội ngũ có kinh nghiệm với LSQ Brazil.", icon: Award },
            { name: "Hỗ trợ toàn diện", description: "Tư vấn chi tiết mọi vấn đề.", icon: UserCheck }
        ],
        process: [
            { name: "Tư vấn & Chuẩn bị", description: "Đánh giá và lập kế hoạch.", icon: MessageSquare },
            { name: "Nộp hồ sơ", description: "Nộp và theo dõi kết quả.", icon: FileText }
        ]
    },
    "argentina": {
        continentSlug: "visa-chau-my",
        title: "Dịch Vụ Xin Visa Argentina",
        countryName: "Argentina",
        heroImage: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849",
        successRate: "88%",
        processingTime: "10-15 ngày làm việc",
        description: "Dịch vụ xin visa Argentina cho du lịch và công tác.",
        services: ["Tư vấn hồ sơ", "Dịch thuật", "Book lịch hẹn", "Theo dõi kết quả"],
        visaTypes: [
            {
                id: "tourist",
                name: "Visa Du lịch",
                requirements: {
                    personal: ["Hộ chiếu", "Ảnh 4x6", "Form xin visa"],
                    work: [{ type: "Nghề nghiệp", docs: ["Xác nhận công tác"] }],
                    financial: ["Sao kê ngân hàng"],
                    travel: ["Vé máy bay", "Book khách sạn"]
                }
            }
        ],
        pricing: [
            {
                type: "Trọn gói",
                name: "Dịch vụ visa du lịch",
                prices: [{
                    adult: "1.100.000 VNĐ",
                    child_6_12: "1.100.000 VNĐ",
                    child_under_6: "1.100.000 VNĐ",
                    note: "Chưa bao gồm phí LSQ"
                }]
            }
        ],
        testimonials: mockTestimonials,
        relatedArticles: mockRelatedArticles,
        benefits: [
            { name: "Chuyên nghiệp", description: "Đội ngũ có kinh nghiệm với LSQ Argentina.", icon: Award },
            { name: "Hỗ trợ toàn diện", description: "Tư vấn chi tiết mọi vấn đề.", icon: UserCheck }
        ],
        process: [
            { name: "Tư vấn & Chuẩn bị", description: "Đánh giá và lập kế hoạch.", icon: MessageSquare },
            { name: "Nộp hồ sơ", description: "Nộp và theo dõi kết quả.", icon: FileText }
        ]
    },
    "hoa-ky": {
        continentSlug: "visa-chau-my",
        title: "Dịch Vụ Xin Visa Mỹ (Du Lịch, Công Tác, Thăm Thân)",
        countryName: "",
        heroImage: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=2070&auto=format&fit=crop",
        successRate: "98%",
        processingTime: "Phụ thuộc lịch hẹn",
        description: "Dịch vụ tư vấn và hoàn thiện hồ sơ xin visa Mỹ trọn gói.",
        services: ["Tư vấn hồ sơ", "Điền đơn DS-160", "Luyện phỏng vấn", "Book lịch phỏng vấn"],
        visaImages: [
            {
                type: "Visa Mỹ",
                url: "https://images.unsplash.com/photo-1516138889890-ca695ed22b66",
                description: "Mẫu visa Mỹ loại B1/B2"
            },
            {
                type: "Tượng Nữ thần Tự do",
                url: "https://images.unsplash.com/photo-1492666673288-3c4b4576ad9a",
                description: "Biểu tượng của thành phố New York"
            },
            {
                type: "Cầu Cổng Vàng",
                url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
                description: "Địa điểm nổi tiếng ở San Francisco"
            },
            {
                type: "Times Square",
                url: "https://images.unsplash.com/photo-1535964093004-55f10bd0a815",
                description: "Trung tâm thương mại của Manhattan"
            },
            {
                type: "Grand Canyon",
                url: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c",
                description: "Kỳ quan thiên nhiên của Arizona"
            }
        ],
        visaTypes: [
            {
                id: "b1b2",
                name: "Visa B1/B2",
                requirements: {
                    personal: ["Hộ chiếu", "Ảnh visa Mỹ", "DS-160"],
                    work: [{ type: "Chủ doanh nghiệp", docs: ["Giấy phép kinh doanh", "Báo cáo thuế"] }],
                    financial: ["Sao kê ngân hàng", "Sổ tiết kiệm"],
                    travel: ["Lịch trình chuyến đi", "Mục đích du lịch"]
                }
            }
        ],
        pricing: [
            {
                type: "Trọn gói",
                name: "Dịch vụ visa Mỹ",
                prices: [{
                    adult: "3.500.000 VNĐ",
                    child_6_12: "3.500.000 VNĐ",
                    child_under_6: "3.500.000 VNĐ",
                    note: "Chưa bao gồm phí LSQ"
                }]
            }
        ],
        testimonials: mockTestimonials,
        relatedArticles: mockRelatedArticles,
        benefits: [
            { name: "Tỷ lệ đậu cao", description: "Hồ sơ được tối ưu bởi chuyên gia.", icon: Award },
            { name: "Hỗ trợ 1-1", description: "Mỗi khách hàng có chuyên viên tư vấn riêng.", icon: UserCheck }
        ],
        process: [
            { name: "Tư Vấn & Đánh Giá", description: "Đánh giá hồ sơ và đưa ra giải pháp.", icon: MessageSquare },
            { name: "Chuẩn Bị Hồ Sơ", description: "Hoàn thiện tất cả giấy tờ cần thiết.", icon: FileText }
        ]
    },

    // Châu Úc
    "new-zealand": {
        continentSlug: "visa-chau-uc",
        title: "Dịch Vụ Xin Visa New Zealand",
        countryName: "New Zealand",
        heroImage: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad",
        successRate: "86%",
        processingTime: "15-20 ngày làm việc",
        description: "Dịch vụ xin visa New Zealand cho du lịch, công tác và định cư.",
        services: ["Tư vấn hồ sơ", "Dịch thuật", "Nộp hồ sơ online", "Theo dõi kết quả"],
        visaImages: [
            {
                type: "Visa New Zealand",
                url: "https://images.unsplash.com/photo-1589802829985-817e51171b92",
                description: "Mẫu visa New Zealand"
            },
            {
                type: "Mount Cook",
                url: "https://images.unsplash.com/photo-1578438012440-115a4326cf2b",
                description: "Núi Cook - đỉnh núi cao nhất New Zealand"
            },
            {
                type: "Hobbiton",
                url: "https://images.unsplash.com/photo-1628744876497-eb30460be9c7",
                description: "Làng Hobbit nổi tiếng từ phim Lord of the Rings"
            },
            {
                type: "Milford Sound",
                url: "https://images.unsplash.com/photo-1542322796-f1583c697982",
                description: "Vịnh Milford Sound tuyệt đẹp"
            },
            {
                type: "Auckland Sky Tower",
                url: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad",
                description: "Tháp Sky Tower biểu tượng của Auckland"
            }
        ],
        visaTypes: [
            {
                id: "visitor",
                name: "Visitor Visa",
                requirements: {
                    personal: ["Hộ chiếu", "Ảnh 4x6", "Form xin visa"],
                    work: [{ type: "Nghề nghiệp", docs: ["Hợp đồng lao động", "Xác nhận công tác"] }],
                    financial: ["Sao kê 6 tháng", "Sổ tiết kiệm"],
                    travel: ["Bảo hiểm du lịch", "Vé máy bay", "Book khách sạn"]
                }
            }
        ],
        pricing: [
            {
                type: "Trọn gói",
                name: "Dịch vụ visa du lịch",
                prices: [{
                    adult: "2.500.000 VNĐ",
                    child_6_12: "2.500.000 VNĐ",
                    child_under_6: "2.500.000 VNĐ",
                    note: "Chưa bao gồm phí LSQ"
                }]
            }
        ],
        testimonials: mockTestimonials,
        relatedArticles: mockRelatedArticles,
        benefits: [
            { name: "Chuyên nghiệp", description: "Đội ngũ có chứng chỉ INZ.", icon: Award },
            { name: "Tư vấn chi tiết", description: "Hướng dẫn từng bước làm visa.", icon: UserCheck }
        ],
        process: [
            { name: "Tư vấn & Chuẩn bị", description: "Đánh giá và lập kế hoạch.", icon: MessageSquare },
            { name: "Nộp hồ sơ", description: "Nộp online và theo dõi.", icon: FileText }
        ]
    },
    "fiji": {
        continentSlug: "visa-chau-uc",
        title: "Dịch Vụ Xin Visa Fiji",
        countryName: "Fiji",
        heroImage: "https://images.unsplash.com/photo-1511022890239-e52e7b6d7f37",
        successRate: "95%",
        processingTime: "5-7 ngày làm việc",
        description: "Dịch vụ xin visa Fiji cho du lịch biển đảo.",
        services: ["Tư vấn hồ sơ", "Dịch thuật", "Book lịch hẹn", "Theo dõi kết quả"],
        visaTypes: [
            {
                id: "tourist",
                name: "Visa Du lịch",
                requirements: {
                    personal: ["Hộ chiếu", "Ảnh 4x6"],
                    work: [{ type: "Nghề nghiệp", docs: ["Xác nhận công tác"] }],
                    financial: ["Sao kê ngân hàng"],
                    travel: ["Vé máy bay khứ hồi", "Book khách sạn"]
                }
            }
        ],
        pricing: [
            {
                type: "Trọn gói",
                name: "Dịch vụ visa du lịch",
                prices: [{
                    adult: "900.000 VNĐ",
                    child_6_12: "900.000 VNĐ",
                    child_under_6: "900.000 VNĐ",
                    note: "Chưa bao gồm phí LSQ"
                }]
            }
        ],
        testimonials: mockTestimonials,
        relatedArticles: mockRelatedArticles,
        benefits: [
            { name: "Đơn giản", description: "Thủ tục đơn giản, nhanh chóng.", icon: Award },
            { name: "Hỗ trợ tận tình", description: "Tư vấn chi tiết mọi vấn đề.", icon: UserCheck }
        ],
        process: [
            { name: "Tư vấn & Chuẩn bị", description: "Kiểm tra và tư vấn hồ sơ.", icon: MessageSquare },
            { name: "Nộp hồ sơ", description: "Nộp và theo dõi kết quả.", icon: FileText }
        ]
    },
    "samoa": {
        continentSlug: "visa-chau-uc",
        title: "Dịch Vụ Xin Visa Samoa",
        countryName: "Samoa",
        heroImage: "https://images.unsplash.com/photo-1439396087961-98bc12c21176",
        successRate: "93%",
        processingTime: "5-7 ngày làm việc",
        description: "Dịch vụ xin visa Samoa cho du lịch biển đảo.",
        services: ["Tư vấn hồ sơ", "Dịch thuật", "Book lịch hẹn", "Theo dõi kết quả"],
        visaTypes: [
            {
                id: "tourist",
                name: "Visa Du lịch",
                requirements: {
                    personal: ["Hộ chiếu", "Ảnh 4x6"],
                    work: [{ type: "Nghề nghiệp", docs: ["Xác nhận công tác"] }],
                    financial: ["Sao kê ngân hàng"],
                    travel: ["Vé máy bay khứ hồi"]
                }
            }
        ],
        pricing: [
            {
                type: "Trọn gói",
                name: "Dịch vụ visa du lịch",
                prices: [{
                    adult: "800.000 VNĐ",
                    child_6_12: "800.000 VNĐ",
                    child_under_6: "800.000 VNĐ",
                    note: "Chưa bao gồm phí LSQ"
                }]
            }
        ],
        testimonials: mockTestimonials,
        relatedArticles: mockRelatedArticles,
        benefits: [
            { name: "Nhanh chóng", description: "Xử lý trong 5-7 ngày làm việc.", icon: Award },
            { name: "Đơn giản", description: "Thủ tục đơn giản, dễ dàng.", icon: UserCheck }
        ],
        process: [
            { name: "Tư vấn & Chuẩn bị", description: "Kiểm tra và tư vấn hồ sơ.", icon: MessageSquare },
            { name: "Nộp hồ sơ", description: "Nộp và theo dõi kết quả.", icon: FileText }
        ]
    },
    "uc": {
        continentSlug: "visa-chau-uc",
        title: "Dịch Vụ Xin Visa Úc",
        countryName: "Úc",
        heroImage: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be",
        successRate: "90%",
        processingTime: "20-25 ngày làm việc",
        description: "Dịch vụ xin visa Úc chuyên nghiệp, đa dạng loại visa.",
        services: ["Tư vấn hồ sơ", "Dịch thuật công chứng", "Book lịch nộp", "Theo dõi kết quả"],
        visaImages: [
            {
                type: "Visa Úc",
                url: "https://images.unsplash.com/photo-1589802829985-817e51171b92",
                description: "Mẫu visa Úc loại Visitor (subclass 600)"
            },
            {
                type: "Nhà hát Opera Sydney",
                url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9",
                description: "Biểu tượng văn hóa của Úc"
            },
            {
                type: "Great Barrier Reef",
                url: "https://images.unsplash.com/photo-1582067276212-48c3bc3b69ae",
                description: "Rạn san hô lớn nhất thế giới"
            },
            {
                type: "Twelve Apostles",
                url: "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8",
                description: "Danh thắng trên Great Ocean Road"
            },
            {
                type: "Sydney Harbour Bridge",
                url: "https://images.unsplash.com/photo-1506374322094-6021fc3926f1",
                description: "Cầu cảng Sydney nổi tiếng"
            }
        ],
        visaTypes: [
            {
                id: "visitor600",
                name: "Visa Visitor (600)",
                requirements: {
                    personal: ["Hộ chiếu", "Ảnh 4x6", "Lý lịch tư pháp"],
                    work: [{ type: "Công việc", docs: ["Hợp đồng lao động", "Quyết định công tác"] }],
                    financial: ["Sao kê 6 tháng", "Sổ tiết kiệm", "Tài sản"],
                    travel: ["Kế hoạch du lịch", "Bảo hiểm du lịch"]
                }
            }
        ],
        pricing: [
            {
                type: "Trọn gói",
                name: "Dịch vụ visa du lịch",
                prices: [{
                    adult: "4.500.000 VNĐ",
                    child_6_12: "4.500.000 VNĐ",
                    child_under_6: "4.500.000 VNĐ",
                    note: "Chưa bao gồm phí LSQ"
                }]
            }
        ],
        testimonials: mockTestimonials,
        relatedArticles: mockRelatedArticles,
        benefits: [
            { name: "Chuyên nghiệp", description: "Đội ngũ có chứng chỉ tư vấn visa Úc.", icon: Award },
            { name: "Hỗ trợ toàn diện", description: "Đồng hành từ đầu đến cuối.", icon: UserCheck }
        ],
        process: [
            { name: "Tư vấn & Lập kế hoạch", description: "Đánh giá và lên chiến lược.", icon: MessageSquare },
            { name: "Chuẩn bị & Nộp hồ sơ", description: "Thu thập và nộp hồ sơ online.", icon: FileText }
        ]
    }
};

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
  