
import { ServiceCard } from './ServiceCard'; 

const services = [
  {
    id: 1,
    slug: 'visa-du-lich',
    imageUrl: '/images/services/service-1.jpg',
    title: 'Visa Du Lịch & Thăm Thân',
    description: 'Hỗ trợ hoàn thiện hồ sơ, chứng minh tài chính, và luyện phỏng vấn để bạn có chuyến đi thuận lợi đến Mỹ, Canada, Úc và châu Âu.',
  },
  {
    id: 2,
    slug: 'visa-du-hoc',
    imageUrl: '/images/services/service-2.jpg',
    title: 'Visa Du Học & Làm Việc',
    description: 'Cung cấp giải pháp toàn diện từ việc chọn trường, chuẩn bị hồ sơ nhập học đến xin visa du học và giấy phép lao động.',
  },
  {
    id: 3,
    slug: 'dinh-cu-doanh-nhan',
    imageUrl: '/images/services/service-3.jpg',
    title: 'Định Cư & Doanh Nhân',
    description: 'Tư vấn các chương trình đầu tư, định cư diện doanh nhân tại các quốc gia phát triển, giúp bạn và gia đình an cư lạc nghiệp.',
  },
];

export default function ServiceSection() { // Changed to export default
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Dịch vụ của chúng tôi</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Chúng tôi cung cấp các giải pháp visa toàn diện, nhanh chóng và chuyên nghiệp, giúp bạn hiện thực hóa mọi kế hoạch.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
