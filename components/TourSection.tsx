import Link from 'next/link';
import Image from 'next/image';
import { featuredTours } from '@/lib/data';
import { Calendar, MapPin, Star, Plane, DollarSign } from 'lucide-react';

/**
 * Component hiển thị section tour du lịch nổi bật trên trang chủ
 * Hiển thị 4 tour hot nhất với thiết kế card đẹp mắt
 * 
 * @returns JSX Component
 */
export default function TourSection() {
  const hotTours = featuredTours.filter(tour => tour.isHot).slice(0, 4);

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center mb-4">
            <Plane className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-base font-semibold leading-7 text-blue-600">Tour Du Lịch</h2>
          </div>
          <p className="text-3xl font-display font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
            Khám Phá <span className="text-blue-600">Thế Giới</span> Cùng Visa5s
          </p>
          <p className="text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
            Combo Visa + Tour du lịch trọn gói với giá ưu đãi. Từ châu Á đến châu Âu, 
            chúng tôi đồng hành cùng bạn trên mọi hành trình khám phá.
          </p>
        </div>

        {/* Tours Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
          {hotTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/tour-du-lich"
            className="inline-flex items-center rounded-md bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-300"
          >
            Xem Tất Cả Tour
            <Plane className="ml-2 h-4 w-4" />
          </Link>
          <p className="mt-4 text-sm text-gray-600">
            🔥 Ưu đãi đặc biệt khi đăng ký combo Visa + Tour
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Component hiển thị thẻ tour với thông tin cơ bản
 */
function TourCard({ tour }: { tour: any }) {
  const formatPrice = (price: string) => {
    return parseInt(price).toLocaleString('vi-VN');
  };

  const discountPercent = tour.originalPrice 
    ? Math.round((1 - parseInt(tour.price) / parseInt(tour.originalPrice)) * 100)
    : 0;

  return (
    <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2">
      {/* Hot Badge */}
      <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
        🔥 HOT
      </div>
      
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <div className="absolute top-4 right-4 z-10 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
          -{discountPercent}%
        </div>
      )}
      
      {/* Tour Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.name}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Rating Badge */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
          <div className="flex items-center text-sm">
            <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
            <span className="font-semibold">{tour.rating}</span>
            <span className="text-gray-600 ml-1">({tour.reviewCount})</span>
          </div>
        </div>
      </div>
      
      {/* Tour Info */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
          {tour.name}
        </h3>
        
        {/* Tour Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
            <span className="truncate">Từ {tour.departure[0]}</span>
          </div>
        </div>
        
        {/* Highlights */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {tour.highlights.slice(0, 2).map((highlight: string, index: number) => (
              <span key={index} className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                {highlight}
              </span>
            ))}
            {tour.highlights.length > 2 && (
              <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                +{tour.highlights.length - 2}
              </span>
            )}
          </div>
        </div>
        
        {/* Price & CTA */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-end justify-between mb-4">
            <div>
              {tour.originalPrice && (
                <span className="text-sm text-gray-500 line-through block">
                  {formatPrice(tour.originalPrice)} VNĐ
                </span>
              )}
              <div className="text-xl font-bold text-red-600">
                {formatPrice(tour.price)} VNĐ
              </div>
              <span className="text-xs text-gray-600">/khách</span>
            </div>
          </div>
          
          <Link
            href={`/tour-du-lich/${tour.category}/${tour.slug}`}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg text-sm font-semibold text-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Xem Chi Tiết
          </Link>
        </div>
      </div>
    </div>
  );
}
