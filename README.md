# 🎯 Kim Quy Travel - Frontend Application

Website chuyên cung cấp dịch vụ xin visa và tour du lịch được xây dựng bằng **Next.js 14**, **Tailwind CSS** và **TypeScript**.

---

## 🚀 Quick Start

### Cài Đặt

```bash
# Cài đặt dependencies
npm install

# Setup environment variables
npm run setup

# Chạy development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem website.

---

## 📦 Available Scripts

Dự án này cung cấp các scripts tiện ích để quản lý theme, search, performance và development.

### 🎨 Theme Management

#### `npm run sync-theme`
**Đồng bộ theme color từ `lib/theme.config.ts` sang các file liên quan.**

Sau khi thay đổi màu trong `lib/theme.config.ts`, chạy lệnh này để tự động cập nhật:
- ✅ `app/globals.css` - CSS variables
- ✅ `app/layout.tsx` - Meta theme-color
- ✅ `public/manifest.json` - PWA theme color
- ✅ `lib/seo-optimizer.ts` - SEO colors

**Cách sử dụng:**
1. Mở `lib/theme.config.ts`
2. Thay đổi `PRIMARY_COLOR_HEX = '#YOUR_COLOR'`
3. Chạy `npm run sync-theme`
4. Restart dev server nếu đang chạy

**Ví dụ:**
```typescript
// lib/theme.config.ts
export const PRIMARY_COLOR_HEX = '#2563EB'; // Màu xanh dương
```

```bash
npm run sync-theme
```

📖 Xem chi tiết: [CHANGE_COLOR.md](./CHANGE_COLOR.md)

---

#### `npm run reset-theme-cache`
**Reset cache sau khi thay đổi theme color (giải quyết vấn đề theme không load).**

Script này sẽ:
- 🗑️ Xóa Next.js build cache (`.next` folder)
- 🔧 Cập nhật Service Worker version để force refresh
- 🎨 Chạy `sync-theme` để cập nhật CSS

**Khi nào sử dụng:**
- Sau khi thay đổi theme nhưng không thấy thay đổi
- Frontend không tự động load theme mới sau build
- Cần force refresh Service Worker cache

**Cách sử dụng:**
```bash
npm run reset-theme-cache
npm run build  # Rebuild sau khi reset
```

📖 Xem chi tiết: [RESET_THEME_CACHE.md](./RESET_THEME_CACHE.md)

---

### 🔍 Search & Indexing

#### `npm run algolia-sync`
**Đồng bộ dữ liệu lên Algolia Search Index để enable search functionality.**

Chạy script này để index các dữ liệu:
- 📋 Dịch vụ Visa (Services) - theo châu lục và quốc gia
- 🎫 Tour du lịch (Tours) - theo châu lục và tour destinations
- 📰 Tin tức (News) - bài viết và cẩm nang

---

## 🔧 Hướng Dẫn Setup Algolia Trên VPS (Chi Tiết)

### Bước 1: Tạo Algolia Account

1. Truy cập [https://www.algolia.com/](https://www.algolia.com/)
2. Đăng ký/Đăng nhập tài khoản
3. Chọn plan phù hợp (Free tier cho phép 10,000 records và 10,000 search requests/tháng)

### Bước 2: Tạo Application

1. Vào **Dashboard** > Click **Create Application**
2. Đặt tên application (ví dụ: "Kim Quy Travel")
3. Chọn region gần VPS của bạn (ví dụ: Singapore hoặc US East)
4. Click **Create**

### Bước 3: Lấy Credentials

#### 3.1. App ID
- Sau khi tạo application, **App ID** hiển thị ngay trên dashboard
- Copy App ID (dạng: `XXXXXXXXXX`)

#### 3.2. Admin API Key
- Vào **Settings** > **API Keys** (sidebar trái)
- Tìm **Admin API Key** (dạng: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
- ⚠️ **QUAN TRỌNG**: Đây là key có quyền write/delete, **KHÔNG** được expose ở frontend!
- Click **Reveal** để hiển thị key
- Copy và lưu lại (chỉ hiển thị 1 lần!)

#### 3.3. Search-Only API Key (cho frontend)
- Trong cùng trang **API Keys**
- Tìm **Search-Only API Key** (dạng: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
- Copy key này (sẽ dùng cho frontend)

#### 3.4. Index Name
- Tạo index mới: **Indices** > **Create Index**
- Đặt tên: `Kim Quy Travel` (hoặc tên bạn muốn)
- Click **Create**

---

### Bước 4: Setup Environment Variables Trên VPS

#### 4.1. SSH vào VPS

```bash
ssh user@your-vps-ip
cd /path/to/visaapp
```

#### 4.2. Tạo/Edit file `.env.local`

```bash
nano .env.local
```

#### 4.3. Thêm Algolia Credentials

```env
# Algolia Search Configuration
NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id_here
NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY=your_search_only_key_here
NEXT_PUBLIC_ALGOLIA_INDEX_NAME=Kim Quy Travel
ALGOLIA_ADMIN_KEY=your_admin_api_key_here
```

**Lưu ý:**
- `NEXT_PUBLIC_*` - Biến này sẽ được expose ở frontend (client-side)
- `ALGOLIA_ADMIN_KEY` - **KHÔNG có** `NEXT_PUBLIC_`, chỉ dùng ở server-side

#### 4.4. Save và Exit

```bash
# Nano editor
Ctrl + O  # Save
Enter     # Confirm
Ctrl + X  # Exit
```

#### 4.5. Verify Environment Variables

```bash
# Kiểm tra file
cat .env.local | grep ALGOLIA

