import { getTours } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import TourCard from "@/components/TourCard";
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';

export default async function TourDuLichPage() {
  const toursResponse = await getTours({ limit: 100 });
  const tours = toursResponse.data;

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

      {/* Hot Tours Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Tour Nổi Bật"
            subtitle="Những hành trình được yêu thích và đánh giá cao nhất"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {tours.filter(t => t.isHot).map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* All Tours Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Tất Cả Tour Du Lịch"
            subtitle="Khám phá tất cả các hành trình chúng tôi cung cấp"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {tours.map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return await generatePageMetadata({ pageKey: 'tour', pageUrl: '/tour-du-lich', fallbackUrl: '/tour-du-lich' });
}

