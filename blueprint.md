# Project Blueprint

## Overview
This project is a Next.js application designed to provide visa and tour services. It features dynamic routing for visa categories and tour details, server-side data fetching, and a comprehensive set of UI components. The application aims for a modern, visually appealing, and accessible user experience.

## Current Features
*   **Homepage**: Displays featured services (Dịch Vụ Visa, Tour Du Lịch, Vé Máy Bay).
*   **Navigation**:
    *   "Trang Chủ" (`/`)
    *   "Dịch Vụ Visa" (`/dich-vu`) with sub-categories: "Visa Châu Mỹ", "Visa Châu Âu", "Visa Châu Á", "Visa Châu Úc".
    *   "Tour Du Lịch" (`/tour-du-lich`) with sub-categories: "Tour Châu Âu", "Tour Châu Á", "Tour Châu Mỹ".
    *   "Tin Tức" (`/tin-tuc`)
    *   "Liên Hệ" (`/lien-he`)
*   **Dynamic Visa Pages**:
    *   Visa category pages (e.g., `/dich-vu/visa-chau-my`). These pages list countries within that category.
    *   **Visa Category Descriptions**: Each visa category (continent) now includes a descriptive introduction in its banner.
    *   Individual visa detail pages (e.g., `/dich-vu/[categorySlug]/[countrySlug]`). Currently, detailed data is available for "Mỹ" (`/dich-vu/visa-chau-my/my`) and "Pháp" (`/dich-vu/visa-chau-au/phap`).
*   **Dynamic News Pages**: Individual news articles (e.g., `/tin-tuc/[newsSlug]`).
*   **Dynamic Tour Pages**: Tour category pages (e.g., `/tour-du-lich/du-lich-chau-au`) and individual tour detail pages (e.g., `/tour-du-lich/[categorySlug]/[tourSlug]`).
*   **Data Management**: Uses `lib/data.ts` and `lib/mock-data.ts` for static data fetching.
*   **Styling**: Uses Tailwind CSS.
*   **API Routes**:
    *   `/api/news`
    *   `/api/services`
    *   `/api/tour-categories`
    *   `/api/search`
    *   `/api/tours`
    *   `/api/visa-categories`
    *   `/api/visa-details/[id]`: Modified to intelligently resolve the `id` parameter from the URL into the appropriate country slug used by `mockVisaPageData`. It now correctly handles service IDs (e.g., `visa-my`) and maps the `visa-schengen` ID to `phap` for consistent data retrieval.
    *   `/api/visas/countries`

## Plan for "Dịch Vụ Visa Châu Á" Page
The user wants to make the `/dich-vu/visa-chau-a` page available. This involves ensuring that there is sufficient mock data for countries within the "Visa Châu Á" category so that the dynamic route `/dich-vu/[categorySlug]/[countrySlug]` can render content.

**Steps:**
1.  **Add `visa-han-quoc` and `visa-nhat-ban` data to `mockVisaPageData` in `lib/mock-data.ts`**: This will provide content for the countries "Hàn Quốc" and "Nhật Bản" within the "Visa Châu Á" category, making their individual visa detail pages available. The existing `mockVisaPageData` structure will be used as a template.
2.  **Verify the route and data fetching**: Ensure that the existing dynamic route `/app/dich-vu/[categorySlug]/page.tsx` can correctly fetch and display the data for `visa-chau-a` and its sub-pages (e.g., `/dich-vu/visa-chau-a/han-quoc`).
