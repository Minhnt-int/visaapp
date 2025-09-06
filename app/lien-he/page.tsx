'use client'

import { useFormState, useFormStatus } from 'react-dom';
import Header from "@/components/Header";
import FooterSimple from "@/components/FooterSimple";
import { contactInfo } from "@/lib/data";
import { handleContactForm, FormState } from '@/app/actions';
import { Building, Phone, Mail } from 'lucide-react';
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
      className="w-full rounded-md bg-secondary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:opacity-50"
    >
      {pending ? 'Đang gửi...' : 'Gửi Yêu Cầu'}
    </button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useFormState(handleContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message.includes('thành công')) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <div className="bg-primary">
          <div className="container mx-auto px-4 py-24 sm:py-32 text-center">
            <h1 className="text-4xl font-display font-bold tracking-tight text-white sm:text-6xl">Liên Hệ Với Chúng Tôi</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              Có câu hỏi hoặc cần tư vấn? Đừng ngần ngại liên hệ. Đội ngũ VisaHub luôn sẵn sàng hỗ trợ bạn.
            </p>
          </div>
        </div>
        
        {/* Contact Form and Info Section */}
        <div className="isolate bg-base-100">
            <div className="container mx-auto px-4 py-24 sm:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16">
                    {/* Contact Info */}
                    <div className="lg:max-w-lg">
                        <h2 className="text-3xl font-bold font-display tracking-tight text-primary">Thông Tin Liên Hệ</h2>
                        <p className="mt-4 text-lg leading-8 text-base-content">
                            Bạn có thể liên hệ trực tiếp với chúng tôi qua các thông tin dưới đây hoặc sử dụng biểu mẫu bên cạnh.
                        </p>
                        <dl className="mt-10 space-y-4 text-base leading-7 text-base-content">
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Address</span>
                                    <Building className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>123 Đường ABC, Phường 1, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Telephone</span>
                                    <Phone className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd><a className="hover:text-primary" href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Email</span>
                                    <Mail className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd><a className="hover:text-primary" href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></dd>
                            </div>
                        </dl>
                    </div>

                    {/* Contact Form */}
                    <form ref={formRef} action={formAction} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold leading-6 text-primary">
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
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-primary">
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
                            <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-primary">
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
                            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-primary">
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
                </div>
            </div>
        </div>
      </main>
      <FooterSimple />
    </>
  );
}
