# Hướng Dẫn Chi Tiết: Thay Đổi Màu Sắc Chủ Đạo

Dự án này sử dụng hệ thống màu sắc có thể tùy chỉnh. Tất cả màu sắc được định nghĩa tập trung và có thể thay đổi dễ dàng.

## 📋 Mục Lục

1. [Cấu Trúc Hệ Thống Màu](#cấu-trúc-hệ-thống-màu)
2. [Hướng Dẫn Thay Đổi Màu - Ví Dụ Màu Vàng #F4F754](#hướng-dẫn-thay-đổi-màu---ví-dụ-màu-vàng-f4f754)
3. [Công Thức Tính Variants](#công-thức-tính-variants)
4. [Các File Cần Cập Nhật](#các-file-cần-cập-nhật)
5. [Sử Dụng Màu Trong Components](#sử-dụng-màu-trong-components)
6. [Kiểm Tra Sau Khi Thay Đổi](#kiểm-tra-sau-khi-thay-đổi)

---

## Cấu Trúc Hệ Thống Màu

### 1. File Config: `lib/theme-colors.ts`

File này chứa định nghĩa tất cả màu sắc trong dự án dưới dạng TypeScript.

**Cấu trúc:**
- `primary`: Màu chủ đạo với các variants (DEFAULT, light, lighter, lightest, dark, darker, darkest)
- `accent`: Màu phụ (orange, green, yellow, purple)
- `neutral`: Màu trung tính (grays)
- `success`, `error`, `warning`: Màu ngữ nghĩa

### 2. CSS Variables: `app/globals.css`

CSS variables được định nghĩa trong `:root` và sử dụng giá trị HSL.

### 3. Tailwind Config: `tailwind.config.ts`

Tailwind sử dụng CSS variables để tạo các utility classes.

---

## Hướng Dẫn Thay Đổi Màu - Ví Dụ Màu Vàng #F4F754

### Bước 1: Chuyển Đổi Màu HEX Sang HSL

Màu `#F4F754` cần được chuyển sang định dạng HSL để sử dụng trong Tailwind.

**Cách chuyển đổi:**

1. **Sử dụng công cụ online:**
   - Truy cập: https://www.hexcolortool.com/ hoặc https://hslpicker.com/
   - Nhập `#F4F754`
   - Lấy giá trị HSL: `59 93% 65%`

2. **Tính toán thủ công:**
   - R = F4 (hex) = 244 (decimal)
   - G = F7 (hex) = 247 (decimal)
   - B = 54 (hex) = 84 (decimal)
   - Max = 247, Min = 84
   - Lightness = (247 + 84) / 2 / 255 ≈ 65%
   - Saturation ≈ 93%
   - Hue ≈ 59°
   - **Kết quả: `59 93% 65%`**

### Bước 2: Tạo Các Variants Màu

Từ màu chính `59 93% 65%`, tạo các variants:

| Variant | Lightness | Mục đích | Ví dụ HSL |
|---------|-----------|----------|-----------|
| `lightest` | +30% | Background rất nhạt | `59 93% 95%` |
| `lighter` | +20% | Background nhạt | `59 93% 85%` |
| `light` | +10% | Hover states | `59 93% 75%` |
| `DEFAULT` | Gốc | Màu chính | `59 93% 65%` |
| `dark` | -10% | Active states | `59 93% 55%` |
| `darker` | -20% | Emphasis | `59 93% 45%` |
| `darkest` | -35% | Dark mode | `59 93% 30%` |

**Lưu ý:** Giữ nguyên Hue (59) và Saturation (93%), chỉ thay đổi Lightness.

### Bước 3: Cập Nhật `lib/theme-colors.ts`

```typescript
// lib/theme-colors.ts

export const themeColors = {
  primary: {
    // Màu vàng #F4F754 - HSL: 59 93% 65%
    DEFAULT: '59 93% 65%', // #F4F754 - Yellow primary
    light: '59 93% 75%',   // Lighter yellow for hover states
    lighter: '59 93% 85%', // Even lighter for backgrounds
    lightest: '59 93% 95%', // Lightest for subtle backgrounds
    dark: '59 93% 55%',     // Darker yellow for active states
    darker: '59 93% 45%',   // Much darker for emphasis
    darkest: '59 93% 30%',  // Darkest for dark mode/contrast
    foreground: '0 0% 10%', // Dark text on yellow (better contrast)
    foregroundDark: '0 0% 10%',
  },
  // ... các màu khác
};

export const themeColorHex = {
  primary: '#F4F754',        // Màu chính
  primaryDark: '#E6E844',    // Variant tối hơn (tùy chọn)
  background: '#ffffff',
  backgroundDark: '#111827',
} as const;
```

### Bước 4: Cập Nhật `app/globals.css`

```css
/* app/globals.css */

@layer base {
  :root {
    /* Màu vàng #F4F754 - HSL: 59 93% 65% */
    --color-primary: 59 93% 65%;
    --color-primary-light: 59 93% 75%;
    --color-primary-lighter: 59 93% 85%;
    --color-primary-lightest: 59 93% 95%;
    --color-primary-dark: 59 93% 55%;
    --color-primary-darker: 59 93% 45%;
    --color-primary-darkest: 59 93% 30%;
    
    /* Các màu khác... */
  }
}
```

### Bước 5: Cập Nhật Các File Meta Tags

#### `app/layout.tsx`
```tsx
<meta name="theme-color" content={process.env.NEXT_PUBLIC_THEME_COLOR || '#F4F754'} />
```

#### `public/manifest.json`
```json
{
  "theme_color": "#F4F754",
  "_comment": "Để thay đổi theme_color, cập nhật giá trị này và giá trị tương ứng trong lib/theme-colors.ts"
}
```

#### `lib/seo-optimizer.ts` (nếu có)
```typescript
'theme-color': '#F4F754',
'msapplication-TileColor': '#F4F754',
```

### Bước 6: Kiểm Tra Contrast Ratio

Với màu vàng sáng, cần đảm bảo text có độ tương phản đủ:

- **Trên nền vàng:** Sử dụng text đen/tối (`text-foreground` hoặc `text-neutral-900`)
- **Trên nền tối:** Sử dụng text trắng/sáng

**Kiểm tra contrast:**
- Tool: https://webaim.org/resources/contrastchecker/
- WCAG AA minimum: 4.5:1 cho text nhỏ, 3:1 cho text lớn

---

## Công Thức Tính Variants

### Công Thức Chung:

```typescript
// Giả sử màu chính: H S L%
DEFAULT: 'H S L%',           // Màu gốc
light: 'H S (L+10)%',       // Sáng hơn 10%
lighter: 'H S (L+20)%',     // Sáng hơn 20%
lightest: 'H S (L+30)%',    // Sáng hơn 30%
dark: 'H S (L-10)%',        // Tối hơn 10%
darker: 'H S (L-20)%',      // Tối hơn 20%
darkest: 'H S (L-35)%',     // Tối hơn 35%
```

### Ví Dụ Với Màu #F4F754:

```
DEFAULT:  59 93% 65%  (gốc)
light:    59 93% 75%  (65% + 10%)
lighter:  59 93% 85%  (65% + 20%)
lightest: 59 93% 95%  (65% + 30%)
dark:     59 93% 55%  (65% - 10%)
darker:   59 93% 45%  (65% - 20%)
darkest:  59 93% 30%  (65% - 35%)
```

---

## Các File Cần Cập Nhật

Khi thay đổi màu chủ đạo, cần cập nhật các file sau:

### ✅ Bắt Buộc:

1. ✅ `lib/theme-colors.ts` - Định nghĩa màu trong TypeScript
2. ✅ `app/globals.css` - CSS variables
3. ✅ `app/layout.tsx` - Meta tag theme-color
4. ✅ `public/manifest.json` - Theme color cho PWA

### 📋 Tùy Chọn:

5. 📋 `lib/seo-optimizer.ts` - Nếu có sử dụng SEO optimizer
6. 📋 `.env` hoặc `.env.local` - Nếu dùng `NEXT_PUBLIC_THEME_COLOR`

### 📝 Checklist:

- [ ] Cập nhật `themeColors.primary` trong `lib/theme-colors.ts`
- [ ] Cập nhật `themeColorHex.primary` trong `lib/theme-colors.ts`
- [ ] Cập nhật CSS variables trong `app/globals.css`
- [ ] Cập nhật meta tag trong `app/layout.tsx`
- [ ] Cập nhật `theme_color` trong `public/manifest.json`
- [ ] Cập nhật SEO optimizer (nếu có)
- [ ] Kiểm tra contrast ratio
- [ ] Test trên các components

---

## Sử Dụng Màu Trong Components

### Tailwind Classes:

```tsx
// Background colors
<div className="bg-primary">Màu chính</div>
<div className="bg-primary-light">Màu sáng hơn</div>
<div className="bg-primary-dark">Màu tối hơn</div>
<div className="bg-primary-lightest">Background nhạt nhất</div>

// Text colors
<p className="text-primary">Text màu chính</p>
<p className="text-foreground">Text đen (dùng trên nền sáng)</p>

// Border colors
<div className="border-primary">Border màu chính</div>

// Gradient
<div className="bg-gradient-to-r from-primary to-primary-dark">
  Gradient
</div>

// Hover states
<button className="bg-primary hover:bg-primary-dark">
  Button với hover
</button>
```

### CSS Variables (trong style inline):

```tsx
<div style={{ backgroundColor: 'hsl(var(--color-primary))' }}>
  Sử dụng CSS variable trực tiếp
</div>
```

---

## Kiểm Tra Sau Khi Thay Đổi

### 1. Visual Check:

- [ ] Màu hiển thị đúng trên tất cả components
- [ ] Hover states hoạt động đúng
- [ ] Buttons và links có contrast đủ
- [ ] Text dễ đọc trên background

### 2. Technical Check:

```bash
# Kiểm tra lỗi TypeScript
npm run build

# Kiểm tra lỗi linter
npm run lint

# Test trên development
npm run dev
```

### 3. Accessibility Check:

- [ ] Contrast ratio đạt WCAG AA (4.5:1 minimum)
- [ ] Màu không phải là cách duy nhất truyền đạt thông tin
- [ ] Test với screen reader

### 4. Browser Check:

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

---

## Công Cụ Hỗ Trợ

### Chuyển Đổi Màu:

- **HEX to HSL:** https://www.hexcolortool.com/
- **Color Picker:** https://hslpicker.com/
- **Tailwind Shades:** https://www.tailwindshades.com/

### Kiểm Tra Contrast:

- **WebAIM Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Color Contrast Analyzer:** https://www.tpgi.com/color-contrast-checker/

### Testing:

- **Browser DevTools:** Kiểm tra computed styles
- **React DevTools:** Kiểm tra component props

---

## Ví Dụ Hoàn Chỉnh: Màu Vàng #F4F754

Đã được áp dụng trong dự án! Bạn có thể xem các file:

- ✅ `lib/theme-colors.ts` - Đã cập nhật với màu vàng
- ✅ `app/globals.css` - Đã cập nhật CSS variables
- ✅ `app/layout.tsx` - Đã cập nhật meta tag
- ✅ `public/manifest.json` - Đã cập nhật theme color
- ✅ `lib/seo-optimizer.ts` - Đã cập nhật SEO colors

**Kết quả:** Tất cả components hiện sử dụng màu vàng #F4F754 làm màu chủ đạo!

---

## Lưu Ý Quan Trọng

1. **HSL Format:** Tất cả màu được lưu dưới dạng HSL KHÔNG có wrapper `hsl()`. Ví dụ: `59 93% 65%` ✅ (không phải `hsl(59, 93%, 65%)` ❌)

2. **Consistency:** Khi thay đổi màu, nhớ cập nhật TẤT CẢ các file trong checklist

3. **Contrast:** Với màu sáng (như vàng), luôn dùng text đen/tối để đảm bảo đọc được

4. **Testing:** Luôn test trên nhiều devices và browsers sau khi thay đổi

5. **Backup:** Commit thay đổi trước khi thử màu mới để dễ rollback

---

## Câu Hỏi Thường Gặp

**Q: Tôi muốn đổi sang màu khác, cần làm gì?**  
A: Làm theo 6 bước trong phần "Hướng Dẫn Thay Đổi Màu", bắt đầu từ Bước 1.

**Q: Làm sao biết giá trị HSL của màu?**  
A: Dùng công cụ online như https://hslpicker.com/ để chuyển đổi từ HEX/RGB sang HSL.

**Q: Có cần thay đổi tất cả components không?**  
A: Không! Components đã sử dụng biến màu, chỉ cần thay đổi trong config files.

**Q: Màu không hiển thị đúng, tại sao?**  
A: Kiểm tra lại:
- CSS variables đã được cập nhật chưa?
- Đã restart dev server chưa? (`npm run dev`)
- Browser cache đã được clear chưa?

---

**Chúc bạn thay đổi màu thành công! 🎨**
