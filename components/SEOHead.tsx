import { Metadata } from 'next';
import { SEOData } from '@/lib/seo-api';

/**
 * Generate metadata object từ SEO data
 * Sử dụng cho Next.js 14 App Router metadata API
 */
export function generateMetadata(seoData: SEOData): Metadata {
  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords.join(', '),
    robots: seoData.robots,
    
    // Open Graph
    openGraph: {
      title: seoData.openGraph.title,
      description: seoData.openGraph.description,
      url: seoData.openGraph.url,
      siteName: seoData.openGraph.siteName,
      images: [
        {
          url: seoData.openGraph.image,
          width: 1200,
          height: 630,
          alt: seoData.openGraph.title,
        }
      ],
      locale: 'vi_VN',
      type: seoData.openGraph.type as any,
    },
    
    // Twitter
    twitter: {
      card: seoData.twitter.card as any,
      site: seoData.twitter.site,
      title: seoData.twitter.title,
      description: seoData.twitter.description,
      images: [seoData.twitter.image],
    },
    
    // Canonical và language alternates
    alternates: {
      canonical: seoData.canonical,
      languages: {
        'vi-VN': seoData.canonical,
      },
    },
    
    // Verification tags
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
    },
    
    // Other meta tags
    other: {
      'geo.region': 'VN-SG',
      'geo.placename': 'Ho Chi Minh City',
      'geo.position': '10.762622;106.660172',
      'ICBM': '10.762622, 106.660172',
    }
  };
}

/**
 * Component để render JSON-LD structured data
 */
export function StructuredData({ schema }: { schema: any }) {
  if (!schema) return null;
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2)
      }}
    />
  );
}

/**
 * Component để render breadcrumb structured data
 */
export function BreadcrumbStructuredData({ breadcrumbSchema }: { breadcrumbSchema: any }) {
  if (!breadcrumbSchema) return null;
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema, null, 2)
      }}
    />
  );
}