# Output phải có:
# NEXT_PUBLIC_ALGOLIA_APP_ID=...
# NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY=...
# NEXT_PUBLIC_ALGOLIA_INDEX_NAME=...
# ALGOLIA_ADMIN_KEY=...
```

---

### Bước 5: Install Dependencies (nếu chưa có)

```bash
npm install
```

Đảm bảo đã cài:
- `algoliasearch` (trong dependencies)
- `ts-node` (trong devDependencies)

---

### Bước 6: Chạy Sync Script

```bash
npm run algolia-sync
```

**Output mẫu khi thành công:**
```
🚀 Starting Algolia sync...
... Processing Visa data
... Processing Tour data
... Processing Blog data
... Found 45 records to sync.
... Clearing existing Algolia index.
... Uploading new records to Algolia.
✅ Algolia sync completed successfully!
```

**Nếu có lỗi:**
```
❌ Error during Algolia sync: [error message]
```

---

### Bước 7: Verify Sync Thành Công

#### 7.1. Kiểm tra trên Algolia Dashboard

1. Vào **Indices** > Chọn index của bạn
2. Xem **Records** - phải có số lượng records đã sync
3. Click vào record để xem chi tiết

#### 7.2. Test Search trong Dashboard

1. Trong Algolia Dashboard > **Indices** > Chọn index
2. Tab **Search Preview**
3. Nhập từ khóa để test search (ví dụ: "visa")
4. Xem kết quả trả về

#### 7.3. Test trên Frontend

1. Restart frontend server (nếu đang chạy):
   ```bash
   # Stop server
   Ctrl + C
   
   # Restart
   npm run dev
   # hoặc
   npm run start  # nếu production
   ```

2. Mở website trong browser
3. Thử search box trên header
4. Gõ từ khóa và xem kết quả

---

### Bước 8: Setup Tự Động Sync Định Kỳ (Optional)

Có 2 cách: **PM2** (khuyến nghị) hoặc **Cron Job**.

---

#### Option A: Sử Dụng PM2 (Khuyến Nghị) ⭐

PM2 có thể chạy script định kỳ và quản lý tốt hơn.

##### 8.1. Install PM2 (nếu chưa có)

```bash
npm install -g pm2
```

##### 8.2. Tạo PM2 Ecosystem Config

File `ecosystem.config.js` đã có sẵn trong project. Bạn chỉ cần kiểm tra và điều chỉnh nếu cần:

```bash
# Xem file config
cat ecosystem.config.js
```

File này đã được config sẵn với:
- ✅ Frontend app (`visaapp-frontend`)
- ✅ Algolia sync job (`algolia-sync`) - Chạy mỗi ngày lúc 2h sáng

**Tùy chỉnh Schedule (nếu cần):**

Mở file `ecosystem.config.js` và chỉnh `cron_restart`:

```javascript
// Mỗi ngày lúc 2h sáng (default)
cron_restart: '0 2 * * *',

