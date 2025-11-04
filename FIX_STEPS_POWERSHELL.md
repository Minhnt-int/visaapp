# ⚡ Hướng Dẫn Sửa Lỗi 404 - PowerShell

## Bước 1: Dừng Server
Nhấn `Ctrl+C` trong terminal đang chạy server.

## Bước 2: Xóa Cache và Restart

```powershell
# Di chuyển đến thư mục dự án
cd d:\minh\ws\visaapp

# Xóa cache Next.js
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Restart server
npm run dev
```

## Bước 3: Đợi Server Compile

Xem console output, tìm dòng:
```
✓ Compiled /api/simple in XXXms
```
hoặc
```
Route (pages)              Size     First Load JS
├ ○ /api/simple            ...
├ ○ /api/test              ...
├ ○ /api/theme             ...
```

## Bước 4: Test Ngay

Mở browser và truy cập:
- http://localhost:3000/api/simple
- http://localhost:3000/api/test  
- http://localhost:3000/api/theme

Hoặc dùng PowerShell:
```powershell
# Test route đơn giản nhất
Invoke-RestMethod -Uri "http://localhost:3000/api/simple"

# Test route test
Invoke-RestMethod -Uri "http://localhost:3000/api/test"

# Test theme API
Invoke-RestMethod -Uri "http://localhost:3000/api/theme"
```

## Nếu Vẫn 404

Chạy lệnh này để kiểm tra TypeScript:
```powershell
cd d:\minh\ws\visaapp
npx tsc --noEmit pages/api/simple.ts
```

Nếu có lỗi, báo lại.

## Kiểm Tra File Tồn Tại

```powershell
cd d:\minh\ws\visaapp
Get-ChildItem pages\api\*.ts | Select-Object Name
```

Phải thấy:
- simple.ts
- test.ts
- theme.ts

