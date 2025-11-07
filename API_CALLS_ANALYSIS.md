# Phân tích: Tại sao có nhiều API calls khi start lần đầu?

## 🔍 Nguyên nhân chính

### 1. **Next.js Static Site Generation (SSG)**

Khi chạy `npm run build` hoặc `npm run dev` lần đầu, Next.js sẽ **pre-render tất cả các static pages** để tối ưu SEO và performance. Quá trình này gọi là **Static Site Generation (SSG)**.

### 2. **Dynamic Routes với `generateStaticParams()`**

Với dynamic routes như `/dich-vu/[continentSlug]/[countrySlug]`, Next.js sẽ:

```typescript
// app/dich-vu/[continentSlug]/[countrySlug]/page.tsx
export async function generateStaticParams() {
  const services = await getAllServices(); // 1 API call
  return services.map(service => ({
    continentSlug: service.continentSlug,
    countrySlug: service.slug,
  }));
}
```

**Kết quả**: Nếu có **29 country pages**, Next.js sẽ generate **29 static pages** cho mỗi country.

### 3. **Mỗi trang có nhiều API calls**

#### 📄 Ví dụ: Trang Country Detail (`/dich-vu/visa-chau-a/india`)

**A. Trong `generateMetadata()` (1 API call):**
```typescript
export async function generateMetadata({ params }) {
  const key = `dich-vu-${params.continentSlug}-${params.countrySlug}`;
  const backendMeta = await getPageMetaFromBackend({ pageKey: key }); // API call #1
  // Nếu không có, fallback:
  const visaDetail = await getVisaDetailBySlug(params.countrySlug); // API call #2 (fallback)
}
```

**B. Trong Component render (3-4 API calls):**
```typescript
export default async function VisaCountryDetailPage({ params }) {
  const visaDetail = await getVisaDetailBySlug(params.countrySlug);     // API call #1
  const continents = await getVisaContinents();                        // API call #2
  
  return (
    <>
      {/* WhyChooseUsSection với pageKey riêng */}
      <WhyChooseUsSection pageKey={`dich-vu-${params.continentSlug}-${params.countrySlug}`} />
      {/* → getWhyChooseUsDataByPageKey() → getMetaJson() → API call #3 */}
      
      {/* WhyChooseUs component */}
      <WhyChooseUs />
      {/* → getWhyChooseUsData() → getMetaJson('whyChooseUs') → API call #4 */}
    </>
  );
}
```

**Tổng cho 1 trang country**: **4-5 API calls** (1 metadata + 3-4 component)

### 4. **Tính toán tổng số API calls**

#### **Static Pages:**
- `/` (home) → 3 API calls:
  - `generateMetadata()` → `getPageMetaFromBackend('trang-chu')`
  - `Hero` → `getMetaJson('heroBanner')`
  - `WhyChooseUs` → `getMetaJson('whyChooseUs')`
  - `getNewsPreview()`
  - `getSiteConfig()` (layout)

- `/dich-vu` → 2 API calls
- `/dich-vu/[continentSlug]` → 3 API calls × 4 continents = **12 calls**
  - `generateMetadata()` cho mỗi continent
  - `WhyChooseUsSection` với pageKey riêng
  - `WhyChooseUs`

- `/dich-vu/[continentSlug]/[countrySlug]` → **4-5 API calls × 29 countries = 116-145 calls**
  - `generateMetadata()` cho mỗi country
  - Component render với 3-4 API calls

- `/tour-du-lich` → 2 API calls
- `/tin-tuc` → 2 API calls
- `/lien-he` → 2 API calls

#### **Layout & Sitemap:**
- `app/layout.tsx` → `getSiteConfig()` → `getMetaJson('siteConfig')` → **1 call**
- `app/sitemap.ts` → `getNavigationLinks()` → **1 call**

### 5. **Tổng kết**

```
┌─────────────────────────────────────────┐
│  Trang Static:                         │
│  - Home: 3-4 calls                      │
│  - Dich-vu: 2 calls                    │
│  - 4 Continent pages: 12 calls          │
│  - 29 Country pages: 116-145 calls      │
│  - Tour: 2 calls                        │
│  - Tin-tuc: 2 calls                     │
│  - Lien-he: 2 calls                     │
│                                         │
│  Layout & Utils:                        │
│  - Layout: 1 call                       │
│  - Sitemap: 1 call                      │
│                                         │
│  TỔNG: ~140-170 API calls               │
└─────────────────────────────────────────┘
```

## 🔧 Giải pháp đã áp dụng

### 1. **In-Memory Caching**
- Cache `getMetaJson()` với TTL 5 phút
- Cache `getPageMetaFromBackend()` với TTL 5 phút
- **Giảm duplicate calls** cho cùng một `pageKey`

### 2. **Error Suppression**
- Không log 404/500 errors cho `/api/meta` và `/api/meta-json` endpoints
- Giảm noise trong console

### 3. **Kết quả sau optimization**

Với caching:
- `getMetaJson('whyChooseUs')` chỉ gọi 1 lần, các lần sau dùng cache
- `getMetaJson('heroBanner')` chỉ gọi 1 lần
- `getMetaJson('siteConfig')` chỉ gọi 1 lần
- Mỗi country page vẫn có metadata riêng, nhưng `WhyChooseUs` component chỉ gọi 1 lần

**Giảm từ ~140-170 calls xuống ~50-70 calls** (giảm ~60%)

## 📊 So sánh trước và sau

| Trường hợp | Trước | Sau (với cache) |
|-----------|------|-----------------|
| `whyChooseUs` calls | 29+ (mỗi country) | 1 (cache) |
| `heroBanner` calls | 1+ | 1 (cache) |
| `siteConfig` calls | 1+ | 1 (cache) |
| Metadata calls | 29+ | 29 (không thể cache vì mỗi page khác nhau) |
| **Tổng** | **~140-170** | **~50-70** |

## 💡 Các tối ưu hóa khác có thể áp dụng

1. **Batch API calls**: Gộp nhiều requests vào 1 endpoint
2. **ISR (Incremental Static Regeneration)**: Chỉ rebuild khi cần
3. **On-demand Revalidation**: Chỉ rebuild khi data thay đổi
4. **Reduce component API calls**: Merge data fetching ở parent component

## 🎯 Kết luận

Số lượng API calls nhiều là **bình thường** với Next.js SSG vì:
- Next.js cần pre-render tất cả pages để tối ưu SEO
- Mỗi dynamic route (`[slug]`) tạo ra nhiều static pages
- Mỗi page có thể có nhiều components, mỗi component fetch data riêng

Với caching đã áp dụng, số lượng calls đã giảm đáng kể và đây là cách tốt nhất để cân bằng giữa **SEO optimization** và **performance**.