// Hoặc các options khác:
// cron_restart: '0 */6 * * *',      // Mỗi 6 giờ
// cron_restart: '0 3 * * 0',        // Mỗi Chủ nhật lúc 3h sáng
// cron_restart: '0 2 * * 1-5',      // Thứ 2-6 lúc 2h sáng
// cron_restart: '*/30 * * * *',     // Mỗi 30 phút
```

##### 8.3. Tạo Thư Mục Logs

PM2 cần thư mục logs để lưu log files:

```bash
# Tạo thư mục logs (nếu chưa có)
mkdir -p logs

# Đảm bảo có quyền write
chmod 755 logs
```

##### 8.4. Start PM2 với Config

```bash
# Start tất cả apps trong ecosystem.config.js
pm2 start ecosystem.config.js

# Hoặc chỉ start app chính
pm2 start ecosystem.config.js --only visaapp-frontend

# Start sync job riêng (sẽ chạy ngay lần đầu, sau đó chạy theo schedule)
pm2 start ecosystem.config.js --only algolia-sync

# Nếu muốn chạy sync ngay lập tức (không đợi cron), có thể chạy:
npm run algolia-sync
```

##### 8.5. Quản Lý PM2

```bash
# Xem status
pm2 status

# Xem logs
pm2 logs algolia-sync
pm2 logs visaapp-frontend

# Xem logs real-time
pm2 logs --lines 50

# Stop/Start/Restart
pm2 stop algolia-sync
pm2 start algolia-sync
pm2 restart algolia-sync

# Xóa khỏi PM2
pm2 delete algolia-sync

# Save PM2 configuration
pm2 save

# Setup PM2 để tự động start khi server reboot
pm2 startup
pm2 save
```

##### 8.6. Chạy Sync Ngay Lập Tức (Không Chờ Cron)

```bash
# Chạy sync ngay (không chờ cron)
pm2 start ecosystem.config.js --only algolia-sync --no-autorestart

# Hoặc chạy trực tiếp
npm run algolia-sync
```

##### 8.7. Monitor Sync Job

```bash
# Xem logs của sync job
pm2 logs algolia-sync --lines 100

# Xem chi tiết
pm2 describe algolia-sync

# Monitor real-time
pm2 monit
```

---

#### Option B: Sử Dụng Cron Job (Traditional)

Nếu không dùng PM2, có thể dùng cron:

```bash
# Edit crontab
crontab -e

# Thêm dòng này để sync mỗi ngày lúc 2h sáng
0 2 * * * cd /path/to/visaapp && /usr/bin/node /path/to/node_modules/.bin/ts-node scripts/algolia-sync.ts >> /var/log/algolia-sync.log 2>&1

# Hoặc sync mỗi 6 giờ
0 */6 * * * cd /path/to/visaapp && npm run algolia-sync >> /var/log/algolia-sync.log 2>&1
```

---

#### So Sánh PM2 vs Cron

| Tính năng | PM2 | Cron |
|-----------|-----|------|
| Log management | ✅ Built-in logs với rotation | ❌ Phải tự setup |
| Monitoring | ✅ PM2 monit & dashboard | ❌ Không có |
| Auto restart | ✅ Có thể config | ❌ Không có |
| Error handling | ✅ Tốt hơn | ⚠️ Basic |
| Resource limits | ✅ Có thể set memory limit | ❌ Không có |
| Easy management | ✅ PM2 commands đơn giản | ⚠️ Phải edit crontab |

**Khuyến nghị**: Dùng PM2 nếu đã dùng PM2 cho frontend app.

##### 8.8. Ví Dụ Workflow Hoàn Chỉnh

```bash
# 1. SSH vào VPS
ssh user@your-vps-ip
cd /path/to/visaapp

# 2. Install PM2 (nếu chưa có)
npm install -g pm2

# 3. Tạo logs folder
mkdir -p logs

# 4. Start tất cả với PM2
pm2 start ecosystem.config.js

# 5. Verify status
pm2 status

# 6. Xem logs
pm2 logs algolia-sync --lines 20

# 7. Save config để tự động start khi reboot
pm2 startup
pm2 save

