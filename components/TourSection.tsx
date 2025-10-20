
import Link from 'next/link';
import { Plane } from 'lucide-react';
import TourCard from '@/components/TourCard'; // Corrected import
import { getTours } from '@/lib/api';

/**
 * Component hiển thị section tour du lịch nổi bật trên trang chủ
 * Hiển thị 4 tour hot nhất với thiết kế card đẹp mắt
 *
 * @returns JSX Component
 */
export default async function TourSection() {
  const toursResponse = await getTours({ limit: 100, isHot: true });
  const allTours = toursResponse.data;
  const hotTours = allTours.filter(tour => tour.isHot).slice(0, 4);

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
