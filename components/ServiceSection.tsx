import React from 'react';
import { ServiceCard } from './ServiceCard';
import { getAllServices } from '@/lib/data'; 

// This is a Server Component, it fetches its own data.
export default async function ServiceSection() { 
  const services = await getAllServices();

  return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Dịch vụ nổi bật</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Chúng tôi cung cấp các giải pháp visa toàn diện, nhanh chóng và chuyên nghiệp cho các điểm đến hàng đầu thế giới.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Safely slice the array after ensuring it exists */}
            {services && services.slice(0, 3).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    );
  }
