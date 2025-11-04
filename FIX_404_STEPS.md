# 🔥 Cách Sửa Lỗi 404 - API Theme

## ✅ Đã Tạo Route Đúng

- ✅ `app/api/theme/route.ts` - App Router (Next.js 14) 
- ✅ `pages/api/theme.ts` - Pages Router (backup)
- ✅ `app/api/test/route.ts` - Test route

## 🚀 Bước Sửa (Thực Hiện Từng Bước)

### Bước 1: Dừng Server
Nhấn `Ctrl+C` trong terminal đang chạy `npm run dev`

### Bước 2: Xóa Cache

```powershell
cd visaapp
Remove-Item -Recurse -Force .next
```

Hoặc:
```bash
cd visaapp
rm -rf .next
```

### Bước 3: Restart Server

```bash
npm run dev
```

### Bước 4: Test Ngay

Sau khi server start, test ngay:

```bash
# Test route đơn giản
curl http://localhost:3000/api/test

# Test theme API
curl http://localhost:3000/api/theme
```

Hoặc mở browser:
- http://localhost:3000/api/test
- http://localhost:3000/api/theme

## 📋 Checklist

- [ ] Server đã được dừng hoàn toàn
- [ ] Đã xóa folder `.next`
- [ ] Đã restart server với `npm run dev`
- [ ] Đã đợi server compile xong (xem console)
- [ ] Đã test `/api/test` trước
- [ ] Đã test `/api/theme`

## 🔍 Nếu Vẫn 404

### Kiểm tra Console Log

Khi start server, xem có dòng này không:
```
✓ Compiled /api/theme in XXXms
```

Nếu không thấy, có thể:
1. File có lỗi TypeScript
2. Next.js chưa detect được file

### Kiểm tra File

```powershell
# Kiểm tra file tồn tại
Test-Path app\api\theme\route.ts
Test-Path app\api\test\route.ts
```

Cả 2 phải trả về `True`

### Kiểm tra Next.js Version

```bash
cd visaapp
npm list next
```

Cần >= 13.0.0 (bạn đang dùng 14.2.3 ✅)

## 💡 Debug Command

Chạy lệnh này để xem Next.js detect được route nào:

```bash
cd visaapp
npm run dev
# Sau đó xem console output
```

Bạn sẽ thấy:
```
- info Loaded env from .env.local
- info Creating an optimized production build...
✓ Compiled successfully
  Route (app)                    Size     First Load JS
  └─ /api/theme                  123 B          1.2 kB
  └─ /api/test                   45 B           1.1 kB
```

## ⚠️ Lưu Ý

- **App Router được ưu tiên** trong Next.js 14
- Route trong `app/api/theme/route.ts` sẽ có path: `/api/theme`
- Route trong `pages/api/theme.ts` cũng có path: `/api/theme` (nhưng App Router được ưu tiên)

---

**Sau khi làm theo các bước trên, API sẽ hoạt động! 🎉**

