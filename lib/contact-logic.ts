'use client';
import { formContact, ApiResponse } from '@/types';

export async function processContactFormData(formData: formContact): Promise<ApiResponse> {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      status: 'success',
      message: 'Yêu cầu của bạn đã được gửi thành công! (Shared logic response)',
      data: formData,
    };
    
  } catch (error) {
    console.error('Error in processContactFormData (shared logic):', error);
    throw new Error('Đã xảy ra lỗi khi xử lý yêu cầu của bạn. (Shared logic error)');
  }
}
