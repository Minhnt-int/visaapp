
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Service } from '@/types';

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article 
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group overflow-hidden h-full flex flex-col"
    >
      {/* CORRECTED: The link now uses categorySlug and slug for the correct routing. */}
      <Link href={`/dich-vu/${service.categorySlug}/${service.slug}`} className="block h-full flex flex-col">
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
           <div className="absolute bottom-4 left-4">
              <h3 className="text-white text-xl font-bold">
                {service.title}
              </h3>
            </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
            {service.description}
          </p>
          <div className="mt-auto flex items-center text-sm font-semibold text-blue-600">
            Xem chi tiết
            <ArrowRight className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
  );
}
