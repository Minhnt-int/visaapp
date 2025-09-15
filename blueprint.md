# Blueprint: Trang Web Dịch Vụ Visa & Tour Du Lịch (Visa5s)

## I. Tổng Quan (Overview)

Tài liệu này là bản thiết kế chi tiết cho dự án website **Visa5s**, một nền tảng cung cấp thông tin và dịch vụ về visa, tour du lịch. Website được xây dựng bằng Next.js với App Router, sử dụng TypeScript và Tailwind CSS, tuân thủ các tiêu chuẩn thiết kế hiện đại, responsive và tối ưu cho trải nghiệm người dùng.

**Mục tiêu:**

*   **Giao diện Hiện đại & Chuyên nghiệp:** Tạo ra một trang web có thiết kế đẹp mắt, trực quan, và đáng tin cậy.
*   **Tốc độ & Hiệu suất:** Tối ưu hóa tốc độ tải trang bằng cách sử dụng Server Components và Static Site Generation (SSG) của Next.js.
*   **Responsive Toàn diện:** Đảm bảo trải nghiệm người dùng mượt mà trên mọi thiết bị, từ mobile đến desktop.
*   **Nội dung Phong phú:** Cung cấp thông tin chi tiết về các dịch vụ visa, tour du lịch, và các bài viết blog hữu ích.
*   **Dễ dàng Bảo trì & Mở rộng:** Cấu trúc code rõ ràng, module hóa để dễ dàng cập nhật và thêm tính năng mới.

## II. Cấu Trúc & Thiết Kế (Structure & Design)

Dự án tuân thủ cấu trúc tiêu chuẩn của Next.js App Router. Dữ liệu và cấu hình được tách riêng trong thư mục `/lib` để quản lý tập trung.

### 1. Bảng màu (Color Palette)

*   **Primary/Brand:** Blue (`#2563EB`, `#1D4ED8`) - Tạo cảm giác tin cậy, chuyên nghiệp.
*   **Secondary/Accent:** Purple (`#7C3AED`) & Yellow (`#FBBF24`) - Dùng cho các nút kêu gọi hành động (CTA) và các yếu tố cần làm nổi bật.
*   **Text:** Gray (`#111827`, `#4B5563`, `#6B7280`) - Đảm bảo tính dễ đọc.
*   **Background:** White (`#FFFFFF`) và Light Gray (`#F9FAFB`) - Tạo không gian sạch sẽ, thoáng đãng.
*   **Feedback:** Red (`#EF4444` cho lỗi), Green (`#22C55E` cho thành công).

### 2. Typography

*   **Font chính (Display):** Be Vietnam Pro - Một font sans-serif hiện đại, dễ đọc, phù hợp cho cả tiêu đề và văn bản.
*   **Cỡ chữ:** Sử dụng hệ thống cỡ chữ của Tailwind CSS, tạo sự phân cấp rõ ràng từ tiêu đề chính (`text-4xl`, `text-6xl`) đến các đoạn văn bản (`text-base`, `text-lg`).

### 3. Iconography

*   Sử dụng thư viện **Lucide React** cho các icon nhất quán, sắc nét và hiện đại.

### 4. Layout & Components

*   **Spacing:** Sử dụng hệ thống spacing của Tailwind CSS (`p-`, `m-`, `gap-`) để tạo layout cân đối.
*   **Rounded Corners:** Áp dụng độ bo góc (`rounded-lg`, `rounded-2xl`) cho các thẻ, nút và hình ảnh để tạo cảm giác mềm mại, hiện đại.
*   **Shadows:** Sử dụng hiệu ứng đổ bóng (`shadow-lg`, `shadow-xl`) để tạo chiều sâu và làm nổi bật các component.
*   **Thành phần chính (Components):**
    *   `Header`: Thanh điều hướng chính, responsive.
    *   `Footer`: Chứa thông tin công ty, liên kết nhanh và mạng xã hội.
    *   `Button`: Các nút bấm với style nhất quán cho các hành động chính, phụ.
    *   `Card`: Component thẻ được sử dụng để hiển thị dịch vụ, bài viết, tour du lịch.
    *   `Breadcrumb`: Thanh điều hướng phân cấp, giúp người dùng xác định vị trí.
    *   `Pagination`: Component phân trang cho các danh sách dài.

## III. Chức Năng & Các Trang (Features & Pages)

Dưới đây là danh sách chi tiết các trang và tính năng đã được triển khai.

### 1. Trang Chủ (`/`)

*   **Hero Section:** Banner lớn với tiêu đề hấp dẫn, mô tả ngắn và nút kêu gọi hành động (CTA) nổi bật.
*   **Featured Services:** Hiển thị các dịch vụ visa chính (Du lịch, Thăm thân, Công tác) dưới dạng các thẻ (card) trực quan.
*   **Featured Tours:** Một carousel hoặc grid hiển thị các tour du lịch nổi bật, thu hút người dùng khám phá.
*   **Why Choose Us:** Phần giới thiệu lý do tại sao khách hàng nên chọn Visa5s, với các icon và mô tả ngắn gọn.
*   **Testimonials:** Trích dẫn ý kiến khách hàng để tăng độ tin cậy.
*   **Latest Blog Posts:** Hiển thị 3 bài viết mới nhất từ trang tin tức.
*   **Call to Action (CTA) Block:** Một khu vực kêu gọi người dùng liên hệ hoặc đăng ký tư vấn.

