// ==================== THÔNG TIN LIÊN HỆ ====================
export const contactInfo = {
  phone: "0911.909.686",
  phoneSecondary: "0967.686.101", 
  email: "info@visa5s.com.vn",
  zalo: "0911909686",
  facebook: "https://www.facebook.com/visa5s.com.vn",
  youtube: "https://www.youtube.com/@visa5s",
  addresses: {
    hcm: "370 Đường 3/2, P.12, Q.10, TP.HCM",
    binhDuong: "16 Trần Đại Nghĩa, P. Bình An, TP. Dĩ An, Bình Dương", 
    hanoi: "87 Vương Thừa Vũ, P. Khương Mai, Thanh Xuân, Hà Nội"
  }
};

// ==================== MENU ĐIỀU HƯỚNG ====================
export const navLinks = [
  { href: "/", label: "Trang chủ" },
  { 
    href: "/dich-vu", 
    label: "Dịch vụ",
    hasDropdown: true,
    children: [
      { href: "/dich-vu/visa-chau-a", label: "Visa Châu Á" },
      { href: "/dich-vu/visa-chau-au", label: "Visa Châu Âu" },
      { href: "/dich-vu/visa-chau-my", label: "Visa Châu Mỹ" },
      { href: "/dich-vu/visa-chau-dai-duong", label: "Visa Châu Đại Dương" }
    ]
  },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/lien-he", label: "Liên hệ" },
];

// ==================== DANH MỤC VISA THEO CHÂU LỤC ====================
export const visaCategories = {
  "visa-chau-a": {
    name: "Visa Châu Á",
    countries: [
      {
        name: "Hàn Quốc",
        slug: "han-quoc",
        image: "https://images.unsplash.com/photo-1549769015-3ded74941c7a?q=80&w=1200",
        visaTypes: ["Du lịch", "Công tác", "Thăm thân", "Lao động", "C4", "E8", "E9"]
      },
      {
        name: "Nhật Bản", 
        slug: "nhat-ban",
        image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200",
        visaTypes: ["Du lịch", "Công tác", "Thăm thân"]
      },
      {
        name: "Trung Quốc",
        slug: "trung-quoc", 
        image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1200",
        visaTypes: ["Du lịch", "Công tác", "Thăm thân"]
      },
      {
        name: "Đài Loan",
        slug: "dai-loan",
        image: "https://images.unsplash.com/photo-1570600518218-7a6e9ca80d60?q=80&w=1200", 
        visaTypes: ["Du lịch", "Công tác"]
      },
      {
        name: "Hong Kong",
        slug: "hong-kong",
        image: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?q=80&w=1200",
        visaTypes: ["Du lịch", "Công tác"]
      }
    ]
  },
  "visa-chau-au": {
    name: "Visa Châu Âu", 
    countries: [
      {
        name: "Anh Quốc",
        slug: "anh-quoc",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200",
        visaTypes: ["Du lịch", "Công tác", "Thăm thân", "Học tập"]
      },
      {
        name: "Đức",
        slug: "duc",
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200",
        visaTypes: ["Du lịch", "Công tác", "Schengen"]
      },
      {
        name: "Pháp",
        slug: "phap",
        image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?q=80&w=1200",
        visaTypes: ["Du lịch", "Công tác", "Schengen"]
      },
      {
        name: "Tây Ban Nha", 
        slug: "tay-ban-nha",
        image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200",
        visaTypes: ["Du lịch", "Công tác", "Schengen"]
      }
    ]
  },
  "visa-chau-my": {
    name: "Visa Châu Mỹ",
    countries: [
      {
        name: "Mỹ",
        slug: "my",
        image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=1200",
        visaTypes: ["Du lịch", "Công tác", "Thăm thân", "Học tập"]
      },
      {
        name: "Canada",
        slug: "canada", 
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1200",
        visaTypes: ["Du lịch", "Công tác", "Thăm thân"]
      }
    ]
  },
  "visa-chau-dai-duong": {
    name: "Visa Châu Đại Dương",
    countries: [
      {
        name: "Úc",
        slug: "uc",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200",
        visaTypes: ["Du lịch", "Công tác", "Thăm thân"]
      }
    ]
  }
};

