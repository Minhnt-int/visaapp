// ==================== TYPE DEFINITIONS ====================
interface SubNavItem {
  href: string;
  label: string;
}

interface NavItem {
  href: string;
  label: string;
  hasDropdown?: boolean;
  hasSubDropdown?: boolean;
  children?: Array<{
    href: string;
    label: string;
    hasSubDropdown?: boolean;
    subChildren?: SubNavItem[];
  }>;
}

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
export const navLinks: NavItem[] = [
  { href: "/", label: "Trang chủ" },
  { 
    href: "/dich-vu", 
    label: "Dịch vụ",
    hasDropdown: true,
    children: [
      { 
        href: "/dich-vu/visa-chau-a", 
        label: "Visa Châu Á",
        hasSubDropdown: true,
        subChildren: [
          { href: "/dich-vu/visa-chau-a/han-quoc", label: "Hàn Quốc" },
          { href: "/dich-vu/visa-chau-a/nhat-ban", label: "Nhật Bản" },
          { href: "/dich-vu/visa-chau-a/trung-quoc", label: "Trung Quốc" },
          { href: "/dich-vu/visa-chau-a/dai-loan", label: "Đài Loan" },
          { href: "/dich-vu/visa-chau-a/hong-kong", label: "Hong Kong" }
        ]
      },
      { 
        href: "/dich-vu/visa-chau-au", 
        label: "Visa Châu Âu",
        hasSubDropdown: true,
        subChildren: [
          { href: "/dich-vu/visa-chau-au/anh-quoc", label: "Anh Quốc" },
          { href: "/dich-vu/visa-chau-au/duc", label: "Đức" },
          { href: "/dich-vu/visa-chau-au/phap", label: "Pháp" },
          { href: "/dich-vu/visa-chau-au/tay-ban-nha", label: "Tây Ban Nha" }
        ]
      },
      { 
        href: "/dich-vu/visa-chau-my", 
        label: "Visa Châu Mỹ",
        hasSubDropdown: true,
        subChildren: [
          { href: "/dich-vu/visa-chau-my/my", label: "Mỹ" },
          { href: "/dich-vu/visa-chau-my/canada", label: "Canada" }
        ]
      },
      { 
        href: "/dich-vu/visa-chau-dai-duong", 
        label: "Visa Châu Đại Dương",
        hasSubDropdown: true,
        subChildren: [
          { href: "/dich-vu/visa-chau-dai-duong/uc", label: "Úc" }
        ]
      }
    ]
  },
  { 
    href: "/tour-du-lich", 
    label: "Tour du lịch",
    hasDropdown: true,
    children: [
      { href: "/tour-du-lich/chau-a", label: "Tour Châu Á" },
      { href: "/tour-du-lich/chau-au", label: "Tour Châu Âu" },
      { href: "/tour-du-lich/chau-my", label: "Tour Châu Mỹ" },
      { href: "/tour-du-lich/chau-dai-duong", label: "Tour Châu Đại Dương" }
    ]
  },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/lien-he", label: "Liên hệ" },
];

