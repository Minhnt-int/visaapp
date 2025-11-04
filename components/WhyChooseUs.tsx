import { ShieldCheck } from 'lucide-react';
import { getWhyChooseUsData } from '@/lib/api';

export default async function WhyChooseUs() {
  const whyChooseUsData = await getWhyChooseUsData();
  
  if (!whyChooseUsData || !whyChooseUsData.process) {
    return null;
  }

  const { title, description, steps } = whyChooseUsData.process;

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        
          <div className="text-center mb-12">
            <div className="inline-block bg-primary-lightest text-primary rounded-full px-4 py-2 mb-4">
              <ShieldCheck className="inline-block w-6 h-6 mr-2" />
              <span className="font-semibold text-sm">Nhanh chóng - Minh bạch - Tận tâm</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {title.includes('minh bạch') ? (
                <>
                  Quy trình <span className="text-primary">minh bạch</span>
                </>
              ) : (
                title
              )}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          </div>
  
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps && steps.length > 0 ? (
                steps.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group h-full">
                      {/* Step Number */}
                      <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        {index + 1}
                      </div>
  
                      <div className="mt-4">
                        <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-500">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : null}
            </div>
          </div>
        
      </div>
    </section>
  );
}
