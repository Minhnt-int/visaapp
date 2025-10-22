import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export class SEOOptimizer {
  // Generate comprehensive metadata
  static generateMetadata(config: SEOConfig): Metadata {
    const {
      title,
      description,
      keywords = [],
      image,
      url,
      type = 'website',
      publishedTime,
      modifiedTime,
      author,
      section,
      tags = []
    } = config

    const fullTitle = `${title} | VISA5S - Dịch vụ Visa và Tour Du Lịch`
    const fullDescription = description.length > 160 
      ? description.substring(0, 157) + '...' 
      : description

    return {
      title: fullTitle,
      description: fullDescription,
      keywords: keywords.join(', '),
      authors: author ? [{ name: author }] : undefined,
      creator: 'VISA5S',
      publisher: 'VISA5S',
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        type,
        title: fullTitle,
        description: fullDescription,
        url,
        siteName: 'VISA5S',
        images: image ? [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          }
        ] : undefined,
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
        section,
        tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: fullTitle,
        description: fullDescription,
        images: image ? [image] : undefined,
        creator: '@visa5s',
        site: '@visa5s',
      },
      alternates: {
        canonical: url,
      },
      other: {
        'article:author': author,
        'article:section': section,
        'article:tag': tags.join(','),
        'article:published_time': publishedTime,
        'article:modified_time': modifiedTime,
      }
    }
  }

  // Generate structured data (JSON-LD)
  static generateStructuredData(config: SEOConfig & {
    organization?: any
    breadcrumbs?: Array<{ name: string; url: string }>
    faq?: Array<{ question: string; answer: string }>
    reviews?: Array<{ rating: number; reviewBody: string; author: string }>
  }) {
    const {
      title,
      description,
      url,
      type,
      publishedTime,
      modifiedTime,
      author,
      image,
      organization,
      breadcrumbs,
      faq,
      reviews
    } = config

    const structuredData: any = {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'Article' : 'WebPage',
      headline: title,
      description,
      url,
      datePublished: publishedTime,
      dateModified: modifiedTime,
      author: author ? {
        '@type': 'Person',
        name: author
      } : undefined,
      image: image ? {
        '@type': 'ImageObject',
        url: image
      } : undefined,
      publisher: {
        '@type': 'Organization',
        name: 'VISA5S',
        url: 'https://visa5s.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://visa5s.com/logo.png'
        }
      }
    }

    // Add organization info
    if (organization) {
      structuredData.mainEntity = organization
    }

    // Add breadcrumbs
    if (breadcrumbs && breadcrumbs.length > 0) {
      structuredData.breadcrumb = {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      }
    }

    // Add FAQ
    if (faq && faq.length > 0) {
      structuredData.mainEntity = {
        '@type': 'FAQPage',
        mainEntity: faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      }
    }

    // Add reviews
    if (reviews && reviews.length > 0) {
      structuredData.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
        reviewCount: reviews.length
      }
      structuredData.review = reviews.map(review => ({
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating
        },
        reviewBody: review.reviewBody,
        author: {
          '@type': 'Person',
          name: review.author
        }
      }))
    }

    return structuredData
  }

  // Generate sitemap data
  static generateSitemapData(pages: Array<{
    url: string
    lastModified: string
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
    priority: number
  }>) {
    return {
      urlset: {
        '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
        url: pages.map(page => ({
          loc: page.url,
          lastmod: page.lastModified,
          changefreq: page.changeFrequency,
          priority: page.priority
        }))
      }
    }
  }

  // Generate robots.txt content
  static generateRobotsTxt(baseUrl: string) {
    return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

# Block admin and API routes
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Allow important pages
Allow: /
Allow: /dich-vu/
Allow: /tour/
Allow: /tin-tuc/
Allow: /lien-he/`
  }

  // Optimize meta tags for social sharing
  static generateSocialMetaTags(config: SEOConfig) {
    const {
      title,
      description,
      image,
      url,
      type = 'website'
    } = config

    return {
      // Open Graph
      'og:type': type,
      'og:title': title,
      'og:description': description,
      'og:image': image,
      'og:url': url,
      'og:site_name': 'VISA5S',
      'og:locale': 'vi_VN',

      // Twitter Card
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
      'twitter:url': url,
      'twitter:site': '@visa5s',
      'twitter:creator': '@visa5s',

      // Additional meta tags
      'theme-color': '#2563eb',
      'msapplication-TileColor': '#2563eb',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': 'VISA5S'
    }
  }

  // Generate breadcrumb structured data
  static generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    }
  }

  // Generate FAQ structured data
  static generateFAQStructuredData(faq: Array<{ question: string; answer: string }>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    }
  }

  // Generate review structured data
  static generateReviewStructuredData(reviews: Array<{
    rating: number
    reviewBody: string
    author: string
    datePublished: string
  }>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
        reviewCount: reviews.length
      },
      review: reviews.map(review => ({
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating
        },
        reviewBody: review.reviewBody,
        author: {
          '@type': 'Person',
          name: review.author
        },
        datePublished: review.datePublished
      }))
    }
  }

  // Generate local business structured data
  static generateLocalBusinessStructuredData(business: {
    name: string
    description: string
    address: string
    phone: string
    email: string
    website: string
    openingHours: string[]
    priceRange: string
    rating: number
    reviewCount: number
  }) {
    return {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      name: business.name,
      description: business.description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: business.address
      },
      telephone: business.phone,
      email: business.email,
      url: business.website,
      openingHours: business.openingHours,
      priceRange: business.priceRange,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: business.rating,
        reviewCount: business.reviewCount
      }
    }
  }
}
