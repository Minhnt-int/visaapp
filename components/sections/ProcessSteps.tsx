'use client';

import React from 'react';
import { CheckCircle, FileText, Users, TrendingUp } from 'lucide-react';

interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
}

const StepItem: React.FC<ProcessStepProps> = ({
  step, title, description, icon: Icon, iconColor
}) => (
  <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm border border-neutral-200">
    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${iconColor} bg-opacity-20`}>
      <Icon className={`w-8 h-8 ${iconColor}`} />
    </div>
    <h3 className="text-xl font-semibold text-foreground mb-2">Bước {step}: {title}</h3>
    <p className="text-neutral-600 text-sm leading-relaxed">{description}</p>
  </div>
);

export default function ProcessSteps() {
  const steps = [
    {
      step: 1,
      title: "Tư vấn và Đánh giá hồ sơ",
      description: "Chuyên viên của Kim Quy Travel sẽ tư vấn, phân tích điểm mạnh, yếu trong hồ sơ của bạn.",
      icon: FileText,
      iconColor: "text-primary",
    },
    {
      step: 2,
      title: "Hoàn thiện giấy tờ",
      description: "Hướng dẫn chi tiết, điền đơn, sắp xếp và dịch thuật công chứng các giấy tờ cần thiết.",
      icon: Users,
      iconColor: "text-accent-green",
    },
    {
      step: 3,
      title: "Luyện phỏng vấn",
      description: "Hướng dẫn chi tiết cách trả lời phỏng vấn, tạo sự tự tin trước Lãnh sự quán (nếu có yêu cầu).",
      icon: TrendingUp,
      iconColor: "text-accent-orange",
    },
    {
      step: 4,
      title: "Nhận kết quả Visa",
      description: "Theo dõi tình trạng hồ sơ và hỗ trợ nhận lại hộ chiếu cùng visa sau khi có kết quả.",
      icon: CheckCircle,
      iconColor: "text-accent-purple",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((step) => (
        <StepItem key={step.step} {...step} />
      ))}
    </div>
  );
}