// ==================== DỊCH VỤ NỔI BẬT ====================
export const services = [
  {
    icon: "Plane",
    title: "Visa Du Lịch Mỹ",
    slug: "visa-du-lich-my", 
    description: "Tỷ lệ đậu visa 99%, thủ tục nhanh gọn. Khám phá xứ cờ hoa chưa bao giờ dễ dàng hơn.",
    price: "Từ 15.000.000 VNĐ",
    processingTime: "15-20 ngày",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800",
    category: "visa-chau-my"
  },
  {
    icon: "Globe",
    title: "Visa Du Lịch Hàn Quốc", 
    slug: "visa-du-lich-han-quoc",
    description: "Trải nghiệm văn hóa K-Pop và ẩm thực đường phố đặc sắc tại Hàn Quốc.",
    price: "Từ 2.500.000 VNĐ",
    processingTime: "7-10 ngày", 
    image: "https://images.unsplash.com/photo-1549769015-3ded74941c7a?q=80&w=800",
    category: "visa-chau-a"
  },
  {
    icon: "Globe",
    title: "Visa Du Lịch Nhật Bản",
    slug: "visa-du-lich-nhat-ban",
    description: "Ngắm hoa anh đào, khám phá các thành phố hiện đại và truyền thống của Nhật Bản.",
    price: "Từ 3.000.000 VNĐ", 
    processingTime: "5-7 ngày",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=800",
    category: "visa-chau-a"
  },
  {
    icon: "Globe", 
    title: "Visa Schengen (Châu Âu)",
    slug: "visa-schengen",
    description: "Tự do di chuyển giữa 26 quốc gia thuộc khối Schengen chỉ với một lần xin visa.",
    price: "Từ 4.500.000 VNĐ",
    processingTime: "10-15 ngày",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800",
    category: "visa-chau-au"
  },
  {
    icon: "Globe",
    title: "Visa Du Lịch Canada", 
    slug: "visa-du-lich-canada",
    description: "Khám phá thiên nhiên hùng vĩ và các thành phố đa văn hóa của Canada.",
    price: "Từ 6.000.000 VNĐ",
    processingTime: "10-15 ngày",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800",
    category: "visa-chau-my"
  },
  {
    icon: "Globe",
    title: "Visa Du Lịch Anh",
    slug: "visa-du-lich-anh", 
    description: "Tham quan các địa danh lịch sử và trải nghiệm văn hóa độc đáo của Vương quốc Anh.",
    price: "Từ 7.500.000 VNĐ",
    processingTime: "15-20 ngày",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800",
    category: "visa-chau-au"
  },
  {
    icon: "Globe",
    title: "Visa Du Lịch Úc",
    slug: "visa-du-lich-uc",
    description: "Khám phá đất nước châu Đại Dương với động vật ho야 dã độc đáo và cảnh quan tuyệt đẹp.",
    price: "Từ 5.500.000 VNĐ",
    processingTime: "7-10 ngày",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800", 
    category: "visa-chau-dai-duong"
  },
  {
    icon: "Globe",
    title: "Visa Du Lịch Trung Quốc",
    slug: "visa-du-lich-trung-quoc",
    description: "Khám phá lịch sử 5000 năm văn minh và các thành phố hiện đại nhất thế giới.",
    price: "Từ 1.800.000 VNĐ",
    processingTime: "5-7 ngày", 
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=800",
    category: "visa-chau-a"
  }
];

// ==================== LÝ DO CHỌN VISA5S ====================
export const whyChooseUs = [
  {
    icon: "Clock",
    title: "Xử Lý Hồ Sơ Nhanh", 
    description: "Hồ sơ được tiếp nhận và hoàn thành nhanh chóng với quy trình tối ưu"
  },
  {
    icon: "Award",
    title: "Tỷ Lệ Đậu Visa 99%",
    description: "Kinh nghiệm nhiều năm giúp tối ưu hóa tỷ lệ thành công"
  },
  {
    icon: "Users", 
    title: "Chuyên Nghiệp",
    description: "Tiến trình thực hiện được cập nhật tới quý khách liên tục"
  },
  {
    icon: "DollarSign",
    title: "Tiết Kiệm Chi Phí",
    description: "Báo giá minh bạch, không phát sinh chi phí ẩn"
  }
];

// ==================== THỐNG KÊ ====================
export const stats = [
  { number: "23,868", label: "Hồ sơ", icon: "FileText" },
  { number: "9,886", label: "Khách hàng", icon: "Users" },
  { number: "312", label: "Đối tác, đại lý", icon: "Building" },
  { number: "150", label: "Quốc gia", icon: "Globe" }
];

