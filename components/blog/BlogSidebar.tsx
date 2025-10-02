'use client';

import Link from 'next/link';
import Image from 'next/image';
import TagsFilter from './TagsFilter';
import type { NewsPreview } from '@/types';

interface BlogSidebarProps {
  latestPosts: NewsPreview[];
}

// This component wraps the parts of the sidebar that are interactive or not immediately critical.
export default function BlogSidebar({ latestPosts }: BlogSidebarProps) {
  return (
    <aside className="space-y-8">
      <TagsFilter />
      
      {latestPosts.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-xl font-bold text-gray-900 mb-6">Bài viết mới nhất</h4>
          <div className="space-y-4">
            {latestPosts.map((post: any) => (
              <Link key={post.slug} href={`/tin-tuc/${post.slug}`} className="block group">
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image 
                      src={post.imageUrl} 
                      alt={post.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
                      {post.title}
                    </h5>
                    <p className="text-xs text-gray-500">
                      {post.date}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
