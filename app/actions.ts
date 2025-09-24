'use server';

import { postFormContact } from '@/lib/api';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Họ và tên là bắt buộc.' }),
  email: z.string().email({ message: 'Email không hợp lệ.' }),
  phone: z.string().optional(), // Giả định phone là tùy chọn
  message: z.string().min(10, { message: 'Nội dung yêu cầu phải có ít nhất 10 ký tự.' }),
});
export type FormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
    phone?: string[];
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
    // Logic này đã đúng để trả về lỗi validation
    return {
      message: 'Vui lòng kiểm tra lại thông tin.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Nếu validation thành công, tiếp tục xử lý form (gửi API, v.v.)
  console.log('Form data is valid:');
  console.log(validatedFields.data);

  // --- Tiếp tục logic xử lý form khi validation thành công ---

  // Lấy dữ liệu đã validate
  const data = validatedFields.data;

  // **Thay đổi ở đây:** Thay vì gọi fetch API ở đây, bạn nên gọi hàm API
  // mà bạn đã tạo ở lib/api.ts (ví dụ: postFormContact)

  try {
    // Gọi hàm API POST form liên hệ (đã dùng Axios bên trong)
    // Sử dụng dữ liệu đã validate
    const apiResponse = await postFormContact(data); // Gọi API

    // Giả định postFormContact trả về { message: string } khi thành công (hoặc formContactResponseData)

    // Trả về state thành công cho useFormState
    return {
      message: apiResponse?.message || 'Yêu cầu của bạn đã được gửi thành công!',
      // Không có errors khi thành công
      errors: undefined,
    };

  } catch (error) {
    // Xử lý lỗi khi gọi API
    const customError = error as any; // Ép kiểu để truy cập thuộc tính custom

    let errorMessage = customError.message || 'Đã xảy ra lỗi không xác định khi gửi form.';
    let validationErrors: FormState['errors'] = undefined; // Để lưu lỗi validation chi tiết từ backend

    // Kiểm tra nếu lỗi từ backend có chứa chi tiết lỗi validation
    if (customError.backendDetails?.errors) {
         // Giả định backend trả về lỗi validation có cấu trúc tương tự Zod errors
         // { field1: ["msg1", "msg2"], field2: ["msg"] }
         validationErrors = customError.backendDetails.errors as FormState['errors'];
         // Cập nhật message nếu backend trả về message cụ thể cho lỗi validation
         if (customError.backendDetails.message) {
             errorMessage = customError.backendDetails.message;
         } else {
             // Nếu backend không có message chung cho validation error
             errorMessage = 'Vui lòng kiểm tra lại các trường thông tin.';
         }
         console.error('Backend Validation Errors:', customError.backendDetails.errors);
    } else {
        // Nếu không có chi tiết lỗi validation từ backend, chỉ dùng message lỗi chung
        console.error('API Error Details:', customError);
    }


    // Trả về state lỗi cho useFormState
    return {
      message: errorMessage,
      errors: validationErrors, // Trả về lỗi validation từ backend (nếu có)
    };
  }

  // Xóa logic fetch API gốc và return result cũ
  // console.log('Form data received:');
  // console.log(validatedFields.data);
  // let result;
  // try {
  //   // Gọi API endpoint /api/contact
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData), // Gửi dữ liệu form dưới dạng JSON
  //   });

  //   result = await response.json();

  // } catch (error) {

  //   console.error('Fetch Error:', error);
  // }
  // // In a real application, you would:
  // // 1. Send an email notification
  // // 2. Save the data to a database

  // // Return a success message
  // return result; // Đây là điểm cần sửa, không trả về trực tiếp result từ fetch API gốc
}