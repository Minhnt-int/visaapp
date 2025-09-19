import React from 'react';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function WhyChooseUsSection() {
  const staticReasons = [
    "Tỷ lệ đậu visa cao, đặc biệt với hồ sơ khó",
    "Đội ngũ chuyên viên trên 10 năm kinh nghiệm",
    "Tư vấn tận tâm, giải pháp tối ưu cho từng trường hợp",
    "Quy trình minh bạch, rõ ràng, không phát sinh chi phí",
    "Hỗ trợ khẩn cấp 24/7",
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 md:p-12 lg:p-16 mb-16 shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            Tại sao nên chọn <span className="text-blue-600">VISA5S</span> cho hành trình của bạn?
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Với kinh nghiệm lâu năm và đội ngũ chuyên gia tận tâm, chúng tôi cam kết mang đến dịch vụ visa và du lịch chất lượng hàng đầu, giúp bạn biến mọi giấc mơ du lịch thành hiện thực.
          </p>
          <ul className="space-y-4">
            {staticReasons.map((reason, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <span className="text-gray-800 text-lg font-medium">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 lg:order-2 relative w-full h-80 md:h-96 lg:h-full rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/images/why-choose-us.jpg" // Placeholder image
            alt="Why choose Visa5s"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
