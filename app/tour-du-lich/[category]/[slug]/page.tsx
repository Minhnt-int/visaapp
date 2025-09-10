import { tourCategories } from '@/lib/data';
import { getTourDetails, TourDetailData } from '@/lib/tour-api';
import type { ItineraryDay as ApiItineraryDay } from '@/lib/tour-api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  Star, 
  Users, 
  Clock,
  Plane,
  Hotel,
  Utensils,
  Camera,
  Shield,
  Phone,
  CheckCircle,
  XCircle
} from 'lucide-react';

type TourDetailPageProps = {
  params: { 
    category: string;
    slug: string;
  };
};

/**
 * Generate static paths cho tất cả các tour chi tiết
 */
export async function generateStaticParams() {
  const paths: { category: string; slug: string }[] = [];
  
  Object.entries(tourCategories).forEach(([categorySlug, category]) => {
    category.tours.forEach(country => {
      country.destinations.forEach(destination => {
        paths.push({
          category: categorySlug,
          slug: destination.slug
        });
      });
    });
  });
  
  return paths;
}

/**
 * Trang chi tiết tour với thông tin đầy đủ
 * Bao gồm: thông tin tour, lịch trình, giá cả, chính sách, đặt tour
 * 
 * @param params - Tham số đường dẫn chứa category và slug
 * @returns JSX Component
 */
