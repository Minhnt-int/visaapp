import { NextResponse } from 'next/server';
import { processContactFormData } from '@/lib/contact-logic';

/**
 * This API route now acts as a wrapper around the shared form processing logic.
 */
export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Reuse the shared logic to process the data
    const result = await processContactFormData(formData);

    // Return the successful response from the shared logic
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    const err = error as Error;
    // Return an error response if the shared logic fails
    return NextResponse.json(
      { message: err.message || 'Đã xảy ra lỗi khi xử lý yêu cầu của bạn.' },
      { status: 500 } // Internal Server Error
    );
  }
}
