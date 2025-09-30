import React from 'react';
import { ServiceCard } from './ServiceCard';
import { VisaService } from '@/types';
import { visaCategories } from '@/lib/visa-mock-data';

interface ServiceSectionProps {
  services: VisaService[];
}

export default function ServiceSection({ services }: ServiceSectionProps) {
  return (
    <section id="dich-vu-noi-bat" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {visaCategories.map((category) => {
          const servicesForCategory = services?.filter(
            (service) => service.continentSlug === category.slug
          );

          if (servicesForCategory?.length === 0) {
            return null; // Don't render the category if there are no services
          }

          return (
            <div key={category.slug} className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {category.name}
                </h2>
                {/* <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                  {category.description}
                </p> */}
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mt-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {servicesForCategory?.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