// ==================== MOCK DATA CHO VISA CHI TIẾT ====================
export const visaDetailData = {
  "visa-chau-a": {
    "han-quoc": {
      title: "Visa Hàn Quốc",
      heroImage: "https://images.unsplash.com/photo-1549769015-3ded74941c7a?q=80&w=1200",
      successRate: "99.2%",
      processingTime: "5-7 ngày làm việc",
      description: "Dịch vụ làm visa Hàn Quốc uy tín, nhanh chóng với tỷ lệ thành công cao. Hỗ trợ từ A-Z cho mọi loại visa.",
      visaImages: [
        {
          type: "Visa du lịch C-3",
          url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=600&h=400&fit=crop",
          description: "Mẫu visa du lịch Hàn Quốc có giá trị 90 ngày"
        },
        {
          type: "Visa công tác C-4", 
          url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600&h=400&fit=crop",
          description: "Visa công tác Hàn Quốc cho doanh nhân"
        },
        {
          type: "Visa lao động E-7",
          url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&h=400&fit=crop", 
          description: "Visa lao động kỹ năng đặc biệt"
        }
      ],
      services: [
        "Dịch vụ làm visa Hàn Quốc tại Hà Nội",
        "Dịch vụ làm visa Hàn Quốc tại TP Hồ Chí Minh", 
        "Dịch vụ làm visa Hàn Quốc toàn quốc",
        "Dịch vụ làm visa du lịch Hàn Quốc",
        "Dịch vụ làm visa công tác Hàn Quốc",
        "Dịch vụ làm visa thăm thân Hàn Quốc"
      ],
      visaTypes: [
        {
          id: "du-lich",
          name: "Du lịch",
          requirements: {
            personal: [
              "Hộ chiếu gốc (còn hạn ít nhất 6 tháng và còn ít nhất 2 trang trống)",
              "Hộ chiếu cũ nếu có",
              "Ảnh thẻ 4x6cm nền trắng (chụp trong 6 tháng gần nhất)",
              "Sổ hộ khẩu/Căn cước công dân",
              "Đăng ký kết hôn (nếu có)",
              "Giấy khai sinh của con (nếu đi cùng con)"
            ],
            work: [
              {
                type: "Nhân viên",
                docs: [
                  "Hợp đồng lao động / Quyết định tuyển dụng",
                  "Giấy xác nhận công việc có xác nhận lương",
                  "Bảng lương 3 tháng gần nhất",
                  "Đơn xin nghỉ phép có xác nhận"
                ]
              },
              {
                type: "Chủ doanh nghiệp", 
                docs: [
                  "Đăng ký kinh doanh",
                  "Xác nhận nộp thuế 3 tháng gần nhất",
                  "Hợp đồng thuê văn phòng"
                ]
              },
              {
                type: "Học sinh/Sinh viên",
                docs: [
                  "Thẻ học sinh sinh viên",
                  "Giấy xác nhận học tập có xác nhận điểm danh"
                ]
              }
            ],
            financial: [
              "Sao kê tài khoản ngân hàng 6 tháng gần nhất",
              "Sổ tiết kiệm có giá trị tối thiểu 50 triệu VNĐ",
              "Sổ đỏ hoặc giấy chứng nhận quyền sử dụng đất (nếu có)",
              "Giấy tờ sở hữu xe ô tô, tài sản khác (nếu có)"
            ],
            travel: [
              "Vé máy bay khứ hồi (booking tạm thời)",
              "Booking khách sạn toàn bộ hành trình",
              "Lịch trình du lịch chi tiết",
              "Bảo hiểm du lịch quốc tế"
            ]
          }
        },
        {
          id: "cong-tac",
          name: "Công tác", 
          requirements: {
            personal: [
              "Hộ chiếu gốc (còn hạn ít nhất 6 tháng)",
              "Ảnh thẻ 4x6cm nền trắng",
              "Căn cước công dân",
              "Sổ hộ khẩu"
            ],
            work: [
              {
                type: "Công tác",
                docs: [
                  "Thư mời từ đối tác Hàn Quốc",
                  "Giấy xác nhận công việc từ công ty Việt Nam",
                  "Hợp đồng hợp tác/thương mại",
                  "Bảng lương 3 tháng gần nhất"
                ]
              }
            ],
            financial: [
              "Sao kê ngân hàng 3 tháng gần nhất",
              "Giấy chứng minh tài chính từ công ty"
            ],
            travel: [
              "Vé máy bay booking",
              "Bảo hiểm du lịch",
              "Lịch trình công tác"
            ]
          }
        }
      ],
      pricing: [
        {
          type: "du-lich",
          name: "Du lịch",
          description: "Visa du lịch C-3 cho mục đích tham quan, nghỉ dưỡng",
          validity: "90 ngày",
          stayDuration: "Tối đa 30 ngày",
          processingTime: "5-7 ngày làm việc",
          prices: [
            { 
              group: "1-2 khách", 
              adult: "4500000", 
              child_6_12: "3200000", 
              child_under_6: "2100000",
              consularFee: "1800000",
              serviceFee: "2700000"
            },
            { 
              group: "3-4 khách", 
              adult: "4200000", 
              child_6_12: "3000000", 
              child_under_6: "2000000",
              consularFee: "1800000", 
              serviceFee: "2400000"
            },
            { 
              group: "Từ 5 khách", 
              adult: "3900000", 
              child_6_12: "2800000", 
              child_under_6: "1900000",
              consularFee: "1800000",
              serviceFee: "2100000"
            }
          ]
        },
        {
          type: "cong-tac", 
          name: "Công tác",
          description: "Visa công tác C-4 cho mục đích kinh doanh, hội nghị",
          validity: "90 ngày", 
          stayDuration: "Tối đa 30 ngày",
          processingTime: "5-7 ngày làm việc",
          prices: [
            { 
              group: "1-2 khách", 
              adult: "5200000", 
              child_6_12: "3800000", 
              child_under_6: "2500000",
              consularFee: "2200000",
              serviceFee: "3000000"
            },
            { 
              group: "3-4 khách", 
              adult: "4900000", 
              child_6_12: "3600000", 
              child_under_6: "2400000",
              consularFee: "2200000",
              serviceFee: "2700000"
            },
            { 
              group: "Từ 5 khách", 
              adult: "4600000", 
              child_6_12: "3400000", 
              child_under_6: "2300000",
              consularFee: "2200000",
              serviceFee: "2400000"
            }
          ]
        }
      ],
      whyChooseUs: [
        "Thủ tục đơn giản, hồ sơ được chuẩn bị chu đáo",
        "Hỗ trợ 24/7 trong suốt quá trình",
        "Thông tin minh bạch, công khai về phí và thời gian",
        "Dịch vụ tận tâm, hỗ trợ nhiệt tình sau khi có visa",
        "Cam kết tỷ lệ đậu visa cao nhất thị trường"
      ],
      testimonials: [
        {
          name: "Nguyễn Thị Hồng",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=100",
          rating: 5,
          comment: "Mình làm visa Hàn Quốc ở đây, được chị Linh hỗ trợ rất tận tình. Hồ sơ được chuẩn bị kỹ lưỡng, chỉ 5 ngày là có kết quả. Rất hài lòng với dịch vụ!"
        },
        {
          name: "Trần Minh Đức", 
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
          rating: 5,
          comment: "Lần đầu làm visa nên rất lo lắng, nhưng team VISA5S đã hỗ trợ mình từ A-Z. Visa đậu ngay lần đầu, giá cả hợp lý."
        },
        {
          name: "Lê Thu Hà",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", 
          rating: 5,
          comment: "Dịch vụ chuyên nghiệp, uy tín. Làm visa công tác Hàn Quốc cho cả đoàn 8 người, tất cả đều pass. Cảm ơn VISA5S!"
        }
      ],
      relatedArticles: [
        {
          title: "Kinh nghiệm du lịch Hàn Quốc tự túc",
          url: "/tin-tuc/kinh-nghiem-du-lich-han-quoc",
          date: "15/12/2024"
        },
        {
          title: "[Trọn bộ] Hồ sơ xin visa du lịch Hàn Quốc mới nhất", 
          url: "/tin-tuc/ho-so-visa-han-quoc",
          date: "10/12/2024"
        }
      ]
    },
    // Thêm data cho các quốc gia khác...
    "nhat-ban": {
      title: "Visa Nhật Bản",
      heroImage: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200",
      successRate: "98.5%",
      processingTime: "5-7 ngày làm việc",
      description: "Dịch vụ làm visa Nhật Bản chuyên nghiệp với tỷ lệ thành công cao. Hỗ trợ tư vấn và làm visa đa dạng loại hình.",
      visaImages: [
        {
          type: "Visa du lịch đơn",
          url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=600&h=400&fit=crop",
          description: "Visa du lịch Nhật Bản một lần 15-30 ngày"
        },
        {
          type: "Visa công tác", 
          url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&h=400&fit=crop",
          description: "Visa công tác Nhật Bản thời hạn 90 ngày"
        },
        {
          type: "Visa nhiều lần",
          url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=600&h=400&fit=crop", 
          description: "Visa nhiều lần có hiệu lực 3 năm"
        }
      ],
      services: [
        "Dịch vụ làm visa Nhật Bản tại Hà Nội",
        "Dịch vụ làm visa Nhật Bản tại TP.HCM", 
        "Visa du lịch Nhật Bản",
        "Visa công tác Nhật Bản",
        "Visa thăm thân Nhật Bản"
      ],
      visaTypes: [
        {
          id: "du-lich",
          name: "Du lịch",
          requirements: {
            personal: [
              "Hộ chiếu gốc còn hạn tối thiểu 6 tháng",
              "02 ảnh 4.5x4.5cm nền trắng mặt nghiêm trang",
              "Đơn xin visa Nhật Bản",
              "Bản sao CMND/CCCD 2 mặt",
              "Sổ hộ khẩu (bản sao)"
            ],
            work: [
              {
                type: "Nhân viên",
                docs: [
                  "Giấy xác nhận công việc ghi rõ chức vụ, lương, ngày bắt đầu làm việc",
                  "Giấy phép lao động (nếu có)",
                  "Hợp đồng lao động"
                ]
              }
            ],
            financial: [
              "Sao kê ngân hàng 3 tháng (số dư tối thiểu 80 triệu)",
              "Giấy xác nhận lương",
              "Sổ tiết kiệm"
            ],
            travel: [
              "Lịch trình du lịch chi tiết",
              "Vé máy bay khứ hồi",
              "Đặt chỗ khách sạn",
              "Bảo hiểm du lịch"
            ]
          }
        }
      ],
      pricing: [
        {
          type: "du-lich",
          name: "Tourist Visa (Quan Quang)",
          description: "Visa du lịch Nhật Bản đơn lẻ hoặc đi đoàn",
          validity: "90 ngày",
          stayDuration: "15-30 ngày", 
          processingTime: "5-7 ngày làm việc",
          prices: [
            { 
              adult: "3500000", 
              child_6_12: "3000000", 
              child_under_6: "2500000",
              consularFee: "800000",
              serviceFee: "2700000"
            },
            { 
              adult: "3300000", 
              child_6_12: "2800000", 
              child_under_6: "2300000",
              consularFee: "800000",
              serviceFee: "2500000"
            },
            { 
              adult: "3100000", 
              child_6_12: "2600000", 
              child_under_6: "2100000",
              consularFee: "800000",
              serviceFee: "2300000"
            }
          ]
        },
        {
          type: "cong-tac",
          name: "Business Visa",
          description: "Visa công tác Nhật Bản cho doanh nhân, đào tạo",
          validity: "3 tháng",
          stayDuration: "90 ngày",
          processingTime: "7-10 ngày làm việc", 
          prices: [
            { 
              adult: "4200000", 
              child_6_12: "3700000", 
              child_under_6: "3200000",
              consularFee: "800000",
              serviceFee: "3400000"
            },
            { 
              adult: "4000000", 
              child_6_12: "3500000", 
              child_under_6: "3000000",
              consularFee: "800000",
              serviceFee: "3200000"
            },
            { 
              adult: "3800000", 
              child_6_12: "3300000", 
              child_under_6: "2800000",
              consularFee: "800000",
              serviceFee: "3000000"
            }
          ]
        }
      ],
      whyChooseUs: [
        "Hơn 10 năm kinh nghiệm làm visa Nhật Bản",
        "Tỷ lệ thành công 98.5%",
        "Tư vấn miễn phí từ chuyên gia",
        "Hỗ trợ chuẩn bị hồ sơ chu đáo"
      ],
      testimonials: [
        {
          name: "Phạm Thanh Long",
          rating: 5,
          avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
          comment: "Visa Nhật được duyệt rất nhanh. Nhân viên tư vấn nhiệt tình."
        }
      ],
      relatedArticles: [
        {
          title: "Top điểm đến hấp dẫn tại Nhật Bản",
          url: "/tin-tuc/diem-den-nhat-ban",
          date: "12/12/2024"
        }
      ]
    }
  },
  "visa-chau-au": {
    "anh-quoc": {
      title: "Visa Anh Quốc",
      heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200",
      successRate: "97.8%",
      processingTime: "15-20 ngày làm việc",
      description: "Dịch vụ làm visa Anh Quốc uy tín, chuyên nghiệp. Hỗ trợ đầy đủ các loại visa du lịch, công tác, học tập.",
      visaImages: [
        {
          type: "Standard Visitor Visa",
          url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&h=400&fit=crop",
          description: "Visa du lịch Anh Quốc tiêu chuẩn 6 tháng"
        },
        {
          type: "Business Visitor Visa", 
          url: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=600&h=400&fit=crop",
          description: "Visa công tác ngắn hạn tại Anh Quốc"
        }
      ],
      services: [
        "Visa du lịch Anh Quốc",
        "Visa công tác Anh Quốc",
        "Visa thăm thân Anh Quốc",
        "Visa học tập Anh Quốc"
      ],
      visaTypes: [
        {
          id: "du-lich",
          name: "Standard Visitor Visa",
          requirements: {
            personal: [
              "Hộ chiếu còn hạn tối thiểu 6 tháng",
              "Đơn online đã điền đầy đủ",
              "Ảnh biometric theo chuẩn UK",
              "CMND/CCCD (bản sao)"
            ],
            work: [
              {
                type: "Nhân viên",
                docs: [
                  "Thư xác nhận công việc bằng tiếng Anh",
                  "Payslip 3 tháng gần nhất",
                  "Hợp đồng lao động"
                ]
              }
            ],
            financial: [
              "Sao kê ngân hàng 6 tháng (tiếng Anh)",
              "Giấy xác nhận lương bằng tiếng Anh",
              "Chứng từ tài chính khác"
            ],
            travel: [
              "Lịch trình chi tiết",
              "Vé máy bay khứ hồi",
              "Đặt chỗ accommodation",
              "Bảo hiểm y tế"
            ]
          }
        }
      ],
      pricing: [
        {
          type: "du-lich",
          name: "Standard Visitor Visa",
          description: "Visa du lịch Anh Quốc cho mục đích tham quan, thăm thân",
          validity: "6 tháng",
          stayDuration: "Tối đa 180 ngày",
          processingTime: "15-20 ngày làm việc",
          prices: [
            { 
              adult: "8500000", 
              child_6_12: "8000000", 
              child_under_6: "7500000",
              consularFee: "4200000",
              serviceFee: "4300000"
            },
            { 
              adult: "8200000", 
              child_6_12: "7700000", 
              child_under_6: "7200000",
              consularFee: "4200000",
              serviceFee: "4000000"
            },
            { 
              adult: "8000000", 
              child_6_12: "7500000", 
              child_under_6: "7000000",
              consularFee: "4200000",
              serviceFee: "3800000"
            }
          ]
        }
      ],
      whyChooseUs: [
        "Chuyên gia visa Anh với 12+ năm kinh nghiệm",
        "Tỷ lệ thành công 97.8%",
        "Hỗ trợ VFS Global và biometric",
        "Tư vấn miễn phí trọn đời"
      ],
      testimonials: [
        {
          name: "Hoàng Minh Tuấn",
          rating: 5,
          avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face",
          comment: "Visa Anh được approve sau 18 ngày. Dịch vụ tuyệt vời!"
        }
      ],
      relatedArticles: [
        {
          title: "Hướng dẫn xin visa Anh Quốc chi tiết",
          url: "/tin-tuc/huong-dan-visa-anh",
          date: "08/12/2024"
        }
      ]
    },
    "ao": {
      title: "Visa Áo (Austria)",
      heroImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1200",
      successRate: "98.1%", 
      processingTime: "10-15 ngày làm việc",
      description: "Dịch vụ làm visa Áo chuyên nghiệp, tỷ lệ thành công cao. Hỗ trợ visa Schengen đi Áo và các nước châu Âu.",
      visaImages: [
        {
          type: "Visa Schengen du lịch",
          url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=600&h=400&fit=crop",
          description: "Visa Schengen Áo cho phép đi lại 26 nước EU"
        },
        {
          type: "Visa công tác Áo",
          url: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=600&h=400&fit=crop", 
          description: "Visa công tác ngắn hạn tại Áo"
        },
        {
          type: "Visa thăm thân Áo",
          url: "https://images.unsplash.com/photo-1571104508999-893933ded431?q=80&w=600&h=400&fit=crop",
          description: "Visa thăm người thân tại Áo"
        }
      ],
      services: [
        "Visa du lịch Áo (Schengen)",
        "Visa công tác Áo",
        "Visa thăm thân Áo",
        "Visa học tập tại Áo",
        "Tư vấn miễn phí",
        "Dịch thuật tài liệu"
      ],
      visaTypes: [
        {
          id: "du-lich",
          name: "Visa du lịch Schengen",
          requirements: {
            personal: [
              "Hộ chiếu gốc còn hạn tối thiểu 3 tháng sau khi visa hết hạn",
              "02 ảnh 3.5x4.5cm nền trắng, mặt nghiêm trang",
              "Đơn xin visa Schengen đã điền đầy đủ",
              "Bản sao CMND/CCCD công chứng",
              "Sổ hộ khẩu (bản sao có công chứng)"
            ],
            work: [
              {
                type: "Nhân viên công ty",
                docs: [
                  "Giấy xác nhận công việc (tiếng Anh hoặc tiếng Đức)",
                  "Hợp đồng lao động",
                  "Bảng lương 3 tháng gần nhất",
                  "Đơn xin nghỉ phép"
                ]
              },
              {
                type: "Chủ doanh nghiệp",
                docs: [
                  "Giấy phép kinh doanh (có dịch thuật)",
                  "Báo cáo tài chính công ty",
                  "Giấy xác nhận nộp thuế"
                ]
              }
            ],
            financial: [
              "Sao kê ngân hàng 3 tháng (dịch sang tiếng Anh/Đức)",
              "Giấy xác nhận lương (có dịch thuật)",
              "Sổ tiết kiệm (nếu có)",
              "Chứng từ tài sản: nhà đất, xe hơi"
            ],
            travel: [
              "Vé máy bay khứ hồi đã đặt",
              "Booking khách sạn toàn bộ chuyến đi",
              "Lịch trình du lịch chi tiết",
              "Bảo hiểm du lịch Schengen (tối thiểu 30,000 EUR)"
            ]
          }
        },
        {
          id: "cong-tac",
          name: "Visa công tác Áo",
          requirements: {
            personal: [
              "Hộ chiếu gốc còn hạn tối thiểu 3 tháng",
              "02 ảnh 3.5x4.5cm nền trắng", 
              "Đơn xin visa công tác",
              "CMND/CCCD (bản sao công chứng)"
            ],
            work: [
              {
                type: "Công tác",
                docs: [
                  "Thư mời từ đối tác Áo (bản gốc)",
                  "Giấy đăng ký kinh doanh của công ty mời",
                  "Thư cử đi công tác từ công ty Việt Nam",
                  "Hợp đồng thương mại (nếu có)"
                ]
              }
            ],
            financial: [
              "Sao kê ngân hàng 3 tháng",
              "Cam kết tài chính từ công ty",
              "Thư bảo lãnh tài chính"
            ],
            travel: [
              "Lịch trình công tác chi tiết",
              "Vé máy bay booking",
              "Bảo hiểm du lịch Schengen",
              "Thư bảo lãnh từ đối tác Áo"
            ]
          }
        }
      ],
      pricing: [
        {
          type: "du-lich",
          name: "Visa du lịch Schengen",
          description: "Visa Schengen Áo cho phép đi lại tự do trong 26 nước EU",
          validity: "90 ngày trong 180 ngày",
          stayDuration: "Tối đa 90 ngày",
          processingTime: "10-15 ngày làm việc",
          prices: [
            { 
              adult: "6500000", 
              child_6_12: "6000000", 
              child_under_6: "5500000",
              consularFee: "2200000",
              serviceFee: "4300000"
            },
            { 
              adult: "6200000", 
              child_6_12: "5700000", 
              child_under_6: "5200000",
              consularFee: "2200000",
              serviceFee: "4000000"  
            },
            { 
              adult: "6000000", 
              child_6_12: "5500000", 
              child_under_6: "5000000",
              consularFee: "2200000",
              serviceFee: "3800000"
            }
          ]
        },
        {
          type: "cong-tac",
          name: "Visa công tác Áo", 
          description: "Visa công tác cho mục đích kinh doanh, hội nghị tại Áo",
          validity: "90 ngày trong 180 ngày",
          stayDuration: "Tùy theo thư mời",
          processingTime: "10-15 ngày làm việc",
          prices: [
            { 
              adult: "7200000", 
              child_6_12: "6700000", 
              child_under_6: "6200000",
              consularFee: "2200000",
              serviceFee: "5000000"
            },
            { 
              adult: "6900000", 
              child_6_12: "6400000", 
              child_under_6: "5900000",
              consularFee: "2200000",
              serviceFee: "4700000"
            },
            { 
              adult: "6700000", 
              child_6_12: "6200000", 
              child_under_6: "5700000",
              consularFee: "2200000",
              serviceFee: "4500000"
            }
          ]
        }
      ],
      whyChooseUs: [
        "Chuyên gia visa Schengen với 15+ năm kinh nghiệm",
        "Tỷ lệ thành công 98.1% visa Áo",
        "Hỗ trợ dịch thuật chuyên nghiệp tiếng Đức",
        "Tư vấn lộ trình du lịch châu Âu",
        "Hỗ trợ booking khách sạn và bảo hiểm",
        "Theo dõi hồ sơ 24/7"
      ],
      testimonials: [
        {
          name: "Nguyễn Thanh Hương",
          rating: 5,
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b630?w=100&h=100&fit=crop&crop=face",
          comment: "Visa Áo được duyệt chỉ sau 12 ngày. Rất hài lòng với dịch vụ chuyên nghiệp của VISA5S!"
        },
        {
          name: "Lê Văn Minh",
          rating: 5,
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", 
          comment: "Làm visa công tác Áo rất nhanh gọn. Team tư vấn nhiệt tình, hỗ trợ tận tình."
        },
        {
          name: "Trần Thị Mai",
          rating: 5,
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
          comment: "Lần đầu đi châu Âu, được hướng dẫn rất kỹ về bảo hiểm và lịch trình. Visa Schengen pass ngay!"
        }
      ],
      relatedArticles: [
        {
          title: "Du lịch Áo: Vienna và Salzburg không thể bỏ qua",
          url: "/tin-tuc/du-lich-ao-vienna-salzburg", 
          date: "20/11/2024"
        },
        {
          title: "Hồ sơ xin visa Schengen Áo - Cập nhật mới nhất 2024",
          url: "/tin-tuc/ho-so-visa-schengen-ao",
          date: "15/11/2024"
        },
        {
          title: "Kinh nghiệm xin visa công tác Áo cho doanh nhân",
          url: "/tin-tuc/visa-cong-tac-ao-doanh-nhan",
          date: "08/11/2024"
        }
      ]
    }
  },
  "visa-chau-my": {
    "my": {
      title: "Visa Mỹ",
      heroImage: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=1200",
      successRate: "95.2%",
      processingTime: "10-15 ngày làm việc",
      description: "Dịch vụ làm visa Mỹ chuyên nghiệp, tỷ lệ thành công cao. Hỗ trợ B1/B2, F1 và các loại visa khác.",
      visaImages: [
        {
          type: "Visa B1/B2",
          url: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=600&h=400&fit=crop",
          description: "Visa du lịch và công tác Mỹ có hiệu lực 10 năm"
        },
        {
          type: "Visa F1", 
          url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&h=400&fit=crop",
          description: "Visa học tập Mỹ cho sinh viên quốc tế"
        },
        {
          type: "Visa L1",
          url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&h=400&fit=crop", 
          description: "Visa chuyển giao nội bộ công ty"
        }
      ],
      services: [
        "Visa B1/B2 (du lịch, công tác)",
        "Visa F1 (học tập)",
        "Tư vấn DS-160",
        "Chuẩn bị phỏng vấn"
      ],
      visaTypes: [
        {
          id: "du-lich",
          name: "Visa B1/B2",
          requirements: {
            personal: [
              "Hộ chiếu còn hạn tối thiểu 6 tháng",
              "Form DS-160 đã hoàn thành",
              "Ảnh visa Mỹ chuẩn (5x5cm)",
              "Lệ phí MRV đã thanh toán"
            ],
            work: [
              {
                type: "Nhân viên",
                docs: [
                  "Thư xác nhận công việc",
                  "Bảng lương 6 tháng",
                  "Hợp đồng lao động"
                ]
              }
            ],
            financial: [
              "Sao kê ngân hàng 6 tháng",
              "Chứng từ thu nhập",
              "Tài sản, bất động sản"
            ],
            travel: [
              "Lịch trình du lịch",
              "Đặt chỗ tạm thời",
              "Mục đích chuyến đi rõ ràng"
            ]
          }
        }
      ],
      pricing: [
        {
          type: "du-lich",
          name: "Visa B1/B2",
          prices: [
            { adult: "12000000", child_6_12: "11500000", child_under_6: "11000000" },
            { adult: "11500000", child_6_12: "11000000", child_under_6: "10500000" },
            { adult: "11000000", child_6_12: "10500000", child_under_6: "10000000" }
          ]
        }
      ],
      whyChooseUs: [
        "Chuyên gia visa Mỹ 20+ năm kinh nghiệm",
        "Tỷ lệ thành công 95.2%",
        "Training phỏng vấn 1-1",
        "Hỗ trợ DS-160 chuyên nghiệp"
      ],
      testimonials: [
        {
          name: "Nguyễn Anh Khoa",
          rating: 5,
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          comment: "Visa Mỹ 10 năm đã có trong tay! Cảm ơn team VISA5S."
        }
      ],
      relatedArticles: [
        {
          title: "Bí quyết phỏng vấn visa Mỹ thành công",
          url: "/tin-tuc/phong-van-visa-my",
          date: "05/12/2024"
        }
      ]
    }
  }
};
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
        name: "Áo",
        slug: "ao",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1200",
        visaTypes: ["Du lịch", "Công tác", "Schengen"]
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

