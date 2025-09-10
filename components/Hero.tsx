"use client";

import Link from "next/link";
import { ArrowRight, Phone, MessageCircle, CheckCircle, Shield, Award, Users, Clock, Search } from "lucide-react";

// Hero Section theo phong cách Visana.vn - Banner với search bar đè lên
export default function Hero() {
  return (
    <div className="relative">
      {/* Main Hero Banner với Background Image */}
      <section className="relative min-h-[33vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1920')`
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/60"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white py-4">
          {/* Badge */}
          {/* <div className="inline-flex items-center gap-2 bg-orange-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium mb-2">
            🌟 Đối tác tin cậy cho hành trình của bạn
          </div> */}

          {/* Main Slogan - Compact 3 lines */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-2">
            <span className="inline">Dịch vụ </span>
            <span className="inline text-gray-200">Visa & Tour </span>
            <span className="block text-sm md:text-base lg:text-lg font-normal opacity-90 mt-1">
              Uy tín - Nhanh chóng - Hiệu quả
            </span>
          </h1>

          <p className="text-sm md:text-base mb-4 opacity-90 max-w-xl mx-auto leading-relaxed">
            15+ năm kinh nghiệm, tỷ lệ đậu visa 99%
          </p>
        </div>
      </section>

      {/* Search Bar đè lên - Floating */}
      <div className="relative z-30 -mt-12">
        <div className="container mx-auto px-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-4xl mx-auto">
            {/* Search Header */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Tìm kiếm dịch vụ</h3>
              <p className="text-gray-600 text-sm">Chọn dịch vụ phù hợp với nhu cầu của bạn</p>
            </div>
            
            {/* Search Form */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm visa, tour du lịch..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-base"
                  />
                </div>
              </div>
              <button className="bg-gray-700 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-md transition-colors duration-200 flex items-center justify-center gap-2">
                <Search size={18} />
                Tìm kiếm
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/dich-vu"
                className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 font-medium px-5 py-2.5 rounded-md transition-colors duration-200"
              >
                <Shield size={16} />
                Dịch Vụ Visa
                <ArrowRight size={16} />
              </Link>
              
              <Link 
                href="/tour-du-lich"
                className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 font-medium px-5 py-2.5 rounded-md transition-colors duration-200"
              >
                <Award size={16} />
                Tour Du Lịch
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Company Introduction Card */}
      <section className="py-16 bg-gray-50 relative">
        <div className="container mx-auto px-4">

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-gray-600" />
              </div>
              <div className="text-2xl font-semibold text-gray-800 mb-2">15+</div>
              <div className="text-gray-600 text-sm font-medium">Năm kinh nghiệm</div>
            </div>
            
            <div className="text-center bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-gray-600" />
              </div>
              <div className="text-2xl font-semibold text-gray-800 mb-2">99%</div>
              <div className="text-gray-600 text-sm font-medium">Tỷ lệ đậu visa</div>
            </div>
            
            <div className="text-center bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-gray-600" />
              </div>
              <div className="text-2xl font-semibold text-gray-800 mb-2">24/7</div>
              <div className="text-gray-600 text-sm font-medium">Hỗ trợ khách hàng</div>
            </div>
            
            <div className="text-center bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-gray-600" />
              </div>
              <div className="text-2xl font-semibold text-gray-800 mb-2">23K+</div>
              <div className="text-gray-600 text-sm font-medium">Khách hàng tin tưởng</div>
            </div>
          </div>

          {/* Main Company Info Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">
                Tại sao chọn <span className="text-gray-700">VISA5S</span>?
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto">
                Chúng tôi tự hào là đối tác tin cậy, mang đến dịch vụ visa và tour du lịch chất lượng cao với tỷ lệ thành công hàng đầu
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">
                  Công ty Tư vấn Đầu tư <span className="text-gray-700">Asia Blue Sky</span>
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Với hơn 15 năm kinh nghiệm trong lĩnh vực dịch vụ visa và tour du lịch, chúng tôi đã đồng hành cùng hàng nghìn khách hàng thực hiện ước mơ du lịch và làm việc tại các quốc gia trên thế giới.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700 text-sm">Đội ngũ chuyên viên tư vấn giàu kinh nghiệm</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700 text-sm">Quy trình làm việc chuyên nghiệp, minh bạch</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700 text-sm">Cam kết tỷ lệ đậu visa cao nhất thị trường</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700 text-sm">Hỗ trợ khách hàng 24/7 trong suốt quá trình</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative bg-gray-50 rounded-lg p-6">
                  <img 
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600" 
                    alt="Đội ngũ VISA5S"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-white border border-gray-200 rounded-lg p-3">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-800">4.9/5</div>
                      <div className="text-xs text-gray-600">Đánh giá khách hàng</div>
                      <div className="flex justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-gray-400 rounded-full mr-1"></div>
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
