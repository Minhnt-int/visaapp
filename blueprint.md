# Blueprint: Tối Ưu Hóa SEO và API cho Website VISA5S

## I. Tổng Quan

Dự án này nhằm mục đích nâng cấp website VISA5S được xây dựng trên nền tảng Next.js. Các mục tiêu chính bao gồm:

1.  **Tối ưu hóa SEO (On-page SEO)** cho các trang tin tức (`/tin-tuc` và `/tin-tuc/[slug]`) để đạt thứ hạng cao trên Google và tăng tương tác trên mạng xã hội (Facebook, Twitter).
2.  **Xây dựng API cho Danh mục**: Chuyển đổi việc hiển thị dữ liệu danh mục từ dạng tĩnh (hardcoded) sang động thông qua API, giúp dễ quản lý và tối ưu cho SEO (Server-Side Rendering).
3.  **Rà soát và Tối ưu mã nguồn**: Cải thiện chất lượng code, tốc độ tải trang và sửa các lỗi tiềm ẩn.

## II. Kế hoạch Thực hiện

### Giai đoạn 1: Xây dựng API cho Danh mục Blog

Hiện tại, danh mục trên trang tin tức đang được hardcode. Tôi sẽ xây dựng một hệ thống API để quản lý chúng.

1.  **Tạo Dữ liệu Mẫu (Mock Data)**:
    *   Tạo file `lib/mock-data.ts` (nếu chưa có) hoặc bổ sung `mockBlogCategories` vào file hiện có. Dữ liệu sẽ dựa trên các danh mục đã được liệt kê.

2.  **Tạo API Route**:
    *   Tạo một API route mới tại `app/api/blog-categories/route.ts`.
    *   Route này sẽ đọc dữ liệu từ `mockBlogCategories` và trả về dưới dạng JSON.

3.  **Cập nhật `lib/api.ts`**:
    *   Thêm hàm `getBlogCategories()` để gọi đến API route `/api/blog-categories`.

4.  **Tích hợp vào Giao diện (`app/tin-tuc/page.tsx`)**:
    *   Thay thế danh sách categories đang hardcode bằng cách gọi hàm `getBlogCategories()` từ server-side.

### Giai đoạn 2: Tối ưu SEO cho Trang Tin Tức Chi Tiết (`/tin-tuc/[slug]`)

Trang này cần được tối ưu sâu về SEO để các công cụ tìm kiếm có thể hiểu và xếp hạng tốt nhất cho từng bài viết.

1.  **Cải thiện `generateMetadata`**:
    *   **Canonical URL**: Thêm thẻ `alternates: { canonical: '...' }` để chỉ định URL chuẩn, tránh trùng lặp nội dung.
    *   **Robots Tag**: Bổ sung thẻ `robots` để kiểm soát việc lập chỉ mục.
    *   **Keywords**: Đảm bảo `keywords` được tách và xử lý đúng cách từ `metaKeywords` của bài viết.

2.  **Thêm Dữ liệu có cấu trúc (Structured Data)**:
    *   Tạo và chèn JSON-LD schema cho `NewsArticle` trực tiếp vào component của trang.
    *   Schema sẽ bao gồm các thuộc tính quan trọng: `headline`, `image`, `datePublished`, `dateModified`, `author`, `publisher`. Điều này giúp Google hiển thị bài viết dưới dạng "rich results".

### Giai đoạn 3: Tối ưu SEO cho Trang Danh sách Tin Tức (`/tin-tuc`)

Trang này là cửa ngõ chính vào các bài viết, cần được tối ưu để thu hút người dùng từ trang kết quả tìm kiếm.

1.  **Thêm `generateMetadata`**:
    *   Tạo hàm `generateMetadata` cho trang `/tin-tuc`.
    *   Thiết lập các thẻ `title`, `description`, `openGraph`, và `twitter` phù hợp cho trang danh sách tin tức chung.

2.  **Tải dữ liệu danh mục động**:
    *   Như đã đề cập ở Giai đoạn 1, thay thế phần danh mục tĩnh bằng dữ liệu được tải từ API.

3.  **Kiểm tra và Tối ưu hóa**:
    *   Đảm bảo trang sử dụng đúng các thẻ heading (H1, H2, H3).
    *   Kiểm tra tất cả các ảnh đều có thẻ `alt`.
    *   Đảm bảo các liên kết nội bộ sử dụng component `<Link>` của Next.js.

## III. Công nghệ & Tiêu chuẩn áp dụng

*   **Next.js 14 App Router**: Tận dụng tối đa các tính năng mới nhất cho Server Components, data fetching, và metadata.
*   **Google SEO Best Practices**: Tuân thủ các hướng dẫn của Google về technical SEO, content, và structured data.
*   **Open Graph & Twitter Cards**: Tối ưu hóa cho việc chia sẻ trên mạng xã hội.
*   **JSON-LD**: Sử dụng cho dữ liệu có cấu trúc để tăng khả năng hiển thị rich snippets.
