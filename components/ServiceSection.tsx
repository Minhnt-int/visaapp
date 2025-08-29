import Link from 'next/link';
import { services } from '@/lib/data';
import { icons, LucideProps } from 'lucide-react';

const Icon = ({ name, ...props }: { name: string } & LucideProps) => {
    const LucideIcon = icons[name as keyof typeof icons];
    if (!LucideIcon) {
        return null;
    }
    return <LucideIcon {...props} />;
};

export default function ServiceSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-display font-bold \
                       bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                Dịch Vụ Của Chúng Tôi
            </h2>
            <p className="text-lg mt-4 text-muted-foreground max-w-2xl mx-auto">
                Chúng tôi cung cấp đa dạng các dịch vụ xin visa đi nhiều quốc gia, đáp ứng mọi nhu cầu của bạn.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <div 
              key={service.slug}
              className="bg-card rounded-xl shadow-lg hover:shadow-2xl p-8 flex flex-col items-center \
                         transition-all duration-300 hover:-translate-y-2 border border-gray-200/50 \
                         hover:border-primary/50 group"
            >
              <div className="text-primary mb-5 p-4 bg-primary/10 rounded-full">
                <Icon name={service.icon} size={40} strokeWidth={2} className="transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-3 text-center">{service.title}</h3>
              <p className="text-muted-foreground mb-6 flex-grow text-center">{service.description}</p>
              <Link 
                href={`/dich-vu/${service.slug}`} 
                className="mt-auto bg-secondary text-secondary-foreground font-semibold py-2 px-8 rounded-full \
                           hover:bg-secondary/80 transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
              >
                Xem Chi Tiết
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