// ==================== QUY TRÌNH XỬ LÝ ====================
export const processSteps = [
  {
    step: 1,
    title: "Tư vấn báo giá",
    description: "Tư vấn, báo giá theo từng trường hợp cụ thể",
    icon: "MessageCircle"
  },
  {
    step: 2, 
    title: "Soạn thảo hồ sơ",
    description: "Chuẩn bị & sắp xếp hồ sơ, khai form, điền biểu mẫu",
    icon: "FileText"
  },
  {
    step: 3,
    title: "Nộp hồ sơ xin Visa", 
    description: "Thay mặt Khách hàng nộp hồ sơ tại cơ quan có thẩm quyền",
    icon: "Send"
  },
  {
    step: 4,
    title: "Nhận kết quả",
    description: "Theo dõi tình trạng và báo Khách hàng ngay khi có kết quả. Giao nhận tận nơi, miễn phí",
    icon: "CheckCircle"
  }
];

// ==================== THÔNG TIN CÔNG TY ====================
export const footerInfo = {
  companyName: "Visa5s",
  fullCompanyName: "CÔNG TY TƯ VẤN ĐẦU TƯ ASIA BLUE SKY",
  description: "Chuyên cung cấp dịch vụ xin visa uy tín, nhanh chóng và hiệu quả hàng đầu Việt Nam.",
  addresses: {
    hcm: "370 Đường 3/2, P.12, Q.10, TP.HCM",
    binhDuong: "16 Trần Đại Nghĩa, P. Bình An, TP. Dĩ An, Bình Dương",
    hanoi: "87 Vương Thừa Vũ, P. Khương Mai, Thanh Xuân, Hà Nội"
  },
  socials: [
    { name: "Facebook", href: "https://www.facebook.com/visa5s.com.vn", icon: "Facebook" },
    { name: "Zalo", href: "#", icon: "MessageCircle" },
    { name: "YouTube", href: "https://www.youtube.com/@visa5s", icon: "Youtube" },
    { name: "Email", href: "mailto:info@visa5s.com.vn", icon: "Mail" }
  ],
  quickLinks: [
    { name: "Giới Thiệu", href: "/gioi-thieu" },
    { name: "Tuyển dụng", href: "/tuyen-dung" },
    { name: "Quy định chung", href: "/quy-dinh" },
    { name: "Bảo mật thông tin", href: "/bao-mat" }
  ]
};

