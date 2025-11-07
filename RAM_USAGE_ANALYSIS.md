# Phân tích RAM Usage khi Generate Nhiều Static Pages

## 📊 Số lượng Static Pages hiện tại

### **Tính toán số pages:**

```
1. Country Pages (Visa):
   - generateStaticParams() → getAllServices()
   - ~29 country pages (từ database)

2. News Pages:
   - generateStaticParams() → getNews({ limit: 10 })
   - 10 news pages

3. Tour Pages:
   - generateStaticParams() → getTours({ limit: 1000 }) ⚠️
   - Up to 1000 tour pages (NẾU CÓ 1000 TOURS!)

4. Static Pages:
   - Home, Dich-vu, Tour-du-lich, Tin-tuc, Lien-he
   - 4 continent pages
   - ~10-15 static pages

TỔNG: ~29 + 10 + (up to 1000) + 15 = ~1050+ pages (worst case)
```

## ⚠️ Vấn đề tiềm ẩn: Tour Pages

```typescript
// app/tour-du-lich/[tourSlug]/page.tsx
export async function generateStaticParams() {
  const toursResponse = await getTours({ limit: 1000 }); // ⚠️
  // ...
}
```

**Vấn đề:**
- Nếu có 1000 tours → tạo 1000 static pages
- Mỗi tour có thể có data lớn (itinerary, images, etc.)
- RAM usage có thể rất cao!

## 💾 RAM Usage Breakdown

### **1. Build Time RAM Usage:**

#### **A. Data Fetching:**
```
- getAllServices() → ~29 services
  ├── Mỗi service: ~5-10 KB
  └── Total: ~150-300 KB

- getTours({ limit: 1000 }) → Up to 1000 tours
  ├── Mỗi tour: ~10-50 KB (có itinerary, images, etc.)
  └── Total: ~10-50 MB ⚠️

- getNews({ limit: 10 }) → 10 news
  ├── Mỗi news: ~5-20 KB
  └── Total: ~50-200 KB

Total Data in RAM: ~10-50 MB
```

#### **B. Page Rendering (Next.js không render tất cả cùng lúc):**

Next.js **không render tất cả pages cùng lúc**, mà render **từng batch**:

```
Next.js Build Process:
├── Render pages in batches (parallel)
│   ├── Batch 1: ~10-20 pages cùng lúc
│   ├── Batch 2: ~10-20 pages tiếp theo
│   └── ... (lặp lại)
│
├── Mỗi page trong RAM khi render:
│   ├── React component tree: ~100-500 KB
│   ├── API responses: ~5-50 KB
│   ├── HTML generation: ~50-200 KB
│   └── Total per page: ~200-800 KB
│
└── RAM usage per batch: 
    └── 10-20 pages × 200-800 KB = 2-16 MB per batch
```

#### **C. Next.js Build System:**
```
- Next.js build process: ~200-500 MB
- Webpack/Bundler: ~150-300 MB
- React Compiler: ~100-200 MB
- Build cache: ~50-200 MB
```

#### **D. In-Memory Cache (code hiện tại):**
```
- metaJsonCache: ~5-20 MB (tùy số lượng pageKeys)
- pageMetaCache: ~5-20 MB
```

### **2. Total RAM Usage Estimate:**

```
┌─────────────────────────────────────────┐
│  Build Time RAM Usage:                 │
│  ├── Next.js Build System: ~500 MB     │
│  ├── Data Fetching: ~10-50 MB         │
│  ├── Page Rendering (per batch):       │
│  │   └── 2-16 MB (chỉ 1 batch tại 1 thời điểm) │
│  ├── Build Cache: ~200 MB             │
│  └── In-Memory Cache: ~20 MB          │
│                                         │
│  PEAK RAM: ~750-800 MB (worst case)   │
│  NORMAL RAM: ~400-600 MB              │
└─────────────────────────────────────────┘
```

## ✅ Tại sao không quá tải RAM?

### **1. Next.js Batch Rendering:**
Next.js **KHÔNG render tất cả pages cùng lúc**:
- Render từng batch nhỏ (~10-20 pages)
- Sau khi render xong → ghi vào disk → giải phóng RAM
- Render batch tiếp theo

### **2. Data được giải phóng sau khi render:**
```typescript
// Next.js process:
1. Fetch data → RAM (~10-50 MB)
2. Render batch 1 → RAM (~2-16 MB)
3. Write to disk → Giải phóng RAM
4. Render batch 2 → RAM (~2-16 MB)
5. Write to disk → Giải phóng RAM
...
```

