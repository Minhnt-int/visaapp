import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ServiceSection from '@/components/ServiceSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import NewsSection from '@/components/NewsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ServiceSection />
      <WhyChooseUs />
      <NewsSection />
      <Footer />
    </main>
  );
}
