# 🔄 Hướng Dẫn Reset Cache Sau Khi Đổi Theme Color

Sau khi thay đổi theme color, frontend có thể không tự động load theme mới do cache. Làm theo các bước sau để reset:

## 🚀 Cách 1: Sử dụng Script Tự Động (Khuyến nghị)

### Bước 1: Chạy script reset cache
```bash
npm run reset-theme-cache
```

Script này sẽ:
- ✅ Xóa Next.js build cache (`.next` folder)
- ✅ Cập nhật Service Worker version để force refresh
- ✅ Chạy sync-theme để cập nhật CSS

### Bước 2: Rebuild project
```bash
npm run build
```
hoặc (nếu đang dev):
```bash
npm run dev
```

### Bước 3: Clear browser cache

**Option A: Hard Reload (Nhanh nhất)**
- Windows/Linux: `Ctrl + Shift + R` hoặc `Ctrl + F5`
- Mac: `Cmd + Shift + R`

**Option B: Xóa cache thủ công**
1. Mở DevTools: `F12`
2. Tab **Application** > **Service Workers**
3. Click **Unregister** cho service worker đang active
4. Tab **Storage** > Click **Clear site data**
5. Hoặc: Tab **Network** > Check "Disable cache" > Hard reload

**Option C: Clear tất cả cache (Nếu vẫn không được)**
1. `Ctrl + Shift + Delete` (Windows) hoặc `Cmd + Shift + Delete` (Mac)
2. Chọn "Cached images and files"
3. Chọn "All time"
4. Click "Clear data"

---

## 🔧 Cách 2: Reset Thủ Công

### Bước 1: Xóa Next.js cache
```bash
# Windows PowerShell
Remove-Item -Recurse -Force .next

# Windows CMD
rmdir /s /q .next

# Mac/Linux
rm -rf .next
```

### Bước 2: Cập nhật Service Worker version
Mở `public/sw.js` và tăng version number:
```javascript
// Từ
const CACHE_NAME = 'Kim Quy Travel-v1.0.0'

// Thành
const CACHE_NAME = 'Kim Quy Travel-v1.0.1'  // Tăng số cuối
```

### Bước 3: Sync theme
```bash
npm run sync-theme
```

### Bước 4: Rebuild
```bash
npm run build
```

### Bước 5: Clear browser cache
Làm theo Option B hoặc C ở trên.

---

## 🐛 Nếu Vẫn Không Được

### 1. Kiểm tra theme.config.ts đã được cập nhật chưa
```typescript
// lib/theme.config.ts
export const PRIMARY_COLOR_HEX = '#YOUR_NEW_COLOR';
```

### 2. Kiểm tra globals.css đã sync chưa
```css
/* app/globals.css */
:root {
  /* AUTO-GENERATED - Do not edit manually! */
  /* Màu chủ đạo: #YOUR_NEW_COLOR */
  --color-primary: ...;
}
```

### 3. Xóa toàn bộ cache và rebuild
```bash
# Xóa tất cả cache
rm -rf .next
rm -rf node_modules/.cache
npm run sync-theme
npm run build
```

### 4. Test trên Incognito/Private mode
Mở trình duyệt ở chế độ ẩn danh để test xem có phải do cache không.

### 5. Kiểm tra Service Worker
- Mở DevTools > Application > Service Workers
- Unregister tất cả service workers
- Reload page

---

## 📝 Lưu Ý Quan Trọng

1. **Production**: Sau khi thay đổi theme, bắt buộc phải:
   - Chạy `npm run sync-theme`
   - Rebuild: `npm run build`
   - Deploy lại

2. **Service Worker**: Nếu dùng PWA, phải update version trong `sw.js` để force reload

3. **Browser Cache**: Các file CSS/JS được cache mạnh, cần hard reload hoặc clear cache

4. **CDN**: Nếu dùng CDN, cần invalidate cache trên CDN sau khi deploy

---

## ✅ Checklist Reset Theme

- [ ] Chạy `npm run sync-theme`
- [ ] Xóa `.next` cache
- [ ] Update Service Worker version
- [ ] Rebuild project (`npm run build`)
- [ ] Clear browser cache (Hard reload)
- [ ] Unregister Service Worker
- [ ] Test trên Incognito mode
- [ ] Deploy lại (nếu production)

---

## 🎨 Script Nhanh (All-in-One)

Tạo file `reset-and-build.sh` (Mac/Linux):
```bash
#!/bin/bash
echo "🔄 Resetting theme cache..."
rm -rf .next
npm run sync-theme
npm run build
echo "✅ Done! Clear browser cache and reload."
```

Chạy:
```bash
chmod +x reset-and-build.sh
./reset-and-build.sh
```

Hoặc Windows PowerShell (`reset-and-build.ps1`):
```powershell
Write-Host "🔄 Resetting theme cache..."
Remove-Item -Recurse -Force .next
npm run sync-theme
npm run build
Write-Host "✅ Done! Clear browser cache and reload."
```

