import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Shield, Award, Users, Clock } from "lucide-react";
import { SearchContainer } from '@/components/search/SearchContainer';
import { getMetaJson, type HeroBannerData } from '@/lib/api';

export default async function Hero() {
  // Fetch hero banner data via meta API (with fallback to defaults)
  const heroData: HeroBannerData =
    (await getMetaJson<HeroBannerData>('heroBanner')) || {
      backgroundImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1920',
      title: {
        primary: 'Dịch vụ',
        secondary: 'Visa & Tour',
        subtitle: 'Uy tín - Nhanh chóng - Hiệu quả'
      },
      description: '15+ năm kinh nghiệm, tỷ lệ đậu visa 99%',
      ctaButtons: [
        { text: 'Dịch Vụ Visa', href: '/dich-vu', variant: 'secondary' },
        { text: 'Tour Du Lịch', href: '/tour-du-lich', variant: 'primary' }
      ]
    };
  
  return (
    <div className="relative bg-gray-50">
      {/* Main Hero Banner - Compact Height */}
      <section className="relative w-full h-[50vh] sm:h-[55vh] md:h-[60vh] lg:aspect-video flex items-center justify-center overflow-hidden bg-gray-900">
        {/* Background Layer - Blurred Fill (fills empty spaces) */}
        <div 
          className="absolute inset-0 scale-110 blur-sm"
          style={{
            backgroundImage: `url('${heroData.backgroundImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Main Image - Full Display (no cropping) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={heroData.backgroundImage}
              alt="Hero Banner"
              fill
              className="object-contain"
              priority
              quality={90}
            />
          </div>
        </div>
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/60"></div>
        {/* Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Text Content - Hidden on Mobile */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white py-6 sm:py-8 hidden sm:block">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 sm:mb-4 px-2">
            <span className="inline">{heroData.title.primary} </span>
            <span className="inline text-blue-200">{heroData.title.secondary} </span>
            <span className="block text-sm sm:text-base md:text-lg lg:text-xl lg:text-2xl font-normal opacity-95 mt-2 sm:mt-3">
              {heroData.title.subtitle}
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 opacity-95 max-w-2xl mx-auto leading-relaxed px-2">
            {heroData.description}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mt-4 sm:mt-6 px-2">
            {heroData.ctaButtons.map((button, index) => (
              <Link
                key={index}
                href={button.href}
                className={`inline-flex items-center justify-center gap-2 font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base ${
                  button.variant === 'primary'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}
              >
                {index === 0 ? <Shield size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Award size={16} className="sm:w-[18px] sm:h-[18px]" />}
                {button.text}
                <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Company Introduction Section with Search and Stats */}
      <section className="py-8 sm:py-12 md:py-16 relative">
        <div className="container mx-auto px-4">
          
          {/* Combined Search and Stats Card */}
          <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12">
            {/* Search Section */}
            <div className="mb-6 sm:mb-8 md:mb-10 pb-6 sm:pb-8 md:pb-10 border-b border-gray-200">
              <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Tìm kiếm dịch vụ của chúng tôi
                </h2>
                <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-2">
                  Tìm visa, tour du lịch, hoặc thông tin bạn cần một cách nhanh chóng và dễ dàng
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto">
                <SearchContainer placeholder="Nhập tên quốc gia, loại visa, tour..."/>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              <div className="text-center bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-600" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">15+</div>
                <div className="text-gray-600 text-xs sm:text-sm font-semibold leading-tight">Năm kinh nghiệm</div>
              </div>
              
              <div className="text-center bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-600" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">99%</div>
                <div className="text-gray-600 text-xs sm:text-sm font-semibold leading-tight">Tỷ lệ đậu visa</div>
              </div>
              
              <div className="text-center bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-600" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">24/7</div>
                <div className="text-gray-600 text-xs sm:text-sm font-semibold leading-tight">Hỗ trợ khách hàng</div>
              </div>
              
              <div className="text-center bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-600" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">23K+</div>
                <div className="text-gray-600 text-xs sm:text-sm font-semibold leading-tight">Khách hàng tin tưởng</div>
              </div>
            </div>
          </div>

          {/* Main Company Info Card */}
          <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2 sm:mb-3 md:mb-4">
                Tại sao chọn <span className="text-gray-700">Kim Quy Travel</span>?
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto px-2">
                Chúng tôi tự hào là đối tác tin cậy, mang đến dịch vụ visa và tour du lịch chất lượng cao với tỷ lệ thành công hàng đầu
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-4 sm:mb-5 md:mb-6">
                  Công ty Tư vấn Đầu tư <span className="text-gray-700">Asia Blue Sky</span>
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                  Với hơn 15 năm kinh nghiệm trong lĩnh vực dịch vụ visa và tour du lịch, chúng tôi đã đồng hành cùng hàng nghìn khách hàng thực hiện ước mơ du lịch và làm việc tại các quốc gia trên thế giới.
                </p>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-xs sm:text-sm leading-relaxed">Đội ngũ chuyên viên tư vấn giàu kinh nghiệm</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-xs sm:text-sm leading-relaxed">Quy trình làm việc chuyên nghiệp, minh bạch</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-xs sm:text-sm leading-relaxed">Cam kết tỷ lệ đậu visa cao nhất thị trường</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-xs sm:text-sm leading-relaxed">Hỗ trợ khách hàng 24/7 trong suốt quá trình</span>
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
                  <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-white border border-gray-200 rounded-lg p-2 sm:p-3">
                    <div className="text-center">
                      <div className="text-base sm:text-lg font-semibold text-gray-800">4.9/5</div>
                      <div className="text-xs text-gray-600">Đánh giá khách hàng</div>
                      <div className="flex justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full mr-0.5 sm:mr-1"></div>
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
