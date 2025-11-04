
import Link from 'next/link';
import Image from 'next/image';
import { NewsPreview } from '@/types';

// Helper function to get category display
const getCategoryDisplay = (category: string | string[]): string => {
  if (Array.isArray(category)) {
    return category[0] || 'Tin tức';
  }
  return category || 'Tin tức';
};

export function NewsCard({ post }: { post: NewsPreview }) {
  return (
    <article 
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group overflow-hidden"
    >
      <Link href={`/tin-tuc/${post.slug}`} className="block h-full flex flex-col">
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
              {getCategoryDisplay(post.category)}
            </span>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
            {post.excerpt}
          </p>
          <div className="flex items-center text-xs text-gray-500 mt-auto">
            <span>{post.author}</span>
            <span className="mx-2">·</span>
            <span>{post.date}</span>
            <span className="mx-2">·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
