import { tourCategories } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Star, Users, DollarSign } from 'lucide-react';

type TourCategoryPageProps = {
  params: { category: string };
};

/**
 * Generate static paths cho tất cả các danh mục tour
 */
export async function generateStaticParams() {
  return Object.keys(tourCategories).map((category) => ({
    category: category,
  }));
}

/**
 * Trang danh mục tour theo châu lục
 * Hiển thị tất cả các tour trong một châu lục cụ thể
 * 
 * @param params - Tham số đường dẫn chứa category slug
 * @returns JSX Component
 */
export default function TourCategoryPage({ params }: TourCategoryPageProps) {
  const category = tourCategories[params.category as keyof typeof tourCategories];
  
  if (!category) {
    notFound();
  }

  // Lấy tất cả các tour từ tất cả các quốc gia trong châu lục
  const allTours = category.tours.flatMap(country => 
    country.destinations.map(destination => ({
      ...destination,
      countryName: country.name,
      countrySlug: country.slug,
      countryImage: country.image
    }))
  );

  return (
    <>
      <main>
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="relative isolate overflow-hidden pt-24 sm:pt-32 pb-16 sm:pb-20">
            <div className="container mx-auto px-4">
              <div className="text-center">
                <h1 className="text-4xl font-display font-bold tracking-tight text-white sm:text-6xl">
                  {category.name}
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-200 max-w-3xl mx-auto">
                  Khám phá những điểm đến tuyệt vời nhất {category.name.toLowerCase()} với các tour chất lượng cao, 
                  trải nghiệm đáng nhớ và giá cả hợp lý.
                </p>
                <div className="mt-8 flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{category.tours.length}</div>
                    <div className="text-sm text-blue-200">Quốc gia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{allTours.length}+</div>
                    <div className="text-sm text-blue-200">Tour có sẵn</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">4.8★</div>
                    <div className="text-sm text-blue-200">Đánh giá TB</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tours by Country */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            {category.tours.map((country, countryIndex) => (
              <div key={country.slug} className={countryIndex > 0 ? 'mt-20' : ''}>
                {/* Country Header */}
                <div className="mb-12">
                  <div className="flex items-center space-x-6">
                    <Image
                      src={country.image}
                      alt={country.name}
                      width={80}
                      height={80}
                      className="rounded-xl object-cover"
                    />
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{country.name}</h2>
                      <p className="text-gray-600 mt-2">
                        {country.destinations.length} tour có sẵn
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tours Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {country.destinations.map((tour) => (
                    <TourDestinationCard 
                      key={tour.slug} 
                      tour={tour} 
                      countrySlug={country.slug}
                      categorySlug={params.category}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold text-white sm:text-4xl">
              Cần Tư Vấn Về Tour {category.name}?
            </h2>
            <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
              Đội ngũ chuyên viên của chúng tôi sẵn sàng tư vấn miễn phí và tạo ra hành trình phù hợp nhất cho bạn
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/lien-he"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Liên Hệ Tư Vấn
              </Link>
              <a
                href="tel:0911909686"
                className="rounded-md bg-yellow-500 px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 transition-colors"
              >
                Gọi Ngay: 0911.909.686
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

/**
 * Component hiển thị thẻ tour destination với thông tin chi tiết
 * Bao gồm: hình ảnh, tên tour, thời gian, giá, highlights
 */
function TourDestinationCard({ 
  tour, 
  countrySlug, 
  categorySlug 
}: { 
  tour: any; 
  countrySlug: string; 
  categorySlug: string; 
}) {
  const formatPrice = (price: string) => {
    return parseInt(price).toLocaleString('vi-VN');
  };

  const discountPercent = tour.originalPrice 
    ? Math.round((1 - parseInt(tour.price) / parseInt(tour.originalPrice)) * 100)
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Giảm {discountPercent}%
        </div>
      )}
      
      {/* Tour Image */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <Image
          src={tour.image}
          alt={tour.name}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Tour Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {tour.name}
        </h3>
        
        {/* Tour Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
            <span>{tour.duration}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
            <span className="line-clamp-1">Khởi hành: {tour.departure.join(', ')}</span>
          </div>
        </div>
        
        {/* Highlights */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Điểm nổi bật:</h4>
          <div className="space-y-1">
            {tour.highlights.slice(0, 3).map((highlight: string, index: number) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <div className="w-1 h-1 bg-blue-600 rounded-full mr-2 flex-shrink-0"></div>
                <span className="line-clamp-1">{highlight}</span>
              </div>
            ))}
            {tour.highlights.length > 3 && (
              <div className="text-xs text-gray-500">
                +{tour.highlights.length - 3} điểm tham quan khác
              </div>
            )}
          </div>
        </div>
        
        {/* Price & CTA */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-end justify-between mb-4">
            <div>
              {tour.originalPrice && (
                <div className="text-sm text-gray-500 line-through">
                  {formatPrice(tour.originalPrice)} VNĐ
                </div>
              )}
              <div className="text-xl font-bold text-red-600">
                {formatPrice(tour.price)} VNĐ
              </div>
              <div className="text-xs text-gray-600">/khách</div>
            </div>
            
            <div className="text-right">
              <div className="text-xs text-gray-500">Còn chỗ</div>
              <div className="flex items-center text-sm text-green-600">
                <Users className="w-3 h-3 mr-1" />
                <span>8-12 người</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Link
              href={`/tour-du-lich/${categorySlug}/${tour.slug}`}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium text-center hover:bg-blue-700 transition-colors"
            >
              Xem Chi Tiết
            </Link>
            <Link
              href="/lien-he"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              Tư Vấn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