# Done! Sync sẽ tự động chạy mỗi ngày lúc 2h sáng
```

**Expected Output:**

```bash
$ pm2 status
┌─────┬─────────────────────┬─────────────┬─────────┬─────────┬──────────┐
│ id  │ name                │ mode        │ ↺       │ status  │ cpu      │
├─────┼─────────────────────┼─────────────┼─────────┼─────────┼──────────┤
│ 0   │ visaapp-frontend    │ fork        │ 0       │ online  │ 0%       │
│ 1   │ algolia-sync        │ cron        │ 0       │ online  │ 0%       │
└─────┴─────────────────────┴─────────────┴─────────┴─────────┴──────────┘

# algolia-sync sẽ có mode "cron" và next_restart time
```

---

## 🐛 Troubleshooting

### Lỗi: "Algolia environment variables are not set correctly"

**Nguyên nhân:** Thiếu hoặc sai environment variables

**Giải pháp:**
```bash
# 1. Kiểm tra file .env.local tồn tại
ls -la .env.local

# 2. Kiểm tra các biến có đúng không
cat .env.local | grep ALGOLIA

# 3. Đảm bảo có đủ 4 biến:
# - NEXT_PUBLIC_ALGOLIA_APP_ID
# - NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
# - NEXT_PUBLIC_ALGOLIA_INDEX_NAME
# - ALGOLIA_ADMIN_KEY
```

---

### Lỗi: "Invalid API key"

**Nguyên nhân:** 
- Copy sai Admin API Key
- Dùng Search-Only Key thay vì Admin Key

**Giải pháp:**
1. Vào Algolia Dashboard > Settings > API Keys
2. Copy lại **Admin API Key** (không phải Search-Only)
3. Update trong `.env.local`
4. Chạy lại sync

---

### Lỗi: "Index not found"

**Nguyên nhân:** Index chưa được tạo hoặc tên sai

**Giải pháp:**
1. Vào Algolia Dashboard > **Indices**
2. Tạo index mới với tên: `Kim Quy Travel`
3. Hoặc sửa `NEXT_PUBLIC_ALGOLIA_INDEX_NAME` trong `.env.local` để match với index có sẵn

---

### Sync thành công nhưng search không hoạt động

**Nguyên nhân:** 
- Frontend chưa có Search-Only API Key
- Frontend chưa restart

**Giải pháp:**
1. Kiểm tra `NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY` trong `.env.local`
2. Restart frontend server:
   ```bash
   npm run dev
   # hoặc
   npm run build && npm run start
   ```
3. Clear browser cache và reload

---

### Không sync được dữ liệu

**Kiểm tra:**
1. **Data source có dữ liệu không?**
   ```bash
   # Check mock data
   cat lib/mock-data.js | grep "mockVisaPageData\|mockTours\|mockNews"
   ```

2. **Network connection:**
   ```bash
   # Test kết nối Algolia
   curl https://your-app-id.algolia.net/
   ```

3. **Logs chi tiết:**
   ```bash
   # Chạy với verbose
   npm run algolia-sync
   ```

---

## 📋 Checklist Setup Algolia

- [ ] Đã tạo Algolia account
- [ ] Đã tạo Application
- [ ] Đã lấy **App ID**
- [ ] Đã lấy **Admin API Key**
- [ ] Đã lấy **Search-Only API Key**
- [ ] Đã tạo Index với tên `Kim Quy Travel`
- [ ] Đã set 4 environment variables trong `.env.local`
- [ ] Đã chạy `npm install`
- [ ] Đã chạy `npm run algolia-sync` thành công
- [ ] Đã verify records trên Algolia Dashboard
- [ ] Đã test search trên frontend
- [ ] Search hoạt động đúng

---

## 💡 Tips & Best Practices

1. **Security:**
   - ⚠️ **KHÔNG BAO GIỜ** commit `.env.local` vào Git
   - ⚠️ **KHÔNG** expose Admin API Key ở frontend
   - Chỉ dùng Search-Only Key cho frontend

2. **Performance:**
   - Sync định kỳ khi có dữ liệu mới (không cần sync liên tục)
   - Có thể sync khi deploy mới
   - Free tier: 10,000 records - đủ cho hầu hết use cases

3. **Monitoring:**
   - Xem usage trên Algolia Dashboard
   - Monitor search analytics
   - Set up alerts nếu vượt quota

4. **Backup:**
   - Export index định kỳ (Algolia Dashboard > Export)
   - Lưu API keys ở nơi an toàn

---

## 🔄 Re-sync Sau Khi Có Dữ Liệu Mới

Khi có thêm/update data:

```bash
# Chỉ cần chạy lại sync
npm run algolia-sync
```

Script sẽ tự động:
1. Clear index cũ
2. Upload toàn bộ records mới
3. Maintain data consistency

---

### 📊 Performance & Analysis

#### `npm run analyze`
**Phân tích bundle size để tối ưu performance.**

Chạy script này sẽ:
- 🔍 Build project với bundle analyzer
- 📈 Hiển thị visualization của bundle sizes
- 💡 Giúp identify các package lớn cần optimize

**Cách sử dụng:**
```bash
npm run analyze
```

Sau khi chạy, mở trình duyệt tại URL được hiển thị để xem visualization.

**Tips:**
- Tìm các package lớn (>100KB)
- Xem xét code splitting
- Lazy load components không cần thiết ngay

---

#### `npm run lighthouse`
**Chạy Lighthouse audit để kiểm tra performance.**

Script này sẽ:
- ⚡ Analyze performance metrics
- 📱 Kiểm tra mobile/desktop
- 📄 Tạo report HTML: `lighthouse-report.html`

**Yêu cầu:**
- Dev server phải đang chạy (`npm run dev`)
- Cần cài `lighthouse` globally hoặc trong devDependencies

**Cách sử dụng:**
```bash
# Terminal 1: Chạy dev server
npm run dev