// ==================== TIN TỨC - BÀI VIẾT ====================
export const blogPosts = [
  {
    id: 1,
    slug: "visa-c4-han-quoc-2025-dieu-kien-cach-xin",
    title: "Visa C4 Hàn Quốc 2025: Điều kiện & Cách xin visa mới nhất",
    excerpt: "Chi tiết về điều kiện & cách xin visa C4 Hàn Quốc. Hàn Quốc hiện là điểm đến thu hút đông đảo người lao động, nghệ sĩ...",
    content: `
      <h2>Visa C4 Hàn Quốc là gì?</h2>
      <p>Visa C4 Hàn Quốc là loại visa ngắn hạn dành cho những người muốn tham gia các hoạt động văn hóa, nghệ thuật, thể thao...</p>
      
      <h3>Điều kiện xin visa C4 Hàn Quốc</h3>
      <ul>
        <li>Có thư mời từ tổ chức, công ty tại Hàn Quốc</li>
        <li>Chứng minh tài chính đủ để chi trả cho chuyến đi</li>
        <li>Không có tiền án tiền sự</li>
      </ul>
      
      <h3>Hồ sơ cần thiết</h3>
      <p>Danh sách hồ sơ chi tiết và cách chuẩn bị...</p>
    `,
    author: "Visa5s Team",
    date: "05/09/2025", 
    category: "Visa Hàn Quốc",
    imageUrl: "https://images.unsplash.com/photo-1549769015-3ded74941c7a?q=80&w=1200",
    tags: ["Visa Hàn Quốc", "C4", "2025"],
    readTime: "5 phút đọc"
  },
  {
    id: 2,
    slug: "visa-e9-han-quoc-la-gi-dieu-kien-ho-so",
    title: "Visa E9 Hàn Quốc là gì? Điều kiện, Hồ sơ & Thủ tục mới nhất", 
    excerpt: "Visa E9 Hàn Quốc là con đường để nhiều lao động Việt Nam có cơ hội làm việc tại Hàn Quốc với mức lương cao...",
    content: `
      <h2>Visa E9 Hàn Quốc - Visa lao động phi kỹ năng</h2>
      <p>Visa E9 là loại visa cho phép lao động nước ngoài làm việc tại các ngành nghề phi kỹ năng ở Hàn Quốc...</p>
      
      <h3>Các ngành nghề được phép</h3>
      <ul>
        <li>Sản xuất</li>
        <li>Xây dựng</li> 
        <li>Nông nghiệp</li>
        <li>Nuôi trồng thủy sản</li>
        <li>Dịch vụ</li>
      </ul>
    `,
    author: "Visa5s Team",
    date: "05/09/2025",
    category: "Visa Hàn Quốc", 
    imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?q=80&w=1200",
    tags: ["Visa Hàn Quốc", "E9", "Lao động"],
    readTime: "7 phút đọc"
  },
  {
    id: 3,
    slug: "dia-chi-trung-tam-visa-han-quoc-tphcm-hanoi",
    title: "Địa chỉ trung tâm visa Hàn Quốc tại TPHCM và Hà Nội",
    excerpt: "Trung tâm đăng ký visa Hàn Quốc hay còn gọi là KVAC. Xin visa Hàn Quốc là bước quan trọng đối với những ai muốn du lịch...",
    content: `
      <h2>Trung tâm đăng ký visa Hàn Quốc (KVAC)</h2>
      <p>KVAC - Korea Visa Application Center là nơi tiếp nhận hồ sơ xin visa Hàn Quốc tại Việt Nam...</p>
      
      <h3>Địa chỉ KVAC tại TP.HCM</h3>
      <p>Địa chỉ: Lầu 4, Tòa nhà Vincom Center...</p>
      
      <h3>Địa chỉ KVAC tại Hà Nội</h3>
      <p>Địa chỉ: Tầng 4, Tòa nhà Lotte Center...</p>
    `,
    author: "Visa5s Team", 
    date: "04/09/2025",
    category: "Hướng dẫn",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200",
    tags: ["KVAC", "Trung tâm visa", "Hàn Quốc"],
    readTime: "4 phút đọc"
  },
  {
    id: 4,
    slug: "visa-e8-han-quoc-ho-so-quy-trinh-thu-tuc",
    title: "Visa E8 Hàn Quốc là gì? Quy trình thủ tục mới nhất",
    excerpt: "Visa E8 Hàn Quốc là một trong những loại visa lao động ngắn hạn được nhiều người Việt Nam quan tâm...",
    content: `
      <h2>Visa E8 Hàn Quốc - Visa lao động thời vụ</h2>
      <p>Visa E8 dành cho lao động thời vụ trong lĩnh vực nông nghiệp, chăn nuôi...</p>
    `,
    author: "Visa5s Team",
    date: "03/09/2025",
    category: "Visa Hàn Quốc",
    imageUrl: "https://images.unsplash.com/photo-1628260412297-a3377e45006f?q=80&w=1200",
    tags: ["Visa Hàn Quốc", "E8", "Thời vụ"],
    readTime: "6 phút đọc" 
  },
  {
    id: 5,
    slug: "cach-dien-form-visa-duc-huong-dan-chi-tiet",
    title: "Cách Điền Form Visa Đức: Hướng Dẫn Chi Tiết",
    excerpt: "Khi xin visa Đức, một trong những bước quan trọng đầu tiên là điền chính xác form đăng ký...",
    content: `
      <h2>Hướng dẫn điền form visa Đức</h2>
      <p>Form đăng ký visa Đức cần được điền một cách chính xác và đầy đủ...</p>
    `,
    author: "Visa5s Team",
    date: "02/09/2025", 
    category: "Visa Châu Âu",
    imageUrl: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200",
    tags: ["Visa Đức", "Form", "Hướng dẫn"],
    readTime: "8 phút đọc"
  },
  {
    id: 6,
    slug: "visa-dai-loan-2025-ho-so-quy-trinh-bao-lau-co-ket-qua",
    title: "Visa Đài Loan 2025: Hồ sơ, Quy trình & Bao lâu có kết quả", 
    excerpt: "Việc xin visa Đài Loan ngày càng trở nên quan trọng với người Việt Nam muốn du lịch hoặc công tác...",
    content: `
      <h2>Thông tin visa Đài Loan 2025</h2>
      <p>Cập nhật thông tin mới nhất về visa Đài Loan năm 2025...</p>
    `,
    author: "Visa5s Team",
    date: "02/09/2025",
    category: "Visa Châu Á",
    imageUrl: "https://images.unsplash.com/photo-1570600518218-7a6e9ca80d60?q=80&w=1200", 
    tags: ["Visa Đài Loan", "2025", "Du lịch"],
    readTime: "5 phút đọc"
  }
];

