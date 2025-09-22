import Link from "next/link";
import Image from "next/image";
import { HomepageService } from "@/types";

interface HomepageServiceCardProps {
  service: HomepageService;
}

const HomepageServiceCard: React.FC<HomepageServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden group">
      <Link href={`/dich-vu/${service.categorySlug}/${service.slug}`} className="block h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 flex-grow">{service.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default HomepageServiceCard;
