
import { getAllTours, getTourBySlug, getTourCategories } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Star,
  Phone,
  CheckCircle,
  XCircle,
  Users,
  Plane,
  Shield
} from 'lucide-react';

type TourDetailPageProps = {
  params: {
    categorySlug: string;
    tourSlug: string;
  };
};

interface ItineraryDayProps {
  day: string;
  title: string;
  description: string;
  activities: string[];
}

const ItineraryDay = ({ day, title, description, activities }: ItineraryDayProps) => {
  return (
    <div className="border-l-4 border-blue-500 pl-6 py-2">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{day}: {title}</h3>
      <p className="text-gray-700 mb-3">{description}</p>
      {activities && activities.length > 0 && (
        <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
          {activities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export async function generateStaticParams() {
  const allTours = await getAllTours();
  return allTours.map((tour) => ({
    categorySlug: tour.categorySlug,
    tourSlug: tour.slug,
  }));
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const tourDetails = await getTourBySlug(params.tourSlug);

  if (!tourDetails) {
    notFound();
  }

  const tourCategories = await getTourCategories();
  const category = tourCategories.find(c => c.slug === params.categorySlug);

  const formatPrice = (price: number | undefined) => {
    if (price === undefined) return 'Đang cập nhật';
    return price.toLocaleString('vi-VN');
  };

  const discountPercent = tourDetails.originalPrice && tourDetails.price
    ? Math.round((1 - tourDetails.price / tourDetails.originalPrice) * 100)
    : 0;

  const categoryName = category?.name || "";

  return (
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
                      href={`/tour-du-lich/${params.categorySlug}`}
                      className="text-blue-200 hover:text-white text-sm"
                    >
                      ← Quay lại {categoryName}
                    </Link>
                  </div>

                  <h1 className="text-3xl font-display font-bold tracking-tight text-white sm:text-5xl mb-4">
                    {tourDetails.name || 'Tên tour đang cập nhật'}
                  </h1>

                  <div className="flex items-center flex-wrap space-x-4 mb-6">
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="ml-1 text-white">{tourDetails.rating || 'N/A'}</span>
                    </div>
                    <span className="text-blue-200">•</span>
                    <span className="text-blue-200">{tourDetails.reviewCount || 0} đánh giá</span>
                    <span className="text-blue-200">•</span>
                    <span className="text-blue-200">{tourDetails.country || 'Đang cập nhật'}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center text-white">
                      <Calendar className="w-5 h-5 mr-3 text-yellow-400" />
                      <span>{tourDetails.duration || 'Đang cập nhật'}</span>
                    </div>
                    <div className="flex items-center text-white">
                      <MapPin className="w-5 h-5 mr-3 text-yellow-400" />
                      <span>Khởi hành: {tourDetails.departure && tourDetails.departure.length > 0 ? tourDetails.departure[0] : 'Đang cập nhật'}</span>
                    </div>
                    <div className="flex items-center text-white">
                      <Users className="w-5 h-5 mr-3 text-yellow-400" />
                      <span>{tourDetails.groupSize ? `${tourDetails.groupSize.min}-${tourDetails.groupSize.max} khách` : 'Đang cập nhật'}</span>
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
                  {tourDetails.image ? (
                    <Image
                      src={tourDetails.image || 'https://via.placeholder.com/1200x800'}
                      alt={tourDetails.name || 'Hình ảnh tour'}
                      width={600}
                      height={400}
                      className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                      priority
                    />
                  ) : (
                    <div className="w-full h-96 bg-gray-300 rounded-2xl shadow-2xl flex items-center justify-center">
                      <span className="text-gray-500">Ảnh đang cập nhật</span>
                    </div>
                  )}
                  {tourDetails.isHot && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      🔥 Tour Hot
                    </div>
                  )}
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
                  {tourDetails.highlights && tourDetails.highlights.length > 0 ? (
                    tourDetails.highlights.map((highlight) => (
                      <div key={highlight.id} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">{highlight.title}</h3>
                          <p className="text-gray-700 text-sm">{highlight.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">Thông tin điểm nổi bật đang được cập nhật.</p>
                  )}
                </div>
              </section>

              {/* Photo Gallery Section */}
              {tourDetails.gallery && tourDetails.gallery.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Thư Viện Ảnh</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {tourDetails.gallery.map((image, index) => (
                      <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <Image
                          src={image}
                          alt={`Hình ảnh tour ${index + 1}`}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Tour Itinerary */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Lịch Trình Chi Tiết</h2>
                <div className="space-y-6">
                  {tourDetails.itinerary && tourDetails.itinerary.length > 0 ? (
                    tourDetails.itinerary.map((dayItem) => (
                      <ItineraryDay
                        key={dayItem.day}
                        day={dayItem.day}
                        title={dayItem.title}
                        description={dayItem.description}
                        activities={dayItem.activities ? dayItem.activities.map(act => act.activity) : []}
                      />
                    ))
                  ) : (
                     <p className="text-gray-600">Thông tin lịch trình đang được cập nhật.</p>
                  )}
                </div>
              </section>

              {/* Services Included & Excluded */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Dịch Vụ</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      Bao Gồm
                    </h3>
                    {tourDetails.services?.included && tourDetails.services.included.length > 0 ? (
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
                    ) : (
                      <p className="text-gray-600">Chưa có thông tin.</p>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <XCircle className="w-5 h-5 text-red-600 mr-2" />
                      Không Bao Gồm
                    </h3>
                    {tourDetails.services?.excluded && tourDetails.services.excluded.length > 0 ? (
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
                    ) : (
                       <p className="text-gray-600">Chưa có thông tin.</p>
                    )}
                  </div>
                </div>
              </section>

              {/* Terms & Conditions */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Điều Kiện & Lưu Ý</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Điều Kiện Đăng Ký</h4>
                      {tourDetails.terms?.registration && tourDetails.terms.registration.length > 0 ? (
                        <ul className="space-y-2 text-sm text-gray-600">
                          {tourDetails.terms.registration.map((term, index) => (
                            <li key={index}>• {term}</li>
                          ))}
                        </ul>
                      ): (
                         <p className="text-gray-600">Chưa có thông tin.</p>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Chính Sách Hủy Tour</h4>
                      {tourDetails.terms?.cancellation && tourDetails.terms.cancellation.length > 0 ? (
                        <ul className="space-y-2 text-sm text-gray-600">
                          {tourDetails.terms.cancellation.map((term, index) => (
                            <li key={index}>• {term}</li>
                          ))} 
                        </ul>
                      ): (
                         <p className="text-gray-600">Chưa có thông tin.</p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
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
                    <span className="font-medium">{tourDetails.duration || 'Đang cập nhật'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Khởi hành:</span>
                    <span className="font-medium">{tourDetails.departure && tourDetails.departure.length > 0 ? tourDetails.departure[0] : 'Đang cập nhật'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Số khách:</span>
                    <span className="font-medium">{tourDetails.groupSize ? `${tourDetails.groupSize.min}-${tourDetails.groupSize.max} người` : 'Đang cập nhật'}</span>
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

              {/* Why Choose Us */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tại Sao Chọn Chúng Tôi?</h3>
                {tourDetails.whyChooseUs && tourDetails.whyChooseUs.length > 0 ? (
                  <div className="space-y-4">
                    {tourDetails.whyChooseUs.map((reason) => {
                      const iconMap = { shield: Shield, star: Star, check: CheckCircle };
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
                ) : (
                  <p className="text-gray-600">Thông tin lý do chọn chúng tôi đang được cập nhật.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}
