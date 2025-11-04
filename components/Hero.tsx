import { CheckCircle, Users, Clock, Award } from "lucide-react";
import { SearchContainer } from '@/components/search/SearchContainer';
import { getMetaJson } from '@/lib/api';
import BannerCarousel from '@/components/BannerCarousel';
import Image from "next/image";

interface BannerSlide {
  imgSrc: string;
  alt: string;
  subheading: string;
  heading: string;
  btnText: string;
  link: string;
}

interface BannerData {
  _type: "banner";
  slides: BannerSlide[];
}

export default async function Hero() {
  // Fetch hero banner data via meta API (with fallback to defaults)
  const bannerMeta = await getMetaJson<{ metaData?: BannerData }>('heroBanner');
  const bannerData = bannerMeta?.metaData;
  
  // Prepare slides array - must have data from backend
  if (!bannerData || bannerData._type !== "banner" || !bannerData.slides || bannerData.slides.length === 0) {
    console.warn('Hero banner data not found or invalid, returning null');
    return null;
  }
  
  const slides: BannerSlide[] = bannerData.slides;
  
  return (
    <div className="relative bg-neutral-50">
      {/* Main Hero Banner - Carousel */}
      <BannerCarousel slides={slides} />

      {/* Company Introduction Section with Search and Stats */}
      <section className="py-8 sm:py-12 md:py-16 relative">
        <div className="container mx-auto px-4">
          
          {/* Combined Search and Stats Card */}
          <div className="bg-background border border-neutral-200 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12">
            {/* Search Section */}
            <div className="mb-6 sm:mb-8 md:mb-10 pb-6 sm:pb-8 md:pb-10 border-b border-neutral-200">
              <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3">
                  Tìm kiếm dịch vụ của chúng tôi
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto px-2">
                  Tìm visa, tour du lịch, hoặc thông tin bạn cần một cách nhanh chóng và dễ dàng
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto">
                <SearchContainer placeholder="Nhập tên quốc gia, loại visa, tour..."/>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              <div className="text-center bg-background border border-neutral-200 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-primary-lightest border border-primary-lighter rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">15+</div>
                <div className="text-neutral-600 text-xs sm:text-sm font-semibold leading-tight">Năm kinh nghiệm</div>
              </div>
              
              <div className="text-center bg-background border border-neutral-200 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-primary-lightest border border-primary-lighter rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">99%</div>
                <div className="text-neutral-600 text-xs sm:text-sm font-semibold leading-tight">Tỷ lệ đậu visa</div>
              </div>
              
              <div className="text-center bg-background border border-neutral-200 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-primary-lightest border border-primary-lighter rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">24/7</div>
                <div className="text-neutral-600 text-xs sm:text-sm font-semibold leading-tight">Hỗ trợ khách hàng</div>
              </div>
              
              <div className="text-center bg-background border border-neutral-200 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-primary-lightest border border-primary-lighter rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">23K+</div>
                <div className="text-neutral-600 text-xs sm:text-sm font-semibold leading-tight">Khách hàng tin tưởng</div>
              </div>
            </div>
          </div>

          {/* Main Company Info Card */}
          <div className="bg-background border border-neutral-200 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-2 sm:mb-3 md:mb-4">
                Tại sao chọn <span className="text-neutral-700">Kim Quy Travel</span>?
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 max-w-3xl mx-auto px-2">
                Chúng tôi tự hào là đối tác tin cậy, mang đến dịch vụ visa và tour du lịch chất lượng cao với tỷ lệ th  ành công hàng đầu
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground mb-4 sm:mb-5 md:mb-6">
                  Công ty Tư vấn Đầu tư <span className="text-neutral-700">Kim Quy</span>
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                  Với hơn 15 năm kinh nghiệm trong lĩnh vực dịch vụ visa và tour du lịch, chúng tôi đã đồng hành cùng hàng nghìn khách hàng thực hiện ước mơ du lịch và làm việc tại các quốc gia trên thế giới.
                </p>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 text-neutral-600 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700 text-xs sm:text-sm leading-relaxed">Đội ngũ chuyên viên tư vấn giàu kinh nghiệm</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 text-neutral-600 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700 text-xs sm:text-sm leading-relaxed">Quy trình làm việc chuyên nghiệp, minh bạch</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 text-neutral-600 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700 text-xs sm:text-sm leading-relaxed">Cam kết tỷ lệ đậu visa cao nhất thị trường</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 text-neutral-600 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700 text-xs sm:text-sm leading-relaxed">Hỗ trợ khách hàng 24/7 trong suốt quá trình</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative rounded-lg p-3 sm:p-4 md:p-6">
                  <Image 
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600" 
                    alt="Đội ngũ Kim Quy Travel"
                    width={600}
                    height={400}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-background border border-neutral-200 rounded-lg p-2 sm:p-3">
                    <div className="text-center">
                      <div className="text-base sm:text-lg font-semibold text-neutral-800">4.9/5</div>
                      <div className="text-xs text-neutral-600">Đánh giá khách hàng</div>
                      <div className="flex justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-neutral-400 rounded-full mr-0.5 sm:mr-1"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
