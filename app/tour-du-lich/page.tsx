
import Link from 'next/link';
import { Plane, Clock, Star, Users, DollarSign } from 'lucide-react';
import { TourCard } from '@/components/TourCard';
import { CategoryCard } from '@/components/CategoryCard';
import { WhyChooseUsCard } from '@/components/WhyChooseUsCard';
import { Pagination } from '@/components/Pagination';
import { tourCategories } from '@/lib/data';

const TOURS_PER_PAGE = 12; // Cập nhật limit theo yêu cầu

// Hàm fetch dữ liệu tour từ API
async function getTours(page: number, limit: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tours?page=${page}&limit=${limit}`, {
    cache: 'no-store', 
  });

  if (!res.ok) {
    throw new Error('Failed to fetch tours');
  }

  return res.json();
}


export default async function TourDuLichPage({ searchParams }: { searchParams?: { page?: string } }) {
  const currentPage = Number(searchParams?.page) || 1;
  const toursData = await getTours(currentPage, TOURS_PER_PAGE);

  const paginatedTours = toursData.data;
  const totalPages = toursData.totalPages;

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
                        href="#all-tours"
                        className="rounded-md bg-yellow-500 px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 transition-colors"
                    >
                        Xem Tất Cả Tour
                    </Link>
                    <Link href="/lien-he" className="text-sm font-semibold leading-6 text-white hover:text-yellow-400 transition-colors">
                        Tư vấn miễn phí <span aria-hidden="true">→</span>
                    </Link>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* All Tours Section */}
        <section id="all-tours" className="py-24 sm:py-32 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Tất Cả Tour</h2>
              <p className="mt-2 text-3xl font-display font-bold tracking-tight text-gray-900 sm:text-4xl">
                Khám Phá Hành Trình Của Bạn
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Duyệt qua danh sách các tour du lịch đa dạng của chúng tôi và tìm kiếm chuyến đi hoàn hảo cho bạn.
              </p>
            </div>
            
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {paginatedTours.map((tour: any) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
            
            <Pagination totalPages={totalPages} basePath="/tour-du-lich" />

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
            
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
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
