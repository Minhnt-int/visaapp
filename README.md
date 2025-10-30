# Kim Quy Travel - Website Dịch Vụ Visa và Tour Du Lịch

Website chuyên cung cấp dịch vụ xin visa và tour du lịch nước ngoài được xây dựng bằng Next.js 14, Tailwind CSS và TypeScript.

## 🌟 Tính Năng Chính

### ✅ Đã Hoàn Thành
- **Dịch vụ Visa**: Hiển thị dịch vụ visa theo châu lục (Châu Á, Châu Âu, Châu Mỹ, Châu Đại Dương)
- **Tour Du Lịch**: Hệ thống tour du lịch trọn gói với mock data
- **Trang Chi Tiết**: Chi tiết dịch vụ visa và tour với thông tin đầy đủ
- **Responsive Design**: Thiết kế đáp ứng mọi thiết bị
- **SEO Friendly**: Tối ưu SEO với meta tags và structured data
- **Performance**: Tối ưu hóa hiệu suất với Next.js 14

### 🚀 Các Chức Năng Mới
- **Menu Navigation**: Menu dropdown cho Dịch vụ và Tour du lịch
- **Tour Categories**: Phân loại tour theo châu lục
- **Featured Tours**: Tour nổi bật trên trang chủ
- **Dynamic Routing**: Routing động cho tất cả trang
- **Error Handling**: Xử lý lỗi 404 và các trường hợp ngoại lệ

## 🛠️ Công Nghệ Sử Dụng

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Image**: Next.js Image Component
- **Fonts**: Google Fonts (Manrope, Poppins)

## 🚦 Cách Chạy Dự Án

### Yêu Cầu Hệ Thống
- Node.js 18.17 hoặc cao hơn
- npm hoặc yarn

### Cài Đặt và Chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Mở [http://localhost:3000](http://localhost:3000) để xem website.

## 📁 Cấu Trúc Dự Án

```
visaapp/
├── app/                          # App Router (Next.js 14)
│   ├── dich-vu/                 # Dịch vụ visa
│   │   ├── [slug]/              # Chi tiết dịch vụ
│   │   └── page.tsx             # Danh sách dịch vụ
│   ├── tour-du-lich/            # Tour du lịch (NEW)
│   │   ├── [category]/          # Danh mục tour
│   │   │   ├── [slug]/          # Chi tiết tour
│   │   │   └── page.tsx         # Tour theo châu lục
│   │   └── page.tsx             # Trang chủ tour
│   ├── tin-tuc/                 # Tin tức
│   ├── lien-he/                 # Liên hệ
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Trang chủ
├── components/                   # React Components
│   ├── Header.tsx               # Navigation header
│   ├── Footer.tsx               # Footer
│   ├── Hero.tsx                 # Hero section
│   ├── ServiceSection.tsx       # Section dịch vụ
│   ├── TourSection.tsx          # Section tour (NEW)
│   ├── WhyChooseUs.tsx          # Lý do chọn
│   └── NewsSection.tsx          # Section tin tức
├── lib/                         # Utilities & Data
│   └── data.ts                  # Mock data & configurations
└── public/                      # Static assets
```

## 🎨 Thiết Kế

Website được thiết kế dựa trên [Visana.vn](https://visana.vn/) với:

- **Color Scheme**: Chủ đạo màu xanh dương và cam
- **Typography**: Font chữ hiện đại (Poppins, Manrope)
- **Layout**: Clean, professional, easy-to-navigate
- **Responsive**: Mobile-first approach

## 🗂️ Dữ Liệu Mock

### Dịch Vụ Visa
- **Visa Châu Á**: Hàn Quốc, Nhật Bản, Trung Quốc, Đài Loan, Hong Kong
- **Visa Châu Âu**: Anh, Đức, Pháp, Tây Ban Nha
- **Visa Châu Mỹ**: Mỹ, Canada  
- **Visa Châu Đại Dương**: Úc

### Tour Du Lịch (NEW)
- **Tour Châu Á**: Hàn Quốc, Nhật Bản, Trung Quốc
- **Tour Châu Âu**: Pháp-Thụy Sĩ-Ý, Đức-Áo-Séc
- **Tour Châu Mỹ**: Mỹ Đông-Tây, Canada
- **Tour Châu Đại Dương**: Úc, New Zealand

## 📞 Liên Hệ

**Kim Quy Travel - Dịch Vụ Visa & Tour Du Lịch**
- **Hotline**: 0911.909.686 / 0967.686.101
- **Email**: info@Kim Quy Travel.com.vn

**Địa chỉ văn phòng**:
- **TP.HCM**: 370 Đường 3/2, P.12, Q.10, TP.HCM
- **Bình Dương**: 16 Trần Đại Nghĩa, P. Bình An, TP. Dĩ An, Bình Dương
- **Hà Nội**: 87 Vương Thừa Vũ, P. Khương Mai, Thanh Xuân, Hà Nội

---

*Phát triển bởi Kim Quy Travel Team* 🇻🇳