# Terminal 2: Chạy lighthouse
npm run lighthouse
```

**Kết quả:**
- File `lighthouse-report.html` được tạo
- Mở file này trong browser để xem chi tiết
- Điểm số từ 0-100 cho Performance, Accessibility, Best Practices, SEO

---

#### `npm run perf`
**Chạy build và lighthouse audit cùng lúc (all-in-one).**

Script này kết hợp:
- 🏗️ `npm run build` - Build project
- 🔍 `npm run lighthouse` - Audit performance

**Cách sử dụng:**
```bash
npm run perf
```

**Khi nào sử dụng:**
- Trước khi deploy production
- Kiểm tra performance sau khi optimize
- CI/CD pipeline để đảm bảo quality

---

### 🛠️ Development Tools

#### `npm run setup`
**Setup environment variables từ template.**

Script này sẽ:
- 📝 Tạo file `.env.local` từ template
- 🔧 Guide bạn điền các environment variables cần thiết

**Cách sử dụng:**
```bash
npm run setup
```

Script sẽ tạo file `.env.local` với các variables mẫu. Bạn cần điền giá trị thực tế.

---

#### `npm run dev`
**Chạy development server với hot reload.**

```bash
npm run dev
```

Server chạy tại [http://localhost:3000](http://localhost:3000)

**Features:**
- ⚡ Hot Module Replacement (HMR)
- 🔄 Fast Refresh
- 📊 Webpack stats in terminal

---

#### `npm run build`
**Build project cho production.**

```bash
npm run build
```

**Output:**
- `.next` folder với optimized production build
- Static assets được optimize
- Code splitting tự động

---

#### `npm run start`
**Chạy production server (sau khi build).**

```bash
npm run build
npm run start
```

**Lưu ý:**
- Chỉ chạy được sau khi `npm run build`
- Sử dụng cho production deployment
- Không có hot reload

---

#### `npm run lint`
**Chạy ESLint để kiểm tra code quality.**

```bash
npm run lint
```

Kiểm tra và sửa lỗi ESLint trong codebase.

---

## 🎨 Theme System

### Runtime Theme (Không Cần Rebuild)

Sau khi deploy, bạn có thể thay đổi theme color **KHÔNG CẦN rebuild** bằng cách:

1. **Thay đổi qua Backend API:**
```bash
curl -X POST http://your-backend:3002/api/theme \
  -H "Content-Type: application/json" \
  -H "x-admin-key: your-key" \
  -d '{"color": "#2563EB"}'
