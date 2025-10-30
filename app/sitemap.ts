import { MetadataRoute } from 'next';
import { getNavigationLinks } from '@/lib/api';

/**
 * Dynamic sitemap generation cho Next.js App Router
 * File này sẽ tự động generate sitemap.xml tại /sitemap.xml
 * 
 * @returns MetadataRoute.Sitemap array
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kimquytravel.vn.vn';
  
  try {
    console.log('🗺️ Generating sitemap...');
    
    // Static pages với priority và change frequency
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/dich-vu`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/dich-vu/visa-chau-a`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/dich-vu/visa-chau-au`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/dich-vu/visa-chau-my`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/dich-vu/visa-chau-uc`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/tour-du-lich`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/tin-tuc`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/lien-he`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
    ];
    
  // Dynamic visa pages từ API
  let visaPages: MetadataRoute.Sitemap = [];
  try {
    const visaCategories = await getNavigationLinks();
    const potentialVisaPages = visaCategories
      .flatMap((category) =>
        category.children?.map((country) => ({
          url: `${baseUrl}/dich-vu/${category.href}/${country.href}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.9,
        })) ?? []
      );

    // Lọc bỏ undefined và ép kiểu an toàn
    visaPages = potentialVisaPages.filter(
      (item): item is { url: string; lastModified: Date; changeFrequency: "weekly"; priority: number; } => item !== undefined
    );

    console.log(`✅ Generated ${visaPages.length} visa pages for sitemap`);
  } catch (error) {
    console.error('❌ Error fetching visa countries for sitemap:', error);
  }
    
    // Dynamic tour pages (mock data for now)
    const tourPages: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/tour-du-lich/chau-a/nhat-ban-tokyo`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/tour-du-lich/chau-a/han-quoc-seoul`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/tour-du-lich/chau-my/my-new-york`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/tour-du-lich/chau-uc/uc-sydney`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }
    ];
    
    // News pages (sample)
    const newsPages: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/tin-tuc/kinh-nghiem-xin-visa`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/tin-tuc/thu-tuc-visa-moi-nhat`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      }
    ];
    
    const allPages = [...staticPages, ...visaPages, ...tourPages, ...newsPages];
    
    console.log(`🎉 Sitemap generated successfully with ${allPages.length} URLs`);
    return allPages;
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    
    // Fallback sitemap với các trang cơ bản
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/dich-vu`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/tour-du-lich`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/lien-he`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      }
    ];
  }
}
