import { getTours } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import TourCard from "@/components/TourCard";
import { Pagination } from "@/components/Pagination";
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function TourDuLichPage({ searchParams }: PageProps) {
  const currentPage = typeof searchParams?.page === 'string' ? parseInt(searchParams.page) : 1;
  const limit = 12; // 12 tours per page
  
  // Fetch chỉ đủ data cho trang hiện tại
  // Trang 1: Hot tours (6) + Regular tours (12) = 18 items
  // Trang > 1: Chỉ regular tours (12 items)
  const [toursResponse, hotToursResponse] = await Promise.all([
    getTours({ 
      limit,
      page: currentPage,
      isHot: false // Regular tours cho trang hiện tại
    }),
    currentPage === 1 ? getTours({ 
      limit: 6,
      page: 1,
      isHot: true // Chỉ fetch hot tours cho trang 1
    }) : Promise.resolve({ data: [], totalPages: 0, page: 1, limit: 6, total: 0 })
  ]);
  
  const tours = toursResponse.data;
  const totalPages = toursResponse.totalPages || 1;
  const hotTours = currentPage === 1 ? hotToursResponse.data : [];
  
  // Remove hot tours from all tours list on page 1 to avoid duplicates
  const displayedTours = currentPage === 1 
    ? tours.filter(tour => !hotTours.some(hot => hot.id === tour.id))
    : tours;

  // Structured data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Tour Du Lịch - Kim Quy Travel",
    "description": "Khám phá những hành trình tuyệt vời với tour du lịch chất lượng cao từ Kim Quy Travel",
    "url": "https://kimquytravel.vn/tour-du-lich",
    "mainEntity": { 
      "@type": "ItemList",
      "numberOfItems": tours.length,
      "itemListElement": tours.map((tour, index) => ({
        "@type": "TouristTrip",
        "position": index + 1,
        "name": tour.name,
        "description": tour.metaDescription || tour.highlights?.map((h: any) => h.title || (typeof h === 'string' ? h : '')).filter(Boolean).join('. ') || 'Tour du lịch hấp dẫn',
        "url": `https://kimquytravel.vn/tour-du-lich/${tour.slug}`,
        "image": tour.image,
        "offers": {
          "@type": "Offer",
          "price": tour.price,
          "priceCurrency": "VND",
          "availability": "https://schema.org/InStock"
        }
      }))
    }
  };

  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Hero Section */}
      <section className="relative bg-cover bg-center py-32 text-white" style={{ backgroundImage: "url('/images/tours/hero-bg.jpg')" }}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">Khám Phá Thế Giới</h1>
              <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">Những hành trình tuyệt vời đang chờ đón bạn. Trải nghiệm văn hóa, ẩm thực và những cảnh quan ngoạn mục.</p>
          </div>
      </section>

      {/* Hot Tours Section - Only show on first page */}
      {currentPage === 1 && hotTours.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Tour Nổi Bật"
              subtitle="Những hành trình được yêu thích và đánh giá cao nhất"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {hotTours.map(tour => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Tours Section */}
      <section className={`py-16 md:py-24 ${currentPage === 1 && hotTours.length > 0 ? '' : 'pt-0'}`}>
        <div className="container mx-auto px-4">
          <SectionTitle
            title={currentPage === 1 ? "Tất Cả Tour Du Lịch" : `Tour Du Lịch - Trang ${currentPage}`}
            subtitle={currentPage === 1 
              ? "Khám phá tất cả các hành trình chúng tôi cung cấp"
              : `Trang ${currentPage} trong tổng số ${totalPages} trang`
            }
          />
          
          {displayedTours.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">Không tìm thấy tour nào.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {displayedTours.map(tour => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination 
                  totalPages={totalPages} 
                  basePath="/tour-du-lich" 
                />
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return await generatePageMetadata({ pageKey: 'tour', pageUrl: '/tour-du-lich', fallbackUrl: '/tour-du-lich' });
}

