'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Phone, Mail, User, MapPin, Calendar, MessageSquare, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { ContactFormData, submitContactForm, validateContactForm } from '@/lib/contact-api';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  countryName: string;
  visaTypes: Array<{ id: string; name: string; }>;
  onSuccess?: (customerName: string, estimatedResponseTime: string) => void;
}

export default function ContactModal({ isOpen, onClose, countryName, visaTypes, onSuccess }: ContactModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<Partial<ContactFormData>>({
    fullName: '',
    phone: '',
    email: '',
    visaCountry: countryName,
    visaType: '',
    departureDate: '',
    message: '',
    source: 'website'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      onClose();
      // Reset form state after modal closes
      setTimeout(() => {
        setSubmitStatus('idle');
        setValidationErrors([]);
        setResponseMessage('');
      }, 300);
    }
  }, [isSubmitting, onClose]);

  // Handle escape key and click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) {
        handleClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && !isSubmitting) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isSubmitting, handleClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateContactForm(formData);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setValidationErrors([]);
    setSubmitStatus('idle');

    try {
      const response = await submitContactForm(formData as ContactFormData);
      
      if (response.success) {
        setSubmitStatus('success');
        setResponseMessage(response.message);
        
        // Call onSuccess callback if provided
        if (onSuccess && response.data) {
          onSuccess(formData.fullName || '', response.data.estimatedResponseTime);
        }
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            fullName: '',
            phone: '',
            email: '',
            visaCountry: countryName,
            visaType: '',
            departureDate: '',
            message: '',
            source: 'website'
          });
          setSubmitStatus('idle');
          if (!onSuccess) {
            onClose();
          }
        }, onSuccess ? 1500 : 3000);
        
      } else {
        setSubmitStatus('error');
        setResponseMessage(response.message);
      }
    } catch (error) {
      setSubmitStatus('error');
      setResponseMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-2 sm:p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] flex flex-col relative"
      >
        {/* Header - Fixed outside overflow */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold">Đăng ký tư vấn visa {countryName}</h2>
            <p className="text-blue-100 text-sm mt-1">Chuyên viên sẽ liên hệ trong vòng 2 giờ</p>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 hover:bg-blue-700 rounded-full transition-colors disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content - Scrollable */}
        <div className="overflow-y-auto flex-1 scrollbar-thin">
          <form onSubmit={handleSubmit} className="p-6">
          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-800 font-semibold mb-2">
                <AlertCircle size={16} />
                <span>Vui lòng kiểm tra lại thông tin:</span>
              </div>
              <ul className="text-sm text-red-700 space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle size={16} />
                <span className="font-semibold">Thành công!</span>
              </div>
              <p className="text-green-700 text-sm mt-1">{responseMessage}</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle size={16} />
                <span className="font-semibold">Có lỗi xảy ra</span>
              </div>
              <p className="text-red-700 text-sm mt-1">{responseMessage}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User size={16} />
                Họ và tên *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName || ''}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                placeholder="Nhập họ và tên đầy đủ"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Phone size={16} />
                Số điện thoại *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                placeholder="0901234567"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Mail size={16} />
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ''}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                placeholder="example@email.com"
              />
            </div>

            {/* Visa Type */}
            <div>
              <label htmlFor="visaType" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} />
                Loại visa *
              </label>
              <select
                id="visaType"
                name="visaType"
                value={formData.visaType || ''}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              >
                <option value="">Chọn loại visa</option>
                {visaTypes.map(type => (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Departure Date */}
            <div className="md:col-span-2">
              <label htmlFor="departureDate" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} />
                Ngày dự kiến xuất cảnh
              </label>
              <input
                type="date"
                id="departureDate"
                name="departureDate"
                value={formData.departureDate || ''}
                onChange={handleInputChange}
                disabled={isSubmitting}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MessageSquare size={16} />
                Ghi chú thêm
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message || ''}
                onChange={handleInputChange}
                disabled={isSubmitting}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-50"
                placeholder="Ví dụ: Tôi cần tư vấn về thủ tục, hồ sơ cần thiết..."
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Đang gửi...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Gửi thông tin
                </>
              )}
            </button>
          </div>

          {/* Privacy Notice */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 leading-relaxed">
              <strong>Cam kết bảo mật:</strong> Thông tin của bạn được mã hóa và bảo vệ theo tiêu chuẩn quốc tế. 
              VISA5S cam kết không chia sẻ thông tin cá nhân với bên thứ ba. 
              Chúng tôi chỉ sử dụng thông tin để tư vấn và hỗ trợ dịch vụ visa tốt nhất.
            </p>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
