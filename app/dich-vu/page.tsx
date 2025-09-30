import { getVisaContinentPreview } from '@/lib/api'; 
import Link from 'next/link';
import { Globe } from 'lucide-react';
import ServiceSection from '@/components/ServiceSection';

export default async function DichVuPage() {
  const allServices = await getVisaContinentPreview();
  
  return (
    <>
      <main>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="relative isolate overflow-hidden pt-24 sm:pt-32 pb-24 sm:pb-32">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-4xl mx-auto">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                  <div className="relative rounded-full px-4 py-2 text-sm leading-6 text-blue-200 ring-1 ring-white/20 hover:ring-white/30">
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
                    <div className="text-sm text-blue-200">Tỷ lệ đậu visa</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">23,868</div>
                    <div className="text-sm text-blue-200">Hồ sơ thành công</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">150+</div>
                    <div className="text-sm text-blue-200">Quốc gia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">24/7</div>
                    <div className="text-sm text-blue-200">Hỗ trợ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ServiceSection services={allServices} />
      </main>
    </>
  );
}
