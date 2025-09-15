
export const siteConfig = {
  name: "Visa5s - Dịch Vụ Visa & Tour Du Lịch",
  title: "Visa5s - Dịch Vụ Visa & Tour Du Lịch Uy Tín, Chuyên Nghiệp",
  description: "Visa5s cung cấp dịch vụ xin visa các nước, tour du lịch trọn gói, và tư vấn du lịch chuyên nghiệp. Khám phá thế giới dễ dàng cùng chúng tôi.",
  keywords: ["dịch vụ visa", "xin visa", "visa du lịch", "tour du lịch", "du lịch trọn gói", "visa5s"],
  url: "https://www.visa5s.com",
  ogImage: "https://www.visa5s.com/og-image.jpg",
  author: "Visa5s Team",
};

export const contactInfo = {
  phone: "0911.909.686",
  email: "info@visa5s.com",
  addresses: {
    hcm: "123 Đường ABC, Phường X, Quận Y, TP. Hồ Chí Minh",
    hn: "456 Phố XYZ, Quận A, TP. Hà Nội",
  },
};

export const footerInfo = {
  companyName: "VISA5S",
  fullCompanyName: "CÔNG TY TNHH DỊCH VỤ VISA5S",
  description: "Chuyên cung cấp các giải pháp visa và tour du lịch trọn gói, giúp bạn hiện thực hóa giấc mơ khám phá thế giới.",
  services: [
      { name: "Dịch Vụ Visa", href: "/dich-vu-visa" },
      { name: "Tour Du Lịch", href: "/tour-du-lich" },
      { name: "Tin Tức", href: "/tin-tuc" },
      { name: "Về Chúng Tôi", href: "/ve-chung-toi" },
  ],
  legal: [
      { name: "Điều Khoản Dịch Vụ", href: "/dieu-khoan" },
      { name: "Chính Sách Bảo Mật", href: "/chinh-sach" },
  ],
  quickLinks: [
      { name: "Câu Hỏi Thường Gặp", href: "/faq" },
      { name: "Hướng Dẫn Thanh Toán", href: "/thanh-toan" },
      { name: "Liên Hệ", href: "/lien-he" },
  ],
  socials: [
    { name: "Facebook", href: "#", icon: "Facebook" },
    { name: "Zalo", href: "#", icon: "MessageCircle" },
    { name: "Email", href: "#", icon: "Mail" },
    { name: "Youtube", href: "#", icon: "Youtube" },
  ]
};

export const services = [
  {
    slug: "visa-du-lich",
    title: "Visa Du Lịch",
    description: "Xin visa cho mục đích du lịch, khám phá văn hóa.",
    icon: "Plane",
    image: "/images/services/service-1.jpg",
    price: "Từ 1.500.000 VNĐ",
    processingTime: "5-7 ngày làm việc",
    items: ["Mỹ", "Úc", "Canada", "Anh", "Schengen", "Hàn Quốc"]
  },
  {
    slug: "visa-tham-than",
    title: "Visa Thăm Thân",
    description: "Đoàn tụ với gia đình và bạn bè ở nước ngoài.",
    icon: "Users",
    image: "/images/services/service-2.jpg",
    price: "Từ 2.000.000 VNĐ",
    processingTime: "10-15 ngày làm việc",
    items: ["Mỹ", "Úc", "Canada", "Anh"]
  },
  {
    slug: "visa-cong-tac",
    title: "Visa Công Tác",
    description: "Tham dự hội nghị, gặp gỡ đối tác kinh doanh.",
    icon: "Briefcase",
    image: "/images/services/service-3.jpg",
    price: "Từ 2.500.000 VNĐ",
    processingTime: "7-10 ngày làm việc",
    items: ["Mỹ", "Schengen", "Nhật Bản"]
  }
];

export const visaCategories = {
  "visa-du-lich": {
    name: "Visa Du Lịch",
    description: "Dịch vụ xin visa du lịch đến các quốc gia phổ biến nhất, với thủ tục đơn giản và tỷ lệ thành công cao.",
    countries: [
      { slug: "my", name: "Visa Mỹ", image: "/images/visa/my.jpg", visaTypes: ["Du lịch B2", "Công tác B1"] },
      { slug: "uc", name: "Visa Úc", image: "/images/visa/uc.jpg", visaTypes: ["Du lịch 600", "Thăm thân 600"] },
      { slug: "canada", name: "Visa Canada", image: "/images/visa/canada.jpg", visaTypes: ["Du lịch V-1", "Super Visa"] },
    ]
  },
  "visa-tham-than": {
    name: "Visa Thăm Thân",
    description: "Kết nối yêu thương, giúp bạn đoàn tụ với gia đình và người thân tại nước ngoài một cách nhanh chóng.",
    countries: [
      { slug: "my", name: "Visa Mỹ", image: "/images/visa/my.jpg", visaTypes: ["Thăm thân B2"] },
      { slug: "anh", name: "Visa Anh", image: "/images/visa/anh.jpg", visaTypes: ["Standard Visitor"] },
    ]
  }
};

