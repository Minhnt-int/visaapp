# 🎨 Hướng Dẫn Đổi Màu - CHỈ 1 BƯỚC!

## ⚡ CỰC KỲ ĐƠN GIẢN - Chỉ cần thay đổi 1 dòng code!

### 📝 Bước 1: Mở file `lib/theme.config.ts`

Tìm dòng này (dòng 11):

```typescript
export const PRIMARY_COLOR_HEX = '#F4F754'; // Màu vàng hiện tại
```

### ✏️ Bước 2: Thay đổi màu

Ví dụ đổi sang màu đỏ:
```typescript
export const PRIMARY_COLOR_HEX = '#EF4444'; // Màu đỏ
```

Ví dụ đổi sang màu xanh:
```typescript
export const PRIMARY_COLOR_HEX = '#2563EB'; // Màu xanh
```

### 🚀 Bước 3: Chạy lệnh đồng bộ

```bash
npm run sync-theme
```

Hoặc:
```bash
npx ts-node scripts/sync-theme-colors.ts
```

### ✅ Xong!

Tất cả màu sắc đã được tự động cập nhật vào:
- ✅ `app/globals.css` - CSS variables
- ✅ `app/layout.tsx` - Meta theme-color
- ✅ `public/manifest.json` - PWA theme color
- ✅ `lib/seo-optimizer.ts` - SEO colors

**Lưu ý:** Sau khi chạy `sync-theme`, cần **restart dev server** (`npm run dev`)

---

## 📋 Ví Dụ Các Màu Phổ Biến

```typescript
// Màu đỏ
export const PRIMARY_COLOR_HEX = '#EF4444';

// Màu xanh dương
export const PRIMARY_COLOR_HEX = '#2563EB';

// Màu xanh lá
export const PRIMARY_COLOR_HEX = '#10B981';

// Màu tím
export const PRIMARY_COLOR_HEX = '#8B5CF6';

// Màu cam
export const PRIMARY_COLOR_HEX = '#F97316';

// Màu hồng
export const PRIMARY_COLOR_HEX = '#EC4899';
```

---

## 🔧 Nếu Không Chạy Được Script

Nếu lệnh `npm run sync-theme` không chạy được, bạn có thể cập nhật thủ công:

1. **Mở `lib/theme.config.ts`** - Thay đổi `PRIMARY_COLOR_HEX`
2. **Xem giá trị HSL** trong console khi chạy script
3. **Copy giá trị** và paste vào `app/globals.css` (phần `--color-primary`)
4. **Cập nhật hex color** trong:
   - `app/layout.tsx` (theme-color meta tag)
   - `public/manifest.json` (theme_color)
   - `lib/seo-optimizer.ts` (nếu có)

Nhưng **tốt nhất là chạy script** vì nó tự động tính toán tất cả variants!

---

## 💡 Lưu Ý

- ✅ Format: Phải là mã màu HEX có dấu `#` (ví dụ: `#F4F754`)
- ✅ Case: Chữ hoa hay thường đều được (`#F4F754` hoặc `#f4f754`)
- ✅ Script tự động tạo các variants (light, lighter, dark, darker, ...)
- ✅ Không cần hiểu HSL hay các thuật toán phức tạp!

---

**Vậy là xong! Chỉ cần thay đổi 1 dòng và chạy 1 lệnh! 🎉**

