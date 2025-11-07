# Tại sao API calls và console.log xuất hiện khi `npm start`?

## 🔍 Nguyên nhân chính

### 1. **Next.js không phải là Pure Static Export**

Bạn đang dùng `output: 'standalone'` trong `next.config.js`, không phải `output: 'export'`:

```javascript
// next.config.js
output: 'standalone',  // ❌ Không phải static export
```

**Điều này có nghĩa:**
- Next.js vẫn chạy **server process** khi `npm start`
- Server có thể **re-render pages** trong một số trường hợp
- Không phải là pure static HTML files

### 2. **Server-Side Rendering (SSR) trong Runtime**

Ngay cả với static generation, Next.js vẫn có thể render lại trên server:

#### **A. Dynamic Routes không được pre-render:**
```typescript
// app/dich-vu/[continentSlug]/[countrySlug]/page.tsx
export async function generateStaticParams() {
  // Chỉ pre-render các routes được định nghĩa ở đây
  // Nếu có route mới hoặc không match → sẽ render ở runtime
}
```

#### **B. ISR (Incremental Static Regeneration):**
- Next.js có thể regenerate pages trên demand
- Revalidate khi data thay đổi

#### **C. Server Components vẫn chạy trên server:**
```typescript
// app/dich-vu/[continentSlug]/[countrySlug]/page.tsx
export default async function VisaCountryDetailPage({ params }) {
  const visaDetail = await getVisaDetailBySlug(params.countrySlug); // ✅ Chạy trên server
  console.log(visaDetail); // ✅ In ra server console
  // ...
}
```

**Console.log trong server components** → Hiển thị ở **server terminal**, không phải browser console.

### 3. **Client Components gọi API ở Runtime**

#### **VisaDataContext là Client Component:**
```typescript
// contexts/VisaDataContext.tsx
'use client';  // ⚠️ Client component

export function VisaDataProvider({ children }) {
  useEffect(() => {
    loadData(); // ✅ Chạy mỗi khi component mount
  }, []);
  
  const loadData = async () => {
    // Gọi API mỗi khi trang load
    const [visaCatsRes, countriesRes, newsPreviewData, contactInfoData, navItemData] = 
      await Promise.all([
        getVisaContinents(),        // API call
        getServices({ limit: 10 }), // API call
        getNewsPreview(),            // API call
        getContactInfo(),            // API call
        getNavigationLinks()         // API call
      ]);
  };
}
```

**Vấn đề:**
- `VisaDataContext` được wrap trong `layout.tsx`
- Mỗi khi user navigate → component mount lại → gọi API lại
- **Không được pre-render** vì là client component

### 4. **Build vs Runtime**

#### **Build Time (`npm run build`):**
```
✅ Pre-render static pages
✅ Generate HTML files
✅ Console.log trong build process
❌ Client components KHÔNG chạy (chỉ compile)
```

#### **Runtime (`npm start`):**
```
✅ Server process chạy
✅ Serve static pages (nếu có)
✅ Server-side rendering cho dynamic routes
✅ Client components mount → gọi API
✅ Console.log trong server components → server console
```

## 📊 Flow khi `npm start`

### **Lần đầu tiên user truy cập:**

```
1. User request: /dich-vu/visa-chau-a/india
   ↓
2. Next.js Server:
   ├── Check nếu có static HTML → Serve ngay ✅
   └── Nếu không → Render server-side:
       ├── Run generateMetadata() → API call
       ├── Run component → API calls
       └── Generate HTML → Send to client
   ↓
3. Client nhận HTML
   ↓
4. Client hydrate React:
   ├── Mount VisaDataProvider (client component)
   ├── useEffect → loadData() → 5 API calls
   └── Console.log → Browser console
```

### **Console.log xuất hiện ở đâu?**

```
Server Components (Server):
├── app/dich-vu/[continentSlug]/[countrySlug]/page.tsx
│   └── console.log(visaDetail) → Server terminal ✅
├── app/layout.tsx
│   └── generateMetadata() → Server terminal ✅
└── components/Hero.tsx (server component)
    └── console.warn() → Server terminal ✅

Client Components (Browser):
├── contexts/VisaDataContext.tsx
│   └── console.error() → Browser console ✅
└── components/Header.tsx (client component)
    └── console.log() → Browser console ✅
```

## 🔧 Giải pháp

### **1. Loại bỏ console.log không cần thiết:**

```typescript
// app/dich-vu/[continentSlug]/[countrySlug]/page.tsx
export default async function VisaCountryDetailPage({ params }) {
  const visaDetail = await getVisaDetailBySlug(params.countrySlug);
  // ❌ Xóa console.log này
  // console.log(visaDetail);
  
  // ...
}
```

### **2. Tối ưu VisaDataContext:**

**Option A: Pre-fetch data trong layout (Server Component):**
```typescript
// app/layout.tsx
export default async function RootLayout({ children }) {
  // Pre-fetch data ở server
  const [navItem, contactInfo] = await Promise.all([
    getNavigationLinks(),
    getContactInfo()
  ]);
  
  return (
    <html>
      <body>
        <VisaDataProvider initialData={{ navItem, contactInfo }}>
          {children}
        </VisaDataProvider>
      </body>
    </html>
  );
}
```

**Option B: Chỉ fetch khi cần:**
```typescript
// contexts/VisaDataContext.tsx
export function VisaDataProvider({ children }) {
  // ❌ Không fetch tất cả ngay
  // ✅ Chỉ fetch khi component thực sự cần
  const loadData = async () => {
    // Lazy load
  };
}
```

### **3. Sử dụng Static Export (nếu có thể):**

```javascript
// next.config.js
output: 'export',  // Pure static export
```

**Lưu ý:** Sẽ không có server-side rendering, tất cả phải là static.

### **4. Sử dụng ISR với revalidate:**

```typescript
// app/dich-vu/[continentSlug]/[countrySlug]/page.tsx
export const revalidate = 3600; // Revalidate mỗi giờ

export default async function VisaCountryDetailPage({ params }) {
  // Chỉ render lại mỗi giờ
}
```

## 🎯 Kết luận

### **Tại sao API calls xuất hiện khi `npm start`:**

1. ✅ **Server-side rendering**: Next.js vẫn render trên server khi cần
2. ✅ **Client components**: `VisaDataContext` gọi API mỗi khi mount
3. ✅ **Dynamic routes**: Có thể không được pre-render hoàn toàn
4. ✅ **Standalone mode**: Không phải pure static export

### **Tại sao console.log xuất hiện:**

1. ✅ **Server components**: Console.log → Server terminal
2. ✅ **Client components**: Console.log → Browser console
3. ✅ **Build process**: Console.log trong build scripts

### **Giải pháp:**

- ❌ Xóa console.log không cần thiết
- ✅ Tối ưu client components để không fetch data không cần thiết
- ✅ Pre-fetch data ở server components
- ✅ Sử dụng ISR để cache tốt hơn

