import Hero from '@/components/Hero';
import ServiceSection from '@/components/ServiceSection';
import TourSection from '@/components/TourSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import NewsSection from '@/components/NewsSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <ServiceSection />
      <TourSection />
      <WhyChooseUs />
      <NewsSection />
    </main>
  );
}
