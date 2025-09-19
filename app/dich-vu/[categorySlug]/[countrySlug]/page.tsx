import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

// CORRECTED: Import paths and types are now correct.
import { getAllServices, getVisaDetailById, getVisaCategoryBySlug } from "@/lib/data";
import { VisaDetail } from "@/types";

// Import new components
import { ContactButton } from "./component/ContactButton";
import ProcessSteps from "@/components/sections/ProcessSteps";
import { VisaImagesGallery } from "@/components/sections/VisaImagesGallery";
import { VisaTabs } from "@/components/sections/VisaTabs";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import RelatedArticlesSection from "@/components/sections/RelatedArticlesSection";

interface PageProps {
  params: {
    categorySlug: string; 
    countrySlug: string;   
  };
}

// CORRECTED: generateStaticParams now uses the modern, efficient getAllServices function.
export async function generateStaticParams() {
    const services = await getAllServices();
    return services.map(service => ({
        categorySlug: service.categorySlug,
        countrySlug: service.slug,
    }));
}

// CORRECTED: Data fetching logic is now simplified and uses the correct functions.
export default async function VisaCountryDetailPage({ params }: PageProps) {
  const visaDetail = await getVisaDetailById(params.countrySlug);
  const category = await getVisaCategoryBySlug(params.categorySlug);
  
  // The country name is now derived from the visa detail data itself.
  const countryName = visaDetail?.title.replace("Visa", "").trim() || "";

  if (!category || !visaDetail) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-800">
        <div className="lg:grid lg:grid-cols-2 lg:max-w-7xl lg:mx-auto">
            {/* Image Column */}
            <div className="relative h-80 lg:h-full lg:col-start-2">
                <Image
                    src={visaDetail.heroImage}
                    alt={`Visa ${countryName}`}
                    layout="fill"
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content Column */}
            <div className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24 lg:col-start-1 lg:row-start-1">
                <div className="max-w-lg mx-auto lg:max-w-none lg:mx-0">
                    <nav className="mb-6">
                        <div className="flex items-center gap-2 text-sm text-white opacity-90">
                            <Link href="/" className="hover:underline">Trang chủ</Link>
                            <span>/</span>
                            <Link href="/dich-vu" className="hover:underline">Dịch vụ</Link>
                            <span>/</span>
                            <Link href={`/dich-vu/${category.slug}`} className="hover:underline">{category.name}</Link>
                            <span>/</span>
                            <span className="text-orange-300">{countryName}</span>
                        </div>
                    </nav>
                    
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
                        {visaDetail.title}
                    </h1>
                    <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                        {visaDetail.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                            <div className="text-orange-300 font-semibold">Tỷ lệ thành công</div>
                            <div className="text-2xl font-bold text-white">{visaDetail.successRate}</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                            <div className="text-orange-300 font-semibold">Thời gian xử lý</div>
                            <div className="text-2xl font-bold text-white">{visaDetail.processingTime}</div>
                        </div>
                    </div>
                    
                    <ContactButton
                        countryName={countryName}
                        visaTypes={visaDetail.visaTypes.map(type => ({
                            id: type.id,
                            name: type.name
                        }))}
                    />
                </div>
            </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Dịch vụ làm visa {countryName} tại VISA5S
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {visaDetail.services.map((service: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Process Steps */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Quy trình dịch vụ làm visa {countryName} tại VISA5S
              </h2>
              <ProcessSteps />
            </div>

            {/* Visa Images Gallery */}
            {visaDetail.visaImages && visaDetail.visaImages.length > 0 && (
              <VisaImagesGallery 
                visaImages={visaDetail.visaImages} 
                countryName={countryName}
              />
            )}

            {/* Tabs Section */}
            <VisaTabs 
              visaTypes={visaDetail.visaTypes} 
              pricing={visaDetail.pricing} 
              countryName={countryName} 
            />

            {/* Why Choose Us */}
            <WhyChooseUsSection />

            {/* Testimonials */}
            <TestimonialsSection testimonials={visaDetail.testimonials} />

            {/* Related Articles */}
            <RelatedArticlesSection articles={visaDetail.relatedArticles} />
          </div>
        </div>
      </section>
    </div>
  );
}
