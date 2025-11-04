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


