'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Clock, Users, Award } from 'lucide-react';

interface SuccessNotificationProps {
  isVisible: boolean;
  customerName: string;
  estimatedTime: string;
  onClose: () => void;
}

export default function SuccessNotification({ isVisible, customerName, estimatedTime, onClose }: SuccessNotificationProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            onClose();
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl border border-green-200 p-6 max-w-sm z-[70] animate-slide-up">
      {/* Success Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="font-bold text-green-900">Thành công!</h3>
          <p className="text-sm text-green-700">Yêu cầu đã được gửi</p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="mb-4">
        <p className="text-sm text-gray-700">
          Xin chào <span className="font-semibold">{customerName}</span>,
        </p>
        <p className="text-sm text-gray-600">
          Chuyên viên sẽ liên hệ trước <span className="font-semibold text-blue-600">{estimatedTime}</span>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <Clock className="w-4 h-4 text-blue-600 mx-auto mb-1" />
          <div className="text-xs font-semibold text-blue-900">&lt; 2h</div>
          <div className="text-xs text-blue-700">Phản hồi</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <Award className="w-4 h-4 text-green-600 mx-auto mb-1" />
          <div className="text-xs font-semibold text-green-900">99.2%</div>
          <div className="text-xs text-green-700">Thành công</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Đang xử lý...</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Tự động đóng sau {Math.ceil((100 - progress) / 20)} giây
      </p>
    </div>
  );
}