### **3. Garbage Collection:**
- Node.js tự động giải phóng RAM không dùng
- Sau mỗi batch → GC cleanup

## ⚠️ Vấn đề thực sự: Tour Limit 1000

### **Vấn đề:**
```typescript
// app/tour-du-lich/[tourSlug]/page.tsx
export async function generateStaticParams() {
  const toursResponse = await getTours({ limit: 1000 }); // ⚠️
  // Nếu có 1000 tours → 1000 pages
  // Mỗi tour có data lớn → RAM cao khi fetch
}
```

### **Giải pháp:**

#### **Option 1: Giới hạn số lượng tours pre-render**
```typescript
export async function generateStaticParams() {
  // Chỉ pre-render top 50 tours (hot tours)
  const toursResponse = await getTours({ 
    limit: 50,  // ✅ Giảm từ 1000 xuống 50
    isHot: true // Chỉ lấy tours hot
  });
  
  return toursResponse.data.map((tour) => ({
    tourSlug: tour.slug,
  }));
}
```

#### **Option 2: Sử dụng ISR (Incremental Static Regeneration)**
```typescript
// Chỉ pre-render một số tours, các tours khác render on-demand
export const revalidate = 3600; // Revalidate mỗi giờ

export async function generateStaticParams() {
  // Chỉ pre-render top 20 tours
  const toursResponse = await getTours({ limit: 20 });
  return toursResponse.data.map((tour) => ({
    tourSlug: tour.slug,
  }));
}
```

#### **Option 3: Dynamic Route với fallback**
```typescript
// Không pre-render tất cả, chỉ render khi cần
export const dynamicParams = true; // Allow dynamic params
export const dynamic = 'force-dynamic'; // Or use ISR
```

## 🎯 Kết luận và Khuyến nghị

### **RAM Usage hiện tại:**

| Scenario | Peak RAM | Normal RAM | Ghi chú |
|----------|----------|------------|---------|
| **Current (29 countries + 10 news + 1000 tours)** | ~800 MB | ~600 MB | ⚠️ Nếu có 1000 tours |
| **Optimized (29 countries + 10 news + 50 tours)** | ~600 MB | ~400 MB | ✅ Recommended |

### **Khuyến nghị:**

1. ✅ **Giảm tour limit** từ 1000 xuống 50-100:
   ```typescript
   limit: 50  // Chỉ pre-render top tours
   ```

2. ✅ **Sử dụng ISR** cho tours:
   ```typescript
   export const revalidate = 3600;
   ```

3. ✅ **Pre-render chỉ hot/popular content**:
   - Countries: ✅ Pre-render tất cả (29 pages - OK)
   - News: ✅ Pre-render top 10 (10 pages - OK)
   - Tours: ⚠️ Chỉ pre-render top 50-100 (giảm từ 1000)

4. ✅ **Monitor RAM trong build**:
   ```bash
   # Check RAM usage
   node --max-old-space-size=2048 node_modules/.bin/next build
   ```

### **Với RAM giới hạn (< 4GB):**

**An toàn:**
- ✅ 29 countries + 10 news + 50 tours = ~400-600 MB RAM
- ✅ Build time: ~5-10 phút
- ✅ Không quá tải RAM

**Nguy hiểm:**
- ⚠️ 29 countries + 10 news + 1000 tours = ~600-800 MB RAM
- ⚠️ Build time: ~30-60 phút
- ⚠️ Có thể gần giới hạn RAM

## 💡 Giải pháp tối ưu

### **1. Giới hạn Tour Pre-render:**

```typescript
// app/tour-du-lich/[tourSlug]/page.tsx
export async function generateStaticParams() {
  try {
    // Chỉ pre-render top 50 tours (hot tours)
    const toursResponse = await getTours({ 
      limit: 50,        // ✅ Giảm từ 1000
      isHot: true,      // Chỉ lấy tours hot
      sortBy: 'popular' // Sort by popularity
    });
    
    return toursResponse.data.map((tour) => ({
      tourSlug: tour.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for tours:', error);
    return [];
  }
}

// Sử dụng ISR cho các tours khác
export const revalidate = 3600; // 1 hour
```

### **2. Tăng Node.js Memory Limit (nếu cần):**

```json
// package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=2048' next build"
  }
}
```

### **3. Build trên CI/CD (Recommended):**

- Build trên cloud (GitHub Actions, Vercel, etc.)
- Không ảnh hưởng máy local
- RAM không giới hạn

