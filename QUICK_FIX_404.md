# 🔧 Quick Fix - Lỗi 404 API Theme

## Vấn đề

API `/api/theme` trả về 404.

## ✅ Giải pháp nhanh

### Bước 1: Kiểm tra route nào đang hoạt động

Dự án này dùng **App Router** (Next.js 14), nên API route phải nằm trong:
- ✅ `app/api/theme/route.ts` (App Router) - **Đã tạo**
- ⚠️ `pages/api/theme.ts` (Pages Router) - Cũng đã tạo nhưng có thể không hoạt động nếu App Router được ưu tiên

### Bước 2: Restart Server

```bash
# 1. Dừng server (Ctrl+C)
# 2. Xóa cache
cd visaapp
rm -rf .next
rm -rf node_modules/.cache

# 3. Restart
npm run dev
```

### Bước 3: Test theo thứ tự

```bash
# Test App Router (nên hoạt động)
curl http://localhost:3000/api/test

# Test App Router theme API
curl http://localhost:3000/api/theme

# Nếu không hoạt động, thử Pages Router
curl http://localhost:3000/api/theme
```

## 📂 Cấu trúc File

```
visaapp/
├── app/
│   └── api/
│       ├── theme/
│       │   └── route.ts  ✅ App Router (Next.js 14)
│       └── test/
│           └── route.ts  ✅ Test route
└── pages/
    └── api/
        ├── theme.ts      ⚠️ Pages Router (backup)
        └── test.ts       ⚠️ Test route (backup)
```

## 🔍 Debug

1. **Kiểm tra console khi start server:**
   - Xem có compile `/api/theme` không
   - Xem có lỗi gì không

2. **Kiểm tra file tồn tại:**
   ```bash
   # Windows PowerShell
   Test-Path app\api\theme\route.ts
   Test-Path pages\api\theme.ts
   ```

3. **Test route đơn giản:**
   ```bash
   curl http://localhost:3000/api/test
   ```
   Nếu `/api/test` hoạt động nhưng `/api/theme` không, có thể có lỗi trong code theme route.

## ⚡ Giải pháp nhanh nhất

**Restart server với cache cleared:**

```bash
cd visaapp
rm -rf .next
npm run dev
```

Sau đó test ngay:
```bash
curl http://localhost:3000/api/theme
```

---

**Lưu ý:** Với Next.js 14, App Router (`app/api/theme/route.ts`) được ưu tiên hơn Pages Router. Hãy đảm bảo route trong App Router hoạt động.

