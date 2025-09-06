"use client";

import Link from 'next/link';
import Image from 'next/image';
import { services, visaCategories } from '@/lib/data';
import { useState } from 'react';
import { Clock, DollarSign, CheckCircle, ArrowRight, Filter } from 'lucide-react';

export default function ServiceSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const filteredServices = selectedCategory === 'all' 
    ? services.slice(0, 8) // Hiển thị 8 dịch vụ đầu tiên
    : services.filter(service => service.category === selectedCategory);

  const categories = [
    { key: 'all', label: 'Tất cả', count: services.length },
    { key: 'visa-chau-a', label: 'Châu Á', count: services.filter(s => s.category === 'visa-chau-a').length },
    { key: 'visa-chau-au', label: 'Châu Âu', count: services.filter(s => s.category === 'visa-chau-au').length },
    { key: 'visa-chau-my', label: 'Châu Mỹ', count: services.filter(s => s.category === 'visa-chau-my').length },
    { key: 'visa-chau-dai-duong', label: 'Châu Đại Dương', count: services.filter(s => s.category === 'visa-chau-dai-duong').length }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Filter size={16} />
            Dịch Vụ Visa Theo Quốc Gia
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Dịch Vụ <span className="text-blue-600">Visa</span> Chuyên Nghiệp
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cung cấp dịch vụ xin visa đa dạng với tỷ lệ thành công cao, quy trình nhanh chóng và minh bạch.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              <span>{category.label}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                selectedCategory === category.key 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {filteredServices.map((service) => (
            <div 
              key={service.slug}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Hot
                  </span>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 overflow-hidden"
                   style={{
                     display: '-webkit-box',
                     WebkitLineClamp: 2,
                     WebkitBoxOrient: 'vertical'
                   }}>
                  {service.description}
                </p>

                {/* Service Details */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign size={16} className="text-green-500" />
                    <span className="text-gray-700">{service.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-blue-500" />
                    <span className="text-gray-700">{service.processingTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="text-gray-700">Tỷ lệ đậu 99%</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link 
                  href={`/dich-vu/${service.slug}`}
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 group"
                >
                  <span>Xem Chi Tiết</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="text-center">
          <Link 
            href="/dich-vu"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>Xem Tất Cả Dịch Vụ</span>
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 bg-blue-600 rounded-3xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">23,868</div>
              <div className="text-blue-200">Hồ sơ thành công</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">99%</div>
              <div className="text-blue-200">Tỷ lệ đậu visa</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">9,886</div>
              <div className="text-blue-200">Khách hàng</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">150</div>
              <div className="text-blue-200">Quốc gia</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
