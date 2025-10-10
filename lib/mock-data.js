// This file is a CommonJS version of mock-data.ts for use in Node.js scripts.

const { Award, FileText, MessageSquare, UserCheck } = require('lucide-react');

const siteConfig = {
  name: "VISA5S",
  description: "Dịch vụ làm visa chuyên nghiệp, nhanh chóng và tin cậy. VISA5S cung cấp các giải pháp toàn diện cho visa du lịch, công tác, và thăm thân với tỷ lệ thành công cao.",
  url: "https://visa5s.com", // Replace with your actual domain
  ogImage: "https://visa5s.com/og-image.jpg", // Replace with your actual OG image URL
};

const contactInfo = {
  address: "Tầng 5, toà nhà APTEK, 77-79-81 Nguyễn Văn Linh, phường Nam Dương, quận Hải Châu, TP. Đà Nẵng",
  phone: "0911.909.686",
  email: "info@visa5s.com",
  website: "www.visa5s.com",
  facebook: "https://facebook.com/visa5s",
  zalo: "https://zalo.me/0911909686",
};

const navigationLinks = [
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

const mockTours = [
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
    }
  ];

const mockTourCategories = [
    { name: "Tour Trong Nước", slug: "tour-trong-nuoc", description: "Khám phá vẻ đẹp Việt Nam", imageUrl: "", tours: mockTours },
    { name: "Tour Châu Á", slug: "tour-chau-a", description: "Du lịch các nước Châu Á", imageUrl: "", tours: [] },
];

const mockNews = [
  {
    id: 1,
    title: "Bí quyết phỏng vấn visa Mỹ",
    content: `<h2>1. Chuẩn bị...</h2>`,
    slug: "bi-quyet-phong-van-visa-my",
    keyword: ["visa", "hướng dẫn", "phỏng vấn", "Mỹ"],
    excerpt: "Phỏng vấn là bước quan trọng nhất...",
  }
];

const mockVisaContinents = [
    {
        name: "Visa Châu Á",
        slug: "visa-chau-a",
        description: "Xin visa các nước Châu Á nhanh chóng.",
        countries: [
            { name: "Nhật Bản", slug: "nhat-ban" },
            { name: "Hàn Quốc", slug: "han-quoc" },
        ]
    }
];

const mockVisaPageData = [
    {
        slug: "china",
        continentSlug: "visa-chau-a",
        title: "Dịch Vụ Xin Visa Trung Quốc",
        countryName: "Trung Quốc",
        heroImage: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b",
        description: "Dịch vụ xin visa Trung Quốc chuyên nghiệp..."
    }
];

const newsPreview = [
    {
      id: 1,
      slug: 'bi-quyet-phong-van-visa-my',
      imageUrl: '/images/news/news-1.jpg',
      title: 'Bí quyết phỏng vấn visa Mỹ',
      category: [ 'visa', 'hướng dẫn', 'phỏng vấn', 'Mỹ' ],
      excerpt: 'Phỏng vấn là bước quan trọng nhất...',
    }
];

function getCountriesByContinent() {
  const map = {};
  for (const [slug, detail] of Object.entries(mockVisaPageData)) {
    if (!map[detail.continentSlug]) map[detail.continentSlug] = [];
    map[detail.continentSlug].push({ slug, name: detail.title.replace("Dịch Vụ Xin Visa ", "") });
  }
  return map;
}

module.exports = {
    siteConfig,
    contactInfo,
    navigationLinks,
    mockTours,
    mockTourCategories,
    mockNews,
    mockVisaContinents,
    mockVisaPageData,
    newsPreview,
    getCountriesByContinent
};