export const visaDetailData = {
  "visa-du-lich": {
    "my": {
      title: "Visa Du lịch Mỹ (B1/B2)",
      heroImage: "/images/visa/my-hero.jpg",
      successRate: "98%",
      processingTime: "2-4 tuần",
      description: "Khám phá xứ cờ hoa với dịch vụ xin visa Mỹ trọn gói từ Visa5s. Chúng tôi hỗ trợ bạn từ A-Z, từ việc điền đơn DS-160, chuẩn bị hồ sơ đến luyện phỏng vấn để đảm bảo tỷ lệ đậu cao nhất.",
      services: ["Điền đơn DS-160", "Dịch thuật công chứng", "Sắp xếp hồ sơ logic", "Luyện phỏng vấn 1-1", "Đặt lịch hẹn phỏng vấn"],
      visaTypes: [], pricing: [], whyChooseUs: [], testimonials: [], relatedArticles: []
    }
  }
};

export const blogPosts = [
  {
    id: 1, slug: "kinh-nghiem-phong-van-visa-my", title: "Kinh nghiệm phỏng vấn visa Mỹ lần đầu, tỉ lệ đậu 99%",
    excerpt: "Cùng Visa5s bỏ túi những kinh nghiệm xương máu để chinh phục buổi phỏng vấn visa Mỹ...",
    author: "Thanh Huyen", date: "2024-05-15", imageUrl: "/images/news/news-1.jpg", tags: ["Visa Mỹ", "Kinh Nghiệm"], readTime: 8
  },
  {
    id: 2, slug: "10-diem-den-chau-au-mua-he", title: "Top 10 điểm đến Châu Âu không thể bỏ lỡ mùa hè này",
    excerpt: "Mùa hè là thời điểm lý tưởng để khám phá Lục địa già. Từ bãi biển xanh mướt đến thành phố cổ kính...",
    author: "Hoang An", date: "2024-05-10", imageUrl: "/images/news/news-2.jpg", tags: ["Du Lịch Châu Âu", "Mùa Hè"], readTime: 12
  },
  {
    id: 3, slug: "xin-visa-schengen-co-kho-khong", title: "Xin visa Schengen có khó không? Cẩm nang từ A-Z",
    excerpt: "Visa Schengen cho phép bạn tự do đi lại 26 quốc gia châu Âu. Thủ tục có phức tạp không?",
    author: "Minh Anh", date: "2024-05-01", imageUrl: "/images/news/news-3.jpg", tags: ["Visa Schengen", "Thủ Tục"], readTime: 10
  }
];

export const tourCategories = {
  "chau-a": {
    name: "Châu Á",
    image: "/images/tours/categories/chau-a.jpg",
    description: "Khám phá vẻ đẹp đa dạng của Châu Á.",
    tours: [
      { name: "Hàn Quốc", slug: "han-quoc", image: "/images/tours/han-quoc.jpg", destinations: [
          { 
            name: "Seoul - Nami - Everland", 
            slug: "seoul-nami-everland-5n4d", 
            duration: "5 ngày 4 đêm", 
            price: "15990000", 
            originalPrice: "17500000",
            image: "/images/tours/han-quoc-1.jpg",
            departure: ["Hồ Chí Minh", "Hà Nội"],
            highlights: ["Cung điện Gyeongbok", "Đảo Nami lãng mạn", "Công viên Everland", "Tháp Namsan"]
          },
      ]},
      { name: "Nhật Bản", slug: "nhat-ban", image: "/images/tours/nhat-ban.jpg", destinations: [
          { 
            name: "Cung Đường Vàng: Tokyo - Fuji - Kyoto", 
            slug: "tokyo-fuji-kyoto-6n5d", 
            duration: "6 ngày 5 đêm", 
            price: "29990000",
            image: "/images/tours/nhat-ban-1.jpg",
            departure: ["Hồ Chí Minh"],
            highlights: ["Núi Phú Sĩ", "Làng cổ Oshino Hakkai", "Chùa vàng Kinkaku-ji", "Phố cổ Gion"]
          },
      ]},
    ]
  },
  "chau-au": {
    name: "Châu Âu",
    image: "/images/tours/categories/chau-au.jpg",
    description: "Trải nghiệm không gian văn hóa, kiến trúc độc đáo.",
    tours: [
      { name: "Pháp - Thụy Sĩ - Ý", slug: "phap-thuy-si-y", image: "/images/tours/phap-y-thuy-si.jpg", destinations: [
          { 
            name: "Hành Trình 3 Kinh Đô Ánh Sáng", 
            slug: "hanh-trinh-3-nuoc-10n9d", 
            duration: "10 ngày 9 đêm", 
            price: "69900000", 
            image: "/images/tours/chau-au-1.jpg",
            departure: ["Hà Nội"],
            highlights: ["Tháp Eiffel", "Đấu trường La Mã Colosseum", "Thị trấn Interlaken", "Du thuyền trên sông Seine"]
          }
      ]}
    ]
  },
};

export const featuredTours = [
  { ...tourCategories["chau-a"].tours[0].destinations[0], id: "tour-1", isHot: true },
  { ...tourCategories["chau-au"].tours[0].destinations[0], id: "tour-2", isHot: true },
  { ...tourCategories["chau-a"].tours[1].destinations[0], id: "tour-3", isHot: true },
];