export default async function TourDetailPage({ params }: TourDetailPageProps) {
  // Lấy dữ liệu tour từ API
  let tourDetails: TourDetailData | null = null;
  
  try {
    tourDetails = await getTourDetails(params.category, params.slug);
  } catch (error) {
    console.error('Error fetching tour details:', error);
    notFound();
  }

  if (!tourDetails) {
    notFound();
  }

  // Fallback cho category name từ static data nếu cần
  const category = tourCategories[params.category as keyof typeof tourCategories];
  const categoryName = category?.name || 'Tour Du Lịch';

  const formatPrice = (price: string) => {
    return parseInt(price).toLocaleString('vi-VN');
  };

  const discountPercent = tourDetails.originalPrice 
    ? Math.round((1 - parseInt(tourDetails.price) / parseInt(tourDetails.originalPrice)) * 100)
    : 0;

  return (
    <>
      <main>
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="relative isolate overflow-hidden pt-24 sm:pt-32 pb-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Tour Info */}
                <div>
                  <div className="mb-4">
                    <Link 
                      href={`/tour-du-lich/${params.category}`}
                      className="text-blue-200 hover:text-white text-sm"
                    >
                      ← Quay lại {categoryName}
                    </Link>
                  </div>
                  
                  <h1 className="text-3xl font-display font-bold tracking-tight text-white sm:text-5xl mb-4">
                    {tourDetails.name}
                  </h1>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="ml-1 text-white">{tourDetails.rating}</span>
                    </div>
                    <span className="text-blue-200">•</span>
                    <span className="text-blue-200">{tourDetails.reviewCount} đánh giá</span>
                    <span className="text-blue-200">•</span>
                    <span className="text-blue-200">{tourDetails.country}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center text-white">
                      <Calendar className="w-5 h-5 mr-3 text-yellow-400" />
                      <span>{tourDetails.duration}</span>
                    </div>
                    <div className="flex items-center text-white">
                      <MapPin className="w-5 h-5 mr-3 text-yellow-400" />
                      <span>Khởi hành: {tourDetails.departure[0]}</span>
                    </div>
                    <div className="flex items-center text-white">
                      <Users className="w-5 h-5 mr-3 text-yellow-400" />
                      <span>{tourDetails.groupSize.min}-{tourDetails.groupSize.max} khách</span>
                    </div>
                    <div className="flex items-center text-white">
                      <Plane className="w-5 h-5 mr-3 text-yellow-400" />
                      <span>Bay thẳng</span>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    <div className="flex items-end justify-between">
                      <div>
                        {tourDetails.originalPrice && (
                          <div className="text-blue-200 line-through text-lg">
                            {formatPrice(tourDetails.originalPrice)} VNĐ
                          </div>
                        )}
                        <div className="text-3xl font-bold text-yellow-400">
                          {formatPrice(tourDetails.price)} VNĐ
                        </div>
                        <div className="text-blue-200">/ khách</div>
                      </div>
                      {discountPercent > 0 && (
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Giảm {discountPercent}%
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Tour Image */}
                <div className="relative">
                  <Image
                    src={tourDetails.image}
                    alt={tourDetails.name}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    🔥 Tour Hot
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tour Highlights */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Điểm Nổi Bật</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tourDetails.highlights.map((highlight, index) => (
                    <div key={highlight.id} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">{highlight.title}</h3>
                        <p className="text-gray-700 text-sm">{highlight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tour Itinerary */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Lịch Trình Chi Tiết</h2>
                <div className="space-y-6">
                  {tourDetails.itinerary.map((dayItem) => (
                    <ItineraryDay 
                      key={dayItem.day}
                      day={dayItem.day}
                      title={dayItem.title}
                      description={dayItem.description}
                      activities={dayItem.activities.map(act => act.activity)}
                    />
                  ))}
                </div>
              </section>

              {/* Services Included - Now Dynamic */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Dịch Vụ Bao Gồm</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Included Services */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      Bao Gồm
                    </h3>
                    <ul className="space-y-3">
                      {tourDetails.services.included.map((service) => (
                        <li key={service.id} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-gray-900 font-medium">{service.name}</span>
                            {service.description && (
                              <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Excluded Services */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <XCircle className="w-5 h-5 text-red-600 mr-2" />
                      Không Bao Gồm
                    </h3>
                    <ul className="space-y-3">
                      {tourDetails.services.excluded.map((service) => (
                        <li key={service.id} className="flex items-start">
                          <XCircle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-gray-900 font-medium">{service.name}</span>
                            {service.description && (
                              <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Terms & Conditions - Now Dynamic */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Điều Kiện & Lưu Ý</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Điều Kiện Đăng Ký</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {tourDetails.terms.registration.map((term, index) => (
                          <li key={index}>• {term}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Chính Sách Hủy Tour</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {tourDetails.terms.cancellation.map((term, index) => (
                          <li key={index}>• {term}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Booking Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 mb-8">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {formatPrice(tourDetails.price)} VNĐ
                  </div>
                  <div className="text-gray-600">/ khách</div>
                  {tourDetails.originalPrice && (
                    <div className="text-gray-500 line-through text-lg">
                      {formatPrice(tourDetails.originalPrice)} VNĐ
                    </div>
                  )}
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Thời gian:</span>
                    <span className="font-medium">{tourDetails.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Khởi hành:</span>
                    <span className="font-medium">{tourDetails.departure[0]}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Số khách:</span>
                    <span className="font-medium">8-12 người</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Link
                    href="/lien-he"
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-red-700 transition-colors block"
                  >
                    Đặt Tour Ngay
                  </Link>
                  <Link
                    href="/lien-he"
                    className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-medium text-center hover:bg-blue-50 transition-colors block"
                  >
                    Yêu Cầu Tư Vấn
                  </Link>
                  <a
                    href="tel:0911909686"
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Gọi: 0911.909.686
                  </a>
                </div>
              </div>

              {/* Why Choose Us - Now Dynamic */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tại Sao Chọn Chúng Tôi?</h3>
                <div className="space-y-4">
                  {tourDetails.whyChooseUs.map((reason) => {
                    // Icon mapping
                    const iconMap = {
                      shield: Shield,
                      star: Star,
                      check: CheckCircle,
                    };
                    const IconComponent = iconMap[reason.icon as keyof typeof iconMap] || Shield;
                    
                    return (
                      <div key={reason.id} className="flex items-start">
                        <IconComponent className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                          reason.icon === 'shield' ? 'text-blue-600' :
                          reason.icon === 'star' ? 'text-yellow-500' : 'text-green-600'
                        }`} />
                        <div>
                          <div className="font-medium text-gray-900">{reason.title}</div>
                          <div className="text-sm text-gray-600">{reason.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

/**
 * Component hiển thị từng ngày trong lịch trình tour
 */
function ItineraryDay({ 
  day, 
  title, 
  description, 
  activities 
}: { 
  day: number; 
  title: string; 
  description: string; 
  activities: string[]; 
}) {
  return (
    <div className="flex">
      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
        {day}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Hoạt động chính:</h4>
          <ul className="space-y-1">
            {activities.map((activity, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
