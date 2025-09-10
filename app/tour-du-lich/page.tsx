import { featuredTours, tourCategories } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Plane, Clock, Star, Users, MapPin, Calendar, DollarSign } from 'lucide-react';

/**
 * Trang chủ Tour du lịch - hiển thị các tour nổi bật và danh mục tour
 * Bao gồm: Hero section, Featured tours, Tour categories, Why choose us
 * 
 * @returns JSX Component
 */
export default function TourDuLichPage() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="relative isolate overflow-hidden pt-24 sm:pt-32 pb-24 sm:pb-32">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-4xl mx-auto">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                  <div className="relative rounded-full px-4 py-2 text-sm leading-6 text-blue-200 ring-1 ring-white/20 hover:ring-white/30">
                    <Plane className="inline w-4 h-4 mr-2" />
                    Tour du lịch trọn gói - Trải nghiệm đẳng cấp
                  </div>
                </div>
                <h1 className="text-4xl font-display font-bold tracking-tight text-white sm:text-6xl">
                  Tour Du Lịch <span className="text-yellow-400">Thế Giới</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-200 max-w-3xl mx-auto">
                  Khám phá thế giới cùng Visa5s với các tour du lịch chất lượng cao, 
                  từ Châu Á đến Châu Âu, Châu Mỹ và Châu Đại Dương. 
                  Visa + Tour trọn gói, giá tốt nhất thị trường.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    href="#featured-tours"
                    className="rounded-md bg-yellow-500 px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 transition-colors"
                  >
                    Xem Tour Hot
                  </Link>
                  <Link href="/lien-he" className="text-sm font-semibold leading-6 text-white hover:text-yellow-400 transition-colors">
                    Tư vấn miễn phí <span aria-hidden="true">→</span>
                  </Link>
                </div>
                
                {/* Stats */}
                <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">500+</div>
                    <div className="text-sm text-blue-200">Tour đã tổ chức</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">15,000+</div>
                    <div className="text-sm text-blue-200">Khách hàng</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">50+</div>
                    <div className="text-sm text-blue-200">Điểm đến</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">4.9★</div>
                    <div className="text-sm text-blue-200">Đánh giá</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Tours Section */}
        <section id="featured-tours" className="py-24 sm:py-32 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Tour Nổi Bật</h2>
              <p className="mt-2 text-3xl font-display font-bold tracking-tight text-gray-900 sm:text-4xl">
                Điểm Đến Ưa Thích Nhất
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Những tour du lịch được khách hàng yêu thích và đánh giá cao nhất trong năm 2025
              </p>
            </div>
            
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {featuredTours.slice(0, 6).map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link
                href="#tour-categories"
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                Xem Tất Cả Tour
              </Link>
            </div>
          </div>
        </section>

        {/* Tour Categories Section */}
        <section id="tour-categories" className="py-24 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Điểm Đến</h2>
              <p className="mt-2 text-3xl font-display font-bold tracking-tight text-gray-900 sm:text-4xl">
                Tour Theo Châu Lục
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Chọn điểm đến yêu thích của bạn và khám phá những trải nghiệm tuyệt vời
              </p>
            </div>
            
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              {Object.entries(tourCategories).map(([categorySlug, category]) => (
                <CategoryCard key={categorySlug} categorySlug={categorySlug} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-blue-600 py-24 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
                Tại Sao Chọn Tour Của Chúng Tôi?
              </h2>
              <p className="mt-6 text-lg leading-8 text-blue-100">
                Với kinh nghiệm nhiều năm, chúng tôi cam kết mang đến những chuyến đi đáng nhớ nhất
              </p>
            </div>
            
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
              <WhyChooseUsCard 
                icon={<Clock className="h-8 w-8" />}
                title="Tiết Kiệm Thời Gian"
                description="Visa + Tour trọn gói, không cần lo lắng về thủ tục"
              />
              <WhyChooseUsCard 
                icon={<DollarSign className="h-8 w-8" />}
                title="Giá Tốt Nhất"
                description="Cam kết giá tour tốt nhất thị trường, không phí ẩn"
              />
              <WhyChooseUsCard 
                icon={<Users className="h-8 w-8" />}
                title="Hướng Dẫn Viên"
                description="Đội ngũ HDV chuyên nghiệp, nhiệt tình"
              />
              <WhyChooseUsCard 
                icon={<Star className="h-8 w-8" />}
                title="Chất Lượng Cao"
                description="Khách sạn 4-5 sao, nhà hàng chất lượng"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold text-gray-900 sm:text-4xl">
              Sẵn Sàng Cho Chuyến Đi Tiếp Theo?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Liên hệ ngay để được tư vấn miễn phí và nhận ưu đãi đặc biệt
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/lien-he"
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                Liên Hệ Tư Vấn
              </Link>
              <a
                href="tel:0911909686"
                className="rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors"
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
 * Component hiển thị thẻ tour với thông tin cơ bản
 * Bao gồm: hình ảnh, tiêu đề, giá, điểm đánh giá, nút xem chi tiết
 */
function TourCard({ tour }: { tour: any }) {
  const formatPrice = (price: string) => {
    return parseInt(price).toLocaleString('vi-VN');
  };

  const discountPercent = tour.originalPrice 
    ? Math.round((1 - parseInt(tour.price) / parseInt(tour.originalPrice)) * 100)
    : 0;

  return (
    <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* Hot Badge */}
      {tour.isHot && (
        <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          🔥 HOT
        </div>
      )}
      
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <div className="absolute top-4 right-4 z-10 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
          -{discountPercent}%
        </div>
      )}
      
      {/* Tour Image */}
      <div className="aspect-[16/10] overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.name}
          width={400}
          height={250}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Tour Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-3">
          {tour.name}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {tour.description}
        </p>
        
        {/* Tour Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-blue-600" />
            {tour.duration}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-blue-600" />
            Khởi hành: {tour.departure.join(', ')}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Star className="w-4 h-4 mr-2 text-yellow-500 fill-current" />
            {tour.rating} ({tour.reviewCount} đánh giá)
          </div>
        </div>
        
        {/* Highlights */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {tour.highlights.slice(0, 3).map((highlight: string, index: number) => (
              <span key={index} className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                {highlight}
              </span>
            ))}
            {tour.highlights.length > 3 && (
              <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                +{tour.highlights.length - 3} khác
              </span>
            )}
          </div>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between">
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
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Xem Chi Tiết
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Component hiển thị danh mục tour theo châu lục
 */
function CategoryCard({ categorySlug, category }: { categorySlug: string; category: any }) {
  return (
    <Link 
      href={`/tour-du-lich/${categorySlug}`}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <Image
          src={category.tours[0]?.image || '/images/placeholder-tour.jpg'}
          alt={category.name}
          width={600}
          height={375}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
        <p className="text-blue-100 mb-4">
          {category.tours.length} tour có sẵn
        </p>
        <div className="inline-flex items-center text-white font-medium">
          Khám phá ngay <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
}

/**
 * Component hiển thị lý do chọn tour
 */
function WhyChooseUsCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-blue-500 rounded-lg text-white">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-blue-100">{description}</p>
    </div>
  );
}
