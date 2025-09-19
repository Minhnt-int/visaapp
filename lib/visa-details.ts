export type VisaCountry = {
  slug: string;
  name: string;
  continentSlug: string;
  shortDescription: string;
  processingTimeDays: number;
  visaTypes: Array<{ type: string; durationDays?: number; priceVND?: number }>;
  requirements: string[];
  samplePriceRange: { minVND: number; maxVND: number } | null;
  popularPlaces?: string[];
};

// 5 countries per continent with mock detail data
export const visaDetails: VisaCountry[] = [
  // Asia
  {
    slug: "han-quoc",
    name: "Hàn Quốc",
    continentSlug: "visa-chau-a",
    shortDescription: "Visa du lịch Hàn Quốc cho công dân Việt Nam, xử lý nhanh trong vài ngày.",
    processingTimeDays: 5,
    visaTypes: [
      { type: "Tourist (single)", durationDays: 30, priceVND: 1200000 },
      { type: "Work (long-term)", durationDays: 365, priceVND: 5000000 },
    ],
    requirements: [
      "Hộ chiếu còn hạn ít nhất 6 tháng",
      "Ảnh 4x6 nền trắng",
      "Sổ tiết kiệm hoặc thư mời (nếu có)",
    ],
    samplePriceRange: { minVND: 1000000, maxVND: 6000000 },
    popularPlaces: ["Seoul", "Busan", "Jeju"],
  },
  {
    slug: "nhat-ban",
    name: "Nhật Bản",
    continentSlug: "visa-chau-a",
    shortDescription: "Visa Nhật Bản cho mục đích du lịch và thăm thân; quy trình chuẩn.",
    processingTimeDays: 7,
    visaTypes: [
      { type: "Tourist (single)", durationDays: 15, priceVND: 1500000 },
      { type: "Working Holiday", durationDays: 365, priceVND: 8000000 },
    ],
    requirements: ["Hộ chiếu", "Lịch trình chuyến đi", "Chứng minh tài chính"],
    samplePriceRange: { minVND: 1500000, maxVND: 8000000 },
    popularPlaces: ["Tokyo", "Kyoto", "Osaka"],
  },
  {
    slug: "thai-lan",
    name: "Thái Lan",
    continentSlug: "visa-chau-a",
    shortDescription: "Visa Thái Lan thường dễ xin cho du lịch ngắn ngày.",
    processingTimeDays: 3,
    visaTypes: [{ type: "Tourist (single)", durationDays: 30, priceVND: 800000 }],
    requirements: ["Hộ chiếu", "Vé khứ hồi", "Chứng minh tài chính nếu cần"],
    samplePriceRange: { minVND: 700000, maxVND: 2000000 },
    popularPlaces: ["Bangkok", "Phuket", "Chiang Mai"],
  },
  {
    slug: "singapore",
    name: "Singapore",
    continentSlug: "visa-chau-a",
    shortDescription: "Visa Singapore cho du lịch và công tác ngắn hạn.",
    processingTimeDays: 4,
    visaTypes: [{ type: "Tourist/Business", durationDays: 30, priceVND: 1200000 }],
    requirements: ["Hộ chiếu", "Vé máy bay", "Chứng nhận khách sạn"],
    samplePriceRange: { minVND: 1000000, maxVND: 3000000 },
    popularPlaces: ["Singapore", "Sentosa"],
  },
  {
    slug: "an-do",
    name: "Ấn Độ",
    continentSlug: "visa-chau-a",
    shortDescription: "Visa Ấn Độ (e-Visa) cho du lịch và công tác ngắn hạn.",
    processingTimeDays: 5,
    visaTypes: [{ type: "e-Visa", durationDays: 60, priceVND: 900000 }],
    requirements: ["Hộ chiếu", "Ảnh", "Mẫu đơn e-Visa trực tuyến"],
    samplePriceRange: { minVND: 800000, maxVND: 2000000 },
    popularPlaces: ["Delhi", "Agra", "Mumbai"],
  },

  // Europe
  {
    slug: "phap",
    name: "Pháp",
    continentSlug: "visa-chau-au",
    shortDescription: "Visa Schengen (Pháp) cho du lịch; quy trình theo nhóm Schengen.",
    processingTimeDays: 14,
    visaTypes: [{ type: "Schengen (short)", durationDays: 90, priceVND: 2000000 }],
    requirements: ["Hộ chiếu", "Bảo hiểm du lịch", "Xác nhận lưu trú"],
    samplePriceRange: { minVND: 1800000, maxVND: 4000000 },
    popularPlaces: ["Paris", "Nice", "Lyon"],
  },
  {
    slug: "duc",
    name: "Đức",
    continentSlug: "visa-chau-au",
    shortDescription: "Visa Đức (Schengen) cho du lịch và thăm thân.",
    processingTimeDays: 12,
    visaTypes: [{ type: "Schengen (short)", durationDays: 90, priceVND: 2000000 }],
    requirements: ["Hộ chiếu", "Bảo hiểm", "Thư mời (nếu thăm thân)"],
    samplePriceRange: { minVND: 1800000, maxVND: 4500000 },
    popularPlaces: ["Berlin", "Munich", "Frankfurt"],
  },
  {
    slug: "anh",
    name: "Anh",
    continentSlug: "visa-chau-au",
    shortDescription: "Visa Vương quốc Anh cho du lịch; quy trình riêng không thuộc Schengen.",
    processingTimeDays: 10,
    visaTypes: [{ type: "Standard Visitor", durationDays: 180, priceVND: 2200000 }],
    requirements: ["Hộ chiếu", "Bằng chứng tài chính", "Lý do chuyến đi"],
    samplePriceRange: { minVND: 2000000, maxVND: 6000000 },
    popularPlaces: ["London", "Edinburgh", "Manchester"],
  },
  {
    slug: "tay-ban-nha",
    name: "Tây Ban Nha",
    continentSlug: "visa-chau-au",
    shortDescription: "Visa Schengen cho Tây Ban Nha.",
    processingTimeDays: 14,
    visaTypes: [{ type: "Schengen (short)", durationDays: 90, priceVND: 2000000 }],
    requirements: ["Hộ chiếu", "Bảo hiểm du lịch", "Bằng chứng chỗ ở"],
    samplePriceRange: { minVND: 1800000, maxVND: 4000000 },
    popularPlaces: ["Madrid", "Barcelona", "Seville"],
  },
  {
    slug: "y",
    name: "Ý",
    continentSlug: "visa-chau-au",
    shortDescription: "Visa Schengen cho Ý, phù hợp với du lịch và công tác ngắn ngày.",
    processingTimeDays: 14,
    visaTypes: [{ type: "Schengen (short)", durationDays: 90, priceVND: 2000000 }],
    requirements: ["Hộ chiếu", "Lịch trình", "Bảo hiểm"],
    samplePriceRange: { minVND: 1800000, maxVND: 4000000 },
    popularPlaces: ["Rome", "Venice", "Florence"],
  },

  // Americas
  {
    slug: "hoa-ky",
    name: "Hoa Kỳ",
    continentSlug: "visa-chau-my",
    shortDescription: "Visa Mỹ phục vụ du lịch, công tác, học tập ngắn hạn.",
    processingTimeDays: 30,
    visaTypes: [
      { type: "B1/B2 (Tourist/Business)", durationDays: 180, priceVND: 4800000 },
    ],
    requirements: ["Hộ chiếu", "Lịch sử du lịch", "Thư mời (nếu có)"],
    samplePriceRange: { minVND: 4000000, maxVND: 8000000 },
    popularPlaces: ["New York", "Los Angeles", "San Francisco"],
  },
  {
    slug: "canada",
    name: "Canada",
    continentSlug: "visa-chau-my",
    shortDescription: "Visa Canada cho du lịch và thăm thân.",
    processingTimeDays: 25,
    visaTypes: [{ type: "Visitor Visa", durationDays: 180, priceVND: 4200000 }],
    requirements: ["Hộ chiếu", "Chứng minh tài chính", "Bảo hiểm (khuyến nghị)"],
    samplePriceRange: { minVND: 3500000, maxVND: 7000000 },
    popularPlaces: ["Toronto", "Vancouver", "Montreal"],
  },
  {
    slug: "mexico",
    name: "Mexico",
    continentSlug: "visa-chau-my",
    shortDescription: "Visa Mexico cho du lịch; đôi khi miễn thị thực tùy vào loại hộ chiếu.",
    processingTimeDays: 7,
    visaTypes: [{ type: "Tourist", durationDays: 180, priceVND: 900000 }],
    requirements: ["Hộ chiếu", "Vé khứ hồi", "Chứng minh tài chính"],
    samplePriceRange: { minVND: 800000, maxVND: 2000000 },
    popularPlaces: ["Mexico City", "Cancun", "Guadalajara"],
  },
  {
    slug: "brazil",
    name: "Brazil",
    continentSlug: "visa-chau-my",
    shortDescription: "Visa Brazil cho du lịch và công tác ngắn hạn.",
    processingTimeDays: 10,
    visaTypes: [{ type: "Tourist", durationDays: 90, priceVND: 1200000 }],
    requirements: ["Hộ chiếu", "Xác nhận chỗ ở", "Vé máy bay"],
    samplePriceRange: { minVND: 1000000, maxVND: 3000000 },
    popularPlaces: ["Rio de Janeiro", "São Paulo"],
  },
  {
    slug: "argentina",
    name: "Argentina",
    continentSlug: "visa-chau-my",
    shortDescription: "Visa Argentina cho du lịch và thăm thân.",
    processingTimeDays: 10,
    visaTypes: [{ type: "Tourist", durationDays: 90, priceVND: 1100000 }],
    requirements: ["Hộ chiếu", "Bằng chứng tài chính", "Chỗ ở"],
    samplePriceRange: { minVND: 1000000, maxVND: 2500000 },
    popularPlaces: ["Buenos Aires", "Mendoza"],
  },

  // Africa
  {
    slug: "ai-cap",
    name: "Ai Cập",
    continentSlug: "visa-chau-phi",
    shortDescription: "Visa Ai Cập cho du lịch; e-Visa có sẵn cho nhiều trường hợp.",
    processingTimeDays: 7,
    visaTypes: [{ type: "Tourist/e-Visa", durationDays: 30, priceVND: 900000 }],
    requirements: ["Hộ chiếu", "Ảnh", "Mẫu đơn e-Visa (nếu áp dụng)"],
    samplePriceRange: { minVND: 800000, maxVND: 2500000 },
    popularPlaces: ["Cairo", "Luxor", "Alexandria"],
  },
  {
    slug: "nam-phi",
    name: "Nam Phi",
    continentSlug: "visa-chau-phi",
    shortDescription: "Visa Nam Phi cho du lịch và công tác ngắn hạn.",
    processingTimeDays: 10,
    visaTypes: [{ type: "Tourist", durationDays: 90, priceVND: 1300000 }],
    requirements: ["Hộ chiếu", "Vé máy bay", "Chứng minh tài chính"],
    samplePriceRange: { minVND: 1000000, maxVND: 3500000 },
    popularPlaces: ["Cape Town", "Johannesburg"],
  },
  {
    slug: "morocco",
    name: "Morocco",
    continentSlug: "visa-chau-phi",
    shortDescription: "Visa Morocco cho du lịch, được nhiều du khách châu Âu và châu Á yêu thích.",
    processingTimeDays: 7,
    visaTypes: [{ type: "Tourist", durationDays: 90, priceVND: 900000 }],
    requirements: ["Hộ chiếu", "Xác nhận chỗ ở"],
    samplePriceRange: { minVND: 800000, maxVND: 2000000 },
    popularPlaces: ["Marrakesh", "Casablanca"],
  },
  {
    slug: "kenya",
    name: "Kenya",
    continentSlug: "visa-chau-phi",
    shortDescription: "Visa Kenya có dạng e-Visa cho nhiều quốc tịch.",
    processingTimeDays: 5,
    visaTypes: [{ type: "e-Visa", durationDays: 90, priceVND: 800000 }],
    requirements: ["Hộ chiếu", "Mẫu đơn e-Visa", "Vé khứ hồi"],
    samplePriceRange: { minVND: 700000, maxVND: 1800000 },
    popularPlaces: ["Nairobi", "Mombasa"],
  },
  {
    slug: "ghana",
    name: "Ghana",
    continentSlug: "visa-chau-phi",
    shortDescription: "Visa Ghana cho du lịch và công tác.",
    processingTimeDays: 10,
    visaTypes: [{ type: "Tourist/Business", durationDays: 90, priceVND: 1200000 }],
    requirements: ["Hộ chiếu", "Thư mời (nếu có)", "Bằng chứng tài chính"],
    samplePriceRange: { minVND: 900000, maxVND: 3000000 },
    popularPlaces: ["Accra"],
  },

  // Oceania
  {
    slug: "uc",
    name: "Úc",
    continentSlug: "visa-chau-uc",
    shortDescription: "Visa Úc cho du lịch, công tác và định cư; nhiều loại thị thực.",
    processingTimeDays: 20,
    visaTypes: [{ type: "Visitor", durationDays: 90, priceVND: 3000000 }],
    requirements: ["Hộ chiếu", "Chứng minh tài chính", "Bảo hiểm (khuyến nghị)"],
    samplePriceRange: { minVND: 2500000, maxVND: 8000000 },
    popularPlaces: ["Sydney", "Melbourne"],
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    continentSlug: "visa-chau-uc",
    shortDescription: "Visa New Zealand cho du lịch và công tác ngắn hạn.",
    processingTimeDays: 15,
    visaTypes: [{ type: "Visitor", durationDays: 90, priceVND: 2500000 }],
    requirements: ["Hộ chiếu", "Bằng chứng tài chính", "Vé máy bay"],
    samplePriceRange: { minVND: 2000000, maxVND: 6000000 },
    popularPlaces: ["Auckland", "Wellington"],
  },
  {
    slug: "fiji",
    name: "Fiji",
    continentSlug: "visa-chau-uc",
    shortDescription: "Visa Fiji cho du lịch biển đảo, thủ tục thường đơn giản.",
    processingTimeDays: 5,
    visaTypes: [{ type: "Tourist", durationDays: 120, priceVND: 900000 }],
    requirements: ["Hộ chiếu", "Vé máy bay", "Xác nhận khách sạn"],
    samplePriceRange: { minVND: 800000, maxVND: 2000000 },
    popularPlaces: ["Nadi", "Mamanuca Islands"],
  },
  {
    slug: "samoa",
    name: "Samoa",
    continentSlug: "visa-chau-uc",
    shortDescription: "Visa Samoa cho du lịch; thời gian xử lý ngắn.",
    processingTimeDays: 5,
    visaTypes: [{ type: "Tourist", durationDays: 90, priceVND: 800000 }],
    requirements: ["Hộ chiếu", "Vé máy bay"],
    samplePriceRange: { minVND: 700000, maxVND: 1800000 },
    popularPlaces: ["Apia"],
  },
];

export function getCountriesByContinent() {
  const map: Record<string, { slug: string; name: string }[]> = {};
  for (const c of visaDetails) {
    if (!map[c.continentSlug]) map[c.continentSlug] = [];
    map[c.continentSlug].push({ slug: c.slug, name: c.name });
  }
  return map;
}
