
import { getContactInfo } from "@/lib/data";
import { Building, Phone, Mail } from 'lucide-react';
import ContactForm from "@/components/ContactForm"; // CORRECT: Import the new client component
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Liên Hệ',
    description: 'Liên hệ với VISA5S để được tư vấn và hỗ trợ các dịch vụ làm visa, tour du lịch chuyên nghiệp và nhanh chóng.',
};

// CORRECT: Converted to an async Server Component
export default async function ContactPage() {
  // CORRECT: Fetch data on the server
  const contactInfo = await getContactInfo();

  return (
    <main>
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="container mx-auto px-4 py-24 sm:py-32 text-center">
            <h1 className="text-4xl font-display font-bold tracking-tight text-white sm:text-6xl">Liên Hệ Với Chúng Tôi</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              Có câu hỏi hoặc cần tư vấn? Đừng ngần ngại liên hệ. Đội ngũ VISA5S luôn sẵn sàng hỗ trợ bạn.
            </p>
          </div>
        </div>
        
        {/* Contact Form and Info Section */}
        <div className="isolate bg-base-100">
            <div className="container mx-auto px-4 py-24 sm:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16">
                    {/* Contact Info */}
                    <div className="lg:max-w-lg">
                        <h2 className="text-3xl font-bold font-display tracking-tight text-stone-600">Thông Tin Liên Hệ</h2>
                        <p className="mt-4 text-lg leading-8 text-base-content">
                            Bạn có thể liên hệ trực tiếp với chúng tôi qua các thông tin dưới đây hoặc sử dụng biểu mẫu bên cạnh.
                        </p>
                        <dl className="mt-10 space-y-4 text-base leading-7 text-base-content">
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Address</span>
                                    <Building className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>{contactInfo.address}</dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Telephone</span>
                                    <Phone className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd><a className="hover:text-primary" href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Email</span>
                                    <Mail className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd><a className="hover:text-primary" href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></dd>
                            </div>
                        </dl>
                    </div>

                    {/* Contact Form - Now a Client Component */}
                    <ContactForm />
                </div>
            </div>
        </div>
      </main>
  );
}
