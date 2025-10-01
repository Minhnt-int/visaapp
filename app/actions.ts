'use server';

import { postFormContact } from '@/lib/api';
import { z } from 'zod';

// A more robust schema to handle fields from both ContactForm and ContactModal
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Họ và tên là bắt buộc.' }),
  email: z.string().email({ message: 'Email không hợp lệ.' }),
  phone: z.string().min(9, { message: 'Số điện thoại phải có ít nhất 9 chữ số.' }),
  message: z.string().optional(),
  visaCountry: z.string().optional(),
  visaType: z.string().optional(),
  departureDate: z.string().optional(),
  source: z.string().optional().default('Trang liên hệ'),
}).refine(data => {
    // If the form is from the visa detail page modal, visaType is required.
    if (data.source === 'Tư vấn Visa trang dịch vụ' && !data.visaType) {
        return false;
    }
    return true;
}, {
    message: "Vui lòng chọn loại visa.",
    path: ["visaType"], // Specify the path for the error message
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
    visaType?: string[]; // Corrected type to string[]
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

  // If form validation fails, return errors with the complete FormState structure.
  if (!validatedFields.success) {
    return {
      message: 'Vui lòng kiểm tra lại thông tin.',
      errors: validatedFields.error.flatten().fieldErrors,
      isSuccess: false,      // FIX: Added missing property
      customerName: ''        // FIX: Added missing property
    };
  }

  const data = validatedFields.data;

  try {
    const apiResponse = await postFormContact(data as any);

    // Return a success state with the complete FormState structure.
    return {
      message: apiResponse?.message || 'Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.',
      errors: undefined,
      isSuccess: true,       // FIX: Added missing property
      customerName: data.name // FIX: Added missing property
    };

  } catch (error) {
    const customError = error as any;
    let errorMessage = customError.message || 'Đã có lỗi không xác định xảy ra.';
    
    // Return an error state with the complete FormState structure.
    return {
      message: errorMessage,
      errors: customError.backendDetails?.errors,
      isSuccess: false,      // FIX: Added missing property
      customerName: ''        // FIX: Added missing property
    };
  }
}