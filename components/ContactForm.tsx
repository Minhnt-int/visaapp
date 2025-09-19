'use client'

import { useFormState, useFormStatus } from 'react-dom';
import { handleContactForm, FormState } from '@/app/actions';
import { useEffect, useRef } from 'react';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="w-full rounded-md bg-gradient-to-r bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:opacity-50"
    >
      {pending ? 'Đang gửi...' : 'Gửi Yêu Cầu'}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(handleContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message.includes('thành công')) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
        <div>
            <label htmlFor="name" className="block text-sm font-semibold leading-6 text-stone-600">
                Họ và tên
            </label>
            <div className="mt-2.5">
                <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-base-content shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                />
                {state.errors?.name && <p className="text-sm text-red-600 mt-1">{state.errors.name.join(', ')}</p>}
            </div>
        </div>
        <div>
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-stone-600">
                Email
            </label>
            <div className="mt-2.5">
                <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-base-content shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                />
                {state.errors?.email && <p className="text-sm text-red-600 mt-1">{state.errors.email.join(', ')}</p>}
            </div>
        </div>
        <div>
            <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-stone-600">
                Số điện thoại (Không bắt buộc)
            </label>
            <div className="mt-2.5">
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-base-content shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                />
            </div>
        </div>
        <div>
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-stone-600">
                Nội dung yêu cầu
            </label>
            <div className="mt-2.5">
                <textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-base-content shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                    defaultValue={''}
                />
                {state.errors?.message && <p className="text-sm text-red-600 mt-1">{state.errors.message.join(', ')}</p>}
            </div>
        </div>
        <SubmitButton />
        {state.message && <p className={`text-sm mt-2 ${state.errors ? 'text-red-600' : 'text-green-600'}`}>{state.message}</p>}
    </form>
  );
}
