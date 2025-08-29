'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Họ và tên là bắt buộc.' }),
  email: z.string().email({ message: 'Email không hợp lệ.' }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'Nội dung yêu cầu phải có ít nhất 10 ký tự.' }),
});

export type FormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

export async function handleContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Validate form using Zod
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  });

  // If form validation fails, return errors
  if (!validatedFields.success) {
    return {
      message: 'Vui lòng kiểm tra lại thông tin.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate sending data to the server
  console.log('Form data received:');
  console.log(validatedFields.data);
  
  // In a real application, you would:
  // 1. Send an email notification
  // 2. Save the data to a database
  
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  // Return a success message
  return { message: 'Yêu cầu của bạn đã được gửi thành công! Chúng tôi sẽ liên hệ lại sớm nhất có thể.' };
}