// ==================== ĐÁNH GIÁ KHÁCH HÀNG ====================
export const customerReviews = [
  {
    id: 1,
    name: "ĐNTT",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWnAJlwdFIMPAJL9ZLz__vVsSncgACwIuZfcejt8o0OxKJcNIM=s120-c-rp-mo-br100",
    rating: 5,
    comment: "Dịch vụ của Visa5s siêu uy tín nha mọi người ❤️ mình vừa nhận được Visa Hàn cực nhanh chóng và dễ dàng",
    service: "Visa Hàn Quốc",
    date: "2025-01-15"
  },
  {
    id: 2, 
    name: "Phuong Le",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocJX0Bwu4xXn2zPCeXf3oLCT0PJ8AM2NkTOCGYWHdZtBVqDEtQ=s120-c-rp-mo-br100", 
    rating: 5,
    comment: "mình mới xin visa Úc ở đây xong, uy tín lắm nhé. Chất lượng dịch vụ ở đây rất tốt, tôi được hỗ trợ rất nhiệt tình. Hồ sơ nhanh chóng.",
    service: "Visa Úc",
    date: "2025-01-10"
  },
  {
    id: 3,
    name: "Ngoc Chau Nguyen", 
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjXl5ybdKbIKrHOFyEc2XfXn1bGzpNJK98CvXR662bmI4WiWiXh-=s120-c-rp-mo-br100",
    rating: 5,
    comment: "Đang lên lấy kết quả đậu visa đoàn hàn quốc công ty mình. Cty uy tín làm visa nhanh chóng thích nhất vụ ra visa mới thanh toán phí không như các cty khác cảm ơn các bạn. Chúc toàn thể cty ngày càng phát triển", 
    service: "Visa Hàn Quốc",
    date: "2025-01-08"
  },
  {
    id: 4,
    name: "Chinh Nguyen",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUL_01HEkJ7xsixG-ux9DhVHzwveym2OrKUo4-WygFm9TMEDONv=s120-c-rp-mo-br100",
    rating: 5,
    comment: "Công ty Visa5s uy tín lắm nha mọi người ơi. Làm visa Úc mới lăn tay, ngày hôm sau đã được cấp visa rồi đó. Hỗ trợ khách nhiệt tình lắm luôn.",
    service: "Visa Úc", 
    date: "2025-01-05"
  },
  {
    id: 5,
    name: "Lan Anh",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVobJQtV5CpB_Ft2UoqO3eoS5spm8Zi4IetjD1a_pC8eBQ_dXXH=s120-c-rp-mo-br100",
    rating: 5, 
    comment: "Mình vừa mới nhận được kết quả visa Hàn Quốc chiều nay, mình đậu visa chỉ trong 2 tuần nộp hồ sơ lun ạ, quá nhanh quá tuyệt vời. Các bạn tư vấn viên siêu nhiệt tình và có tâm luôn á, nhắn tin hỏi thăm mình từng chút luôn.",
    service: "Visa Hàn Quốc",
    date: "2025-01-03"
  },
  {
    id: 6,
    name: "Hà Uyên Nguyễn",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWRQvyJmGO5drzwwuQb1o8NXt85uknF_lPi9wuo3ek40T4oPRnw=s120-c-rp-mo-br100",
    rating: 5,
    comment: "Mình mới vừa làm visa Úc ở đây nhân viên nhiệt tình lắm lun á, chuyên nghiệp và cũng dễ thương nữa ☺ sẽ liên hệ những lần sau",
    service: "Visa Úc",
    date: "2024-12-28"
  }
];

// ==================== ĐỐI TÁC ====================
export const partners = [
  { name: "SEA", logo: "https://visa5s.com.vn/wp-content/uploads/2025/08/sea.jpg" },
  { name: "Jets", logo: "https://visa5s.com.vn/wp-content/uploads/2025/08/jets.jpg" },
  { name: "Midea", logo: "https://visa5s.com.vn/wp-content/uploads/2025/08/midea.jpg" },
  { name: "VinFast", logo: "https://visa5s.com.vn/wp-content/uploads/2025/08/vinfast.jpg" },
  { name: "Disney", logo: "https://visa5s.com.vn/wp-content/uploads/2025/08/disney.jpg" },
  { name: "TH", logo: "https://visa5s.com.vn/wp-content/uploads/2025/08/th.jpg" }
];

// ==================== CẤU HÌNH CHUNG ====================
export const siteConfig = {
  name: "Visa5s",
  title: "Visa5s - Dịch Vụ Xin Visa Uy Tín Hàng Đầu Việt Nam", 
  description: "Chuyên cung cấp dịch vụ xin visa uy tín, nhanh chóng và hiệu quả hàng đầu Việt Nam. Tỷ lệ đậu visa 99%, hỗ trợ 24/7.",
  url: "https://visa5s.com.vn",
  ogImage: "https://visa5s.com.vn/og-image.jpg",
  keywords: "visa, xin visa, visa du lịch, visa5s, làm visa, dịch vụ visa",
  author: "Visa5s Team"
};
