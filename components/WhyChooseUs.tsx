"use client";

import { whyChooseUs, stats, processSteps, customerReviews } from '@/lib/data';
import { Clock, Award, Users, DollarSign, Star, Quote, ArrowRight, CheckCircle, Target, Shield, Heart } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const iconMap = {
  Clock,
  Award, 
  Users,
  DollarSign,
  CheckCircle,
  Target,
  Shield,
  Heart
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
    <section className="py-16 bg-gray-50">
      {/* Process Steps - Visana Style */}
      <div className="container mx-auto px-4 mb-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-blue-100">
            <Target size={16} />
            Quy Trình Làm Visa
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Quy trình <span className="text-blue-600">minh bạch</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hồ sơ được xử lý một cách chuyên nghiệp và nhanh chóng
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-blue-200 to-transparent z-10"></div>
                )}
                
                <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                    <div className="text-blue-600">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="container mx-auto px-4 mb-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-orange-100">
            <Award size={16} />
            Tại Sao Nên Chọn VISA5S
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Chúng tôi cam kết mang đến <br />
            <span className="text-blue-600">trải nghiệm tốt nhất</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Với hơn 15 năm kinh nghiệm, chúng tôi tự hào là đối tác tin cậy cho hành trình du lịch của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {whyChooseUs.map((item, index) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap];
            return (
              <div 
                key={index}
                className="text-center group hover:transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-sm border border-gray-100 group-hover:shadow-md transition-all duration-300">
                    <IconComponent className="text-blue-600 group-hover:text-orange-500 transition-colors" size={24} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2 text-blue-600">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm font-medium">
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

      {/* Customer Reviews - Visana Style */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-green-100">
            <Star size={16} />
            Khách Hàng Tin Tưởng
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Câu chuyện thành công từ <br />
            <span className="text-green-600">khách hàng</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hàng nghìn khách hàng đã tin tưởng và đồng hành cùng VISA5S
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 lg:p-12 relative">
            <Quote className="absolute top-6 left-6 text-green-100" size={32} />
            
            <div className="text-center">
              <div className="mb-8">
                <Image
                  src={customerReviews[currentReview].avatar}
                  alt={customerReviews[currentReview].name}
                  width={64}
                  height={64}
                  className="rounded-full mx-auto mb-4 border-4 border-green-100"
                />
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current w-4 h-4" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
                "{customerReviews[currentReview].comment}"
              </blockquote>
              
              <div className="border-t border-gray-100 pt-6">
                <div className="font-semibold text-gray-900 text-lg">
                  {customerReviews[currentReview].name}
                </div>
                <div className="text-blue-600 font-medium text-sm">
                  {customerReviews[currentReview].service}
                </div>
                <div className="text-gray-500 text-sm mt-1">
                  {customerReviews[currentReview].date}
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 gap-2">
              {customerReviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentReview 
                      ? 'bg-green-500 w-6' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