// ==================== TOUR DU LỊCH ====================
export const tourCategories = {
  "chau-a": {
    name: "Tour Châu Á",
    tours: [
      {
        name: "Hàn Quốc",
        slug: "tour-han-quoc",
        image: "https://images.unsplash.com/photo-1549769015-3ded74941c7a?q=80&w=1200",
        destinations: [
          {
            name: "Seoul - Busan - Jeju",
            slug: "seoul-busan-jeju-5n4d",
            duration: "5 ngày 4 đêm",
            price: "21.990.000",
            originalPrice: "25.990.000",
            departure: ["TP.HCM", "Hà Nội", "Đà Nẵng"],
            highlights: ["Đảo Jeju", "Cung điện Gyeongbokgung", "Làng văn hóa Bukchon", "Chợ Myeongdong"],
            image: "https://images.unsplash.com/photo-1549769015-3ded74941c7a?q=80&w=800"
          },
          {
            name: "Seoul - Nami - Everland",
            slug: "seoul-nami-everland-4n3d",
            duration: "4 ngày 3 đêm",
            price: "18.990.000",
            originalPrice: "21.990.000",
            departure: ["TP.HCM", "Hà Nội"],
            highlights: ["Đảo Nami", "Công viên Everland", "Tháp Namsan", "Làng Hanok Bukchon"],
            image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800"
          }
        ]
      },
      {
        name: "Nhật Bản",
        slug: "tour-nhat-ban",
        image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200",
        destinations: [
          {
            name: "Tokyo - Osaka - Kyoto",
            slug: "tokyo-osaka-kyoto-6n5d",
            duration: "6 ngày 5 đêm",
            price: "35.990.000",
            originalPrice: "42.990.000",
            departure: ["TP.HCM", "Hà Nội"],
            highlights: ["Núi Phú Sĩ", "Chùa Kiyomizu", "Cung điện hoàng gia Tokyo", "Khu phố Shibuya"],
            image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=800"
          },
          {
            name: "Tokyo - Hakone - Kawaguchi",
            slug: "tokyo-hakone-kawaguchi-5n4d",
            duration: "5 ngày 4 đêm",
            price: "32.990.000",
            originalPrice: "38.990.000",
            departure: ["TP.HCM", "Hà Nội"],
            highlights: ["Hồ Kawaguchi", "Hakone", "Tokyo Disneyland", "Chợ cá Tsukiji"],
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800"
          }
        ]
      },
      {
        name: "Trung Quốc",
        slug: "tour-trung-quoc",
        image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1200",
        destinations: [
          {
            name: "Bắc Kinh - Thượng Hải",
            slug: "bac-kinh-thuong-hai-5n4d",
            duration: "5 ngày 4 đêm",
            price: "15.990.000",
            originalPrice: "18.990.000",
            departure: ["TP.HCM", "Hà Nội"],
            highlights: ["Vạn Lý Trường Thành", "Tử Cấm Thành", "Bund Thượng Hải", "Chùa Thiên Đàn"],
            image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=800"
          }
        ]
      }
    ]
  },
  "chau-au": {
    name: "Tour Châu Âu",
    tours: [
      {
        name: "Pháp - Thụy Sĩ - Ý",
        slug: "tour-phap-thuy-si-y",
        image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?q=80&w=1200",
        destinations: [
          {
            name: "Paris - Geneva - Rome",
            slug: "paris-geneva-rome-8n7d",
            duration: "8 ngày 7 đêm",
            price: "89.990.000",
            originalPrice: "99.990.000",
            departure: ["TP.HCM", "Hà Nội"],
            highlights: ["Tháp Eiffel", "Núi Jungfraujoch", "Đấu trường Colosseum", "Vatican"],
            image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?q=80&w=800"
          }
        ]
      },
      {
        name: "Đức - Áo - Séc",
        slug: "tour-duc-ao-sec",
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200",
        destinations: [
          {
            name: "Berlin - Vienna - Prague",
            slug: "berlin-vienna-prague-7n6d",
            duration: "7 ngày 6 đêm",
            price: "72.990.000",
            originalPrice: "82.990.000",
            departure: ["TP.HCM", "Hà Nội"],
            highlights: ["Cung điện Schönbrunn", "Lâu đài Prague", "Cổng Brandenburg", "Salzburg"],
            image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800"
          }
        ]
      }
    ]
  },
  "chau-my": {
    name: "Tour Châu Mỹ", 
    tours: [
      {
        name: "Mỹ Đông - Tây",
        slug: "tour-my-dong-tay",
        image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=1200",
        destinations: [
          {
            name: "New York - Las Vegas - Los Angeles",
            slug: "newyork-lasvegas-losangeles-9n8d",
            duration: "9 ngày 8 đêm",
            price: "125.990.000",
            originalPrice: "145.990.000",
            departure: ["TP.HCM", "Hà Nội"],
            highlights: ["Tượng Nữ thần Tự do", "Grand Canyon", "Hollywood", "Times Square"],
            image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800"
          }
        ]
      },
      {
        name: "Canada",
        slug: "tour-canada",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1200",
        destinations: [
          {
            name: "Toronto - Ottawa - Montreal",
            slug: "toronto-ottawa-montreal-7n6d",
            duration: "7 ngày 6 đêm",
            price: "89.990.000",
            originalPrice: "99.990.000",
            departure: ["TP.HCM", "Hà Nội"],
            highlights: ["Thác Niagara", "Tháp CN Toronto", "Lâu đài Frontenac", "Old Montreal"],
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800"
          }
        ]
      }
    ]
  },
  "chau-dai-duong": {
    name: "Tour Châu Đại Dương",
    tours: [
      {
        name: "Úc",
        slug: "tour-uc",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200",
        destinations: [
          {
            name: "Sydney - Melbourne - Gold Coast",
            slug: "sydney-melbourne-goldcoast-8n7d",
            duration: "8 ngày 7 đêm",
            price: "95.990.000",
            originalPrice: "110.990.000",
            departure: ["TP.HCM", "Hà Nội"],
            highlights: ["Nhà hát Sydney Opera", "Great Ocean Road", "Thế giới biển", "Kuranda"],
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800"
          }
        ]
      },
      {
        name: "New Zealand",
        slug: "tour-new-zealand",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200",
        destinations: [
          {
            name: "Auckland - Wellington - Christchurch",
            slug: "auckland-wellington-christchurch-8n7d",
            duration: "8 ngày 7 đêm",
            price: "102.990.000",
            originalPrice: "118.990.000",
            departure: ["TP.HCM"],
            highlights: ["Milford Sound", "Hobbiton", "Queenstown", "Rotorua"],
            image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800"
          }
        ]
      }
    ]
  }
};

