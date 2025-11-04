# 🔧 Hướng Dẫn Test API Theme

## ⚠️ Lỗi 404 - Nguyên nhân và cách xử lý

### 1. **Restart Dev Server (Quan trọng nhất!)**

Sau khi tạo file `pages/api/theme.ts` mới, **BẮT BUỘC** phải restart Next.js dev server:

```bash
# Dừng server (Ctrl+C)
# Sau đó chạy lại
cd visaapp
npm run dev
```

### 2. **Kiểm tra file đã được tạo đúng**

Đảm bảo file tồn tại tại: `visaapp/pages/api/theme.ts`

### 3. **Kiểm tra lỗi TypeScript**

```bash
cd visaapp
npx tsc --noEmit pages/api/theme.ts
```

### 4. **Test API bằng curl**

```bash
# Test GET
curl http://localhost:3000/api/theme

# Test POST (với API key mặc định)
curl -X POST http://localhost:3000/api/theme \
  -H "Content-Type: application/json" \
  -d '{"color":"#2563EB","apiKey":"your-secret-api-key-here"}'
```

### 5. **Kiểm tra Console Logs**

Xem terminal chạy `npm run dev` có lỗi gì không. Next.js sẽ hiển thị:
- `✓ Compiled /api/theme in XXXms` - Nếu thành công
- `✗ Error` - Nếu có lỗi

### 6. **Nếu vẫn lỗi 404, thử:**

#### Option A: Xóa cache và rebuild

```bash
cd visaapp
rm -rf .next
npm run dev
```

#### Option B: Kiểm tra Next.js version

```bash
cd visaapp
npm list next
```

Cần Next.js >= 12.0.0 để hỗ trợ Pages Router API routes.

#### Option C: Tạo file test đơn giản

Tạo file `pages/api/test.ts`:

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'API works!' });
}
```

Test: `curl http://localhost:3000/api/test`

Nếu test.ts hoạt động nhưng theme.ts không, có thể có lỗi trong code theme.ts.

## 🔍 Debug Steps

1. ✅ File tồn tại tại `pages/api/theme.ts`
2. ✅ File export default function handler
3. ✅ Không có lỗi TypeScript
4. ✅ Server đã được restart
5. ✅ Không có lỗi trong console
6. ✅ Next.js version >= 12

## 💡 Lưu ý

- Routes trong `pages/api/` tự động được Next.js nhận diện
- Không cần config đặc biệt trong `next.config.js`
- Route sẽ có path: `/api/theme` (không cần `.ts` extension)

---

**Nếu vẫn không hoạt động, hãy kiểm tra:**
1. Next.js version
2. TypeScript config
3. Console errors khi restart server

