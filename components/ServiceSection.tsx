import React from 'react';
import { ServiceCard } from './ServiceCard';
import { VisaService } from '@/types';
import { ContinentPagination } from './ContinentPagination';

interface ContinentServicesData {
  continent: {
    slug: string;
    name: string;
  };
  services: VisaService[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface ServiceSectionProps {
  continentServicesData: ContinentServicesData[];
}

export default function ServiceSection({ continentServicesData }: ServiceSectionProps) {
  return (
    <section id="dich-vu-noi-bat" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {continentServicesData.map(({ continent, services, pagination }) => {
          if (services?.length === 0) {
            return null; // Don't render the category if there are no services
          }

          return (
            <div key={continent.slug} id={continent.slug} className="mb-16 scroll-mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {continent.name}
                </h2>
                {/* <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                  {category.description}
                </p> */}
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mt-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services?.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              {/* Pagination cho từng continent */}
              <ContinentPagination
                totalPages={pagination.totalPages}
                continentSlug={continent.slug}
                currentPage={pagination.page}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
