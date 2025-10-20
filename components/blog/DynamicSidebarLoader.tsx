"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { News } from '@/types';

// --- PERFORMANCE OPTIMIZATION: Sidebar Loading Skeleton ---
const SidebarSkeleton = () => (
  <aside className="space-y-8">
    <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
      <div className="h-6 w-1/2 bg-gray-200 rounded mb-6"></div>
      <div className="flex flex-wrap gap-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-8 w-24 bg-gray-200 rounded-full"></div>
        ))}
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
       <div className="h-6 w-1/3 bg-gray-200 rounded mb-6"></div>
       <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-3 items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
       </div>
    </div>
  </aside>
);

interface BlogSidebarProps {
  latestPosts: News[];
}

// Dynamically import BlogSidebar with Suspense
const DynamicBlogSidebar = dynamic(() => import('@/components/blog/BlogSidebar'), {
  loading: () => <SidebarSkeleton />,
  ssr: false,
});

export default function DynamicSidebarLoader({ latestPosts }: BlogSidebarProps) {
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <DynamicBlogSidebar latestPosts={latestPosts} />
    </Suspense>
  );
}