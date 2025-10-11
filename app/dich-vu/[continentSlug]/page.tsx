import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Briefcase, UserCheck, Award, ClipboardCheck,
  MessageSquare, FileText, CalendarCheck, CheckCircle} from "lucide-react";
import { getVisaContinentBySlug } from "@/lib/api"; // CORRECTED: Import modern data fetching functions
import { getServices } from "@/lib/api"; // CORRECTED: Import modern data fetching functions
import { ServiceCard } from "@/components/ServiceCard";
import { VisaService } from "@/types";

// CORRECTED: benefits is now a local constant, not an export.
const benefits = [
  {
    name: "Kinh nghiệm chuyên sâu",
    description: "Đội ngũ chuyên viên với hơn 10 năm kinh nghiệm xử lý hàng nghìn hồ sơ visa thành công.",
    icon: Briefcase,
  },
  {
    name: "Tư vấn 1-1 tận tâm",
    description: "Mỗi khách hàng nhận được sự tư vấn cá nhân hóa, tối ưu hóa hồ sơ theo từng trường hợp cụ thể.",
    icon: UserCheck,
  },
  {
    name: "Tỷ lệ thành công vượt trội",
    description: "Cam kết tỷ lệ đậu visa cao, ngay cả với những hồ sơ khó hoặc đã từng bị từ chối.",
    icon: Award,
  },
  {
    name: "Quy trình minh bạch",
    description: "Toàn bộ quy trình từ chuẩn bị hồ sơ đến phỏng vấn đều được công khai, rõ ràng.",
    icon: ClipboardCheck,
  },
];

// CORRECTED: processSteps data is now local to this component as it's no longer globally available.
const processSteps = [
    {
        name: 'Tư vấn & Thẩm định',
        description: 'Chuyên viên của chúng tôi sẽ đánh giá hồ sơ, tư vấn giải pháp tối ưu và các giấy tờ cần thiết.',
        icon: MessageSquare,
    },
    {
        name: 'Hoàn thiện hồ sơ',
        description: 'Hướng dẫn chi tiết, hỗ trợ dịch thuật và công chứng để hoàn thiện bộ hồ sơ theo chuẩn Đại sứ quán.',
        icon: FileText,
    },
    {
        name: 'Nộp & Theo dõi',
        description: 'Thay mặt bạn nộp hồ sơ, đặt lịch hẹn và theo dõi sát sao tiến trình xử lý.',
        icon: CalendarCheck,
    },
    {
        name: 'Nhận kết quả',
        description: 'Thông báo kết quả và trao trả visa tận tay cho khách hàng.',
        icon: CheckCircle,
    },
];


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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="relative isolate overflow-hidden pt-24 sm:pt-32 pb-24 sm:pb-32">
              <div className="container mx-auto px-4 text-center">
                  <div className="max-w-3xl mx-auto">
                      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-blue-200 ring-1 ring-white/20 hover:ring-white/30">
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
      <div className="overflow-hidden bg-base-100 py-24 sm:py-32">
          <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
                  <div className="lg:pr-4">
                      <div className="lg:max-w-lg">
                          <h2 className="text-base font-semibold leading-7 text-gray-600">Đối Tác Tin Cậy</h2>
                          <p className="mt-2 text-3xl font-display font-bold tracking-tight text-gray-600 sm:text-4xl">Tại Sao Nên Chọn Visa5s?</p>
                          <p className="mt-6 text-lg leading-8 text-base-content">
                              Với nhiều năm kinh nghiệm, chúng tôi hiểu rõ các yêu cầu phức tạp và luôn cập nhật những thay đổi mới nhất từ các đại sứ quán. Chất lượng dịch vụ là ưu tiên hàng đầu, đảm bảo mỗi khách hàng đều hài lòng với kết quả nhận được.
                          </p>
                          <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-base-content lg:max-w-none">
                              {benefits.map((benefit) => (
                                  <div key={benefit.name} className="relative pl-9">
                                      <dt className="inline font-semibold text-gray-600">
                                          <benefit.icon className="absolute left-1 top-1 h-5 w-5 text-gray-600" aria-hidden="true" />
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
                        alt="Đội ngũ chuyên viên Visa5s"
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
            <h2 className="text-base font-semibold leading-7 text-gray-600">Minh Bạch & Rõ Ràng</h2>
            <p className="mt-2 text-3xl font-display font-bold tracking-tight text-gray-600 sm:text-4xl">
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
                  <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-600">
                    <step.icon className="h-8 w-8 flex-none text-gray-600" aria-hidden="true" />
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
      <div className="bg-gradient-to-r from-blue-400 to-indigo-400">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
              Sẵn Sàng Chinh Phục Giấc Mơ Của Bạn?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Đừng để thủ tục visa phức tạp cản bước bạn. Hãy để đội ngũ chuyên gia của Visa5s đồng hành và biến ước mơ của bạn thành hiện thực.
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
