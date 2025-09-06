import { services } from '@/lib/data';
import Header from '@/components/Header';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { icons, LucideProps, CheckCircle, ShieldCheck, Users, Rocket, ClipboardList, Send, MessageCircle } from 'lucide-react';
import Footer from '@/components/Footer';

// Define the props type for the page component
type ServiceDetailPageProps = {
  params: { slug: string };
};

// Dynamically render Lucide icon component
const Icon = ({ name, ...props }: { name: string } & LucideProps) => {
    const LucideIcon = icons[name as keyof typeof icons];
    if (!LucideIcon) return null;
    return <LucideIcon {...props} />;
};


// Generate static paths for each service
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// The data for the process steps
const processSteps = [
    {
      name: 'Bước 1: Tư Vấn & Đánh Giá',
      description: 'Chuyên viên của VisaHub sẽ liên hệ, tư vấn miễn phí và đánh giá chi tiết hồ sơ của bạn để đưa ra giải pháp tối ưu nhất.',
      icon: ClipboardList,
    },
    {
      name: 'Bước 2: Hoàn Thiện Hồ Sơ',
      description: 'Chúng tôi hướng dẫn bạn chuẩn bị và hoàn thiện các giấy tờ cần thiết một cách đầy đủ, chính xác và chuyên nghiệp.',
      icon: Send,
    },
    {
      name: 'Bước 3: Nộp Hồ Sơ & Luyện Phỏng Vấn',
      description: 'Thay mặt bạn nộp hồ sơ tại đại sứ quán và cung cấp buổi luyện phỏng vấn 1-1 để bạn tự tin đối mặt với mọi câu hỏi.',
      icon: MessageCircle,
    },
    {
      name: 'Bước 4: Nhận Kết Quả Visa',
      description: 'Chúng tôi chủ động theo dõi tình trạng hồ sơ và thông báo kết quả visa đến bạn trong thời gian sớm nhất.',
      icon: CheckCircle,
    },
]

// The data for key benefits
const benefits = [
    {
      name: 'Tỷ Lệ Đậu Cao',
      description: 'Với kinh nghiệm và quy trình tối ưu, chúng tôi tự hào mang đến tỷ lệ đậu visa cao nhất cho khách hàng.',
      icon: Rocket,
    },
    {
      name: 'Đội Ngũ Chuyên Gia',
      description: 'Đội ngũ chuyên viên giàu kinh nghiệm, am hiểu sâu sắc luật di trú và luôn cập nhật thông tin mới nhất.',
      icon: Users,
    },
    {
      name: 'Bảo Mật Thông Tin',
      description: 'Mọi thông tin cá nhân và hồ sơ của bạn đều được chúng tôi cam kết bảo mật tuyệt đối.',
      icon: ShieldCheck,
    },
]

// Component to render the service details
export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Banner */}
        <div className="bg-primary">
            <div className="relative isolate overflow-hidden pt-24 sm:pt-32 pb-24 sm:pb-32">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-blue-200 ring-1 ring-white/20 hover:ring-white/30">
                                Dịch vụ chuyên nghiệp - Tỷ lệ đậu cao
                            </div>
                        </div>
                        <Icon name={service.icon} size={64} strokeWidth={1.5} className="text-secondary mx-auto mb-4" />
                        <h1 className="text-4xl font-display font-bold tracking-tight text-white sm:text-6xl">{service.title}</h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">{service.description}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="overflow-hidden bg-base-100 py-24 sm:py-32">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-secondary">Đối Tác Tin Cậy</h2>
                            <p className="mt-2 text-3xl font-display font-bold tracking-tight text-primary sm:text-4xl">Tại Sao Nên Chọn VisaHub?</p>
                            <p className="mt-6 text-lg leading-8 text-base-content">
                                Với nhiều năm kinh nghiệm, chúng tôi hiểu rõ các yêu cầu phức tạp và luôn cập nhật những thay đổi mới nhất từ các đại sứ quán.
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-base-content lg:max-w-none">
                                {benefits.map((benefit) => (
                                    <div key={benefit.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-primary">
                                            <benefit.icon className="absolute left-1 top-1 h-5 w-5 text-secondary" aria-hidden="true" />
                                            {benefit.name}
                                        </dt>
                                        {' '}
                                        <dd className="inline">{benefit.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <div className="sm:order-first lg:order-last">
                       <Image
                          src="/images/why-choose-us.jpg"
                          alt="Đội ngũ chuyên viên VisaHub"
                          className="w-full max-w-none rounded-2xl shadow-2xl ring-1 ring-gray-400/10"
                          width={600}
                          height={800}
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Process Section */}
        <div className="bg-base-200 py-24 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-secondary">Minh Bạch & Rõ Ràng</h2>
              <p className="mt-2 text-3xl font-display font-bold tracking-tight text-primary sm:text-4xl">
                Quy Trình 4 Bước Chuyên Nghiệp
              </p>
              <p className="mt-6 text-lg leading-8 text-base-content">
                Chúng tôi đơn giản hóa quy trình xin visa phức tạp thành 4 bước rõ ràng, giúp bạn dễ dàng theo dõi và chuẩn bị.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                {processSteps.map((step) => (
                  <div key={step.name} className="flex flex-col items-center text-center p-6 bg-base-100 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-primary">
                      <step.icon className="h-8 w-8 flex-none text-secondary" aria-hidden="true" />
                      {step.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-base-content">
                      <p className="flex-auto">{step.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-secondary">
          <div className="container mx-auto px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
                Sẵn Sàng Chinh Phục Giấc Mơ Của Bạn?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
                Đừng để thủ tục visa phức tạp cản bước bạn. Hãy để đội ngũ chuyên gia của VisaHub đồng hành và biến ước mơ của bạn thành hiện thực.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/lien-he"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
      <Footer />
    </>
  );
}