### 2. Dịch Vụ (`/dich-vu` & `/dich-vu/[slug]`)

*   **Trang Dịch Vụ Chính (`/dich-vu`):**
    *   Liệt kê tất cả các loại hình dịch vụ visa dưới dạng grid layout.
    *   Mỗi dịch vụ có icon, tên, mô tả ngắn và danh sách các quốc gia/loại visa phổ biến.
*   **Trang Chi Tiết Dịch Vụ (`/dich-vu/[slug]`):**
    *   Hiển thị thông tin chi tiết về một loại dịch vụ visa cụ thể (ví dụ: Visa Du Lịch).
    *   Liệt kê các quốc gia cung cấp dịch vụ visa này.
*   **Trang Chi Tiết Quốc Gia (`/dich-vu/[slug]/[country]`):**
    *   Cung cấp thông tin đầy đủ về quy trình, yêu cầu, bảng giá, và các câu hỏi thường gặp cho một loại visa ở một quốc gia cụ thể (ví dụ: Visa du lịch Mỹ).

### 3. Tour Du Lịch (`/tour-du-lich` & con)

*   **Trang Tour Du Lịch Chính (`/tour-du-lich`):**
    *   Hiển thị các danh mục tour theo châu lục (Châu Á, Châu Âu, v.v.).
    *   Mỗi danh mục có hình ảnh đại diện và mô tả.
*   **Trang Danh Mục Tour (`/tour-du-lich/[category]`):**
    *   Liệt kê tất cả các tour có sẵn trong một châu lục (ví dụ: Châu Á).
    *   Các tour được nhóm theo quốc gia.
*   **Trang Chi Tiết Tour (`/tour-du-lich/[category]/[slug]`):**
    *   Trang này chưa được xây dựng hoàn chỉnh trong kế hoạch ban đầu nhưng đã có cấu trúc URL.

### 4. Tin Tức (`/tin-tuc` & `/tin-tuc/[slug]`)

*   **Trang Tin Tức Chính (`/tin-tuc`):**
    *   Hiển thị một bài viết nổi bật (featured post) ở trên cùng.
    *   Lưới các bài viết còn lại, có phân trang.
*   **Trang Chi Tiết Bài Viết (`/tin-tuc/[slug]`):**
    *   Hiển thị nội dung chi tiết của một bài viết.
    *   Bao gồm hình ảnh, tác giả, ngày đăng, và các thẻ (tags).
    *   Phần "Bài viết liên quan" ở cuối trang.

### 5. Trang Liên Hệ (`/lien-he`)

*   **Form Liên Hệ:** Cho phép người dùng gửi câu hỏi hoặc yêu cầu tư vấn.
*   **Thông tin liên hệ:** Hiển thị địa chỉ văn phòng, số điện thoại, email.
*   **Bản đồ Google Maps:** Nhúng bản đồ vị trí văn phòng.

## IV. Gỡ lỗi và Hoàn thiện (Debugging and Finalization)

Trong quá trình xây dựng, một số lỗi đã phát sinh và đã được khắc phục để hoàn thiện ứng dụng.

*   **`TypeError: services.map is not a function`:** Lỗi xảy ra do component `ServicePage` nhận một object thay vì một mảng. Đã sửa bằng cách lọc và truyền đúng mảng `services` vào component.
*   **`TypeError: Cannot read properties of undefined (reading 'image')`:** Component `ServiceCard` cố gắng truy cập thuộc tính `image` không tồn tại. Đã sửa bằng cách thêm thuộc tính `image` vào dữ liệu mock trong `lib/data.ts`.
*   **`TypeError: Property 'price' does not exist`:** Tương tự lỗi trên, component cố gắng truy cập thuộc tính `price` không tồn tại. Đã sửa bằng cách bổ sung `price` và `processingTime` vào dữ liệu `services`.
*   **`TypeError: Property 'imageUrl' does not exist`:** Xảy ra do sự thiếu nhất quán trong đặt tên thuộc tính (`image` vs `imageUrl`). Đã sửa bằng cách đổi tên thuộc tính trong `blogPosts` thành `imageUrl`.
*   **`TypeError: Property 'readTime' does not exist`:** Trang tin tức yêu cầu thuộc tính `readTime` nhưng chưa được cung cấp. Đã sửa bằng cách thêm `readTime` vào dữ liệu `blogPosts`.
*   **`TypeError: 'searchParams' is possibly 'null'`:** Lỗi build do `useSearchParams()` có thể trả về `null`. Đã sửa bằng cách sử dụng optional chaining (`?.`) trong component `Pagination`.
*   **`Module not found: Can't resolve '@/lib/utils'`:** Lỗi build do thiếu file `lib/utils.ts` chứa hàm `cn` cần thiết cho việc styling. Đã giải quyết bằng cách tạo file `utils.ts`.
*   **`TypeError: Cannot read properties of undefined (reading 'join')`:** Lỗi prerendering trang tour do component `TourDestinationCard` mong đợi các thuộc tính mảng (`departure`, `highlights`) không tồn tại. Đã khắc phục bằng cách bổ sung các thuộc tính này vào dữ liệu tour trong `lib/data.ts`.

Sau khi giải quyết tất cả các lỗi trên, lệnh `npm run build` đã thực thi thành công, hoàn tất quá trình xây dựng và gỡ lỗi ứng dụng.
