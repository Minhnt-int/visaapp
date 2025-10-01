'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { handleContactForm, FormState } from '@/app/actions';
import { X, Phone, Mail, User, MapPin, Calendar, MessageSquare, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

function ModalSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {pending ? (
        <><Loader2 size={16} className="animate-spin" /> Đang gửi...</>
      ) : (
        <><Send size={16} /> Gửi thông tin</>
      )}
    </button>
  );
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  countryName: string;
  visaTypes: Array<{ id: string; name: string; }>;
  // FIX: Reverted signature to match parent component's expectation
  onSuccess?: (customerName: string, responseTime: string) => void; 
}

const initialState: FormState = { 
  message: '', 
  errors: undefined, 
  isSuccess: false,
  customerName: ''
};

export default function ContactModal({ isOpen, onClose, countryName, visaTypes, onSuccess }: ContactModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(handleContactForm, initialState);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (state.isSuccess) {
      if (onSuccess && state.customerName) {
        // FIX: Pass both arguments as expected by the parent component
        onSuccess(state.customerName, "2 giờ làm việc");
      }
      const timer = setTimeout(() => {
        formRef.current?.reset();
        handleClose();
      }, 500); // Short delay before closing
      return () => clearTimeout(timer);
    }
  }, [state, onSuccess, handleClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && handleClose();
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-2 sm:p-4">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] flex flex-col relative">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold">Đăng ký tư vấn visa {countryName}</h2>
            <p className="text-blue-100 text-sm mt-1">Chuyên viên sẽ liên hệ trong vòng 2 giờ</p>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-blue-700 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 scrollbar-thin">
          <form ref={formRef} action={formAction} className="p-6">
            <input type="hidden" name="visaCountry" value={countryName} />
            <input type="hidden" name="source" value="Tư vấn Visa trang dịch vụ" />

            {state.isSuccess ? (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
                <h3 className="text-xl font-semibold text-green-800">Gửi yêu cầu thành công!</h3>
                <p className="text-green-700 text-sm mt-2">Cảm ơn bạn, {state.customerName}. {state.message}</p>
              </div>
            ) : (
              <>
                {state.errors && (
                   <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                     <div className="flex items-center gap-2 text-red-800 font-semibold mb-2">
                       <AlertCircle size={16} />
                       <span>Vui lòng kiểm tra lại thông tin:</span>
                     </div>
                     <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
                       {Object.values(state.errors).flat().map((error, index) => <li key={index}>{error}</li>)}
                     </ul>
                   </div>
                )}
                {state.message && !state.errors && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 flex items-center gap-2">
                        <AlertCircle size={16} />
                        <span>{state.message}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name-modal" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><User size={16} />Họ và tên *</label>
                      <input type="text" id="name-modal" name="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Nhập họ và tên đầy đủ" />
                    </div>
                    <div>
                      <label htmlFor="phone-modal" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><Phone size={16} />Số điện thoại *</label>
                      <input type="tel" id="phone-modal" name="phone" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="0901234567" />
                    </div>
                    <div>
                      <label htmlFor="email-modal" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><Mail size={16} />Email *</label>
                      <input type="email" id="email-modal" name="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="example@email.com" />
                    </div>
                    <div>
                      <label htmlFor="visaType-modal" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><MapPin size={16} />Loại visa *</label>
                      <select id="visaType-modal" name="visaType" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">Chọn loại visa</option>
                        {visaTypes.map(type => (<option key={type.id} value={type.name}>{type.name}</option>))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="departureDate-modal" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><Calendar size={16} />Ngày dự kiến xuất cảnh</label>
                      <input type="date" id="departureDate-modal" name="departureDate" min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="message-modal" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><MessageSquare size={16} />Ghi chú thêm</label>
                      <textarea id="message-modal" name="message" rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Ví dụ: Tôi cần tư vấn về thủ tục, hồ sơ cần thiết..."></textarea>
                    </div>
                </div>
              </>
            )}

            {!state.isSuccess && (
                <div className="mt-8 flex gap-4">
                    <button type="button" onClick={handleClose} className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Hủy bỏ</button>
                    <ModalSubmitButton />
                </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Cam kết bảo mật:</strong> Thông tin của bạn được mã hóa và bảo vệ. VISA5S cam kết không chia sẻ thông tin cá nhân và chỉ sử dụng để tư vấn dịch vụ tốt nhất.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
