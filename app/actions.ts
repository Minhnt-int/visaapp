'use server';

import { z } from 'zod';
// NEW: Import the shared logic directly instead of the API helper
import { processContactFormData } from '@/lib/contact-logic';

// A more robust schema to handle fields from both ContactForm and ContactModal
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Họ và tên là bắt buộc.' }),
  email: z.string().email({ message: 'Email không hợp lệ.' }),
  phone: z.string().min(9, { message: 'Số điện thoại phải có ít nhất 9 chữ số.' }),
  message: z.string().nullish(),
  visaCountry: z.string().nullish(),
  visaType: z.string().nullish(),
  departureDate: z.string().nullish(),
  source: z.string().optional().default('Trang liên hệ'),
}).refine(data => {
    if (data.source === 'Tư vấn Visa trang dịch vụ' && !data.visaType) {
        return false;
    }
    return true;
}, {
    message: "Vui lòng chọn loại visa.",
    path: ["visaType"], 
});


export type FormState = {
  message: string;
  isSuccess: boolean;
  customerName: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
    phone?: string[];
    visaType?: string[];
  };
};


export async function handleContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {

  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
    visaCountry: formData.get('visaCountry'),
    visaType: formData.get('visaType'),
    departureDate: formData.get('departureDate'),
    source: formData.get('source'),
  };
  
  const validatedFields = contactSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      message: 'Vui lòng kiểm tra lại thông tin.',
      errors: validatedFields.error.flatten().fieldErrors,
      isSuccess: false,
      customerName: ''
    };
  }

  try {
    // --- OPTIMIZATION --- 
    // The HTTP call (postFormContact) is replaced with a direct function call.
    // This eliminates the network request and resolves the 401 Unauthorized error.
    const apiResponse = await processContactFormData(validatedFields.data as any);

    return {
      message: apiResponse?.message || 'Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.',
      errors: undefined,
      isSuccess: true,
      customerName: validatedFields.data.name
    };

  } catch (error) {
    const customError = error as any;
    return {
      message: customError.message || 'Đã có lỗi không xác định xảy ra.',
      errors: undefined, // You might want to add more detailed errors here
      isSuccess: false,
      customerName: ''
    };
  }
}