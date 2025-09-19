
import Image from 'next/image';
import Link from 'next/link';
import { TourCategory } from '@/types'; // CORRECTED: Import type

/**
 * Component hiển thị danh mục tour theo châu lục
 */
// CORRECTED: Update props to use TourCategory type
export function CategoryCard({ category }: { category: TourCategory }) {
  return (
    <Link 
      href={`/tour-du-lich/${category.slug}`}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <Image
          // Use the image of the first tour in the category as the background
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
