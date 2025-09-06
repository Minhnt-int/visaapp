"use client";

import { whyChooseUs, stats, processSteps, customerReviews } from '@/lib/data';
import { Clock, Award, Users, DollarSign, Star, Quote, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const iconMap = {
  Clock,
  Award, 
  Users,
  DollarSign
};

export default function WhyChooseUs() {
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % customerReviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + customerReviews.length) % customerReviews.length);
  };

  return (
    <section className="py-20">
      {/* Why Choose Us */}
      <div className="container mx-auto px-4 mb-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Award size={16} />
            Tại Sao Nên Chọn Visa5s
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-blue-600">Uy Tín</span> - <span className="text-orange-500">Nhanh Chóng</span> - <span className="text-green-500">Hiệu Quả</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Visa5s trực thuộc Công ty Tư vấn Đầu tư Asia Blue Sky là công ty chuyên cung cấp các dịch vụ về visa nhập cảnh đi nước ngoài
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {whyChooseUs.map((item, index) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap];
            return (
              <div 
                key={index}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mx-auto flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <IconComponent className="text-white" size={32} />
                  </div>
                  <div className="absolute -inset-2 bg-blue-100 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-orange-300">
                  {stat.number}
                </div>
                <div className="text-blue-200 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <ArrowRight size={16} />
              Quy Trình Tiếp Nhận Hồ Sơ
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Quy Trình <span className="text-orange-500">Đơn Giản</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              4 bước đơn giản để hoàn thành hồ sơ xin visa của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="pt-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Arrow for desktop */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="text-orange-300" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Star size={16} />
              Khách Hàng Nói Gì Về Chúng Tôi
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Đánh Giá Từ <span className="text-green-500">Khách Hàng</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
              <Quote className="absolute top-6 left-6 text-blue-200" size={48} />
              
              <div className="text-center">
                <div className="mb-8">
                  <Image
                    src={customerReviews[currentReview].avatar}
                    alt={customerReviews[currentReview].name}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto mb-4"
                  />
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={20} />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-lg md:text-xl text-gray-700 mb-8 italic leading-relaxed">
                  &ldquo;{customerReviews[currentReview].comment}&rdquo;
                </blockquote>
                
                <div className="border-t pt-6">
                  <div className="font-bold text-gray-900 text-lg">
                    {customerReviews[currentReview].name}
                  </div>
                  <div className="text-blue-600 font-medium">
                    {customerReviews[currentReview].service}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {customerReviews[currentReview].date}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center mt-8 gap-2">
                {customerReviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReview(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentReview 
                        ? 'bg-blue-500 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
