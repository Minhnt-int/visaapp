import Hero from '@/components/Hero';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
// import ServiceSection from '@/components/ServiceSection';
import ServiceSection from '@/components/sections/ServiceSection';
import TourSection from '@/components/TourSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import NewsSection from '@/components/NewsSection';
import { getNewsPreview } from '@/lib/api';
import WhyChooseUs from '@/components/WhyChooseUs';

export default async function Home() {
  // Fetch data on server for SEO
  const newsData = await getNewsPreview({ limit: 6, status: 'active' });

  return (
    <main>
      <Hero />
      <ServiceSection />
      <TourSection />
      {/* <div className="container mx-auto px-4 py-16">
        <WhyChooseUsSection />
      </div> */}
      <NewsSection news={newsData.data} />
      <WhyChooseUs />
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return await generatePageMetadata({ pageKey: 'trang-chu', pageUrl: '/', fallbackUrl: '/' });
}
