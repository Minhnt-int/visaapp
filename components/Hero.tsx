"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight, CheckCircle, Clock, Award, Users } from "lucide-react";

const bannerImages = [
  {
    url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074",
    title: "Visa Du Lịch Thế Giới",
    subtitle: "Khám phá mọi điểm đến trên hành tinh"
  },
  {
    url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070", 
    title: "Visa Châu Âu", 
    subtitle: "Tự do di chuyển 26 quốc gia Schengen"
  },
  {
    url: "https://images.unsplash.com/photo-1549769015-3ded74941c7a?q=80&w=2070",
    title: "Visa Hàn Quốc",
    subtitle: "Trải nghiệm văn hóa K-Pop và ẩm thực độc đáo"
  }
];

const highlights = [
  { icon: CheckCircle, text: "Tỷ lệ đậu visa 99%" },
  { icon: Clock, text: "Xử lý hồ sơ nhanh chóng" },
  { icon: Award, text: "15+ năm kinh nghiệm" },
  { icon: Users, text: "23,868+ hồ sơ thành công" }
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentImage = bannerImages[currentImageIndex];

  return (
    <section 
      className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat transition-all duration-1000"
      style={{
        backgroundImage: `url(${currentImage.url})`
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/40 to-transparent"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/90 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Award size={16} />
            Dịch vụ visa uy tín #1 Việt Nam
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            <span className="block">Dịch Vụ Xin Visa</span>
            <span className="block text-orange-400">Chuyên Nghiệp</span>
            <span className="block">Hàng Đầu</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
            {currentImage.subtitle} với tỷ lệ thành công 99%, hỗ trợ 24/7 và quy trình minh bạch.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {highlights.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-white/90">
                <item.icon size={20} className="text-orange-400 flex-shrink-0" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link 
              href="/dich-vu"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Xem Dịch Vụ
              <ChevronRight size={20} />
            </Link>
            
            <Link 
              href="/lien-he"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-full transition-all duration-300"
            >
              Tư Vấn Miễn Phí
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-6 text-white">
            <div className="flex items-center gap-2">
              <span className="text-orange-400">📞</span>
              <div>
                <div className="font-semibold">Hotline 24/7</div>
                <div className="text-lg font-bold">0911.909.686</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-400">📧</span>
              <div>
                <div className="font-semibold">Email</div>
                <div className="font-medium">info@visa5s.com.vn</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-orange-400 w-8' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Floating Stats */}
      <div className="hidden lg:block absolute right-8 top-1/2 transform -translate-y-1/2">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-4">Thành Tích Của Chúng Tôi</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div>
                <div className="font-bold text-2xl">99%</div>
                <div className="text-sm opacity-80">Tỷ lệ đậu visa</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <div>
                <div className="font-bold text-2xl">23,868</div>
                <div className="text-sm opacity-80">Hồ sơ thành công</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
              <div>
                <div className="font-bold text-2xl">9,886</div>
                <div className="text-sm opacity-80">Khách hàng tin tưởng</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
