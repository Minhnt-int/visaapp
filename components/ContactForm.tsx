'use client'

import { useFormState, useFormStatus } from 'react-dom';
import { handleContactForm, FormState } from '@/app/actions';
import { useEffect, useRef, useState } from 'react';
import SuccessNotification from './SuccessNotification';

const initialState: FormState = {
  message: '',
  errors: undefined,
  isSuccess: false,
  customerName: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
    >
      {pending ? 'Đang gửi...' : 'Gửi Yêu Cầu'}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(handleContactForm, initialState);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.isSuccess) {
      formRef.current?.reset();
      setShowSuccessModal(true);
    }
  }, [state]);

  return (
    <>
      <form ref={formRef} action={formAction} className="space-y-6">
          {/* Hidden field for source */}
          <input type="hidden" name="source" value="Trang liên hệ" />

          <div>
              <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-700">Họ và tên *</label>
              <div className="mt-2.5">
                  <input type="text" name="name" id="name" autoComplete="name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                  {state.errors?.name && <p className="text-sm text-red-600 mt-1">{state.errors.name.join(', ')}</p>}
              </div>
          </div>
          <div>
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-700">Email *</label>
              <div className="mt-2.5">
                  <input type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                  {state.errors?.email && <p className="text-sm text-red-600 mt-1">{state.errors.email.join(', ')}</p>}
              </div>
          </div>
          <div>
              <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-700">Số điện thoại *</label>
              <div className="mt-2.5">
                  <input type="tel" name="phone" id="phone" autoComplete="tel" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                  {state.errors?.phone && <p className="text-sm text-red-600 mt-1">{state.errors.phone.join(', ')}</p>}
              </div>
          </div>
          <div>
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-700">Nội dung yêu cầu</label>
              <div className="mt-2.5">
                  <textarea name="message" id="message" rows={4} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" defaultValue={''} />
                  {state.errors?.message && <p className="text-sm text-red-600 mt-1">{state.errors.message.join(', ')}</p>}
              </div>
          </div>
          <SubmitButton />
          {state.message && !state.isSuccess && <p className="text-sm text-red-600 mt-2">{state.message}</p>}
      </form>
      
      {/* FIX: Corrected props to match SuccessNotification component */}
      <SuccessNotification
        isVisible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        customerName={state.customerName || 'Quý khách'}
        estimatedTime="2 giờ làm việc"
      />
    </>
  );
}
