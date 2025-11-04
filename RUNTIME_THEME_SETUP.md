# 🎨 Hướng Dẫn Thay Đổi Theme Color Runtime (Không Cần Rebuild)

Giải pháp này cho phép thay đổi theme color trên project đã build mà **KHÔNG CẦN rebuild**.

## ✅ Cách Hoạt Động

1. **Inline Script**: Inject CSS variables ngay từ đầu trong `<head>` để tránh flash
2. **Runtime Component**: Backup fetch từ API để update sau khi page load
3. **localStorage Cache**: Lưu màu để load nhanh ở lần tải sau

## 🚀 Setup

### Bước 1: Set Environment Variable

Thêm vào file `.env.local` hoặc `.env.production`:

```env
NEXT_PUBLIC_BACKEND_URL=http://your-backend-domain.com:3002
```

**Hoặc nếu backend và frontend cùng domain:**
```env
NEXT_PUBLIC_BACKEND_URL=https://your-domain.com
```

### Bước 2: Build lại (CHỈ LẦN ĐẦU)

Chỉ cần build lại **1 lần** để include component mới:

```bash
npm run build
```

Sau đó deploy. Từ bây giờ có thể thay đổi theme mà **KHÔNG CẦN rebuild lại**.

## 🎨 Cách Thay Đổi Theme Color (Sau Khi Đã Deploy)

### Option 1: Qua Admin Panel (Nếu có)

1. Đăng nhập admin panel
2. Vào phần Settings > Theme Color
3. Chọn màu mới và Save
4. Frontend tự động load màu mới!

### Option 2: Qua API (Manual)

**Lấy màu hiện tại:**
```bash
curl http://your-backend-domain.com:3002/api/theme
```

**Thay đổi màu mới:**
```bash
curl -X POST http://your-backend-domain.com:3002/api/theme \
  -H "Content-Type: application/json" \
  -H "x-admin-key: your-admin-api-key" \
  -d '{"color": "#2563EB"}'
```

**Hoặc với JWT token:**
```bash
curl -X POST http://your-backend-domain.com:3002/api/theme \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"color": "#10B981"}'
```

### Option 3: Qua Database (Direct)

Nếu có quyền truy cập database:

```sql
UPDATE meta_json 
SET meta_data = JSON_SET(meta_data, '$.color', '#2563EB')
WHERE page_key = 'theme-color';
```

## 🔄 Cách Frontend Load Màu

1. **Inline Script** (trong `<head>`):
   - Chạy NGAY khi page load
   - Lấy từ localStorage trước (cache)
   - Sau đó fetch từ API để update

2. **ThemeColorRuntime Component**:
   - Chạy sau khi React mount
   - Backup fetch từ API
   - Apply vào CSS variables

3. **localStorage**:
   - Lưu màu để load nhanh lần sau
   - Tự động clear khi có màu mới

## ⚡ Clear Cache Browser

Sau khi thay đổi theme, user cần:

**Option A: Hard Reload**
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

**Option B: Clear localStorage**
```javascript
// Chạy trong browser console
localStorage.removeItem('theme_color');
location.reload();
```

**Option C: Clear Service Worker**
1. DevTools > Application > Service Workers
2. Click "Unregister"
3. Reload page

## 🐛 Troubleshooting

### Màu không thay đổi?

1. **Kiểm tra API hoạt động:**
   ```bash
   curl http://your-backend-domain.com:3002/api/theme
   ```
   Phải trả về `{"success": true, "color": "#..."}`

2. **Kiểm tra Environment Variable:**
   ```bash
   # Trong browser console
   console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
   ```

3. **Kiểm tra Console:**
   - Mở DevTools > Console
   - Xem có error nào không
   - Xem log "Theme color đã được cập nhật"

4. **Kiểm tra Network:**
   - DevTools > Network
   - Tìm request đến `/api/theme`
   - Xem response có đúng không

### CORS Error?

Nếu gặp CORS error, thêm vào backend `.env`:
```env
CORS_ORIGIN=https://your-frontend-domain.com
```

### Màu flash (trắng rồi mới có màu)?

- Inline script đã handle việc này
- Nếu vẫn flash, có thể do CSS load chậm
- Cân nhắc thêm `<style>` inline trong `<head>`

## 📝 Lưu Ý

1. **Build lần đầu**: Cần build lại 1 lần để include component mới
2. **Sau đó**: KHÔNG CẦN rebuild khi đổi màu
3. **Browser Cache**: User có thể cần hard reload lần đầu
4. **Service Worker**: Có thể cache, cần update version trong `sw.js`
5. **Production**: Đảm bảo `NEXT_PUBLIC_BACKEND_URL` được set đúng

## 🎯 Ví Dụ Màu Phổ Biến

```bash
# Màu xanh dương
curl -X POST http://localhost:3002/api/theme \
  -H "x-admin-key: your-key" \
  -H "Content-Type: application/json" \
  -d '{"color": "#2563EB"}'

# Màu xanh lá
curl -X POST http://localhost:3002/api/theme \
  -H "x-admin-key: your-key" \
  -H "Content-Type: application/json" \
  -d '{"color": "#10B981"}'

# Màu đỏ
curl -X POST http://localhost:3002/api/theme \
  -H "x-admin-key: your-key" \
  -H "Content-Type: application/json" \
  -d '{"color": "#EF4444"}'

# Màu cam
curl -X POST http://localhost:3002/api/theme \
  -H "x-admin-key: your-key" \
  -H "Content-Type: application/json" \
  -d '{"color": "#F97316"}'
```

## ✅ Checklist

- [ ] Đã set `NEXT_PUBLIC_BACKEND_URL` trong `.env`
- [ ] Đã build lại 1 lần để include component mới
- [ ] Đã deploy lên VPS
- [ ] Đã test API `/api/theme` hoạt động
- [ ] Đã test thay đổi màu qua API
- [ ] Đã clear browser cache và reload
- [ ] Màu đã được apply thành công

