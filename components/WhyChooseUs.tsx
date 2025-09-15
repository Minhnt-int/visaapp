
import { CheckCircle, ShieldCheck, Users, TrendingUp } from 'lucide-react';

const processSteps = [
  {
    title: "Tư vấn & Thẩm định",
    description: "Lắng nghe nhu cầu, phân tích điểm mạnh yếu và đưa ra giải pháp visa tối ưu.",
  },
  {
    title: "Hoàn thiện hồ sơ",
    description: "Hướng dẫn chi tiết, dịch thuật công chứng và sắp xếp hồ sơ logic, khoa học.",
  },
  {
    title: "Luyện phỏng vấn",
    description: "Chia sẻ kinh nghiệm, thực hành 1-1 giúp bạn tự tin trả lời các câu hỏi của Lãnh sự.",
  },
  {
    title: "Đồng hành & Hỗ trợ",
    description: "Theo dõi kết quả, hỗ trợ nhận visa và cung cấp lời khuyên trước khi bay.",
  },
];


export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-4">
              <ShieldCheck className="inline-block w-6 h-6 mr-2" />
              <span className="font-semibold text-sm">Nhanh chóng - Minh bạch - Tận tâm</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Quy trình <span className="text-blue-600">minh bạch</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hồ sơ được xử lý một cách chuyên nghiệp và nhanh chóng
            </p>
          </div>
  
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connection Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-blue-200 to-transparent z-10"></div>
                  )}
                  
                  <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group h-full">
                    {/* Step Number */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      {index + 1}
                    </div>
  
                    <div className="mt-4">
                      <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-500">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        
      </div>
    </section>
  );
}
