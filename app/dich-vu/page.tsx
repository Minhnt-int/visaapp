import { services, visaCategories } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, DollarSign, CheckCircle, ArrowRight, Globe, Star, Users } from 'lucide-react';

/**
 * Trang dịch vụ chính - hiển thị tất cả dịch vụ visa theo châu lục
 * Thiết kế theo phong cách của Visana.vn với các section: Hero, Categories, Featured services
 * 
 * @returns JSX Component
 */
export default function DichVuPage() {
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
                
                {/* Stats */}
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

      {/* Services by Category */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {Object.entries(visaCategories).map(([key, category]) => (
            <div key={key} className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {category.name}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.countries.map((country) => (
                  <div key={country.slug} className="group">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={country.image}
                          alt={`Visa ${country.name}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <h3 className="text-white text-xl font-bold">
                            Visa {country.name}
                          </h3>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Các loại visa:</h4>
                          <div className="flex flex-wrap gap-2">
                            {country.visaTypes.map((type, index) => (
                              <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>

                        <Link 
                          href={`/dich-vu/visa-${country.slug}`}
                          className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 group"
                        >
                          <span>Xem Chi Tiết</span>
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tất Cả Dịch Vụ Visa
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Danh sách đầy đủ các dịch vụ visa được cung cấp với giá cả minh bạch
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Ưu đãi
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign size={16} className="text-green-500" />
                      <span className="text-gray-700 font-semibold">{service.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={16} className="text-blue-500" />
                      <span className="text-gray-700">{service.processingTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-gray-700">Tỷ lệ đậu 99%</span>
                    </div>
                  </div>

                  <Link 
                    href={`/dich-vu/${service.slug}`}
                    className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 group"
                  >
                    <span>Đặt Dịch Vụ</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      </main>
    </>
  );
}
