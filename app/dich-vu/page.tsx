import { services, visaCategories } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, DollarSign, CheckCircle, ArrowRight, Filter, Search } from 'lucide-react';
import Header from '@/components/Header';
import FooterSimple from '@/components/FooterSimple';

export default function DichVuPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Dịch Vụ <span className="text-orange-400">Visa</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Chuyên cung cấp dịch vụ xin visa uy tín cho tất cả các quốc gia với tỷ lệ thành công 99%
          </p>
        </div>
      </section>

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

      <FooterSimple />
    </main>
  );
}