```

2. **Frontend tự động load theme mới!**

**Cơ chế:**
- Inline script trong `<head>` fetch theme ngay từ đầu
- Component `ThemeColorRuntime` backup fetch
- localStorage cache để load nhanh

📖 Xem chi tiết: [RUNTIME_THEME_SETUP.md](./RUNTIME_THEME_SETUP.md)

---

## 🏗️ Project Structure

```
visaapp/
├── app/                          # Next.js App Router
│   ├── dich-vu/                  # Dịch vụ visa
│   │   ├── [continentSlug]/      # Châu lục
│   │   │   ├── [countrySlug]/   # Quốc gia
│   │   │   └── page.tsx
│   │   └── page.tsx              # Danh sách dịch vụ
│   ├── tour-du-lich/            # Tour du lịch
│   ├── tin-tuc/                  # Tin tức
│   ├── lien-he/                  # Liên hệ
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Trang chủ
│   └── globals.css               # Global styles & CSS variables
│
├── components/                    # React Components
│   ├── sections/                 # Section components
│   ├── ThemeColorRuntime.tsx     # Runtime theme loader
│   └── ...
│
├── lib/                           # Utilities
│   ├── api.ts                    # API client
│   ├── theme.config.ts           # Theme configuration ⭐
│   ├── theme-colors.ts           # Theme colors (auto-generated)
│   └── ...
│
├── scripts/                       # Utility Scripts ⭐
│   ├── sync-theme-colors.ts      # Theme sync script
│   ├── algolia-sync.ts           # Algolia sync script
│   ├── reset-theme-cache.js      # Cache reset script
│   └── setup-env.js              # Environment setup
│
├── public/                        # Static assets
│   ├── sw.js                     # Service Worker
│   └── ...
│
└── package.json                   # Dependencies & Scripts
```

---

## 🔧 Configuration

### Environment Variables

Tạo file `.env.local` với các variables sau:

```env
# Backend API
NEXT_PUBLIC_BACKEND_URL=http://localhost:3002

# Algolia Search (Optional)
NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id
NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY=your_search_key
NEXT_PUBLIC_ALGOLIA_INDEX_NAME=Kim Quy Travel

# Analytics (Optional)
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_pixel_id

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Chạy `npm run setup` để tạo template file.

---

## 📚 Documentation

- 📖 [CHANGE_COLOR.md](./CHANGE_COLOR.md) - Hướng dẫn đổi theme color
- 🔄 [RESET_THEME_CACHE.md](./RESET_THEME_CACHE.md) - Reset cache sau khi đổi theme
- 🚀 [RUNTIME_THEME_SETUP.md](./RUNTIME_THEME_SETUP.md) - Setup runtime theme (không cần rebuild)
- 🎨 [THEME_COLORS_GUIDE.md](./THEME_COLORS_GUIDE.md) - Chi tiết về theme system

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Search**: Algolia Search
- **Fonts**: Google Fonts (Manrope, Poppins)

---

## 📝 Workflow Recommendations

### Development Workflow

```bash
# 1. Setup project
npm install
npm run setup

# 2. Start development
npm run dev

# 3. Sync theme (nếu đổi màu)
npm run sync-theme

# 4. Sync Algolia (nếu có dữ liệu mới)
npm run algolia-sync
```

### Production Workflow

```bash
# 1. Sync theme colors
npm run sync-theme

# 2. Analyze bundle
npm run analyze

# 3. Test performance
npm run perf

# 4. Build for production
npm run build

# 5. Deploy
npm run start
```

### Theme Change Workflow

```bash
# Option 1: Development (có thể rebuild)
# 1. Đổi màu trong lib/theme.config.ts
# 2. Chạy sync-theme
npm run sync-theme
npm run dev

# Option 2: Production (không cần rebuild)
# 1. Thay đổi qua Backend API
# 2. Frontend tự động load
# 3. User chỉ cần hard reload (Ctrl+Shift+R)
```

---

## 🐛 Troubleshooting

### Theme không thay đổi sau khi sync?

```bash
npm run reset-theme-cache
npm run build
```

### Algolia sync không hoạt động?

1. Kiểm tra environment variables
2. Đảm bảo Admin API Key được set đúng
3. Kiểm tra network connection

### Bundle quá lớn?

```bash
npm run analyze
```

Xem visualization và optimize các package lớn.

---

## 📞 Support

**Kim Quy Travel - Dịch Vụ Visa & Tour Du Lịch**
- **Hotline**: 0911.909.686 / 0967.686.101
- **Email**: info@Kim Quy Travel.com.vn

---

*Phát triển bởi Kim Quy Travel Team* 🇻🇳
