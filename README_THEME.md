# 🎨 Hướng Dẫn Đổi Màu - SIÊU ĐƠN GIẢN!

## ⚡ Chỉ Cần 1 Bước!

### ✏️ Thay đổi màu trong file `lib/theme.config.ts`

**Tìm dòng này (dòng 11):**
```typescript
export const PRIMARY_COLOR_HEX = '#F4F754';
```

**Thay đổi thành màu bạn muốn:**
```typescript
export const PRIMARY_COLOR_HEX = '#2563EB'; // Ví dụ: màu xanh
```

### 🚀 Chạy lệnh đồng bộ

```bash
npm run sync-theme
```

### ✅ Xong!

Tất cả file đã được tự động cập nhật!

---

## 📝 Ví Dụ

```typescript
// Màu đỏ
export const PRIMARY_COLOR_HEX = '#EF4444';

// Màu xanh
export const PRIMARY_COLOR_HEX = '#2563EB';

// Màu xanh lá
export const PRIMARY_COLOR_HEX = '#10B981';

// Màu tím
export const PRIMARY_COLOR_HEX = '#8B5CF6';
```

---

## ⚠️ Lưu Ý

1. **Format:** Phải có dấu `#` (ví dụ: `#F4F754`)
2. **Sau khi chạy script:** Cần restart dev server (`npm run dev`)
3. **Nếu không chạy được script:** Xem file `CHANGE_COLOR.md` để cập nhật thủ công

---

**Đó là tất cả! Chỉ 1 dòng code và 1 lệnh! 🎉**

