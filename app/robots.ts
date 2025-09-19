import { MetadataRoute } from 'next';

/**
 * Robots.txt configuration cho Next.js App Router
 * File này sẽ tự động generate robots.txt tại /robots.txt
 * 
 * @returns MetadataRoute.Robots configuration
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://visa5s.com.vn';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',           // Admin pages
          '/api/',            // API endpoints  
          '/_next/',          // Next.js internal files
          '/private/',        // Private pages
          '/dashboard/',      // Dashboard pages
          '/*.json$',         // JSON files
          '/temp/',           // Temporary files
          '/test/',           // Test pages
          '*?preview=*',      // Preview URLs
          '*?draft=*',        // Draft URLs
        ],
        crawlDelay: 1, // 1 second delay between requests
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/private/',
          '/dashboard/'
        ],
        crawlDelay: 0, // No delay for Googlebot
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/private/',
          '/dashboard/'
        ],
        crawlDelay: 2, // 2 seconds delay for Bing
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/', // Allow Facebook crawler for Open Graph
        disallow: [
          '/admin/',
          '/api/',
          '/private/'
        ]
      },
      {
        userAgent: 'Twitterbot',
        allow: '/', // Allow Twitter crawler for Twitter Cards
        disallow: [
          '/admin/',
          '/api/',
          '/private/'
        ]
      },
      {
        // Block malicious bots
        userAgent: [
          'SemrushBot',
          'AhrefsBot', 
          'MJ12bot',
          'DotBot'
        ],
        disallow: '/'
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
