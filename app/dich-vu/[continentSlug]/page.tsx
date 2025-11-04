import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight
} from "lucide-react";
import { getVisaContinentBySlug } from "@/lib/api"; // CORRECTED: Import modern data fetching functions
import { getServices } from "@/lib/api"; // CORRECTED: Import modern data fetching functions
import { ServiceCard } from "@/components/ServiceCard";
import { VisaService } from "@/types";
import type { Metadata } from 'next';
import { getPageMetaFromBackend } from '@/lib/seo';
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import WhyChooseUs from "@/components/WhyChooseUs";



interface PageProps {
  params: { continentSlug: string };
}

// CORRECTED: Converted to async component to fetch its own data.
export default async function VisaContinentPage({ params }: PageProps) {
  const continentPreview = await getVisaContinentBySlug(params.continentSlug);

  if (!continentPreview) {
    notFound();
  }

  // CORRECTED: Fetch all services and filter by the current continenty slug.
  const categoryServices = await getServices({tags: params.continentSlug});
  const categoryServicesData = categoryServices.data;
  
  return (
    <main>
      {/* Breadcrumb */}
      <nav className="flex py-4 container mx-auto px-4" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div>
              <a href="/dich-vu" className="text-gray-400 hover:text-gray-500">
                 <ChevronRight className="h-5 w-5 flex-shrink-0 text-gray-400 rotate-180" aria-hidden="true" />
                 <span className="sr-only">Dịch vụ Visa</span>
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <span className="ml-4 text-sm font-medium text-gray-500">{continentPreview.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-dark">
          <div className="relative isolate overflow-hidden pt-24 sm:pt-32 pb-24 sm:pb-32">
              <div className="container mx-auto px-4 text-center">
                  <div className="max-w-3xl mx-auto">
                      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-primary-lightest ring-1 ring-white/20 hover:ring-white/30">
                              Dịch vụ chuyên nghiệp - Tỷ lệ đậu cao
                          </div>
                      </div>
                      <h1 className="text-4xl font-display font-bold tracking-tight text-white sm:text-6xl">{continentPreview.name}</h1>
                      <p className="mt-6 text-lg leading-8 text-gray-300">{continentPreview.description}</p>
                  </div>
              </div>
          </div>
      </div>

      {/* List of Visas for this category */}
      {categoryServicesData.length > 0 && (
        <section className="py-16 md:py-24 bg-base-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Các quốc gia thuộc {continentPreview.name}</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Chúng tôi cung cấp dịch vụ visa cho các quốc gia hàng đầu trong khu vực {continentPreview.name}.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryServicesData.map((visaService: VisaService) => (
                <ServiceCard key={visaService.id} service={visaService} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <WhyChooseUsSection pageKey={`dich-vu-${params.continentSlug}`} />

      {/* Process Section */}
      <WhyChooseUs />

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
              Sẵn Sàng Chinh Phục Giấc Mơ Của Bạn?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-lightest">
              Đừng để thủ tục visa phức tạp cản bước bạn. Hãy để đội ngũ chuyên gia của Kim Quy Travel đồng hành và biến ước mơ của bạn thành hiện thực.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/lien-he"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Nhận Tư Vấn Ngay
              </Link>
              <Link href="/dich-vu" className="text-sm font-semibold leading-6 text-white">
                Xem tất cả dịch vụ <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const url = `/dich-vu/${params.continentSlug}`;
  const key = `dich-vu-${params.continentSlug}`;
  const backendMeta = await getPageMetaFromBackend({ pageKey: key, pageUrl: url });
  
  if (!backendMeta) {
    return {};
  }
  
  return {
    title: backendMeta.title,
    description: backendMeta.description,
    keywords: backendMeta.keywords,
    openGraph: {
      title: backendMeta.ogTitle || backendMeta.title,
      description: backendMeta.ogDescription || backendMeta.description,
      images: backendMeta.ogImage ? [{ url: backendMeta.ogImage }] : undefined,
      url: backendMeta.pageUrl,
      type: 'website',
    },
    alternates: { canonical: backendMeta.pageUrl },
  } as Metadata;
}
