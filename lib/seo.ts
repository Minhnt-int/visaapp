import type { Metadata } from 'next';
import { fetcher } from '@/lib/api';

type BackendMeta = {
  id: number;
  pageKey: string;
  pageUrl: string;
  title: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  customHead?: string;
};

const DEFAULT_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

// Mock SEO for critical pages when backend/meta is unavailable
const SEO_MOCKS: Record<string, BackendMeta> = {
  '/': {
    id: 0,
    pageKey: 'trang-chu',
    pageUrl: '/',
    title: 'Kim Quy Travel | Dịch vụ Visa & Tour uy tín',
    description: 'Kim Quy Travel - Dịch vụ Visa và Tour du lịch uy tín, chuyên nghiệp, nhanh chóng.',
    keywords: 'visa, tour, du lịch, dịch vụ visa',
    ogTitle: 'Kim Quy Travel - Dịch vụ Visa & Tour',
    ogDescription: 'Giải pháp trọn gói về Visa và Tour du lịch.',
    ogImage: '/og-default.jpg',
  },
  '/dich-vu': {
    id: 0,
    pageKey: 'dich-vu',
    pageUrl: '/dich-vu',
    title: 'Dịch vụ Visa | Kim Quy Travel',
    description: 'Tra cứu và đăng ký dịch vụ visa nhanh chóng tại Kim Quy Travel.',
    keywords: 'dịch vụ visa, xin visa',
    ogTitle: 'Dịch vụ Visa',
    ogDescription: 'Dịch vụ visa chuyên nghiệp tại Kim Quy Travel.',
    ogImage: '/og-default.jpg',
  },
  '/tour-du-lich': {
    id: 0,
    pageKey: 'tour',
    pageUrl: '/tour-du-lich',
    title: 'Tour Du Lịch | Kim Quy Travel',
    description: 'Các tour du lịch hấp dẫn, giá tốt tại Kim Quy Travel.',
    keywords: 'tour du lịch, tour',
    ogTitle: 'Tour Du Lịch',
    ogDescription: 'Khám phá tour du lịch hấp dẫn tại Kim Quy Travel.',
    ogImage: '/og-default.jpg',
  },
  '/tin-tuc': {
    id: 0,
    pageKey: 'tin-tuc',
    pageUrl: '/tin-tuc',
    title: 'Tin tức | Kim Quy Travel',
    description: 'Tin tức cập nhật về visa, du lịch và kinh nghiệm hữu ích.',
    keywords: 'tin tức visa, tin du lịch',
    ogTitle: 'Tin tức Kim Quy Travel',
    ogDescription: 'Cập nhật tin tức visa và du lịch.',
    ogImage: '/og-default.jpg',
  },
};

export async function getPageMetaFromBackend(params: { pageKey?: string; pageUrl?: string }): Promise<BackendMeta | null> {
  const qs = new URLSearchParams();
  if (params.pageKey) qs.append('pageKey', params.pageKey);
  if (params.pageUrl) qs.append('pageUrl', params.pageUrl);
  const url = `${DEFAULT_BASE_URL}/api/meta?${qs.toString()}`;
  try {
    const res = await fetcher<any>(url, {}, 1, false);
    const data = res?.data;
    if (!data) return null;
    // Backend may return object or array based on query
    return Array.isArray(data) ? null : (data as BackendMeta);
  } catch {
    return null;
  }
}

export async function generatePageMetadata(opts: { pageKey?: string; pageUrl?: string; fallbackUrl?: string }): Promise<Metadata> {
  const { pageKey, pageUrl, fallbackUrl } = opts;
  const backendMeta = await getPageMetaFromBackend({ pageKey, pageUrl });
  const mock = SEO_MOCKS[(pageUrl || fallbackUrl || '/')];
  const meta = backendMeta || mock;

  if (!meta) return {};

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.ogTitle || meta.title,
      description: meta.ogDescription || meta.description,
      images: meta.ogImage ? [{ url: meta.ogImage }] : undefined,
      url: meta.pageUrl,
      type: 'website',
    },
    alternates: {
      canonical: meta.pageUrl,
    },
  } as Metadata;
}


