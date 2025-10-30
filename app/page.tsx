import Hero from '@/components/Hero';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
// import ServiceSection from '@/components/ServiceSection';
import ServiceSection from '@/components/sections/ServiceSection';
import TourSection from '@/components/TourSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import NewsSection from '@/components/NewsSection';
import { getNewsPreview } from '@/lib/api';

export default async function Home() {
  // Fetch data on server for SEO
  const newsData = await getNewsPreview({ limit: 6, status: 'active' });

  return (
    <main>
      <Hero />
      <ServiceSection />
      <TourSection />
      <WhyChooseUs />
      <NewsSection news={newsData.data} />
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return await generatePageMetadata({ pageKey: 'trang-chu', pageUrl: '/', fallbackUrl: '/' });
}
