import { NextResponse } from 'next/server';

    export async function POST(request: Request) {
      try {
        const formData = await request.json(); // Giả định form gửi dữ liệu dạng JSON

        console.log('Received contact form data (fake API):', formData);

        // --- Đây là nơi bạn sẽ xử lý dữ liệu form trong backend thật ---
        // 1. Gửi email thông báo
        // 2. Lưu dữ liệu vào database
        // -------------------------------------------------------------

        // Mô phỏng thời gian xử lý của server
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Trả về phản hồi thành công
        return NextResponse.json(
          { message: 'Yêu cầu của bạn đã được gửi thành công! (Fake API response)' },
          { status: 200 }
        );

      } catch (error) {
        console.error('Error processing contact form (fake API):', error);
        // Trả về phản hồi lỗi
        return NextResponse.json(
          { message: 'Đã xảy ra lỗi khi xử lý yêu cầu của bạn. (Fake API response)' },
          { status: 500 } // Internal Server Error
        );
      }
    }
