import { visaCategories, visaDetailData } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Clock, 
  CheckCircle, 
  FileText, 
  Users, 
  Shield, 
  Star,
  Phone,
  Mail,
  MapPin,
  Award,
  TrendingUp,
  MessageCircle
} from "lucide-react";
import { VisaTabs } from "./components/VisaTabs";
import { VisaImagesGallery } from "./components/VisaImagesGallery";
import { ContactButton } from "./components/ContactButton";

// Generate static params for all country visa pages
export function generateStaticParams() {
  const params: { slug: string; country: string }[] = [];
  
  Object.entries(visaCategories).forEach(([categorySlug, category]) => {
    category.countries.forEach((country) => {
      params.push({
        slug: categorySlug,
        country: country.slug
      });
    });
  });
  
  return params;
}

interface PageProps {
  params: {
    slug: string;
    country: string;
  };
}

export default function CountryVisaPage({ params }: PageProps) {
  const categoryKey = params.slug as keyof typeof visaCategories;
  const category = visaCategories[categoryKey];
  
  if (!category) {
    notFound();
  }

  const country = category.countries.find(c => c.slug === params.country);
  
  if (!country) {
    notFound();
  }

  // Get detailed visa data  
  const visaDetailKey = categoryKey as keyof typeof visaDetailData;
  const countryData = visaDetailData[visaDetailKey];
  const visaData = countryData?.[params.country as keyof typeof countryData];
  
  if (!visaData) {
    notFound();
  }

  // Type assertion to help TypeScript
  const typedVisaData = visaData as {
    title: string;
    heroImage: string;
    successRate: string;
    processingTime: string;
    description: string;
    services: string[];
    visaTypes: any[];
    pricing: any[];
    whyChooseUs: string[];
    testimonials: any[];
    relatedArticles: any[];
    visaImages?: Array<{
      type: string;
      url: string;
      description: string;
    }>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-blue-900/90 to-blue-700/90">
        <div className="absolute inset-0">
          <Image
            src={typedVisaData.heroImage}
            alt={`Visa ${country.name}`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/40"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <nav className="mb-6">
              <div className="flex items-center gap-2 text-sm opacity-90">
                <Link href="/" className="hover:underline">Trang chủ</Link>
                <span>/</span>
                <Link href="/dich-vu" className="hover:underline">Dịch vụ</Link>
                <span>/</span>
                <Link href={`/dich-vu/${params.slug}`} className="hover:underline">{category.name}</Link>
                <span>/</span>
                <span className="text-orange-300">{country.name}</span>
              </div>
            </nav>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Dịch vụ hỗ trợ làm {typedVisaData.title}
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              {typedVisaData.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-orange-300 font-semibold">Tỷ lệ thành công</div>
                <div className="text-2xl font-bold">{typedVisaData.successRate}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-orange-300 font-semibold">Thời gian xử lý</div>
                <div className="text-2xl font-bold">{typedVisaData.processingTime}</div>
              </div>
            </div>
            
            <ContactButton
              countryName={country.name}
              visaTypes={typedVisaData.visaTypes.map(type => ({
                id: type.id,
                name: type.name
              }))}
            />
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Dịch vụ làm visa {country.name} tại VISA5S
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {typedVisaData.services.map((service: string, index: number) => (
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
                Quy trình dịch vụ làm visa {country.name} tại VISA5S
              </h2>
              <ProcessSteps />
            </div>

            {/* Visa Images Gallery */}
            {typedVisaData.visaImages && typedVisaData.visaImages.length > 0 && (
              <VisaImagesGallery 
                visaImages={typedVisaData.visaImages} 
                countryName={country.name}
              />
            )}

            {/* Tabs Section */}
            <VisaTabs 
              visaTypes={typedVisaData.visaTypes} 
              pricing={typedVisaData.pricing} 
              countryName={country.name} 
            />

            {/* Why Choose Us */}
            <WhyChooseUsSection reasons={typedVisaData.whyChooseUs} />

            {/* Testimonials */}
            <TestimonialsSection testimonials={typedVisaData.testimonials} />

            {/* Related Articles */}
            <RelatedArticlesSection articles={typedVisaData.relatedArticles} />
          </div>
        </div>
      </section>
    </div>
  );
}

// Process Steps Component
function ProcessSteps() {
  const steps = [
    {
      step: 1,
      title: "Đăng ký tư vấn (1 phút)",
      description: "Form điền thông tin đơn giản, nhanh chóng. Thông tin được bảo mật an toàn."
    },
    {
      step: 2, 
      title: "Thẩm định hồ sơ (1 ngày làm việc)",
      description: "Chuyên viên VISA5S sẽ liên hệ Quý khách để tư vấn, thẩm định hồ sơ, và đề xuất các giải pháp để tối ưu tỉ lệ đậu visa."
    },
    {
      step: 3,
      title: "Hoàn thiện hồ sơ (2-3 ngày làm việc)", 
      description: "Chuyên viên VISA5S sẽ đồng hành cùng Quý khách trong suốt quá trình chuẩn bị bộ hồ sơ xin visa đầy đủ."
    },
    {
      step: 4,
      title: "Đặt lịch hẹn",
      description: "Chuyên viên VISA5S sẽ đặt lịch hẹn nộp hồ sơ với lãnh sự quán theo mong muốn của Quý khách."
    },
    {
      step: 5,
      title: "Nộp hồ sơ và nhận kết quả",
      description: "Chuyên viên VISA5S hỗ trợ Quý khách nộp hồ sơ và cập nhật trạng thái xin visa. Ngay khi có kết quả, visa sẽ được chuyển phát tận tay Quý khách."
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {step.step}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ▶ Bước {step.step}: {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Why Choose Us Section
function WhyChooseUsSection({ reasons }: { reasons: string[] }) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Vì sao chọn VISA5S?
      </h2>
      <div className="bg-blue-50 rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-start gap-3">
              <Award className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700">{reason}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Testimonials Section
function TestimonialsSection({ testimonials }: { testimonials: any[] }) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Cảm nhận khách hàng
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">&quot;{testimonial.comment}&quot;</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Related Articles Section
function RelatedArticlesSection({ articles }: { articles: any[] }) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Kinh nghiệm du lịch và xin visa
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <Link key={index} href={article.url} className="block">
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600">
                {article.title}
              </h3>
              <div className="text-sm text-gray-500">Cập nhật: {article.date}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
