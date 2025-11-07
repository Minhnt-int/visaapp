# Phân tích Gánh Nặng Bộ Nhớ khi Static Generation

## 🎯 Câu trả lời ngắn gọn

**Có, gánh nặng bộ nhớ chủ yếu đặt lên RAM của máy đang chạy build/development server.**

## 📊 Chi tiết theo từng giai đoạn

### 1. **Build Time** (`npm run build`)

#### **RAM của máy build:**
- **In-memory cache** (code hiện tại):
  ```typescript
  // visaapp/lib/api.ts
  const metaJsonCache = new Map<string, { data: any; timestamp: number }>();
  const pageMetaCache = new Map<string, { data: BackendMeta | null; timestamp: number }>();
  ```
  - Lưu trong RAM của Node.js process
  - Tự động giải phóng sau khi build xong

- **Next.js build process:**
  - Compile React components → RAM
  - Render từng page → RAM tạm thời
  - Generate HTML files → RAM → Disk
  - Bundle JavaScript → RAM → Disk

- **API responses:**
  - Mỗi API call lưu response trong RAM
  - Sau khi render xong, giải phóng

**Ước tính RAM sử dụng:**
```
- Node.js process: ~200-500 MB
- Build cache: ~50-200 MB
- API responses: ~10-50 MB (tùy số lượng pages)
- Component rendering: ~100-300 MB
─────────────────────────────────────
Tổng: ~400-1000 MB (0.4-1 GB)
```

### 2. **Runtime** (`npm run start` hoặc production)

#### **RAM của server:**
- **Static files** đã được generate:
  - Lưu trên **Disk** (`.next/static/`, `.next/server/`)
  - Không chiếm RAM trừ khi được load

- **Next.js server process:**
  - Serve static HTML files từ disk
  - Cache metadata trong RAM (nếu có)
  - Minimal RAM usage (~100-300 MB)

#### **Disk storage:**
```
.next/
├── static/          # Static assets (JS, CSS, images)
├── server/          # Server-side code & HTML
│   ├── app/         # Pre-rendered HTML pages
│   └── pages/       # API routes
└── cache/           # Build cache
```

**Ước tính Disk:**
- Build output: ~50-200 MB (tùy số lượng pages)
- Static assets: ~10-50 MB
- Total: ~60-250 MB

### 3. **Development Mode** (`npm run dev`)

#### **RAM của máy dev:**
- **Hot reload cache:**
  - Fast Refresh cache
  - Module cache
  - ~200-500 MB

- **In-memory cache** (giống build time):
  - `metaJsonCache` và `pageMetaCache`
  - Tồn tại trong suốt quá trình dev

**Tổng RAM dev: ~400-800 MB**

## 🔍 So sánh: Static vs Dynamic Rendering

### **Static Generation (SSG)**
```
Build Time:
├── RAM: ~400-1000 MB (tạm thời, chỉ khi build)
└── Disk: ~60-250 MB (sau khi build)

Runtime:
├── RAM: ~100-300 MB (server process)
└── Disk: ~60-250 MB (static files)
```

### **Dynamic Rendering (SSR)**
```
Runtime (mỗi request):
├── RAM: ~50-200 MB per request (tạm thời)
└── Disk: Minimal (không pre-render)
```

**Kết luận:** Static generation **chuyển gánh nặng từ runtime sang build time**.

## 📈 Memory Usage Breakdown

### **Khi build (Build Time)**

```
┌─────────────────────────────────────────┐
│  Node.js Process (RAM)                  │
│  ├── Next.js Build System: ~200 MB       │
│  ├── Webpack/Bundler: ~150 MB          │
│  ├── React Compiler: ~100 MB           │
│  ├── In-Memory Cache:                   │
│  │   ├── metaJsonCache: ~5-20 MB        │
│  │   └── pageMetaCache: ~5-20 MB        │
│  ├── API Responses: ~10-50 MB          │
│  └── Component Trees: ~50-200 MB       │
│                                         │
│  Total RAM: ~400-1000 MB                │
└─────────────────────────────────────────┘
         ↓ (sau khi build xong)
┌─────────────────────────────────────────┐
│  Disk Storage                            │
│  ├── .next/static/: ~20-80 MB           │
│  ├── .next/server/: ~30-150 MB          │
│  └── .next/cache/: ~10-20 MB            │
│                                         │
│  Total Disk: ~60-250 MB                 │
└─────────────────────────────────────────┘
```

### **Khi serve (Runtime)**

```
┌─────────────────────────────────────────┐
│  Production Server (RAM)                 │
│  ├── Next.js Server: ~100-200 MB        │
│  ├── Node.js Runtime: ~50-100 MB       │
│  └── Request Cache: ~10-50 MB          │
│                                         │
│  Total RAM: ~160-350 MB                 │
└─────────────────────────────────────────┘
         ↓ (read từ)
┌─────────────────────────────────────────┐
│  Disk Storage (Static Files)             │
│  ├── HTML files: ~5-50 MB               │
│  ├── JS bundles: ~10-30 MB              │
│  └── CSS files: ~1-5 MB                 │
│                                         │
│  Total Disk: ~16-85 MB (read-only)      │
└─────────────────────────────────────────┘
```

## ⚠️ Vấn đề tiềm ẩn

### 1. **Memory Leak trong Build**
```typescript
// ❌ Vấn đề: Cache không bao giờ được clear
const metaJsonCache = new Map<string, { data: any; timestamp: number }>();
// Cache tồn tại suốt quá trình build
// Với 29 pages × 4-5 calls = có thể có 100+ entries
```

**Giải pháp hiện tại:**
- ✅ Cache có TTL (5 phút)
- ✅ Cache chỉ tồn tại trong 1 build session
- ✅ Tự động giải phóng khi build xong

### 2. **Disk Space**
- Mỗi static page tạo ra 1 HTML file
- 29 country pages → 29 HTML files
- Không ảnh hưởng nhiều (mỗi file ~10-50 KB)

### 3. **Build Time**
- RAM cao → có thể làm chậm build nếu RAM < 4GB
- Giải pháp: Tăng RAM hoặc giảm số pages render cùng lúc

## 🎯 Kết luận

### **Gánh nặng bộ nhớ:**

1. **Build Time:**
   - ✅ **RAM máy build**: ~400-1000 MB (tạm thời)
   - ✅ **Disk**: ~60-250 MB (sau khi build)

2. **Runtime:**
   - ✅ **RAM server**: ~160-350 MB (thấp hơn nhiều)
   - ✅ **Disk**: ~16-85 MB (read-only)

### **Lợi ích:**

- ✅ **Runtime nhẹ**: Server chỉ cần serve static files
- ✅ **Performance tốt**: Không cần render mỗi request
- ✅ **SEO tốt**: Pre-rendered HTML
- ✅ **Scalability**: Có thể serve từ CDN

### **Trade-off:**

- ⚠️ **Build time nặng**: Cần RAM cao khi build
- ⚠️ **Disk space**: Cần lưu trữ static files
- ⚠️ **Update chậm**: Phải rebuild khi data thay đổi

## 💡 Recommendations

1. **Build trên máy có RAM cao** (≥ 4GB recommended)
2. **Sử dụng CI/CD** để build trên cloud (không ảnh hưởng máy dev)
3. **Incremental Static Regeneration (ISR)** để giảm rebuild
4. **Monitor memory** trong build process
5. **Clear cache** nếu build bị lỗi memory

