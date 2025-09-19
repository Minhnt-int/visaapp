import { Tour } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Star, Clock, MapPin, ArrowRight } from "lucide-react";

// Helper to format currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export default function TourCard({ tour }: { tour: Tour }) {
  // CORRECTED: Create a summary from highlights as a description substitute.
  const descriptionSummary = tour.highlights?.map(h => h.title).join(' • ') || 'Khám phá những điểm đến hấp dẫn nhất.';

  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group overflow-hidden h-full flex flex-col">
      <Link href={`/tour-du-lich/tour/${tour.slug}`} className="block h-full flex flex-col">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={tour.image}
            alt={tour.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {tour.originalPrice && (
             <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Giảm giá
            </div>
          )}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
             <h3 className="text-white text-xl font-bold leading-tight line-clamp-2">{tour.name}</h3>
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  {/* CORRECTED: Replaced non-existent `location` with `country` */}
                  <span>{tour.country}</span>
              </div>
              <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{tour.duration}</span>
              </div>
          </div>

          <div className="mt-4 mb-4 flex-grow">
             {/* CORRECTED: Used the generated summary instead of non-existent `description` */}
             <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3">{descriptionSummary}</p>
          </div>

          <div className="mt-auto flex justify-between items-end">
            <div>
                {tour.originalPrice && (
                    <p className="text-sm text-gray-400 line-through">{formatPrice(tour.originalPrice)}</p>
                )}
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatPrice(tour.price)}</p>
            </div>
            <div className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                Chi tiết
                <ArrowRight className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
