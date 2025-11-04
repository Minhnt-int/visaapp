# 🎨 API Thay Đổi Màu Giao Diện

API endpoint để thay đổi màu sắc giao diện từ backend hoặc bất kỳ đâu thông qua HTTP request.

## 📍 Endpoint

```
GET /api/theme    - Lấy màu hiện tại
POST /api/theme   - Thay đổi màu mới
```

**⚠️ QUAN TRỌNG:** API route được đặt trong `pages/api/theme.ts` (Pages Router). 

**Nếu gặp lỗi 404, thực hiện:**
1. ✅ **RESTART dev server** (Ctrl+C rồi chạy lại `npm run dev`)
2. ✅ Xóa cache: `rm -rf .next` rồi restart
3. ✅ Kiểm tra file tồn tại tại: `pages/api/theme.ts`
4. ✅ Test route đơn giản: `curl http://localhost:3000/api/test` (file test.ts đã được tạo)

## 🔐 Bảo Mật

API yêu cầu API Key để đảm bảo chỉ có người có quyền mới có thể thay đổi màu.

### Thiết Lập

1. Tạo file `.env.local` hoặc `.env` trong thư mục `visaapp`:

```env
THEME_API_KEY=your-secret-api-key-here-change-this
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

2. Đặt API key ngẫu nhiên và bảo mật (khuyến nghị dùng ít nhất 32 ký tự)

## 📖 Sử Dụng

### GET - Lấy màu hiện tại

```bash
curl http://localhost:3000/api/theme
```

**Response:**
```json
{
  "success": true,
  "color": "#FCB53B",
  "message": "Lấy màu hiện tại thành công"
}
```

### POST - Thay đổi màu

```bash
curl -X POST http://localhost:3000/api/theme \
  -H "Content-Type: application/json" \
  -d '{
    "color": "#2563EB",
    "apiKey": "your-secret-api-key-here"
  }'
```

**Response thành công:**
```json
{
  "success": true,
  "color": "#2563EB",
  "message": "Màu đã được thay đổi thành công sang #2563EB",
  "output": "✅ Đã cập nhật app/globals.css\n..."
}
```

**Response lỗi:**
```json
{
  "success": false,
  "error": "Invalid API key"
}
```

## 💻 Ví Dụ Code

### JavaScript/TypeScript

```typescript
async function changeThemeColor(newColor: string) {
  const response = await fetch('/api/theme', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      color: newColor,
      apiKey: process.env.THEME_API_KEY || 'your-secret-key',
    }),
  });

  const result = await response.json();
  
  if (result.success) {
    console.log('Màu đã được thay đổi:', result.color);
    // Reload page để thấy thay đổi
    window.location.reload();
  } else {
    console.error('Lỗi:', result.error);
  }
}

// Sử dụng
changeThemeColor('#EF4444'); // Màu đỏ
```

### Python

```python
import requests

def change_theme_color(color, api_key):
    url = "http://your-domain.com/api/theme"
    payload = {
        "color": color,
        "apiKey": api_key
    }
    
    response = requests.post(url, json=payload)
    result = response.json()
    
    if result.get("success"):
        print(f"Màu đã được thay đổi: {result['color']}")
    else:
        print(f"Lỗi: {result.get('error')}")

# Sử dụng
change_theme_color("#2563EB", "your-secret-key")
```

### PHP

```php
<?php
function changeThemeColor($color, $apiKey) {
    $url = "http://your-domain.com/api/theme";
    $data = [
        "color" => $color,
        "apiKey" => $apiKey
    ];
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    $result = json_decode($response, true);
    
    if ($result['success']) {
        echo "Màu đã được thay đổi: " . $result['color'];
    } else {
        echo "Lỗi: " . $result['error'];
    }
}

// Sử dụng
changeThemeColor("#2563EB", "your-secret-key");
?>
```

## 🔄 Tự Động Reload Sau Khi Thay Đổi

Sau khi thay đổi màu thành công, bạn cần:

1. **Restart Next.js server** (nếu đang chạy dev):
   ```bash
   # Stop server (Ctrl+C) và chạy lại
   npm run dev
   ```

2. **Rebuild** (nếu production):
   ```bash
   npm run build
   npm run start
   ```

Hoặc có thể tạo thêm endpoint để trigger rebuild tự động (cần cẩn thận với bảo mật).

## 📝 Các Màu Phổ Biến

```json
{
  "color": "#2563EB"  // Blue
}
{
  "color": "#EF4444"  // Red
}
{
  "color": "#10B981"  // Green
}
{
  "color": "#8B5CF6"  // Purple
}
{
  "color": "#F97316"  // Orange
}
{
  "color": "#FCB53B"  // Yellow
}
```

## ⚠️ Lưu Ý

1. **API Key:** Không commit API key vào git. Sử dụng `.env.local` hoặc biến môi trường server.

2. **CORS:** Mặc định chỉ cho phép từ `localhost:3000`. Cập nhật `ALLOWED_ORIGINS` trong `.env` để thêm domain khác.

3. **Permissions:** Đảm bảo server có quyền đọc/ghi file trong thư mục `lib/` và `scripts/`.

4. **Backup:** Nên backup file `theme.config.ts` trước khi thay đổi màu qua API.

5. **Validation:** Màu phải đúng format HEX (ví dụ: `#FCB53B` hoặc `#FFF`).

## 🔧 Troubleshooting

### Lỗi 404 - Route không tìm thấy

**Nguyên nhân phổ biến:**
1. Dev server chưa được restart sau khi tạo file mới
2. File có lỗi TypeScript khiến Next.js không compile được

**Giải pháp:**
```bash
# 1. Dừng server (Ctrl+C)
# 2. Xóa cache
cd visaapp
rm -rf .next

# 3. Restart server
npm run dev

# 4. Test API đơn giản trước
curl http://localhost:3000/api/test

# 5. Nếu test.ts hoạt động, test theme API
curl http://localhost:3000/api/theme
```

**Nếu vẫn 404:**
- Kiểm tra console có lỗi TypeScript không
- Đảm bảo file `pages/api/theme.ts` export default function
- Xem file `TEST_API.md` để biết thêm chi tiết

### Lỗi "Invalid API key"
- Kiểm tra `THEME_API_KEY` trong `.env` đã đúng chưa
- Đảm bảo API key trong request khớp với `.env`

### Lỗi "Origin not allowed"
- Thêm domain vào `ALLOWED_ORIGINS` trong `.env`

### Lỗi khi sync theme
- Kiểm tra đã cài `ts-node` chưa: `npm install ts-node`
- Kiểm tra quyền ghi file trong thư mục dự án

### Màu không thay đổi sau khi gọi API
- Restart Next.js server
- Clear browser cache
- Kiểm tra console log để xem có lỗi gì không

---

**Chúc bạn sử dụng API thành công! 🚀**

