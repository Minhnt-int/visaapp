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

// Cache for page metadata to reduce API calls during build
const pageMetaCache = new Map<string, { data: BackendMeta | null; timestamp: number }>();
const PAGE_META_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function getPageMetaFromBackend(params: { pageKey?: string; pageUrl?: string }): Promise<BackendMeta | null> {
  // Create cache key
  const cacheKey = params.pageKey || params.pageUrl || '';
  
  // Check cache first
  const cached = pageMetaCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < PAGE_META_CACHE_TTL) {
    return cached.data;
  }
  
  const qs = new URLSearchParams();
  if (params.pageKey) qs.append('pageKey', params.pageKey);
  if (params.pageUrl) qs.append('pageUrl', params.pageUrl);
  const url = `${DEFAULT_BASE_URL}/api/meta?${qs.toString()}`;
  try {
    // Suppress error logs for meta API calls during build
    const res = await fetcher<any>(url, {}, 1, false, true);
    const data = res?.data;
    if (!data) {
      // Cache null to avoid retries
      pageMetaCache.set(cacheKey, { data: null, timestamp: Date.now() });
      return null;
    }
    // Backend may return object or array based on query  
    const result = Array.isArray(data) ? null : (data as BackendMeta);
    // Cache result
    pageMetaCache.set(cacheKey, { data: result, timestamp: Date.now() });
    return result;
  } catch {
    // Cache null on error to avoid retries
    pageMetaCache.set(cacheKey, { data: null, timestamp: Date.now() });
    return null;
  }
}

export async function generatePageMetadata(opts: { pageKey?: string; pageUrl?: string; fallbackUrl?: string }): Promise<Metadata> {
  const { pageKey, pageUrl } = opts;
  const backendMeta = await getPageMetaFromBackend({ pageKey, pageUrl });

  if (!backendMeta) return {};

  return {
    title: backendMeta.title,
    description: backendMeta.description,
    keywords: backendMeta.keywords,
    openGraph: {
      title: backendMeta.ogTitle || backendMeta.title,
      description: backendMeta.ogDescription || backendMeta.description,
      images: backendMeta.ogImage ? [{ url: backendMeta.ogImage }] : undefined,
      url: backendMeta.pageUrl,
      type: 'website',
    },
    alternates: {
      canonical: backendMeta.pageUrl,
    },
  } as Metadata;
}


