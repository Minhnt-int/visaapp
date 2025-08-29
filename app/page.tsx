import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ServiceSection from '@/components/ServiceSection'; // Create this component
import WhyChooseUs from '@/components/WhyChooseUs';
import NewsSection from '@/components/NewsSection';

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
