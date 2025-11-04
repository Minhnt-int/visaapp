import React from 'react';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { getWhyChooseUsData, getWhyChooseUsDataByPageKey } from '@/lib/api';

interface WhyChooseUsSectionProps {
  pageKey?: string; // Optional pageKey để fetch metaJson riêng cho từng trang
}

export default async function WhyChooseUsSection({ pageKey }: WhyChooseUsSectionProps = {}) {
  // Fetch data - ưu tiên pageKey cụ thể, fallback về whyChooseUs mặc định
  let whyChooseUsData;
  
  if (pageKey) {
    // Thử fetch data cho pageKey cụ thể
    whyChooseUsData = await getWhyChooseUsDataByPageKey(pageKey);
  }
  
  // Nếu không có data cho pageKey cụ thể, dùng data mặc định
  if (!whyChooseUsData) {
    whyChooseUsData = await getWhyChooseUsData();
  }
  
  if (!whyChooseUsData || !whyChooseUsData.section) {
    return null;
  }

  const { title, description, reasons, image } = whyChooseUsData.section;

  return (
    <section className="py-8 sm:py-12 md:py-16 relative">
      <div className="container mx-auto px-4">
        {/* Main Company Info Card */}
        <div className="bg-background border border-neutral-200 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-2 sm:mb-3 md:mb-4">
              {title.includes('Kim Quy Travel') ? (
                <>
                  {title.split('Kim Quy Travel')[0]}
                  <span className="text-neutral-700">Kim Quy Travel</span>
                  {title.split('Kim Quy Travel')[1]}
                </>
              ) : (
                <>
                  {title} <span className="text-neutral-700">Kim Quy Travel</span>?
                </>
              )}
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 max-w-3xl mx-auto px-2">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <div>
              {reasons && reasons.length > 0 ? (
                <div className="space-y-2 sm:space-y-3">
                  {reasons.map((reason, index) => (
                    <div key={index} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle className="w-4 h-4 text-neutral-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700 text-xs sm:text-sm leading-relaxed">{reason}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            
            <div className="relative">
              <div className="relative rounded-lg p-3 sm:p-4 md:p-6">
                <Image 
                  src={image || "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600"} 
                  alt="Why choose Kim Quy Travel"
                  width={600}
                  height={400}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg"
                />
                <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-background border border-neutral-200 rounded-lg p-2 sm:p-3">
                  <div className="text-center">
                    <div className="text-base sm:text-lg font-semibold text-neutral-800">4.9/5</div>
                    <div className="text-xs text-neutral-600">Đánh giá khách hàng</div>
                    <div className="flex justify-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-neutral-400 rounded-full mr-0.5 sm:mr-1"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
