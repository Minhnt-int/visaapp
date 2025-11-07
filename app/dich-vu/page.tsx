import { getServices, getVisaContinents } from '@/lib/api'; 
import Link from 'next/link';
import { Globe } from 'lucide-react';
import ServiceSection from '@/components/ServiceSection';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function DichVuPage({ searchParams }: PageProps) {
  // Fetch danh sách continents từ API
  const continents = await getVisaContinents();
  
  // Lấy page từ URL params cho từng continent (format: ?chau-a-page=2&chau-au-page=1)
  // Mặc định page 1 nếu không có
  const getPageForContinent = (slug: string): number => {
    const paramKey = `${slug.replace('visa-', '')}-page`;
    const pageParam = searchParams?.[paramKey];
    return typeof pageParam === 'string' ? parseInt(pageParam) || 1 : 1;
  };
  
  // Gọi API riêng cho từng continent với page tương ứng
  // Mỗi continent lấy 6 items
  const servicesPromises = continents.map(continent => {
    const page = getPageForContinent(continent.slug);
    return getServices({
      tags: continent.slug,
      limit: 6, // 6 items per continent
      page: page
    }).then(response => ({
      continent: {
        slug: continent.slug,
        name: continent.name
      },
      services: response.data,
      pagination: {
        total: response.total,
        page: response.page || 1,
        limit: response.limit || 6,
        totalPages: response.totalPages || 1
      }
    }));
  });
  
  // Gọi tất cả API calls song song
  const continentServicesData = await Promise.all(servicesPromises);
  
  return (
    <>
      <main>
        <div className="bg-gradient-to-r from-primary to-primary-dark">
          <div className="relative isolate overflow-hidden pt-24 sm:pt-32 pb-24 sm:pb-32">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-4xl mx-auto">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                  <div className="relative rounded-full px-4 py-2 text-sm leading-6 text-primary-lightest ring-1 ring-white/20 hover:ring-white/30">
                    <Globe className="inline w-4 h-4 mr-2" />
                    Dịch vụ xin visa uy tín - Tỷ lệ đậu 99%
                  </div>
                </div>
                <h1 className="text-4xl font-display font-bold tracking-tight text-white sm:text-6xl">
                  Dịch Vụ <span className="text-yellow-400">Visa</span> Toàn Cầu
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-200 max-w-3xl mx-auto">
                  Chuyên cung cấp dịch vụ xin visa uy tín, nhanh chóng và hiệu quả hàng đầu Việt Nam. 
                  Hỗ trợ visa du lịch, công tác, thăm thân cho tất cả các quốc gia trên thế giới.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    href="#dich-vu-noi-bat"
                    className="rounded-md bg-yellow-500 px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 transition-colors"
                  >
                    Xem Dịch Vụ
                  </Link>
                  <Link href="/lien-he" className="text-sm font-semibold leading-6 text-white hover:text-yellow-400 transition-colors">
                    Tư vấn miễn phí <span aria-hidden="true">→</span>
                  </Link>
                </div>
                
                <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">99%</div>
                    <div className="text-sm text-primary-lightest">Tỷ lệ đậu visa</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">23,868</div>
                    <div className="text-sm text-primary-lightest">Hồ sơ thành công</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">150+</div>
                    <div className="text-sm text-primary-lightest">Quốc gia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">24/7</div>
                    <div className="text-sm text-primary-lightest">Hỗ trợ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ServiceSection continentServicesData={continentServicesData} />
      </main>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return await generatePageMetadata({ pageKey: 'dich-vu', pageUrl: '/dich-vu', fallbackUrl: '/dich-vu' });
}