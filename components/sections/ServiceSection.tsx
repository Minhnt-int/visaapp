import { getHomepageServices } from "@/lib/api";
import SectionTitle from "@/components/SectionTitle";
import { ServiceCard } from "../ServiceCard";
import Loading from "@/app/loading";

const ServiceSection = async () => {
  const services = await getHomepageServices();
  if(!services) return Loading;
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Dịch Vụ Của Chúng Tôi"
          subtitle="Cung cấp giải pháp toàn diện cho hành trình của bạn"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
