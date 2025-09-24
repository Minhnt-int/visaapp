import { getAllTours, getTourCategories } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import TourCard from "@/components/TourCard";

export default async function TourDuLichPage() {
  const tours = await getAllTours();
  const categories = await getTourCategories();

  return (
    <main className="bg-gray-50 dark:bg-gray-900">
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

      {/* Tour Categories Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
            <SectionTitle
                title="Điểm Đến Trong Mơ"
                subtitle="Chọn một hành trình phù hợp với sở thích của bạn"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
            {categories.map(category => (
                <Link key={category.slug} href={`/tour-du-lich/${category.slug}`} className="block group relative rounded-xl overflow-hidden aspect-w-1 aspect-h-1 md:aspect-w-3 md:aspect-h-4">
                    <Image 
                        src={category.imageUrl || "/placeholder.jpg"}
                        alt={category.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 md:p-6">
                        <h3 className="text-white text-xl md:text-2xl font-bold">{category.name}</h3>
                        <p className="text-white/80 text-sm mt-1">{category.description}</p>
                    </div>
                </Link>
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

