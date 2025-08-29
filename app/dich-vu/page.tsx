import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services } from "@/lib/data";
import Link from "next/link";
import { icons, LucideProps } from 'lucide-react';

// Dynamically render Lucide icon component
const Icon = ({ name, ...props }: { name: string } & LucideProps) => {
    const LucideIcon = icons[name as keyof typeof icons];
    if (!LucideIcon) return null;
    return <LucideIcon {...props} />;
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <div className="bg-primary text-white">
          <div className="container mx-auto px-4 py-24 sm:py-32 text-center">
            <h1 className="text-4xl font-display font-bold tracking-tight text-white sm:text-6xl">Tất Cả Dịch Vụ Của Chúng Tôi</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              Từ visa du lịch đến giấy phép lao động, chúng tôi cung cấp một loạt các dịch vụ chuyên nghiệp để đáp ứng mọi nhu cầu của bạn.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="bg-base-200">
            <div className="container mx-auto px-4 py-24 sm:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                         <div key={index} className="group relative flex flex-col items-center text-center bg-base-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-white">
                                    <Icon name={service.icon} size={40} strokeWidth={1.5} />
                                </div>
                            </div>
                            <h3 className="mt-6 text-2xl font-display font-bold text-primary">{service.title}</h3>
                            <p className="mt-4 text-base-content/80 flex-grow">{service.description}</p>
                            <Link href={`/dich-vu/${service.slug}`} className="mt-6 font-semibold text-secondary hover:text-secondary/80 transition-colors self-center">
                                Xem chi tiết <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
