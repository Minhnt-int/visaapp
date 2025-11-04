# 🔍 Debug - Lỗi 404 API Routes

## Vấn đề
API `/api/theme` và `/api/test` trả về 404.

## ✅ Files Đã Tạo
- ✅ `pages/api/theme.ts` - Pages Router (tương thích với dự án)
- ✅ `pages/api/test.ts` - Test route
- ✅ `app/api/theme/route.ts` - App Router (backup)
- ✅ `app/api/test/route.ts` - Test App Router

## 🔧 Bước Sửa (Làm Từng Bước)

### Bước 1: Kiểm tra TypeScript Errors
```powershell
cd visaapp
npm run lint
```

Nếu có lỗi, sửa trước khi tiếp tục.

### Bước 2: Dừng Server Hoàn Toàn
- Nhấn `Ctrl+C` trong terminal đang chạy `npm run dev`
- Đảm bảo server đã dừng hoàn toàn

### Bước 3: Xóa Cache
```powershell
cd visaapp
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
```

### Bước 4: Kiểm tra File Tồn Tại
```powershell
# Kiểm tra Pages Router
Test-Path "pages\api\theme.ts"
Test-Path "pages\api\test.ts"

# Kiểm tra App Router
Test-Path "app\api\theme\route.ts"
Test-Path "app\api\test\route.ts"
```

Tất cả phải trả về `True`.

### Bước 5: Restart Server
```powershell
cd visaapp
npm run dev
```

**QUAN TRỌNG:** Đợi server compile xong. Xem console output:
- ✅ Nếu thấy: `✓ Compiled /api/test in XXXms` → Route đã được compile
- ❌ Nếu không thấy → Có thể có lỗi

### Bước 6: Test API Routes

**Mở browser hoặc dùng curl:**

```powershell
# Test 1: Test route đơn giản
Invoke-WebRequest -Uri "http://localhost:3000/api/test" -Method GET

# Test 2: Theme API GET
Invoke-WebRequest -Uri "http://localhost:3000/api/theme" -Method GET

# Test 3: Theme API POST (cần API key)
$body = @{
    color = "#FF0000"
    apiKey = "your-secret-api-key-here"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/theme" -Method POST -Body $body -ContentType "application/json"
```

## 🔍 Debug Thêm

### Kiểm tra Next.js có detect route không

Khi start server, xem console có dòng này không:
```
Route (pages)              Size     First Load JS
├ ○ /api/test              123 B    1.2 kB
├ ○ /api/theme             456 B    1.5 kB
```

Nếu không thấy, có thể:
1. **TypeScript compile error** - Xem console có lỗi đỏ không
2. **File không được detect** - Kiểm tra lại đường dẫn file
3. **Next.js version issue** - Kiểm tra `package.json`

### Kiểm tra TypeScript Compile

```powershell
cd visaapp
npx tsc --noEmit
```

Nếu có lỗi, sửa trước khi restart server.

### Kiểm tra Next.js Version

```powershell
cd visaapp
npm list next
```

Cần >= 12.0.0 (bạn đang dùng 14.2.3 ✅)

## 💡 Giải Pháp Khác

### Nếu vẫn 404 sau tất cả các bước trên:

1. **Xóa hết và tạo lại route đơn giản:**

```typescript
// pages/api/test-simple.ts
export default function handler(req: any, res: any) {
  res.status(200).json({ message: 'OK' });
}
```

2. **Kiểm tra có middleware nào chặn không:**
   - Xem có file `middleware.ts` trong root không
   - Xem `next.config.js` có redirect/rewrite chặn `/api` không

3. **Thử port khác:**
   - Có thể port 3000 đang bị conflict
   - Thử: `npm run dev -- -p 3001`

## 📝 Checklist

- [ ] Đã chạy `npm run lint` - không có lỗi
- [ ] Đã xóa `.next` folder
- [ ] File `pages/api/theme.ts` tồn tại
- [ ] File `pages/api/test.ts` tồn tại
- [ ] Đã restart server
- [ ] Đã đợi server compile xong
- [ ] Đã test `/api/test` trước
- [ ] Đã test `/api/theme`
- [ ] Đã kiểm tra console không có lỗi đỏ

## 🚨 Nếu Vẫn Không Hoạt Động

Vui lòng cung cấp:
1. Console output khi start server
2. Kết quả của `npm run lint`
3. Kết quả của `npx tsc --noEmit`
4. Response khi gọi `http://localhost:3000/api/test`