// ==================== TOUR NỔI BẬT ====================
export const featuredTours = [
  {
    id: 1,
    name: "Tour Hàn Quốc: Seoul - Busan - Jeju",
    slug: "seoul-busan-jeju-5n4d",
    duration: "5 ngày 4 đêm",
    price: "21.990.000",
    originalPrice: "25.990.000",
    departure: ["TP.HCM", "Hà Nội", "Đà Nẵng"],
    category: "chau-a",
    country: "han-quoc",
    highlights: ["Đảo Jeju", "Cung điện Gyeongbokgung", "Làng văn hóa Bukchon", "Chợ Myeongdong"],
    description: "Khám phá xứ sở Kim Chi với những địa danh nổi tiếng nhất từ Seoul hiện đại đến đảo Jeju thơ mộng.",
    image: "https://images.unsplash.com/photo-1549769015-3ded74941c7a?q=80&w=800",
    rating: 4.8,
    reviewCount: 324,
    isHot: true
  },
  {
    id: 2,
    name: "Tour Nhật Bản: Tokyo - Osaka - Kyoto",
    slug: "tokyo-osaka-kyoto-6n5d",
    duration: "6 ngày 5 đêm",
    price: "35.990.000",
    originalPrice: "42.990.000",
    departure: ["TP.HCM", "Hà Nội"],
    category: "chau-a",
    country: "nhat-ban",
    highlights: ["Núi Phú Sĩ", "Chùa Kiyomizu", "Cung điện hoàng gia Tokyo", "Khu phố Shibuya"],
    description: "Trải nghiệm văn hóa độc đáo của đất nước mặt trời mọc, từ Tokyo hiện đại đến Kyoto cổ kính.",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=800",
    rating: 4.9,
    reviewCount: 256,
    isHot: true
  },
  {
    id: 3,
    name: "Tour Châu Âu: Paris - Geneva - Rome",
    slug: "paris-geneva-rome-8n7d",
    duration: "8 ngày 7 đêm",
    price: "89.990.000",
    originalPrice: "99.990.000",
    departure: ["TP.HCM", "Hà Nội"],
    category: "chau-au",
    country: "phap-thuy-si-y",
    highlights: ["Tháp Eiffel", "Núi Jungfraujoch", "Đấu trường Colosseum", "Vatican"],
    description: "Hành trình khám phá 3 nước Châu Âu với những di sản văn hóa thế giới và phong cảnh tuyệt đẹp.",
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?q=80&w=800",
    rating: 4.7,
    reviewCount: 189,
    isHot: false
  },
  {
    id: 4,
    name: "Tour Mỹ: New York - Las Vegas - Los Angeles",
    slug: "newyork-lasvegas-losangeles-9n8d",
    duration: "9 ngày 8 đêm",
    price: "125.990.000",
    originalPrice: "145.990.000",
    departure: ["TP.HCM", "Hà Nội"],
    category: "chau-my",
    country: "my-dong-tay",
    highlights: ["Tượng Nữ thần Tự do", "Grand Canyon", "Hollywood", "Times Square"],
    description: "Khám phá nước Mỹ từ bờ Đông đến bờ Tây với những biểu tượng nổi tiếng nhất thế giới.",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800",
    rating: 4.6,
    reviewCount: 142,
    isHot: false
  },
  {
    id: 5,
    name: "Tour Úc: Sydney - Melbourne - Gold Coast",
    slug: "sydney-melbourne-goldcoast-8n7d",
    duration: "8 ngày 7 đêm",
    price: "95.990.000",
    originalPrice: "110.990.000",
    departure: ["TP.HCM", "Hà Nội"],
    category: "chau-dai-duong",
    country: "uc",
    highlights: ["Nhà hát Sydney Opera", "Great Ocean Road", "Thế giới biển", "Kuranda"],
    description: "Trải nghiệm thiên nhiên hoang dã và những thành phố hiện đại của châu Đại Dương.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800",
    rating: 4.8,
    reviewCount: 203,
    isHot: true
  }
];

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
