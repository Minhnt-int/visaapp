
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Star } from 'lucide-react';

export function TourCard({ tour }: { tour: any }) {
  const formatPrice = (price: string) => {
    if (isNaN(parseInt(price))) {
      return price;
    }
    return parseInt(price).toLocaleString('vi-VN');
  };

  const discountPercent = tour.originalPrice 
    ? Math.round((1 - parseInt(tour.price) / parseInt(tour.originalPrice)) * 100)
    : 0;
  
  const tourName = tour.name || tour.title || "Tên tour không xác định";
  const tourDescription = tour.description || "Chưa có mô tả cho tour này.";
  const tourHighlights = tour.highlights || [];
  const tourDeparture = tour.departure || [];
  
  return (
    <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group h-full flex flex-col">
      <div className='flex flex-col h-full'>
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {tour.isHot && (
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                🔥 HOT
            </div>
            )}
            {discountPercent > 0 && (
            <div className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                -{discountPercent}%
            </div>
            )}
        </div>
        
        {/* Tour Image */}
        <div className="aspect-[16/10] overflow-hidden">
          <Image
            src={tour.image}
            alt={tourName}
            width={400}
            height={250}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Tour Info */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-3">
            {tourName}
          </h3>
          
          <p className="text-sm text-gray-600 line-clamp-3 mb-4">
            {tourDescription}
          </p>
          
          {/* Tour Details */}
          <div className="space-y-2 mb-4">
            {tour.duration && (
                <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                    {tour.duration}
                </div>
            )}
            {tourDeparture.length > 0 && (
                <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                    Khởi hành: {tourDeparture.join(', ')}
                </div>
            )}
            {tour.rating && (
                <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 mr-2 text-yellow-500 fill-current flex-shrink-0" />
                    {tour.rating} ({tour.reviewCount || tour.reviews || 0} đánh giá)
                </div>
            )}
          </div>
          
          {/* Highlights */}
          {tourHighlights.length > 0 && (
            <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                {tourHighlights.slice(0, 3).map((highlight: string, index: number) => (
                    <span key={index} className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                    {highlight}
                    </span>
                ))}
                {tourHighlights.length > 3 && (
                    <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    +{tourHighlights.length - 3} khác
                    </span>
                )}
                </div>
            </div>
          )}
          
          {/* Price & CTA - push to bottom */}
          <div className="mt-auto flex items-end justify-between">
            <div>
              {tour.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(tour.originalPrice)} VNĐ
                </span>
              )}
              <div className="text-lg font-bold text-red-600">
                {formatPrice(tour.price)} VNĐ
              </div>
              <span className="text-xs text-gray-600">/khách</span>
            </div>
            
            <Link
              href={`/tour-du-lich/${tour.category}/${tour.slug}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex-shrink-0"
            >
              Xem Chi Tiết
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
