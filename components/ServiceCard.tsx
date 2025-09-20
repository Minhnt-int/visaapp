
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Tag } from 'lucide-react';
import { Service } from '@/types';

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article 
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group overflow-hidden h-full flex flex-col"
    >
      <Link href={`/dich-vu/${service.categorySlug}/${service.slug}`} className="block h-full flex flex-col">
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
           {service.successRate && (
            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              Tỷ lệ thành công: {service.successRate}
            </div>
           )}
           <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-xl font-bold line-clamp-2">
                {service.title}
              </h3>
            </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
            {service.description}
          </p>

          {service.services && service.services.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Tag className="w-4 h-4 mr-2 text-gray-500" />
                Dịch vụ bao gồm
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.services.slice(0, 3).map((item, index) => ( // Show up to 3 services for brevity
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto flex items-center text-sm font-semibold text-blue-600">
            Xem chi tiết
            <ArrowRight className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
  );
}
