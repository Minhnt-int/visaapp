'use client';
import { formContact, ApiResponse } from '@/types';

/**
 * The core logic for processing contact form data.
 * This can be reused by both API Routes and Server Actions.
 * @param formData The validated form data.
 * @returns A promise that resolves to an ApiResponse.
 */
export async function processContactFormData(formData: formContact): Promise<ApiResponse> {
  try {
    console.log('Processing contact form data (shared logic):', formData);

    // --- This is where you would handle the real backend logic ---
    // 1. Send notification emails
    // 2. Save the data to a database
    // ---------------------------------------------------------------

    // Simulate server processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // FIX: Return an object that conforms to the ApiResponse 'success' type.
    // It must include 'status', 'message', and 'data'.
    return {
      status: 'success',
      message: 'Yêu cầu của bạn đã được gửi thành công! (Shared logic response)',
      data: formData, // Returning the processed data is a good practice.
    };
    
  } catch (error) {
    console.error('Error in processContactFormData (shared logic):', error);
    
    // Throw an error that can be caught by the caller (Server Action or API Route)
    throw new Error('Đã xảy ra lỗi khi xử lý yêu cầu của bạn. (Shared logic error)');
  }
}
