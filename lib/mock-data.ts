
import { 
    Service,
    HomepageService, 
    Tour, 
    News, 
    VisaCategory, 
    TourCategory, 
    VisaDetail,
    Testimonial,
    RelatedArticle,
    NavItem
} from '@/types';
import { Briefcase, UserCheck, Award, ClipboardCheck, MessageSquare, FileText, CalendarCheck, CheckCircle, Shield, Star } from 'lucide-react';

// =========================================================================
// SITE CONFIGURATION
// =========================================================================

export const siteConfig = {
  name: "VISA5S",
  description: "Dịch vụ làm visa chuyên nghiệp, nhanh chóng và tin cậy. VISA5S cung cấp các giải pháp toàn diện cho visa du lịch, công tác, và thăm thân với tỷ lệ thành công cao.",
  url: "https://visa5s.com", // Replace with your actual domain
  ogImage: "https://visa5s.com/og-image.jpg", // Replace with your actual OG image URL
};

export const contactInfo = {
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

// =========================================================================
// MOCK DATA
// =========================================================================

// Correctly typed mockServices array
export const mockServices: Service[] = [
    {
        id: "visa-my",
        slug: "visa-my",
        title: "Visa Mỹ (Du lịch, Công tác, Thăm thân)",
        country: "Mỹ",
        category: "Visa Châu Mỹ",
        categorySlug: "visa-chau-my",
        image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=2070&auto=format&fit=crop",
        description: "Dịch vụ tư vấn và hoàn thiện hồ sơ xin visa Mỹ trọn gói, giúp bạn tăng tỷ lệ đậu và tiết kiệm thời gian.",
        price: "Liên hệ",
        successRate: "98%",
    },
    {
        id: "visa-nhat-ban",
        slug: "visa-nhat-ban",
        title: "Visa Nhật Bản (Du lịch, Công tác)",
        country: "Nhật Bản",
        category: "Visa Châu Á",
        categorySlug: "visa-chau-a",
        image: "/images/services/visa-japan.jpg",
        description: "Xin visa Nhật Bản nhanh chóng và dễ dàng với dịch vụ của chúng tôi.",
        price: "1.500.000 VNĐ",
        successRate: "99%",
    }
];

export const mockHomepageServices: HomepageService[] = [
  { slug: "visa-doanh-nghiep", title: "Visa Doanh Nghiệp", description: "Giải pháp visa cho công ty, đoàn thể đi công tác, hội thảo.", image: "/images/services/service-1.jpg" },
  { slug: "visa-ca-nhan", title: "Visa Cá Nhân", description: "Dịch vụ visa du lịch, thăm thân cho các cá nhân và gia đình.", image: "/images/services/service-2.jpg" },
  { slug: "visa-tron-goi", title: "Visa Trọn Gói", description: "Lo từ A-Z, cam kết tỷ lệ đậu cao, tiết kiệm thời gian.", image: "/images/services/service-3.jpg" },
  { slug: "tu-van-mien-phi", title: "Tư Vấn Miễn Phí", description: "Đánh giá hồ sơ và tư vấn giải pháp tối ưu nhất cho bạn.", image: "/images/services/service-4.jpg" }
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
  }
];

export const mockVisaCategories: VisaCategory[] = [
    {
        name: "Visa Châu Á",
        slug: "visa-chau-a",
        description: "Xin visa các nước Châu Á nhanh chóng.",
        countries: [
            { name: "Nhật Bản", slug: "visa-nhat-ban" },
            { name: "Hàn Quốc", slug: "visa-han-quoc" },
        ]
    },
    {
        name: "Visa Châu Mỹ",
        slug: "visa-chau-my",
        description: "Chinh phục giấc mơ Mỹ.",
        countries: [
            { name: "Hoa Kỳ (Mỹ)", slug: "visa-my" },
        ]
    }
];

const mockTestimonials: Testimonial[] = [
    { id: "test1", name: "Nguyễn Văn A", quote: "Dịch vụ tuyệt vời!", rating: 5, image: "/images/testimonials/avatar1.jpg" }
];

const mockRelatedArticles: RelatedArticle[] = [
    { id: "ra1", title: "Kinh nghiệm du lịch Mỹ tự túc", url: "/tin-tuc/kinh-nghiem-du-lich-my", image: "/images/articles/related1.jpg" }
];

export const mockVisaPageData: Record<string, VisaDetail> = {
    "visa-my": {
        title: "Dịch Vụ Xin Visa Mỹ (Du Lịch, Công Tác, Thăm Thân)",
        heroImage: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=2070&auto=format&fit=crop",
        successRate: "98%",
        processingTime: "Phụ thuộc lịch hẹn",
        description: "Dịch vụ tư vấn và hoàn thiện hồ sơ xin visa Mỹ trọn gói.",
        services: ["Tư vấn hồ sơ", "Điền đơn DS-160", "Luyện phỏng vấn"],
        visaTypes: [
            {
                id: "b1b2",
                name: "Visa B1/B2",
                requirements: {
                    personal: ["Hộ chiếu", "Ảnh thẻ"],
                    work: [{ type: "Chủ doanh nghiệp", docs: ["Giấy phép kinh doanh"] }],
                    financial: ["Sao kê ngân hàng"],
                    travel: ["Lịch trình chuyến đi"]
                }
            }
        ],
        pricing: [
            {
                type: "Trọn gói",
                name: "Dịch vụ trọn gói",
                prices: [{
                    adult: "2.500.000 VNĐ",
                    child_6_12: "2.500.000 VNĐ",
                    child_under_6: "2.500.000 VNĐ",
                    note: "Chưa bao gồm phí lãnh sự"
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
    }
};
