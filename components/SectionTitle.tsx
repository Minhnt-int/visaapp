import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface SectionTitleProps {
  title: string;
  subtitle?: string; // Đã đổi tên từ 'description' thành 'subtitle'
  icon?: LucideIcon;
  iconColor?: string;
  textColor?: string;
  align?: 'left' | 'center' | 'right';
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle, // Đã đổi tên từ 'description' thành 'subtitle'
  icon: Icon,
  iconColor = 'text-blue-600',
  textColor = 'text-gray-900',
  align = 'center',
}) => {
  const textAlignClass = `text-${align}`;
  const marginClass = align === 'center' ? 'mx-auto' : '';

  return (
    <div className={`${textAlignClass} mb-12 ${marginClass} max-w-2xl`}>
      {Icon && (
        <div className="flex items-center justify-center mb-4">
          <Icon className={`h-8 w-8 ${iconColor} mr-3`} />
          <h2 className={`text-base font-semibold leading-7 ${iconColor}`}>
            {title}
          </h2>
        </div>
      )}
      {!Icon && (
        <h2 className={`text-3xl font-display font-bold tracking-tight ${textColor} sm:text-4xl mb-6`}>
          {title}
        </h2>
      )}
      {subtitle && ( // Đã đổi tên từ 'description' thành 'subtitle'
        <p className="mt-4 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
