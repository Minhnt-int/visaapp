
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface Service {
  id: number;
  slug: string;
  imageUrl: string;
  title: string;
  description: string;
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article 
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group overflow-hidden h-full flex flex-col"
    >
      <Link href={`/dich-vu/${service.slug}`} className="block h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* Content Container */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors duration-300">
            {service.title}
          </h3>
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
